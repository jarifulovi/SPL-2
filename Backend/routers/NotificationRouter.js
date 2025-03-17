import express from 'express';
import * as Sanitizer from '../utils/Sanitizer.js';
import Notification from '../models/Notification.js';
import * as NotificationService from '../services/NotificationService.js';
import RouterUtils from '../utils/RouterUtils.js';

const router = express.Router();





router.post(
    '/fetchNotification', 
    [Sanitizer.validateId('user_id')], 
    Sanitizer.handleValidationErrors('fetchNotification'),
    async (req, res) => {

    const { user_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => {
        return Notification.find({ user_id })
        .sort({ receive_date: -1 }) 
        .limit(20) 
        .exec();
    }, 'Fetch notifications', 'Notifications fetched successfully');
});


router.post(
    '/deleteNotification', 
    [Sanitizer.validateId('user_id'), Sanitizer.validateContent('content'), Sanitizer.validateDate('receive_date')], 
    Sanitizer.handleValidationErrors('deleteNotification'),
    async (req, res) => {
    
    const { user_id, content, receive_date } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => {
        return NotificationService.deleteNotification(user_id, content, receive_date);
    }, 'Delete notification', 'Notification deleted successfully');
});



export default router;