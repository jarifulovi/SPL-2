import express from 'express';
import GroupChat from '../classes/GroupChat.js';
import RouterUtils from '../utils/RouterUtils.js';

const router = express.Router();


const getGroupChat = (group_id) => {
    if (!group_id) throw new Error('Group ID is required');
    return new GroupChat(group_id);
};

// Route to post a new message
router.post('/postMessage', async (req, res) => {
    
    const { group_id, sender, content, type } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        getGroupChat(group_id).postMessage(sender, content, type)
    );
});


router.delete('/removeChat', async (req, res) => {

    const { group_id, chat_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        getGroupChat(group_id).removeChat(chat_id)
    );
});

// Route to post a discussion
router.post('/postDiscussion', async (req, res) => {
    
    const { group_id, sender, content } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        getGroupChat(group_id).postDiscussion(sender, content)
    );
});

// Route to retrieve all chats
router.post('/retrieveAllChats', async (req, res) => {
    
    const { group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        getGroupChat(group_id).retrieveAllChat()
    );
});


router.post('/retrieveLatestChats', async (req, res) => {

    const { group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        getGroupChat(group_id).retrieveLatestChat()
    );
});


router.post('/retrieveAllDiscussions', async (req, res) => {
    
    const { group_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        getGroupChat(group_id).retrieveAllDiscussion()
    );
});


router.post('/checkDiscussion', async (req, res) => {
    
    const { group_id, content } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        getGroupChat(group_id).checkDiscussionExists(content)
    );
});

export default router;
