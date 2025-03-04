import Fetch from "../utils/Fetch";


const createGroup = async (formData) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/createGroup', 'POST', formData);
};


const retrieveGroupInfo = async (group_id) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/retrieveGroupInfo', 'POST', { group_id });
};


const updateGroupInfo = async (formData) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/updateGroup', 'POST', formData);
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