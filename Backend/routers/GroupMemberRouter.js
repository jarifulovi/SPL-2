import express from 'express';
import GroupMember from '../classes/GroupMembers.js';

const router = express.Router();


router.post('/isMember', async (req, res) => {
    try {
        const { user_id, group_id } = req.body;
        const groupMember = new GroupMember(group_id);
        const result = await groupMember.isMemberOfGroup(user_id);

        res.status(200).json({
            success: true,
            message: 'Member checked successfully',
            data: result,
        });
    } catch (error) {
        console.error('Error during checking member:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})


router.post('/addMember', async (req, res) => {
    // Add member to group
    const { user_id, group_id, role } = req.body;
    const groupMember = new GroupMember(group_id);
    try {
        await groupMember.joinMember(user_id, role);
        res.status(200).json({
            success: true,
            message: 'Member added successfully'
        });
    } catch (error) {
        console.error('Error during adding member:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/addAdmin', async (req, res) => {
    // Add admin to group
    const { user_id, group_id } = req.body;
    const groupMember = new GroupMember(group_id);
    try {
        await groupMember.addAdmin(user_id);
        res.status(200).json({
            success: true,
            message: 'Admin added successfully'
        });
    } catch (error) {
        console.error('Error during adding admin:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


router.post('/removeMember', async (req, res) => {
    // Remove member from group
    const { user_id, group_id } = req.body;
    const groupMember = new GroupMember(group_id);
    try {
        await groupMember.removeMember(user_id);
        res.status(200).json({
            success: true,
            message: 'Member removed successfully'
        });
    } catch (error) {
        console.error('Error during removing member:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


router.post('/getAllGroupMembers', async (req, res) => {
   
    const { group_id } = req.body;
    const groupMember = new GroupMember(group_id);
    try {
        const data = await groupMember.retrieveAllGroupMembers();
        res.status(200).json({
            success: true,
            message: 'Group members retrieved successfully',
            data
        });
    } catch (error) {
        console.error('Error during retrieving group members:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


router.post('/getAllGroupsOfMember', async (req, res) => {
    
    const { user_id } = req.body;
    const groupMember = new GroupMember();
    try {
        const data = await groupMember.getAllGroupsOfMember(user_id);
        res.status(200).json({
            success: true,
            message: 'Groups retrieved successfully',
            data
        });
    } catch (error) {
        console.error('Error during retrieving groups of member:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


router.post('/getAllGroupAdmins', async (req, res) => {
    // Get all group admins
    const { group_id } = req.body;
    const groupMember = new GroupMember(group_id);
    try {
        const data = await groupMember.retrieveAllAdmins();
        res.status(200).json({
            success: true,
            message: 'Group admins retrieved successfully',
            data
        });
    } catch (error) {
        console.error('Error during retrieving group admins:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/getUserRole', async (req, res) => {

    const { user_id, group_id } = req.body;
    if (!user_id || !group_id) {
        return res.status(400).json({
            success: false,
            message: 'user_id and group_id are required',
        });
    }


    const groupMember = new GroupMember(group_id);
    try {
        const result = await groupMember.getUserRole(user_id);
        res.status(200).json({
            success: true,
            message: 'Member role retrieved successfully',
            data: result
        });
    } catch (error) {
        console.error('Error during retrieving member role:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

})


router.post('/updateMemberRole', async (req, res) => {
    // Update member role
    const { user_id, group_id, role } = req.body;
    const groupMember = new GroupMember(group_id);
    try {
        await groupMember.updateMemberRole(user_id, role);
        res.status(200).json({
            success: true,
            message: 'Member role updated successfully'
        });
    } catch (error) {
        console.error('Error during updating member role:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


export default router;