import Chat from "../models/Chat.js";

class GroupChat {

    constructor(group_id) {
        if (!group_id) {
            throw new Error('Group ID is required');
        }
        this.group_id = group_id;
    }

    async postMessage(sender, content, type = 'text_message') {
        try {
            
            const validTypes = ['text_message', 'link', 'discussion_topic', 'files', 'video_conferencing', 'join_group'];
            if (!validTypes.includes(type)) {
                throw new Error('Invalid chat type');
            }
    
            
            const newChat = new Chat({
                group_id: this.group_id,
                sender,
                content,
                type,
            });
    
            
            const savedChat = await newChat.save();
    
            return savedChat;
        } catch (error) {
            console.error('Failed to post message:', error.message);
            throw new Error(error.message || 'Failed to post message');
        }
    }
    

    async removeChat(chat_id) {
        try {
            
            const deletedChat = await Chat.findOneAndDelete({ group_id: this.group_id, chat_id });
    
            if (!deletedChat) {
                throw new Error('Chat not found');
            }
    
            return deletedChat;
        } catch (error) {
            console.error('Failed to remove chat:', error.message);
            throw new Error(error.message || 'Failed to remove chat');
        }
    }

    async postDiscussion(sender, content) {
        return await this.postMessage(sender, content, 'discussion_topic');
    }
    
    async retrieveAllChat() {
        return await this.retrieveChats();
    }
    
    
    async retrieveLatestChat() {
        return await this.retrieveChats(20);
    }
    

    async retrieveAllDiscussion() {
        try {
            const allDiscussions = await Chat.find({ group_id: this.group_id, type: 'discussion_topic' })
                .sort({ send_at: -1 });
    
            return allDiscussions;
        } catch (error) {
            console.error('Failed to retrieve all discussions:', error.message);
            throw new Error(error.message || 'Failed to retrieve all discussions');
        }
    }

    async checkDiscussionExists(content) {
        try {
            const discussion = await Chat.findOne({ group_id: this.group_id, type: 'discussion_topic', content });
            return discussion ? true : false;
        } catch (error) {
            console.error('Failed to check if discussion exists:', error.message);
            throw new Error(error.message || 'Failed to check if discussion exists');
        }
    }
    


    async retrieveChats(limit = 0) {
        try {
            
            const query = { group_id: this.group_id };
    
            const chats = await Chat.find(query)
                .sort({ send_at: -1 }) 
                .limit(limit);
    
            return chats;
        } catch (error) {
            console.error('Failed to retrieve chats:', error.message);
            throw new Error(error.message || 'Failed to retrieve chats');
        }
    }
    
}

export default GroupChat;