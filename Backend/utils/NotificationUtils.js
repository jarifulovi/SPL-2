import NotificationClass from "../classes/Notification.js";


async function storeNotification(io, members, notificationType, sender, group_id, content) {
    try {
        
        const notification = new NotificationClass(notificationType, sender, group_id);
        await Promise.all(
            members.map(memberId => notification.storeNotification(memberId, content))
        );

        
        io.to(group_id).emit('notification', {
            content: content,
            type: notificationType,
            receive_date: new Date()
        });

        console.log(`${notificationType} notification sent to all members.`);
    } catch (error) {
        console.error(`Error sending ${notificationType} notification:`, error.message);
    }
}

async function storeAndEmitNotifToUser(io, user_id, socket_id, notificationType, sender, group_id, content) {
    try {
       
        const notification = new NotificationClass(notificationType, sender, group_id);
        const storedNotification = await notification.storeNotification(user_id, content);
        
        if (socket_id) {
            io.to(socket_id).emit('notification', {
                content: content,
                type: notificationType,
                group_id: group_id,
                sender: sender,
                receive_date: storedNotification.receive_date || new Date(),
            });
        } else {
            console.warn(`No active socket found for userId: ${user_id}`);
        }

        console.log(`${notificationType} notification sent to userId: ${user_id}`);
    } catch (error) {
        console.error(`Error sending ${notificationType} notification to userId: ${user_id}`, error.message);
        throw new Error(error.message);
    }
}

export default {
    
    storeAndEmitDiscussionNotif: (io, members, sender, group_id, content) => {
        return storeNotification(io, members, 'discussion_topic', sender, group_id, content);
    },

    storeAndEmitVideoConferenceNotif: (io, members, sender, group_id, content) => {
        return storeNotification(io, members, 'video_conferencing', sender, group_id, content);
    },

    storeAndEmitFileUploadNotif: (io, members, sender, group_id, content) => {
        return storeNotification(io, members, 'file_shared', sender, group_id, content);
    },
    storeAndEmitNotification: storeAndEmitNotifToUser,
};
