import express from 'express';
import multer from 'multer';
import * as GroupService from '../classes/GroupService.js';
import RouterUtils from '../utils/RouterUtils.js';
import FileUtils from '../utils/FileUtils.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });



router.post('/createGroup', upload.single("group_image"), async (req, res) => {
    
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
        if (!group_name) throw new Error('Group name is required');
        if (!group_description) throw new Error('Group description is required');
        if (!group_status) throw new Error('Group status is required');
        
        return await GroupService.createGroup(group_name, group_description, group_status, type, topics, group_image, user_id);
    });
    
});


router.post('/retrieveGroupInfo', async (req, res) => {
    // Retrieve group information
    const { group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupService.retrieveGroupInfo(group_id)
    );
});


router.post('/updateGroup', upload.single("group_image"), async (req, res) => {

    
    let { group_id, group_name, group_description, group_status, type, topics, group_image, user_id } = req.body;
    const file = req.file;
    console.log(group_id);
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
        if (!group_name) throw new Error('Group name is required');
        if (!group_description) throw new Error('Group description is required');
        if (!group_status) throw new Error('Group status is required');
        
        return await GroupService.updateGroup(group_name, group_description, group_status, type, topics, group_image, group_id);
    });
});


router.post('/removeGroup', async (req, res) => {
    
    const { group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupService.removeGroup(group_id)
    );
});

export default router;