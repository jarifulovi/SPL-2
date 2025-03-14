import Profile from "../models/Profile.js";
import * as UserService from "../services/UserService.js";


export async function getProfileById(user_id) {
    return await Profile.findOne({ user_id });
}

export async function getProfilesByIds(user_ids) {
    return await Profile.find({ user_id: { $in: user_ids } });
}

export async function isProfileExists(user_id) {
    return await Profile.exists({ user_id });
}

export function validateUpdateFields(updateFields) {
    if (Object.keys(updateFields).length === 0) {
        return false; // No fields to update
    }
    return true;
}

export async function createProfile(email) {
    try {
        // Retrieve the User document by email
        const user = await UserService.getUserByEmail(email);
        if (!user) {
            throw new Error("User does not exist. Cannot create profile.");
        }

        const user_id = user.user_id;

        
        if (await isProfileExists(user_id)) {
            throw new Error("Profile already exists for this user.");
        }

        // Create a new profile with default values
        const defaultProfileData = {
            user_id,
            is_visible: true,
        };

        const newProfile = new Profile(defaultProfileData);
        await newProfile.save();

        return newProfile;
    } catch (error) {
        throw new Error(error.message || "Error during profile creation");
    }
}

export async function updateProfile(profileData) {
    try {
        
        if (!(await isProfileExists(profileData.user_id))) {
            throw new Error("Profile does not exist. Cannot update.");
        }

        // Exclude `user_id` from update fields
        const { user_id, ...updateFields } = profileData;

        if (Object.keys(updateFields).length === 0) {
            throw new Error("No fields provided for update.");
        }

        // Update the profile
        const updatedProfile = await Profile.findOneAndUpdate(
            { user_id },
            { $set: updateFields },
            { new: true }
        );

        return updatedProfile;
    } catch (error) {
        throw new Error(error.message || "Error during profile update");
    }
}

export async function getProfileInfo(userId, currentUserId) {
    try {
        // Fetch the basic user details
        const user = await UserService.getUserById(userId);
        
        if (!user) {
            throw new Error("User not found");
        }
        const { user_id, name, email } = user;

        const profile = await Profile.findOne({ user_id });
        const isSameUser = user_id === currentUserId;

        // If not the same user, check if the profile is visible
        if (!isSameUser && profile && !profile.is_visible) {
            return { user_id, email, name, profile: null };
        }

        return { user_id, email, name, profile: profile ? profile.toObject() : null };
    } catch (error) {
        throw new Error(error.message || "Error fetching profile information");
    }
} 