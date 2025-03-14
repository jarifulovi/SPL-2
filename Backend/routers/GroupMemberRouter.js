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
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupMembers.isMemberOfGroup(user_id, group_id)
    );
});

router.post(
    '/addMember', 
    [Sanitizer.validateId('user_id'), Sanitizer.validateId('group_id'), Sanitizer.validateRole], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    
    const { user_id, group_id, role } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupMembers.joinMember(user_id, group_id, role)
    );
});

router.post(
    '/addAdmin', 
    [Sanitizer.validateId('user_id'), Sanitizer.validateId('group_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    
    const { user_id, group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () =>
        GroupMembers.addAdmin(user_id, group_id)
    );
});

router.post(
    '/removeMember', 
    [Sanitizer.validateId('user_id'), Sanitizer.validateId('group_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    
    const { user_id, group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupMembers.removeMember(user_id, group_id)
    );
});

router.post(
    '/getAllGroupMembers', 
    [Sanitizer.validateId('group_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    
    const { group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupMembers.retrieveAllGroupMembers(group_id)
    );
});

router.post(
    '/getAllGroupsOfMember', 
    [Sanitizer.validateId('user_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    
    const { user_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupMembers.getAllGroupsOfMember(user_id)
    );
});

router.post(
    '/getAllGroupAdmins', 
    [Sanitizer.validateId('group_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    
    const { group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupMembers.retrieveAllAdmins(group_id)
    );
});

router.post(
    '/getUserRole', 
    [Sanitizer.validateId('user_id'), Sanitizer.validateId('group_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    
    const { user_id, group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupMembers.getUserRole(user_id, group_id)
    );
});

router.post(
    '/updateMemberRole', 
    [Sanitizer.validateId('user_id'), Sanitizer.validateId('group_id'), Sanitizer.validateRole], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    
    const { user_id, group_id, role } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupMembers.updateMemberRole(user_id, group_id, role)
    );
});

export default router;