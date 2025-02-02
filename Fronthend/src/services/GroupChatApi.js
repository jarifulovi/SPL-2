import Fetch from "../utils/Fetch";

const retrieveAllChats = async (group_id) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/retrieveAllChats','POST', { group_id });
};

const retrieveLatestChats = async (group_id) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/retrieveLatestChats','POST', { group_id });
};

const retrieveAllDiscussions = async (group_id) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/retrieveAllDiscussions','POST', { group_id });
};

const checkDiscussion = async (group_id, content) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/checkDiscussion','POST', { group_id, content });
};


export default {
    retrieveAllChats,
    retrieveLatestChats,
    retrieveAllDiscussions,
    checkDiscussion,
}