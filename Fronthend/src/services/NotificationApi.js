import Fetch from "../utils/Fetch";

// Need to fetch user_id first
const fetchNotifications = async (user_id) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/fetchNotification', 'POST', { user_id });
}
    

const deleteNotification = async (user_id, content, receive_date) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/deleteNotification', 'POST', { user_id, content, receive_date });
}

const acceptInvitation = async (user_id, notificationId) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/acceptInvitation', 'POST', { user_id, notificationId });
}

const acceptJoinRequest = async (user_id, notificationId) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/acceptJoinRequest', 'POST', { user_id, notificationId });
}


export default { 
    fetchNotifications, 
    deleteNotification, 
    acceptInvitation, 
    acceptJoinRequest 
};