import * as GroupChat from '../services/GroupChat.js';



export async function postMessage(io, group_id, sender, content, type = 'text_message', additionalData = {}) {
    try {
        const savedMessage = await GroupChat.postMessage(group_id, sender, content, type, additionalData);
        io.to(group_id).emit('chatMessage', savedMessage);
    } catch (error) {
        console.error('Error storing or emitting message:', error.message);

        // Optionally, send an error event back to the sender
        io.to(group_id).emit('error', {
            success: false,
            message: error.message || 'Failed to send message',
        });
    }
}

export async function postDiscussion(io, group_id, sender, content, topic, discussionStatus) {
    try {
        const savedDiscussion = await GroupChat.postDiscussion(group_id, sender, content, topic, discussionStatus);
        io.to(group_id).emit('chatMessage', savedDiscussion);
    } catch (error) {
        console.error('Error storing or emitting discussion:', error.message);
        
        io.to(group_id).emit('error', {
            success: false,
            message: error.message || 'Failed to post discussion',
        });
    }
}

export async function postFile(io, group_id, sender, content, file_id) {
    try {
        const savedMessage = await GroupChat.postMessage(group_id, sender, content, 'files', { file_id });
        io.to(group_id).emit('chatMessage', savedMessage);
    } catch (error) {
        console.error('Error storing or emitting message:', error.message);

        // Optionally, send an error event back to the sender
        io.to(group_id).emit('error', {
            success: false,
            message: error.message || 'Failed to send message',
        });
    }
}


