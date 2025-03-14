import express from 'express';
import * as Sanitizer from '../utils/Sanitizer.js';
import Notification from '../models/Notification.js';
import * as NotificationService from '../services/NotificationService.js';
import RouterUtils from '../utils/RouterUtils.js';

const router = express.Router();





router.post(
    '/fetchNotification', 
    [Sanitizer.validateId('user_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {

    const { user_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        Notification.find({ user_id })
        .sort({ receive_date: -1 }) 
        .limit(20) 
        .exec()
    );
});


router.post(
    '/deleteNotification', 
    [Sanitizer.validateId('user_id'), Sanitizer.validateContent('content'), Sanitizer.validateDate('receive_date')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    
    const { user_id, content, receive_date } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        NotificationService.deleteNotification(user_id, content, receive_date)
    );
});



export default router;