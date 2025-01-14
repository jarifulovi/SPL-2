import User from "../models/User.js";
import Profile from "../models/Profile.js";
import ProfileClass from "./ProfileClass.js";

class UserProfileService {

    constructor() {

    }


    async createOrUpdateProfile(profileData) {
        const profileClass = new ProfileClass(profileData);
    
        try {
            const userExists = await profileClass.isUserExist();
            if (!userExists) {
                throw new Error("User does not exist. Cannot create or update profile.");
            }
    
            const isProfileExist = await profileClass.isProfileExist();
    
            if (isProfileExist) {
                // Update the existing profile
                const updatedProfile = await Profile.findOneAndUpdate(
                    { user_id: profileData.user_id },
                    { $set: profileData },
                    { new: true }
                );
                return updatedProfile;
            } else {
                // Create a new profile
                const newProfile = new Profile(profileData);
                await newProfile.save();
                return newProfile;
            }
        } catch (error) {
            throw new Error(error.message || "Error during creating or updating profile");
        }
    }
    

    async getProfileInfo(userId, currentUserId) {
        
        try {
            // Fetch the basic user details
            const user = await User.findOne({ user_id: userId }, { user_id: 1, name: 1, email: 1 });
            
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
    
    

}


export default UserProfileService;