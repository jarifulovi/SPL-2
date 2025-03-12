import express from 'express';
import * as GroupSearch from '../classes/GroupSearch.js';
import RouterUtils from '../utils/RouterUtils.js';

const router = express.Router();

router.post('/retrieveAllGroups', async (req, res) => {
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupSearch.retrieveAllGroups()
    );
});

router.post('/searchGroup', async (req, res) => {
    const { type, topics, group_size, group_name } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupSearch.searchGroup(group_name, type, topics, group_size)
    );
});

export default router;