import express from 'express';
import * as Sanitizer from '../utils/Sanitizer.js';
import * as GroupChatFunctions from '../services/GroupChat.js';
import RouterUtils from '../utils/RouterUtils.js';

const router = express.Router();


// Route to retrieve all chats
router.post(
    '/retrieveAllChats', 
    [Sanitizer.validateId('group_id')], 
    Sanitizer.handleValidationErrors('retrieveAllChats'),
    async (req, res) => {
        const { group_id } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return GroupChatFunctions.retrieveAllChat(group_id);
        }, 'Retrieve all chats', 'Chats retrieved successfully');
    }
);


router.post(
    '/retrieveLatestChats', 
    [Sanitizer.validateId('group_id')], 
    Sanitizer.handleValidationErrors('retrieveLatestChats'),
    async (req, res) => {
        const { group_id } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return GroupChatFunctions.retrieveLatestChat(group_id);
        }, 'Retrieve latest chats', 'Latest chats retrieved successfully');
    }
);


router.post(
    '/retrieveAllDiscussions', 
    [Sanitizer.validateId('group_id')], 
    Sanitizer.handleValidationErrors('retrieveAllDiscussions'),
    async (req, res) => {
        const { group_id } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return GroupChatFunctions.retrieveAllDiscussion(group_id);
        }, 'Retrieve all discussions', 'Discussions retrieved successfully');
    }
);


router.post(
    '/checkDiscussion', 
    [Sanitizer.validateId('group_id'), Sanitizer.validateContent('content')], 
    Sanitizer.handleValidationErrors('checkDiscussion'),
    async (req, res) => {
        const { group_id, content } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return GroupChatFunctions.checkDiscussionExists(group_id, content);
        }, 'Check discussion', 'Discussion check completed successfully');
    }
);

export default router;
