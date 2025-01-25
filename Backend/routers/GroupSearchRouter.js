import express from 'express';
import GroupSearch from '../classes/GroupSearch.js';

const router = express.Router();


router.post('/retrieveAllGroups', async (req, res) => {
    try {
        const groupSearch = new GroupSearch();
        const allGroups = await groupSearch.retrieveAllGroups();
        res.status(201).json({
            success: true,
            message: 'Successfully retrieved all groups',
            data: allGroups,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'An error occurred during retrieving all groups'
        });
    }
});


router.post('/searchGroup', async (req, res) => {
    try {
        const { type, topics, group_size, group_name } = req.body;
        const groupSearch = new GroupSearch(type, topics, group_size);
        const searchedGroups = await groupSearch.searchGroup(group_name);

        res.status(201).json({
            success: true,
            message: 'Successfully retrieved searched groups',
            data: searchedGroups,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'An error occurred during retrieving searched groups'
        });
    }
});


export default router;