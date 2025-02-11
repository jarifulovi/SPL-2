import express from 'express';
import multer from 'multer';
import FileService from '../classes/FileService';
import FileUtils from '../utils/FileUtils';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });



router.post('/uploadFile', upload.single('file'), async (req, res) => {
    try {
        const { file } = req; // Access the uploaded file from multer
        const { user_id, group_id } = req.body; 
        
        
        
        // File metadata from the uploaded file (multer adds the properties)
        const file_hash = FileUtils.generateFileHashFromPath(file.path);
        const file_key = `${Date.now()}-${file.filename}`;
        const fileMetadata = {
            file_name: file.originalname,
            file_type: file.mimetype,      
            file_size: file.size,          
            file_key: file_key,      
            file_hash: file_hash || '', 
        };

       
        const fileHandler = new FileService(user_id);
        const isUploaded = await fileHandler.uploadAndCheckFile(fileMetadata, group_id);

        if (isUploaded) {
            // store in storage
            await FileUtils.uploadFile(file, file_key);
            return res.status(201).json({
                success: true,
                message: 'File uploaded successfully and stored.',
            });
        } else {
            return res.status(201).json({
                success: true,
                message: 'File already exists, reused the file key.',
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Error uploading file: ${error.message}`
        });
    }
});

export default router;