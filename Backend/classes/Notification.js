import User from '../models/User.js';
import Notification from '../models/Notification.js';

class NotificationClass {

    constructor(type, sender, group_id) {
        this.type = type;
        this.sender = sender;
        this.group_id = group_id;
    }

    // Generic method to send a notification
    async storeNotification(user_id, data = {}) {

        
        let content = this.findContent(data);

        try {
            if(!user_id){
                throw new Error('User Id is not defined');
            }
            const existingUser = await User.findOne({ user_id });
            if (!existingUser) {
                throw new Error('User does not exist');
            }

            const newNotification = new Notification({
                user_id: user_id,
                type: this.type,
                content: content,
                sender: this.sender,
                group_id: this.group_id,
                receive_date: new Date()
            });

            const savedNotification = await newNotification.save();
            return savedNotification.notification_id;
            
        } catch (error) {
            console.log("Error sending notification: ", error);
            throw new Error(error.message || 'Unable to send notification');
        }
    }

    async deleteNotification(user_id, content, receive_date) {

        
        try {
            const notification = await Notification.findOneAndDelete({
                user_id: user_id,
                content: content,
                receive_date: receive_date
            });

            if (!notification) {
                throw new Error('Notification not found');
            }
        } catch (error) {
            console.log("Error deleting notification: ", error);
            throw new Error(error.message || 'Unable to delete notification');
        }
    }


    findContent(data) {

        let content = '';
        if (this.type === 'invitation') content = this.sendGroupInviteNotification(data);
        else if (this.type === 'discussion_topic') content = this.sendDiscussionNotification(data);
        else if (this.type === 'join_request') content = this.sendGroupJoinRequestNotification(data);
        else if (this.type === 'join_group') content = this.sendGroupJoinNotification(data);
        else if (this.type === 'file_shared') content = this.sendFileSharedNotification(data);
        else if (this.type === 'video_conferencing') content = this.sendVideoConferencingNotification(data);
        else throw new Error('Invalid notification type');

        return content;
    }
    
    sendGroupJoinNotification(data) {
        const { group_name = "" } = data;
        return `You successfully joined the ${group_name || this.group_id}`;
    }

    sendGroupJoinRequestNotification(data) {
        const { group_name = "", sender_name = "" } = data;
        return `${sender_name || this.sender} requested to join the ${group_name || this.group_id}`;
    }

    sendGroupInviteNotification(data) {
        const { group_name = "", sender_name = "" } = data;
        return `${sender_name || this.sender} invited you to join the ${group_name || this.group_id}`;
    }

    sendDiscussionNotification(data) {
        const { discussion_topic = "", group_name = "", sender_name = "" } = data;
        return `${sender_name || this.sender} started a discussion "${discussion_topic}" in ${group_name || this.group_id}`;
    }

    sendFileSharedNotification(data) {
        const { file_name = "", group_name = "", sender_name = "" } = data;
        return `${sender_name || this.sender} shared a file "${file_name}" in ${group_name || this.group_id}`;
    }

    sendVideoConferencingNotification(data) {
        const { group_name = "", sender_name = "" } = data;
        return `${sender_name || this.sender} started a video conference in ${group_name || this.group_id}`; 
    }
}

export default NotificationClass;
