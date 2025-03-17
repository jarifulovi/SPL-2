import express from 'express';
import * as Sanitizer from '../utils/Sanitizer.js';
import * as GroupSearch from '../services/GroupSearch.js';
import RouterUtils from '../utils/RouterUtils.js';

const router = express.Router();

router.post('/retrieveAllGroups', async (req, res) => {
    await RouterUtils.handleBasicRequest(req, res, async () => {
        return GroupSearch.retrieveAllGroups();
    }, 'Retrieve all groups', 'Groups retrieved successfully');
});

router.post(
    '/searchGroup', 
    [Sanitizer.validateContent('group_name', 0, 50, true), Sanitizer.validateGroupSize,
        Sanitizer.validateContent('type', 0, 50, true), Sanitizer.validateGroupTopics], 
    Sanitizer.handleValidationErrors('searchGroup'),
    async (req, res) => {
        const { type, topics, group_size, group_name } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return GroupSearch.searchGroup(group_name, type, topics, group_size);
        }, 'Search groups', 'Groups search completed successfully');
    }
);

export default router;