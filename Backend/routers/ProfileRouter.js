import express from 'express';
import multer from 'multer';
import * as Sanitizer from '../utils/Sanitizer.js';
import * as ProfileService from '../services/ProfileService.js';
import RouterUtils from '../utils/RouterUtils.js';
import { v4 as uuidv4 } from 'uuid';

import FileUtils from '../utils/FileUtils.js';

const router = express.Router();

// add image file validation
const upload = multer({ storage: multer.memoryStorage() });

// not complete
// need to pass individual fields instead of object
router.put(
    '/updateProfile', 
    upload.single("profile_picture"), 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
        const profileData = req.body;
        const file = req.file;
   
        if (file) {
            try {
                const fileKey = `profile-pictures/${uuidv4()}-${file.originalname}`;
                const uploadResult = await FileUtils.generateProfilePicUploadUrl(file, fileKey);
                profileData.profile_picture = uploadResult.publicUrl;
                
            } catch (error) {
                console.log('error', error);
                return res.status(400).json({
                    success: false,
                    message: 'Failed to upload profile picture.',
                    error: error.message,
                });
            }
        }

        await RouterUtils.handleBasicRequest(req, res, async () => {
            return ProfileService.updateProfile(profileData);
        }, 'Update profile', 'Profile updated successfully');
    }
);


router.post(
    '/getProfileInfo', 
    [Sanitizer.validateId('user_id'), Sanitizer.validateId('currentUserId')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
        const { user_id, currentUserId } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return ProfileService.getProfileInfo(user_id, currentUserId);
        }, 'Get profile info', 'Profile info retrieved successfully');
    }
);

router.post(
    '/getProfile', 
    [Sanitizer.validateId('user_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
        const { user_id } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return ProfileService.getProfile(user_id);
        }, 'Get profile', 'Profile retrieved successfully');
    }
);

router.post(
    '/updateProfile', 
    [Sanitizer.validateId('user_id'), Sanitizer.validateContent('name', 0, 50, true),
        Sanitizer.validateContent('bio', 0, 500, false), Sanitizer.validateEmail], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
        const { user_id, name, bio, email } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return ProfileService.updateProfile(user_id, name, bio, email);
        }, 'Update profile', 'Profile updated successfully');
    }
);

router.post(
    '/updateProfilePicture', 
    [Sanitizer.validateId('user_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
        const { user_id } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return ProfileService.updateProfilePicture(user_id, req.file);
        }, 'Update profile picture', 'Profile picture updated successfully');
    }
);

router.post(
    '/deleteProfile', 
    [Sanitizer.validateId('user_id')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
        const { user_id } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return ProfileService.deleteProfile(user_id);
        }, 'Delete profile', 'Profile deleted successfully');
    }
);

export default router;
