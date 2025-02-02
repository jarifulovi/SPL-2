import express from 'express';
import GroupMember from '../classes/GroupMembers.js';
import RouterUtils from '../utils/RouterUtils.js';

const router = express.Router();



const getGroupMember = (group_id) => {
    if (!group_id) throw new Error('Group ID is required');
    return new GroupMember(group_id);
};

router.post('/isMember', async (req, res) => {
    
    const { user_id, group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        getGroupMember(group_id).isMemberOfGroup(user_id)
    );
})


router.post('/addMember', async (req, res) => {
    // Add member to group
    const { user_id, group_id, role } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        getGroupMember(group_id).joinMember(user_id, role)
    );
});

router.post('/addAdmin', async (req, res) => {
    // Add admin to group
    const { user_id, group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () =>
        getGroupMember(group_id).addAdmin(user_id)
    );
});


router.post('/removeMember', async (req, res) => {
    // Remove member from group
    const { user_id, group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        getGroupMember(group_id).removeMember(user_id)
    );
});


router.post('/getAllGroupMembers', async (req, res) => {
   
    const { group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        getGroupMember(group_id).retrieveAllGroupMembers()
    );
});


router.post('/getAllGroupsOfMember', async (req, res) => {
    
    const { user_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        new GroupMember().getAllGroupsOfMember(user_id)
    );
});


router.post('/getAllGroupAdmins', async (req, res) => {
    // Get all group admins
    const { group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        getGroupMember(group_id).retrieveAllAdmins()
    );
});

router.post('/getUserRole', async (req, res) => {

    const { user_id, group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        getGroupMember(group_id).getUserRole(user_id)
    );
})


router.post('/updateMemberRole', async (req, res) => {
    // Update member role
    const { user_id, group_id, role } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        getGroupMember(group_id).updateMemberRole(user_id, role)
    );
});


export default router;