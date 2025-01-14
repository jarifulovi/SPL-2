import User from "../models/User.js"
import Profile from "../models/Profile.js";

class ProfileClass {

    constructor(profileData) {
        this.profileData = profileData;
    }

    async isUserExist() {
        try {
            const user = await User.findOne({ user_id: this.profileData.user_id });
            return !!user; 
        } catch (error) {
            throw new Error("Error checking user existence");
        }
    }
    
    
    async isProfileExist() {
        try {
            return !!(await Profile.findOne({ user_id: this.profileData.user_id }));
        } catch (error) {
            throw new Error("Error checking profile existence");
        }
    }
    
    
}


export default ProfileClass;