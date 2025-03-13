import * as NotificationService from "../classes/NotificationService.js";


async function storeNotification(io, members, notificationType, sender, group_id, content) {
    try {
        await Promise.all(
            members.map(memberId => NotificationService.storeNotification(memberId, content, notificationType, sender, group_id))
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

export async function storeAndEmitNotifToUser(io, user_id, socket_id, notificationType, sender, group_id, content) {
    try {
        const storedNotificationId = await NotificationService.storeNotification(user_id, content, notificationType, sender, group_id);
        
        if (socket_id) {
            io.to(socket_id).emit('notification', {
                content: content,
                type: notificationType,
                group_id: group_id,
                sender: sender,
                receive_date: new Date(),
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

export function storeAndEmitDiscussionNotif(io, members, sender, group_id, content) {
    return storeNotification(io, members, 'discussion_topic', sender, group_id, content);
}

export function storeAndEmitVideoConferenceNotif(io, members, sender, group_id, content) {
    return storeNotification(io, members, 'video_conferencing', sender, group_id, content);
}

export function storeAndEmitFileUploadNotif(io, members, sender, group_id, content) {
    return storeNotification(io, members, 'file_shared', sender, group_id, content);
}

export const storeAndEmitNotification = storeAndEmitNotifToUser;
