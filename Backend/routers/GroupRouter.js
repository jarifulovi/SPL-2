import express from 'express';
import multer from 'multer';
import GroupClass from '../classes/GroupClass.js';

const router = express.Router();
const upload = multer();


router.post('/createGroup', async (req, res) => {
    
    const { user_id, group_name, group_description, group_status, type, topics, group_image } = req.body;
    console.log(req.body);
    const group = new GroupClass(group_name, group_description, group_status, type, topics, group_image, user_id);
    try {
        const data = await group.createGroup();
        res.status(200).json({
            success: true,
            message: 'Group created successfully',
            data
        });
    } catch (error) {
        console.error('Error during creating group:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


router.post('/retrieveGroupInfo', async (req, res) => {
    // Retrieve group information
    const { group_id } = req.body;
    const group = new GroupClass();
    try {
        const data = await group.retrieveGroupInfo(group_id);

        res.status(200).json({
            success: true,
            message: 'Group information retrieved successfully',
            data
        });
    } catch (error) {
        console.error('Error during retrieving group information:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


router.post('/updateGroup', async (req, res) => {
    
    const { group_id, group_name, group_description, group_status, type, topics, group_image, user_id } = req.body;
    const group = new GroupClass(group_name, group_description, group_status, type, topics, group_image, user_id);
    try {
        const data = await group.updateGroup(group_id);
        res.status(200).json({
            success: true,
            message: 'Group updated successfully',
            data
        });
    } catch (error) {
        console.error('Error during updating group:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


router.post('/removeGroup', async (req, res) => {
    
    const { group_id } = req.body;
    const group = new GroupClass();
    try {
        const data = await group.removeGroup(group_id);
        res.status(200).json({
            success: true,
            message: 'Group removed successfully',
            data
        });
    } catch (error) {
        console.error('Error during removing group:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;