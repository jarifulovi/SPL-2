import express from 'express';
import GroupMember from '../classes/GroupMembers.js';
import Group from '../models/Group.js';
import User from '../models/User.js';

const router = express.Router();


// Needs: creator name, group members, isCurrentUser a member
router.post('/loadGroupDetails', async (req, res) => {
    try {
        const { user_id, group } = req.body;
        if (!user_id || !group) {
            throw new Error('User_id or group_id not provided');
        }
        
        const groupMember = new GroupMember(group.group_id);
        const isMember = await groupMember.isMemberOfGroup(user_id);
        const groupMembers = await groupMember.retrieveAllGroupMembers();
        const creator = await User.findOne({ user_id: group.created_by });
        if (!creator) {
            return res.status(404).json({
                success: false,
                message: 'Group creator not found',
            });
        }


        const data = {
            isMember,
            groupMembers,
            creator_name: creator.name,
        };

        res.status(200).json({
            success: true,
            message: 'Group details data loaded successfully',
            data: data,
        });
    } catch (error) {
        console.error('Error during loading groupDetails data:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;