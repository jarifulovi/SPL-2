import express from 'express';
import * as Sanitizer from '../utils/Sanitizer.js';
import * as GroupChatFunctions from '../classes/GroupChat.js';
import RouterUtils from '../utils/RouterUtils.js';

const router = express.Router();


// Route to retrieve all chats
router.post(
    '/retrieveAllChats', 
    [Sanitizer.validateId('group_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    
    const { group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupChatFunctions.retrieveAllChat(group_id)
    );
});


router.post(
    '/retrieveLatestChats', 
    [Sanitizer.validateId('group_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    
    const { group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupChatFunctions.retrieveLatestChat(group_id)
    );
});


router.post(
    '/retrieveAllDiscussions', 
    [Sanitizer.validateId('group_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    
    const { group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupChatFunctions.retrieveAllDiscussion(group_id)
    );
});


router.post(
    '/checkDiscussion', 
    [Sanitizer.validateId('group_id'), Sanitizer.validateContent('content')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    
    const { group_id, content } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        GroupChatFunctions.checkDiscussionExists(group_id, content)
    );
});

export default router;
