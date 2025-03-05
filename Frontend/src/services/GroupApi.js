import Fetch from "../utils/Fetch";


const createGroup = async (groupData) => {
    const formData = new FormData();
    for (const key in groupData) {
        formData.append(key, groupData[key]);
    }
    return await Fetch.fetchFormData(Fetch.baseUrl + '/createGroup', 'POST', formData);
};


const retrieveGroupInfo = async (group_id) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/retrieveGroupInfo', 'POST', { group_id });
};


const updateGroupInfo = async (groupData) => {
    const formData = new FormData();
    for (const key in groupData) {
        formData.append(key, groupData[key]);
    }
    return await Fetch.fetchFormData(Fetch.baseUrl + '/updateGroup', 'POST', formData);
};


const removeGroup = async (group_id) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/removeGroup', 'POST', { group_id });
}




export default {
    createGroup,
    retrieveGroupInfo,
    updateGroupInfo,
    removeGroup
}