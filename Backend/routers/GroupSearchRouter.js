import express from 'express';
import GroupSearch from '../classes/GroupSearch.js';
import RouterUtils from '../utils/RouterUtils.js';

const router = express.Router();



const getGroupSearch = (type = '', topics = [], group_size = 50) => {
    return new GroupSearch(type, topics, group_size);
};


router.post('/retrieveAllGroups', async (req, res) => {

    RouterUtils.handleBasicRequest(req, res, () => 
        getGroupSearch().retrieveAllGroups()
    );
});


router.post('/searchGroup', async (req, res) => {
    
    const { type, topics, group_size, group_name } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        getGroupSearch(type, topics, group_size).searchGroup(group_name)
    );
});


export default router;