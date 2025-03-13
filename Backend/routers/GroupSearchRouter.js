import express from 'express';
import * as Sanitizer from '../utils/Sanitizer.js';
import * as GroupSearch from '../classes/GroupSearch.js';
import RouterUtils from '../utils/RouterUtils.js';

const router = express.Router();

router.post('/retrieveAllGroups', async (req, res) => {
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupSearch.retrieveAllGroups()
    );
});

router.post(
    '/searchGroup', 
    [Sanitizer.validateContent('group_name', 0, 50, true), Sanitizer.validateGroupSize,
        Sanitizer.validateContent('type', 0, 50, true), Sanitizer.validateGroupTopics], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    
    const { type, topics, group_size, group_name } = req.body;
    RouterUtils.handleBasicRequest(req, res, () =>
        GroupSearch.searchGroup(group_name, type, topics, group_size)
    );
});

export default router;