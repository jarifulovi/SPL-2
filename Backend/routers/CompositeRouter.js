import express from 'express';
import * as GroupMembers from '../classes/GroupMembers.js';
import * as UserService from '../classes/UserService.js';
import * as FileService from '../classes/FileService.js';

const router = express.Router();
// This module is designed for the initial mount in React.
// It retrieves various types of unrelated data all at once,
// allowing for efficient data fetching when the component is first rendered.
// Returns an object containing all necessary data for the component.



router.post('/loadGroupDetails', async (req, res) => {
    try {
        const { user_id, group } = req.body;
        if (!user_id || !group) {
            throw new Error('User_id or group_id not provided');
        }
        
        const isMember = await GroupMembers.isMemberOfGroup(user_id, group.group_id);
        const groupMembers = await GroupMembers.retrieveAllGroupMembers(group.group_id);
        const creator = await UserService.getUserById(group.created_by);
        if (!creator) {
            return res.status(404).json({
                success: false,
                message: 'Group creator not found',
            });
        }


        const data = {
            isMember,
            groupMembers,
            creator_name: creator.name,
        };

        res.status(200).json({
            success: true,
            message: 'Group details data loaded successfully',
            data: data,
        });
    } catch (error) {
        console.error('Error during loading groupDetails data:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


router.post('/retrieveAllFiles', async (req, res) => {
    try {
        const { user_id } = req.body;

        const allFiles = await FileService.retrieveAllUserRepoFile(user_id);
        // needs uploaded_by name, group name
        // uploader profile picture
        const data = {
            allFiles,
        };

        if (!allFiles) {
            return res.status(404).json({
                success: true,
                message: 'No file found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'All files loaded successfully',
            data: data,
        });
    } catch (error) {
        console.error('Error during loading groupFiles data:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    };
});



export default router;