import User from '../models/User.js';
import Notification from '../models/Notification.js';

class NotificationClass {

    constructor(type, sender, group_id) {
        this.type = type;
        this.sender = sender;
        this.group_id = group_id;
    }

    // Generic method to send a notification
    async storeNotification(user_id, content) {


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

}

export default NotificationClass;
