import Fetch from "../utils/Fetch";

const retrieveAllChats = async (group_id) => {
    return await Fetch.fetchData('http://localhost:3000/retrieveAllChats','POST', { group_id });
};

const retrieveLatestChats = async (group_id) => {
    return await Fetch.fetchData('http://localhost:3000/retrieveLatestChats','POST', { group_id });
};

const retrieveAllDiscussions = async (group_id) => {
    return await Fetch.fetchData('http://localhost:3000/retrieveAllDiscussions','POST', { group_id });
};

const checkDiscussion = async (group_id, content) => {
    return await Fetch.fetchData('http://localhost:3000/checkDiscussion','POST', { group_id, content });
};


export default {
    retrieveAllChats,
    retrieveLatestChats,
    retrieveAllDiscussions,
    checkDiscussion,
}