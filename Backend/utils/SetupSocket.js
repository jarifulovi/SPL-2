import NotificationClass from "../classes/Notification.js";
import GroupMembers from "../classes/GroupMembers.js";

import ChatUtils from "./ChatUtils.js";
import NotificationUtils from "./NotificationUtils.js";
import GroupMemberUtils from "./GroupMemberUtils.js";

const userSocketMap = new Map(); // A Map to store user_id to socket_id mapping


const SetupSocket = (io) => {

    console.log('Socket.IO server started');

    io.on('connection', (socket) => {
        console.log('User has logged in');

        socket.on('connectGroup', async (user_id) => {
            console.log('A user connected:', socket.id);
            userSocketMap.set(user_id, socket.id);         
            await GroupMemberUtils.connectUserToGroups(user_id, socket);
        });
  
  
        socket.on('chatMessage', async (group_id, sender, content, type) => {
            await ChatUtils.postMessage(io, group_id, sender, content, type);
        });
  
        // New discussion thread handling
        socket.on('newDiscussion', async (group_id, sender, discussion_topic) => {

            const content = `${sender} started a discussion on ${discussion_topic}`;
            await ChatUtils.postDiscussion(io, group_id, sender, content, discussion_topic, 'open');
                     
            const memberIds = await GroupMemberUtils.retrieveGroupMemberIds(group_id);
            const notificationContent =  `${sender} started a discussion ${discussion_topic} in ${group_id}`;
            await NotificationUtils.storeAndEmitDiscussionNotif(io, memberIds, sender, group_id, discussion_topic, notificationContent);
        });

        // Closing discussion handling
        socket.on('closeDiscussion', async (group_id, sender, discussionTopic) => {
            const content = "Discussion on " + discussionTopic + " has been closed";
            await ChatUtils.postDiscussion(io, group_id, sender, content, discussionTopic, 'closed');
        });

        // When a file is uploaded in a group, notify the user
        // File has file metadata
        socket.on('fileUploaded', async (group_id, sender, file) => {
            // Store file metadata in the database
            // If the file is successfully stored, emit the file
            // Issue : Doesn't handle file upload in storage
            io.to(group_id).emit('fileUploaded', file);
            
            const memberIds = await GroupMemberUtils.retrieveGroupMemberIds(group_id);
            const notificationContent = `${sender} shared a file ${file.name} in ${group_id}`;
            await NotificationUtils.storeAndEmitFileUploadNotif(io, memberIds, sender, group_id, notificationContent, file.name);
        });

        // Video conference start
        socket.on('videoConferenceStart', async (group_id, sender) => {
            
            const content = `${sender} started a video conference`;
            await ChatUtils.postMessage(io, group_id, sender, content, 'video_conferencing');

           
            const memberIds = await GroupMemberUtils.retrieveGroupMemberIds(group_id);
            const notificationContent = `${sender} started a video conference in ${group_id}`;
            await NotificationUtils.storeAndEmitVideoConferenceNotif(io, memberIds, sender, group_id, notificationContent);
                
        });

    

        // When a new member joins the group
        // Only joined user gets notification
        // Retrieve group name if needed 
        socket.on('groupJoin', async (user_id, group_id, role) => {

            try {
                const groupMember = new GroupMembers(group_id);
                await groupMember.joinMember(user_id,role);


                const content = `${user_id} has joined the group`;
                await ChatUtils.postMessage(io, group_id, user_id, content, 'join_group');
                

                const socket_id = userSocketMap.get(user_id);
                const notificationContent = `You successfully joined the ${group_id}`;
                await NotificationUtils.storeAndEmitNotification(io, user_id, socket_id, 'join_group', '', group_id, notificationContent);
            } catch (error) {
                console.error('Error: ', error.message);
            }
            
        });

        // UserId : Admin who receives the request
        // SenderId : User who sends the request
        socket.on('groupJoinRequest', async (user_id, group_id, sender) => {
            // Retrieve group name if needed
            const content = `${sender} requested to join the ${group_id}`;
            const socket_id = userSocketMap.get(user_id);
            await NotificationUtils.storeAndEmitNotification(io, user_id, socket_id, 'join_request', sender, group_id, content);
            
        });

        // UserId : User who receives the invitation
        // SenderId : Admin who sends the invitation
        socket.on('groupInvite', async (user_id, group_id, sender) => {
            // Retrieve group name if needed
            try {
                const content = `${sender} invited you to join the group : ${group_id}`;
                const socket_id = userSocketMap.get(user_id);
                await NotificationUtils.storeAndEmitNotification(io, user_id, socket_id, 'invitation', sender, group_id, content);
                
            } catch (error) {
                socket.emit('errorNotification', { message: error.message });
            }
        });


        // When user logout from the page
        socket.on('disconnect', async () => {
            const user_id = [...userSocketMap].find(([key, value]) => value === socket.id)?.[0];
            console.log('User disconnected:', socket.id);

            if(user_id) {
                userSocketMap.delete(user_id);
                await GroupMemberUtils.disconnectUserFromGroups(user_id, socket);          
                console.log(`User ${user_id} has been removed from all groups.`);
            }
        });
    });
};

  

export default SetupSocket;