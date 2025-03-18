import Fetch from "../utils/Fetch";


const isMember = async (user_id, group_id) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/isMember', 'POST', { user_id, group_id});
}

const isAdmin = async (user_id, group_id) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/isAdmin', 'POST', {user_id, group_id});
}

const addMember = async (user_id, group_id) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/addMember', 'POST', {user_id, group_id, role: 'member'});
}

const addAdmin = async (user_id, group_id) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/addAdmin', 'POST', {user_id, group_id, role: 'admin'});
}

const removeMember = async (user_id, group_id) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/removeMember', 'POST', {user_id, group_id});
}

const getAllGroupMembers = async (group_id) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/getAllGroupMembers', 'POST', {group_id});
}

const getAllGroupsOfMember = async (user_id) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/getAllGroupsOfMember','POST', {user_id});
}

const getAllGroupAdmins = async (group_id) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/getAllGroupAdmins', 'POST', {group_id});
}

const getUserRole = async (user_id, group_id) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/getUserRole','POST', {user_id, group_id});
}

const updateMemberRole = async (user_id, group_id, role) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/updateMemberRole', 'POST', {user_id, group_id, role});
}

export default {
    isMember,
    isAdmin,
    addMember,
    addAdmin,
    removeMember,
    getAllGroupMembers,
    getAllGroupsOfMember,
    getAllGroupAdmins,
    getUserRole,
    updateMemberRole
}



