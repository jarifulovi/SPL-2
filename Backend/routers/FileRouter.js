import express from 'express';
import multer from 'multer';
import * as Sanitizer from '../utils/Sanitizer.js';
import * as FileService from '../classes/FileService.js';
import FileUtils from '../utils/FileUtils.js';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

// will add validation for file size and type
const upload = multer({ storage });

router.post(
    '/uploadFile', 
    upload.single('file'),
    [Sanitizer.validateId('user_id'), Sanitizer.validateId('group_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    
    try {
        const { file } = req;
        const { user_id, group_id } = req.body; 
        if (!file) throw new Error("No file uploaded.");
        
        
        // File metadata from the uploaded file (multer adds the properties)
        const file_hash = await FileUtils.generateFileHashFromPath(file.path);
        const file_key = `user-files/${uuidv4()}-${file.originalname}`;
        const fileMetadata = {
            file_name: file.originalname,
            file_type: file.mimetype,      
            file_size: file.size,          
            file_key: file_key,      
            file_hash: file_hash, 
        };

       
        fs.unlinkSync(file.path);
        const result = await FileService.uploadAndCheckFile(fileMetadata, group_id, user_id);

        if (result.isUploaded) {
            // store in storage
            const signedUrl = await FileUtils.generateSignedUploadUrl(file.mimetype, file_key); 
            return res.status(201).json({
                success: true,
                message: 'File uploaded successfully and stored.',
                data: { signedUrl, file_key, file_id: result.file.file_id },
                isUploaded: true
            });
        } else {
            return res.status(201).json({
                success: true,
                message: 'File uploaded successfully and stored.',
                data: { file_key, file_id: result.file.file_id },
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

router.post(
    '/saveFile', 
    [Sanitizer.validateId('user_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    
    try {
        const { user_id, fileMetadata } = req.body;

        await FileService.saveFile(fileMetadata, user_id);
        
        return res.status(200).json({
            success: true,
            message: 'File saved successfully.',
        });
    } catch (error) {
        console.error('Error saving file:', error.message);
        return res.status(400).json({
            success: false,
            message: `${error.message}`
        });
    }
});

router.post(
    '/getFileUrl', 
    [Sanitizer.validateId('file_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    
    try {
        const { file_id } = req.body;
        
        const retrievedFile = await FileService.retrieveFile(file_id); // Also check if file exists
        const fileUrl = await FileUtils.getFileUrl(retrievedFile.file_key);
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


router.post(
    '/retrieveFile', 
    [Sanitizer.validateId('file_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    
    try {
        const { file_id } = req.body;
        const file = await FileService.retrieveFile(file_id);
        return res.status(200).json({
            success: true,
            message: 'File retrieved successfully.',
            data: { file }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Error retrieving file: ${error.message}`
        });
    }
});

export default router;