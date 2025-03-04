import Fetch from "../utils/Fetch";


const loadGroupDetails = async (user_id, group) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/loadGroupDetails', 'POST', { user_id, group });
};


export default {
    loadGroupDetails,
}