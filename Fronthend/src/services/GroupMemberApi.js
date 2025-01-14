import Fetch from "../utils/Fetch";


const addMember = async (user_id, group_id) => {
    return await Fetch.fetchData('http://localhost:3000/addMember', 'POST', {user_id, group_id, role: 'member'});
}


const addAdmin = async (user_id, group_id) => {
    return await Fetch.fetchData('http://localhost:3000/addAdmin', 'POST', {user_id, group_id, role: 'admin'});
}

const removeMember = async (user_id, group_id) => {
    return await Fetch.fetchData('http://localhost:3000/removeMember', 'POST', {user_id, group_id});
}

const getAllGroupMembers = async (group_id) => {
    return await Fetch.fetchData('http://localhost:3000/getAllGroupMembers', 'POST', {group_id});
}

const getAllGroupsOfMember = async (user_id) => {
    return await Fetch.fetchData('http://localhost:3000/getAllGroupsOfMember','POST', {user_id});
}

const getAllGroupAdmins = async (group_id) => {
    return await Fetch.fetchData('http://localhost:3000/getAllGroupAdmins', 'POST', {group_id});
}

const updateMemberRole = async (user_id, group_id, role) => {
    return await Fetch.fetchData('http://localhost:3000/updateMemberRole', 'POST', {user_id, group_id, role});
}

export default {
    addMember,
    addAdmin,
    removeMember,
    getAllGroupMembers,
    getAllGroupsOfMember,
    getAllGroupAdmins,
    updateMemberRole
}



