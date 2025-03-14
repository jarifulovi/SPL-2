import express from 'express';
import * as Sanitizer from '../utils/Sanitizer.js';
import * as GroupMembers from '../services/GroupMembers.js';
import RouterUtils from '../utils/RouterUtils.js';

const router = express.Router();

router.post(
    '/isMember', 
    [Sanitizer.validateId('user_id'), Sanitizer.validateId('group_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
        const { user_id, group_id } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return GroupMembers.isMemberOfGroup(user_id, group_id);
        }, 'Check group membership', 'Membership check completed successfully');
    }
);

router.post(
    '/addMember', 
    [Sanitizer.validateId('user_id'), Sanitizer.validateId('group_id'), Sanitizer.validateRole], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
        const { user_id, group_id, role } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return GroupMembers.joinMember(user_id, group_id, role);
        }, 'Add group member', 'Member added successfully');
    }
);

router.post(
    '/addAdmin', 
    [Sanitizer.validateId('user_id'), Sanitizer.validateId('group_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
        const { user_id, group_id } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return GroupMembers.addAdmin(user_id, group_id);
        }, 'Add group admin', 'Admin added successfully');
    }
);

router.post(
    '/removeMember', 
    [Sanitizer.validateId('user_id'), Sanitizer.validateId('group_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
        const { user_id, group_id } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return GroupMembers.removeMember(user_id, group_id);
        }, 'Remove group member', 'Member removed successfully');
    }
);

router.post(
    '/getAllGroupMembers', 
    [Sanitizer.validateId('group_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
        const { group_id } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return GroupMembers.retrieveAllGroupMembers(group_id);
        }, 'Get all group members', 'Group members retrieved successfully');
    }
);

router.post(
    '/getAllGroupsOfMember', 
    [Sanitizer.validateId('user_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
        const { user_id } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return GroupMembers.getAllGroupsOfMember(user_id);
        }, 'Get all member groups', 'Member groups retrieved successfully');
    }
);

router.post(
    '/getAllGroupAdmins', 
    [Sanitizer.validateId('group_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
        const { group_id } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return GroupMembers.retrieveAllAdmins(group_id);
        }, 'Get all group admins', 'Group admins retrieved successfully');
    }
);

router.post(
    '/getUserRole', 
    [Sanitizer.validateId('user_id'), Sanitizer.validateId('group_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
        const { user_id, group_id } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return GroupMembers.getUserRole(user_id, group_id);
        }, 'Get user role', 'User role retrieved successfully');
    }
);

router.post(
    '/updateMemberRole', 
    [Sanitizer.validateId('user_id'), Sanitizer.validateId('group_id'), Sanitizer.validateRole], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
        const { user_id, group_id, role } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return GroupMembers.updateMemberRole(user_id, group_id, role);
        }, 'Update member role', 'Member role updated successfully');
    }
);

export default router;