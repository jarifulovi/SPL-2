import express from 'express';
import multer from 'multer';
import GroupClass from '../classes/GroupClass.js';
import RouterUtils from '../utils/RouterUtils.js';

const router = express.Router();
const upload = multer();



const getGroupClass = (user_id, group_name, group_description, group_status, type, topics, group_image) => {
    if (!group_name) throw new Error('Group name is required');
    if (!group_description) throw new Error('Group description is required');
    if (!group_status) throw new Error('Group status is required');
    
    return new GroupClass(group_name, group_description, group_status, type, topics, group_image, user_id);
};


router.post('/createGroup', async (req, res) => {
    
    const { user_id, group_name, group_description, group_status, type, topics, group_image } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        getGroupClass(user_id, group_name, group_description, group_status, type, topics, group_image).createGroup()
    );
});


router.post('/retrieveGroupInfo', async (req, res) => {
    // Retrieve group information
    const { group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        new GroupClass().retrieveGroupInfo(group_id)
    );
});


router.post('/updateGroup', async (req, res) => {
    
    const { group_id, group_name, group_description, group_status, type, topics, group_image, user_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        getGroupClass(user_id, group_name, group_description, group_status, type, topics, group_image).updateGroup(group_id)
    );
});


router.post('/removeGroup', async (req, res) => {
    
    const { group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        new GroupClass().removeGroup(group_id)
    );
});

export default router;