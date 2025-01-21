import GroupChat from '../classes/GroupChat.js';

async function postMessage(io, group_id, sender, content, type = 'text_message') {
    try {
        
        const groupChat = new GroupChat(group_id);
        const savedMessage = await groupChat.postMessage(sender, content, type);

        io.to(group_id).emit('chatMessage', savedMessage);

    } catch (error) {
        console.error('Error storing or emitting message:', error.message);

        // Optionally, send an error event back to the sender
        socket.emit('error', {
            success: false,
            message: error.message || 'Failed to send message',
        });
    }
}

async function postDiscussion(io, group_id, sender, content, topic, discussionStatus) {
    try {
        
        const groupChat = new GroupChat(group_id);
        const savedDiscussion = await groupChat.postDiscussion(sender, content, topic, discussionStatus);

       
        io.to(group_id).emit('chatMessage', savedDiscussion);

    } catch (error) {
        console.error('Error storing or emitting discussion:', error.message);

        
        io.to(group_id).emit('error', {
            success: false,
            message: error.message || 'Failed to post discussion',
        });
    }
}



export default {
    postMessage,
    postDiscussion,
}

