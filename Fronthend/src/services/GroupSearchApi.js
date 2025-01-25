import Fetch from "../utils/Fetch";


const retrieveAllGroups = async () => {
    return await Fetch.fetchData(Fetch.baseUrl + '/retrieveAllGroups', 'POST');
};


const searchGroups = async (formData) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/searchGroup', 'POST', 
        { 
            type: formData.type, 
            topics: formData.topics, 
            group_size: formData.memberSize, 
            group_name: formData.groupName 
        });
}


export default {
    retrieveAllGroups,
    searchGroups,
}