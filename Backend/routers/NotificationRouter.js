import express from 'express';
import Notification from '../models/Notification.js';
import NotificationClass from '../classes/Notification.js';

const router = express.Router();


router.post('/fetchNotification', async (req, res) => {
    try {
        // Fetch all notifications for the user
        const { user_id } = req.body;
        const notifications = await Notification.find({ user_id })
            .sort({ createdAt: -1 }) 
            .limit(20) 
            .exec();

        res.status(200).json({
            success: true,
            message: 'Notifications fetched successfully',
            data: notifications
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch notifications'
        });
    }

});


router.post('/deleteNotification', async (req, res) => {
    try {
        const { user_id, content, receive_date } = req.body;
        const notification = new NotificationClass('', '', '');
        await notification.deleteNotification(user_id,content,receive_date);
        res.status(200).json({
            success: true,
            message: 'Notification deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/acceptInvitation', async (req, res) => {
    // Receiver joins the group
    // Delete the notification
});

router.post('/acceptJoinRequest', async (req, res) => {
    // Sender joins the group
    // Delete the notification
});


export default router;