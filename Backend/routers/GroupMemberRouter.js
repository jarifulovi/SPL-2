import express from 'express';
import * as GroupMembers from '../classes/GroupMembers.js';
import RouterUtils from '../utils/RouterUtils.js';

const router = express.Router();

router.post('/isMember', async (req, res) => {
    const { user_id, group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupMembers.isMemberOfGroup(user_id, group_id)
    );
});

router.post('/addMember', async (req, res) => {
    // Add member to group
    const { user_id, group_id, role } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupMembers.joinMember(user_id, group_id, role)
    );
});

router.post('/addAdmin', async (req, res) => {
    // Add admin to group
    const { user_id, group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () =>
        GroupMembers.addAdmin(user_id, group_id)
    );
});

router.post('/removeMember', async (req, res) => {
    // Remove member from group
    const { user_id, group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupMembers.removeMember(user_id, group_id)
    );
});

router.post('/getAllGroupMembers', async (req, res) => {
    const { group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupMembers.retrieveAllGroupMembers(group_id)
    );
});

router.post('/getAllGroupsOfMember', async (req, res) => {
    const { user_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupMembers.getAllGroupsOfMember(user_id)
    );
});

router.post('/getAllGroupAdmins', async (req, res) => {
    // Get all group admins
    const { group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupMembers.retrieveAllAdmins(group_id)
    );
});

router.post('/getUserRole', async (req, res) => {
    const { user_id, group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupMembers.getUserRole(user_id, group_id)
    );
});

router.post('/updateMemberRole', async (req, res) => {
    // Update member role
    const { user_id, group_id, role } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupMembers.updateMemberRole(user_id, group_id, role)
    );
});

export default router;