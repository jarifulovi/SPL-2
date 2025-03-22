import Chat from "../models/Chat.js";

export async function postMessage(group_id, sender, content, type = 'text_message', additionalFields = {}) {
    try {
        
        const validTypes = ['text_message', 'link', 'discussion_topic', 'files', 'video_conferencing', 'join_group'];
        if (!validTypes.includes(type)) {
            throw new Error('Invalid chat type');
        }

        
        const chatData = {
            group_id: group_id,
            sender,
            content,
            type,
        };

        // Add additional fields for specific types
        if (type === 'discussion_topic') {
            const { topic, discussionStatus } = additionalFields;

            if (!topic || !discussionStatus) {
                throw new Error('Missing required fields for discussion_topic');
            }

            chatData.topic = topic;
            chatData.discussionStatus = discussionStatus;
        }
        if(type === 'files'){
            if(!additionalFields.file_id){
                throw new Error('Missing required fields for files');
            }
            chatData.file_id = additionalFields.file_id;
        }
        if(additionalFields?.discussion_id){
            chatData.discussion_id = additionalFields.discussion_id;
        }

        const newChat = new Chat(chatData);
        const savedChat = await newChat.save();

        return savedChat;
    } catch (error) {
        console.error('Failed to post message:', error.message);
        throw new Error(error.message || 'Failed to post message');
    }
}

export async function removeChat(group_id, chat_id) {
    try {
        
        const deletedChat = await Chat.findOneAndDelete({ group_id: group_id, chat_id });

        if (!deletedChat) {
            throw new Error('Chat not found');
        }

        return deletedChat;
    } catch (error) {
        console.error('Failed to remove chat:', error.message);
        throw new Error(error.message || 'Failed to remove chat');
    }
}

export async function postDiscussion(group_id, sender, content, topic, discussionStatus) {
    return await postMessage(group_id, sender, content, 'discussion_topic', { topic, discussionStatus });
}

export async function retrieveAllChat(group_id) {
    return await retrieveChats(group_id);
}

export async function retrieveLatestChat(group_id) {
    return await retrieveChats(group_id, 20);
}

export async function retrieveAllDiscussion(group_id) {
    try {
        const allDiscussions = await Chat.find({ group_id: group_id, type: 'discussion_topic' })
            .sort({ send_at: -1 });

        return allDiscussions;
    } catch (error) {
        console.error('Failed to retrieve all discussions:', error.message);
        throw new Error(error.message || 'Failed to retrieve all discussions');
    }
}

export async function checkDiscussionExists(group_id, content) {
    try {
        const discussion = await Chat.findOne({ group_id: group_id, type: 'discussion_topic', content });
        return discussion ? true : false;
    } catch (error) {
        console.error('Failed to check if discussion exists:', error.message);
        throw new Error(error.message || 'Failed to check if discussion exists');
    }
}

export async function retrieveChats(group_id, limit = 0) {
    try {
        
        const query = { group_id: group_id };

        const chats = await Chat.find(query)
            .sort({ send_at: -1 }) 
            .limit(limit);

        return chats;
    } catch (error) {
        console.error('Failed to retrieve chats:', error.message);
        throw new Error(error.message || 'Failed to retrieve chats');
    }
}

// Default export for backward compatibility
export default {
    postMessage,
    removeChat,
    postDiscussion,
    retrieveAllChat,
    retrieveLatestChat,
    retrieveAllDiscussion,
    checkDiscussionExists,
    retrieveChats
};

