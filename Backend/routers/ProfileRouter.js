import express from 'express';
import multer from 'multer';
import * as ProfileService from '../classes/ProfileService.js';
import RouterUtils from '../utils/RouterUtils.js';
import { v4 as uuidv4 } from 'uuid';

import FileUtils from '../utils/FileUtils.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.put('/updateProfile', upload.single("profile_picture"), async (req, res) => {
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

    await RouterUtils.handleBasicRequest(req, res, async () => 
        await ProfileService.updateProfile(profileData)
    );
});

router.post('/getProfileInfo', async (req, res) => {
    const { userId, currentUserId } = req.body;
    RouterUtils.handleBasicRequest(req, res, () => 
        ProfileService.getProfileInfo(userId, currentUserId)
    );
});

export default router;
