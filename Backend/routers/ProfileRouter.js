import express from 'express';
import UserProfileService from '../classes/UserProfileService.js';


const router = express.Router();


router.put('/updateProfile', async (req, res) => {
    
    const profileData = req.body;
    const profileServce = new UserProfileService();

    try {
        await profileServce.createOrUpdateProfile(profileData);
        res.status(201).json({
            success: true,
            message: 'Profile updated successfully',
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'An error occurred during updating profile'
        });
    }
});


router.post('/getProfileInfo', async (req, res) => {

    const { userId, currentUserId } = req.body;
    const profileService = new UserProfileService();
    
    try {
        const data = await profileService.getProfileInfo(userId,currentUserId);
        res.status(201).json({
            success: true,
            message: 'Profile retrieved successfully',
            data: data
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'An error occurred during retrieving profile'
        });
    }
});


export default router;
