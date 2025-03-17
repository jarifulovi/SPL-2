import express from 'express';
import multer from 'multer';
import * as Sanitizer from '../utils/Sanitizer.js';
import * as GroupService from '../services/GroupService.js';
import RouterUtils from '../utils/RouterUtils.js';
import FileUtils from '../utils/FileUtils.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// add image file validation
const upload = multer({ storage: multer.memoryStorage() });


// here group_image is the actual image when the user uploads it
// letter it is just the url in database
router.post(
    '/createGroup',
    upload.single("group_image"),
    [
        Sanitizer.validateId('user_id'), 
        Sanitizer.validateContent('group_name', 3, 50, false), 
        Sanitizer.validateContent('group_description', 3, 500, false), 
        Sanitizer.validateGroupStatus,
        Sanitizer.validateContent('type', 0, 50, true),
        Sanitizer.validateContent('topics', 0, 500, true)
    ],
    Sanitizer.handleValidationErrors('createGroup'),
    async (req, res) => {
    
    let { user_id, group_name, group_description, group_status, type, topics, group_image } = req.body;
    const file = req.file;
    // upload group_image in aws s3
    if(file) {
        try {
            const fileKey = `profile-pictures/${uuidv4()}-${file.originalname}`;
            const uploadResult = await FileUtils.generateProfilePicUploadUrl(file, fileKey);
            group_image = uploadResult.publicUrl;
        } catch (error) {
            console.log('error', error);
            return res.status(400).json({
                success: false,
                message: 'Failed to upload group image.',
                error: error.message,
            });
        }
        
    }

    
    await RouterUtils.handleBasicRequest(req, res, async () => {
        return GroupService.createGroup(group_name, group_description, group_status, type, topics, group_image, user_id);
    }, 'Create group', 'Group created successfully');
    
});


router.post(
    '/retrieveGroupInfo', 
    [Sanitizer.validateId('group_id')], 
    Sanitizer.handleValidationErrors('retrieveGroupInfo'),
    async (req, res) => {
    
    const { group_id } = req.body;
    await RouterUtils.handleBasicRequest(req, res, async () => {
        return GroupService.getGroupbyId(group_id);
    }, 'Retrieve group info', 'Group info retrieved successfully');
});


router.post(
    '/updateGroup', 
    upload.single("group_image"),
    [
        Sanitizer.validateId('group_id'), 
        Sanitizer.validateContent('group_name', 3, 50, false), 
        Sanitizer.validateContent('group_description', 3, 500, false), 
        Sanitizer.validateGroupStatus,
        Sanitizer.validateContent('type', 0, 50, true), 
        Sanitizer.validateContent('topics', 0, 500, true)
    ], 
    Sanitizer.handleValidationErrors('updateGroup'),
    async (req, res) => {
    
    
    let { group_id, group_name, group_description, group_status, type, topics, group_image } = req.body;
    const file = req.file;
    
    if(file) {
        try {
            const fileKey = `profile-pictures/${uuidv4()}-${file.originalname}`;
            const uploadResult = await FileUtils.generateProfilePicUploadUrl(file, fileKey);
            group_image = uploadResult.publicUrl;
            console.log('group_image url', group_image);
        } catch (error) {
            console.log('error', error);
            return res.status(400).json({
                success: false,
                message: 'Failed to update group image.',
                error: error.message,
            });
        }
    }
    
    
    await RouterUtils.handleBasicRequest(req, res, async () => {
        return GroupService.updateGroup(group_name, group_description, group_status, type, topics, group_image, group_id);
    }, 'Update group', 'Group updated successfully');
});


router.post(
    '/removeGroup', 
    [Sanitizer.validateId('group_id')], 
    Sanitizer.handleValidationErrors('removeGroup'),
    async (req, res) => {
    
    
    const { group_id } = req.body;
    await RouterUtils.handleBasicRequest(req, res, async () => {
        return GroupService.removeGroup(group_id);
    }, 'Remove group', 'Group removed successfully');
});

export default router;