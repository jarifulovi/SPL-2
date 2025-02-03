import express from 'express';
import Notification from '../models/Notification.js';
import NotificationClass from '../classes/Notification.js';
import RouterUtils from '../utils/RouterUtils.js';

const router = express.Router();


const getNotificationClass = () => {
    
    return new NotificationClass('', '', '');
};


router.post('/fetchNotification', async (req, res) => {
   
    const { user_id } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        Notification.find({ user_id })
        .sort({ receive_date: -1 }) 
        .limit(20) 
        .exec()
    );
});


router.post('/deleteNotification', async (req, res) => {
    
    const { user_id, content, receive_date } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        getNotificationClass().deleteNotification(user_id, content, receive_date)
    );
});



export default router;