import Fetch from "../utils/Fetch";

const getOwnProfileData = async (user_id) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/getProfileInfo', 'POST', {userId : user_id, currentUserId: user_id });
};

const getOthersProfileData = async (user_id,currentUserId) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/getProfileInfo', 'POST', {userId : user_id, currentUserId });
};


const updateProfile = async (profileData) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/updateProfile', 'PUT', profileData);
};

export default {
    getOwnProfileData,
    getOthersProfileData,
    updateProfile
}
