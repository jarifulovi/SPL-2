import mongoose from "mongoose";
import User from "../models/User.js";
import StudyGroup from "../models/Group.js";
import UserGroup from "../models/UserGroup.js";
import Chat from "../models/Chat.js";

export async function createGroup(group_name, group_description, group_status, type, topics, group_image, created_by) {
    const creator = await User.findOne({ user_id: created_by });
    if(!creator) {
        throw new Error('User not found');
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const newGroup = new StudyGroup({
            group_name: group_name,
            group_description: group_description,
            group_status: group_status,
            type: type,
            topics: topics,
            group_image: group_image,
            created_by: created_by
        });

        const newUserGroup = new UserGroup({
            user_id: created_by,
            group_id: newGroup.group_id,
            role: 'admin'
        });

        
        const savedGroup = await newGroup.save({ session });
        await newUserGroup.save({ session });

        // Commit the transaction after saving
        await session.commitTransaction();
        session.endSession();

        return savedGroup;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log('Error during creating group:', error.message);
        throw new Error(error.message || 'Error during creating group');
    }
}

export async function retrieveGroupInfo(group_id) {
    try {
        const group = await 
            StudyGroup.findOne({ group_id: group_id });

        if (!group) {
            throw new Error('Group not found');
        }
        return group;
    } catch (error) {
        
        throw new Error(error.message || 'Error during fetching group');
    }
}

export async function updateGroup(group_name, group_description, group_status, type, topics, group_image, group_id) {
    try {
        const group = await StudyGroup.findOneAndUpdate(
            { group_id: group_id },
            { 
                group_name : group_name,
                group_description : group_description, 
                group_status : group_status,
                type: type,
                topics: topics,
                group_image : group_image
            },
            { new: true }
        );

        if (!group) {
            throw new Error('Group not found');
        }
        return group;
    } catch (error) {
        throw new Error(error.message || 'Error during updating group');
    }
}

export async function removeGroup(group_id) {
    
    if (!group_id) {
        throw new Error('Group ID is required');
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const group = await StudyGroup.findOneAndDelete({ group_id: group_id }, { session });
        const userGroup = await UserGroup.deleteMany({ group_id: group_id } , { session });
        const chats = await Chat.deleteMany({ group_id: group_id }, { session });
        if (!group) {
            throw new Error('Group not found');
        }

        await session.commitTransaction();
        session.endSession();
        return group;
    } catch (error) {

        await session.abortTransaction();
        session.endSession();
        throw new Error(error.message || 'Error during removing group');
    }
}

// Default export for backward compatibility
export default {
    createGroup,
    retrieveGroupInfo,
    updateGroup,
    removeGroup
}; 