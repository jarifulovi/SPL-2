import User from '../models/User.js';
import Notification from '../models/Notification.js';

// Generic method to send a notification
export async function storeNotification(user_id, content, type, sender, group_id) {
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
            type: type,
            content: content,
            sender: sender,
            group_id: group_id,
        });

        const savedNotification = await newNotification.save();
        return savedNotification.notification_id;
        
    } catch (error) {
        console.log("Error sending notification: ", error);
        throw new Error(error.message || 'Unable to send notification');
    }
}

export async function deleteNotification(user_id, content, receive_date) {
    try {
        const receiveDateObj = new Date(receive_date); 

        const notification = await Notification.findOneAndDelete({
            user_id: user_id,
            content: content,
            receive_date: {
                $gte: new Date(receiveDateObj.getTime() - 100), 
                $lt: new Date(receiveDateObj.getTime() + 100)
            }
        });

        if (!notification) {
            throw new Error('Notification not found');
        }
    } catch (error) {
        console.log("Error deleting notification: ", error);
        throw new Error(error.message || 'Unable to delete notification');
    }
} 