import Fetch from "../utils/Fetch";

const getOwnProfileData = async (user_id) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/getProfileInfo', 'POST', { user_id, currentUserId: user_id });
};

const getOthersProfileData = async (user_id,currentUserId) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/getProfileInfo', 'POST', { user_id, currentUserId });
};


const updateProfile = async (profileData) => {
    const formData = new FormData();
    for (const key in profileData) {
        formData.append(key, profileData[key]);
    }

    return await Fetch.fetchFormData(Fetch.baseUrl + '/updateProfile', 'PUT', formData);
};

export default {
    getOwnProfileData,
    getOthersProfileData,
    updateProfile
}
