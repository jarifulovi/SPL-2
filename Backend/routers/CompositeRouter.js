import express from 'express';
import * as Sanitizer from '../utils/Sanitizer.js';
import * as GroupService from '../services/GroupService.js';
import * as GroupMembers from '../services/GroupMembers.js';
import * as UserService from '../services/UserService.js';
import * as FileService from '../services/FileService.js';

const router = express.Router();
// This module is designed for the initial mount in React.
// It retrieves various types of unrelated data all at once,
// allowing for efficient data fetching when the component is first rendered.
// Returns an object containing all necessary data for the component.



router.post(
    '/loadGroupDetails', 
    [Sanitizer.validateId('user_id'), Sanitizer.validateId('group_id'), Sanitizer.validateId('created_by')], 
    Sanitizer.handleValidationErrors('loadGroupDetails'),
    async (req, res) => {
    
    try {
        const { user_id, group_id, created_by } = req.body;
        
        
        const isMember = await GroupMembers.isMemberOfGroup(user_id, group_id);
        const groupMembers = await GroupMembers.retrieveAllGroupMembers(group_id);
        const creator = await UserService.getUserById(created_by);
        if (!creator) {
            return res.status(200).json({
                success: true,
                message: 'Group creator not found',
                data: [],
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
            message: 'An error occurred during loading groupDetails'
        });
    }
});


router.post(
    '/retrieveAllFiles', 
    [Sanitizer.validateId('user_id')], 
    Sanitizer.handleValidationErrors('retrieveAllFiles'),
    async (req, res) => {
    
    try {
        const { user_id } = req.body;

        const allFiles = await FileService.retrieveAllUserRepoFile(user_id);
        if (!allFiles || allFiles.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No file found',
                data: { allFiles: [] },
            });
        }

        const userIds = allFiles.map(file => file.uploaded_by);
        const groupIds = allFiles.map(file => file.group_id);

        const uploaders = await UserService.getUsersByIds(userIds);
        const groups = await GroupService.getGroupsByIds(groupIds);

        const uploadersMap = new Map();
        const groupsMap = new Map();

        uploaders.forEach(uploader => {
            uploadersMap.set(uploader.user_id, uploader);
        });

        groups.forEach(group => {
            groupsMap.set(group.group_id, group);
        });

        // preserve duplicates
        const filesWithUploadersAndGroups = allFiles.map(file => {
            return {
                ...file.toObject ? file.toObject() : file,
                uploader: uploadersMap.get(file.uploaded_by) || null,
                group: groupsMap.get(file.group_id) || null,
            };
        });

        const data = {
            allFiles: filesWithUploadersAndGroups,
        };
        
        
        res.status(200).json({
            success: true,
            message: 'All files loaded successfully',
            data: data,
        });
    } catch (error) {
        console.error('Error during loading groupFiles data:', error.message);
        res.status(500).json({
            success: false,
            message: 'An error occurred during loading groupFiles'
        });
    };
});



export default router;