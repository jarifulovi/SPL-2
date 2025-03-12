import * as GroupMembers from "../classes/GroupMembers.js";

async function retrieveGroupMemberIds(group_id) {
    try {
        const members = await GroupMembers.retrieveAllGroupMembers(group_id);
        const memberIds = members.map(member => member.user_id);

        return memberIds;
    } catch (error) {
        console.error('Error retrieving group member ids : ',error.message);
    }
}

async function connectUserToGroups(user_id, socket) {
    try {
        const groups = await GroupMembers.getAllGroupsOfMember(user_id);
        
        if (!groups || groups.length === 0) {
            //console.log(`User ${user_id} is not part of any groups.`);
            return;
        }

        let groupIds = groups.map(group => group.group_id);

        groupIds.forEach(groupId => {
            socket.join(groupId);
            //console.log(`User ${user_id} connected to group: ${groupId}`);
        });

    } catch (error) {
        console.error(`Error connecting user ${user_id} to groups:`, error.message);
    }
}

async function disconnectUserFromGroups(user_id, socket) {
    try {
        // Retrieve the groups for the user from the database
        const groups = await GroupMembers.getAllGroupsOfMember(user_id);
        
        if (!groups || groups.length === 0) {
            //console.log(`User ${user_id} is not part of any groups.`);
            return; // No groups to leave
        }

        let groupIds = groups.map(group => group.group_id);

        groupIds.forEach(groupId => {
            socket.leave(groupId);
            //console.log(`User ${user_id} disconnected from group: ${groupId}`);
        });

    } catch (error) {
        console.error(`Error disconnecting user ${user_id} from groups:`, error.message);
    }
}

export default {
    retrieveGroupMemberIds,
    connectUserToGroups,
    disconnectUserFromGroups,
};