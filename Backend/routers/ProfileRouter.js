import express from 'express';
import UserProfileService from '../classes/UserProfileService.js';
import RouterUtils from '../utils/RouterUtils.js';


const router = express.Router();


router.put('/updateProfile', async (req, res) => {
    
    const profileData = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        new UserProfileService().updateProfile(profileData)
    );
});


router.post('/getProfileInfo', async (req, res) => {

    const { userId, currentUserId } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        new UserProfileService().getProfileInfo(userId, currentUserId)
    );
});


export default router;
