import Fetch from "../utils/Fetch";

// Need to fetch user_id first
const fetchNotifications = async (user_id) => {
    return await Fetch.fetchData('http://localhost:3000/fetchNotification', 'POST', { user_id });
}
    

const deleteNotification = async (user_id, notificationId) => {
    return await Fetch.fetchData('http://localhost:3000/deleteNotification', 'POST', { user_id, notificationId });
}

const acceptInvitation = async (user_id, notificationId) => {
    return await Fetch.fetchData('http://localhost:3000/acceptInvitation', 'POST', { user_id, notificationId });
}

const acceptJoinRequest = async (user_id, notificationId) => {
    return await Fetch.fetchData('http://localhost:3000/acceptJoinRequest', 'POST', { user_id, notificationId });
}


export default { 
    fetchNotifications, 
    deleteNotification, 
    acceptInvitation, 
    acceptJoinRequest 
};