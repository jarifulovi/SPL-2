import Fetch from "../utils/Fetch";


const createGroup = async (formData) => {
    return await Fetch.fetchData('http://localhost:3000/createGroup', 'POST', formData);
};


const retrieveGroupInfo = async (group_id) => {
    return await Fetch.fetchData('http://localhost:3000/retrieveGroupInfo', 'POST', { group_id });
};


const updateGroupInfo = async (formData) => {
    return await Fetch.fetchData('http://localhost:3000/updateGroup', 'POST', formData);
};


const removeGroup = async (group_id) => {
    return await Fetch.fetchData('http://localhost:3000/removeGroup', 'POST', { group_id });
}




export default {
    createGroup,
    retrieveGroupInfo,
    updateGroupInfo,
    removeGroup
}