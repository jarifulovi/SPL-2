import Fetch from "../utils/Fetch";


const loadGroupDetails = async (user_id, group) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/loadGroupDetails', 'POST', { user_id, group_id: group.group_id, created_by: group.created_by });
};


export default {
    loadGroupDetails,
}