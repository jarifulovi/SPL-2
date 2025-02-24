import express from 'express';
import multer from 'multer';
import FileService from '../classes/FileService.js';
import FileUtils from '../utils/FileUtils.js';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';


const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });


router.post('/uploadFile', upload.single('file'), async (req, res) => {
    try {
        const { file } = req;
        const { user_id, group_id } = req.body; 
        if (!file) throw new Error("No file uploaded.");
        
        
        // File metadata from the uploaded file (multer adds the properties)
        const file_hash = await FileUtils.generateFileHashFromPath(file.path);
        const file_key = `${uuidv4()}-${file.originalname}`;
        const fileMetadata = {
            file_name: file.originalname,
            file_type: file.mimetype,      
            file_size: file.size,          
            file_key: file_key,      
            file_hash: file_hash, 
        };

       
        fs.unlinkSync(file.path);
        const fileHandler = new FileService(user_id);
        const isUploadedNeeded = await fileHandler.uploadAndCheckFile(fileMetadata, group_id);

        if (isUploadedNeeded) {
            // store in storage
            const signedUrl = await FileUtils.generateSignedUploadUrl(file.mimetype, file_key); 
            return res.status(201).json({
                success: true,
                message: 'File uploaded successfully and stored.',
                data: { signedUrl, file_key },
                isUploaded: true
            });
        } else {
            return res.status(201).json({
                success: true,
                message: 'File uploaded successfully and stored.',
                data: { file_key },
                isUploaded: false
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Error uploading file: ${error.message}`
        });
    }
});

router.post('/getFileUrl', async (req, res) => {
    try {
        const { file_id } = req.body;
        

        const fileService = new FileService();
        const file_key = await fileService.retrieveFileKey(file_id); // Also check if file exists
        const fileUrl = await FileUtils.getFileUrl(file_key);
        return res.status(200).json({
            success: true,
            message: 'File URL generated successfully.',
            data: { fileUrl }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Error generating file URL: ${error.message}`
        });
    }
});

export default router;