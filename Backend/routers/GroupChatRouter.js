import express from 'express';
import GroupChat from '../classes/GroupChat.js';

const router = express.Router();

// Route to post a new message
router.post('/postMessage', async (req, res) => {
    try {
        const { group_id, sender, content, type } = req.body;
        const groupChat = new GroupChat(group_id);
        const result = await groupChat.postMessage(sender, content, type);

        res.status(201).json({
            success: true,
            message: 'Message posted successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to post message',
        });
    }
});


router.delete('/removeChat', async (req, res) => {
    try {
        const { group_id, chat_id } = req.body;
        const groupChat = new GroupChat(group_id);
        await groupChat.removeChat(chat_id);

        res.status(200).json({
            success: true,
            message: 'Chat removed successfully',
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to remove chat',
        });
    }
});

// Route to post a discussion
router.post('/postDiscussion', async (req, res) => {
    try {
        const { group_id, sender, content } = req.body;
        const groupChat = new GroupChat(group_id);
        const result = await groupChat.postDiscussion(sender, content);

        res.status(201).json({
            success: true,
            message: 'Discussion posted successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to post discussion',
        });
    }
});

// Route to retrieve all chats
router.post('/retrieveAllChats', async (req, res) => {
    try {
        const { group_id } = req.body;
        const groupChat = new GroupChat(group_id);
        const result = await groupChat.retrieveAllChat();

        res.status(200).json({
            success: true,
            message: 'Chats retrieved successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to retrieve chats',
        });
    }
});


router.post('/retrieveLatestChats', async (req, res) => {
    try {
        const { group_id } = req.body;
        const groupChat = new GroupChat(group_id);
        const result = await groupChat.retrieveLatestChat();

        res.status(200).json({
            success: true,
            message: 'Latest chats retrieved successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to retrieve latest chats',
        });
    }
});


router.post('/retrieveAllDiscussions', async (req, res) => {
    try {
        const { group_id } = req.body;
        const groupChat = new GroupChat(group_id);
        const result = await groupChat.retrieveAllDiscussion();

        res.status(200).json({
            success: true,
            message: 'Discussions retrieved successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to retrieve discussions',
        });
    }
});


router.post('/checkDiscussion', async (req, res) => {
    try {
        const { group_id, content } = req.body;
        const groupChat = new GroupChat(group_id);
        const exists = await groupChat.checkDiscussionExists(content);

        res.status(200).json({
            success: true,
            message: exists ? 'Discussion exists' : 'Discussion does not exist',
            data: { exists },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to check discussion existence',
        });
    }
});

export default router;
