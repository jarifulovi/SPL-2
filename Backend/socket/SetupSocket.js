import * as GroupMembers from "../services/GroupMembers.js";

import * as ChatHandler from "./ChatHandler.js";
import * as NotificationHandler from "./NotificationHandler.js";
import * as GroupMemberHandler from "./GroupMemberHandler.js";
import * as SocketSanitizer from "../utils/SocketSanitizer.js";

const userSocketMap = new Map(); // A Map to store user_id to socket_id mapping


const SetupSocket = (io) => {

    console.log('Socket.IO server started');

    io.on('connection', (socket) => {
        //console.log('User has logged in');

        socket.on('connectGroup', async (user_id) => {
            const errors = SocketSanitizer.handleValidationErrors([
                { field: "user_id", value: user_id, validator: SocketSanitizer.validateId, message: "Invalid user ID" }
            ]);
            if (errors) {
                socket.emit('error', { success: false, message: 'Invalid input', errors });
                return;
            }
            //console.log('A user connected:', socket.id);
            userSocketMap.set(user_id, socket.id);         
            await GroupMemberHandler.connectUserToGroups(user_id, socket);
        });
  
  
        socket.on('chatMessage', async (group_id, sender, content, type = 'text_message') => {
            const errors = SocketSanitizer.handleValidationErrors([
                { field: "group_id", value: group_id, validator: SocketSanitizer.validateId, message: "Invalid group ID" },
                { field: "sender", value: sender, validator: SocketSanitizer.validateId, message: "Invalid sender ID" },
                { field: "content", value: content, validator: SocketSanitizer.validateContent, message: "Invalid content" },
                { field: "type", value: type, validator: SocketSanitizer.validateChatType, message: "Invalid chat type" }
            ]);
            if (errors) {
                socket.emit('error', { success: false, message: 'Invalid input', errors });
                return;
            }
            

            await ChatHandler.postMessage(io, group_id, sender, content, type);
        });
  
        // New discussion thread handling
        socket.on('newDiscussion', async (group_id, sender, sender_name, group_name, discussion_topic) => {
            const errors = SocketSanitizer.handleValidationErrors([
                { field: "group_id", value: group_id, validator: SocketSanitizer.validateId, message: "Invalid group ID" },
                { field: "sender", value: sender, validator: SocketSanitizer.validateId, message: "Invalid sender ID" },
                { field: "discussion_topic", value: discussion_topic, validator: SocketSanitizer.validateContent, message: "Invalid discussion topic" },
                { field: "sender_name", value: sender_name, validator: SocketSanitizer.validateName, message: "Invalid sender name" },
                { field: "group_name", value: group_name, validator: SocketSanitizer.validateName, message: "Invalid group name" }
            ]);
            if (errors) {
                socket.emit('error', { success: false, message: 'Invalid input', errors });
                return;
            }
            


            const content = `${sender} started a discussion on ${discussion_topic}`;
            await ChatHandler.postDiscussion(io, group_id, sender, content, discussion_topic, 'open');
                     
            const memberIds = await GroupMemberHandler.retrieveGroupMemberIds(group_id);
            const notificationContent =  `${sender_name} started a discussion ${discussion_topic} in ${group_name}`;
            await NotificationHandler.storeAndEmitDiscussionNotif(io, memberIds, sender, group_id, notificationContent);
        });

        // Closing discussion handling
        socket.on('closeDiscussion', async (group_id, sender, discussionTopic) => {
            const errors = SocketSanitizer.handleValidationErrors([
                { field: "group_id", value: group_id, validator: SocketSanitizer.validateId, message: "Invalid group ID" },
                { field: "sender", value: sender, validator: SocketSanitizer.validateId, message: "Invalid sender ID" },
                { field: "discussionTopic", value: discussionTopic, validator: SocketSanitizer.validateContent, message: "Invalid discussion topic" }
            ]);
            if (errors) {
                socket.emit('error', { success: false, message: 'Invalid input', errors });
                return;
            }
            
            const content = "Discussion on " + discussionTopic + " has been closed";
            await ChatHandler.postDiscussion(io, group_id, sender, content, discussionTopic, 'closed');
        });

        // When a file is uploaded in a group, notify the user
        // File has file metadata
        socket.on('fileUploaded', async (group_id, sender, file, sender_name, group_name) => {
            const errors = SocketSanitizer.handleValidationErrors([
                { field: "group_id", value: group_id, validator: SocketSanitizer.validateId, message: "Invalid group ID" },
                { field: "sender", value: sender, validator: SocketSanitizer.validateId, message: "Invalid sender ID" },
                { field: "sender_name", value: sender_name, validator: SocketSanitizer.validateName, message: "Invalid sender name" },
                { field: "group_name", value: group_name, validator: SocketSanitizer.validateName, message: "Invalid group name" }
            ]);
            if (errors) {
                socket.emit('error', { success: false, message: 'Invalid input', errors });
                return;
            }
            
            
            const content = file.file_description || `file upload: ${file.file_name}`;
            await ChatHandler.postFile(io, group_id, sender, content, file.file_id);
            
            const memberIds = await GroupMemberHandler.retrieveGroupMemberIds(group_id);
            const notificationContent = `${sender_name} shared a file ${file.file_name} in ${group_name}`;
            await NotificationHandler.storeAndEmitFileUploadNotif(io, memberIds, sender, group_id, notificationContent);
        });

        // Video conference start
        socket.on('videoConferenceStart', async (group_id, sender, sender_name, group_name) => {
            const errors = SocketSanitizer.handleValidationErrors([
                { field: "group_id", value: group_id, validator: SocketSanitizer.validateId, message: "Invalid group ID" },
                { field: "sender", value: sender, validator: SocketSanitizer.validateId, message: "Invalid sender ID" },
                { field: "sender_name", value: sender_name, validator: SocketSanitizer.validateName, message: "Invalid sender name" },
                { field: "group_name", value: group_name, validator: SocketSanitizer.validateName, message: "Invalid group name" }
            ]);
            if (errors) {
                socket.emit('error', { success: false, message: 'Invalid input', errors });
                return;
            }
            
            
            const content = `${sender} started a video conference`;
            await ChatHandler.postMessage(io, group_id, sender, content, 'video_conferencing');

           
            const memberIds = await GroupMemberHandler.retrieveGroupMemberIds(group_id);
            const notificationContent = `${sender_name} started a video conference in ${group_name}`;
            await NotificationHandler.storeAndEmitVideoConferenceNotif(io, memberIds, sender, group_id, notificationContent);
                
        });

    

        // When a new member joins the group
        // Only joined user gets notification
        // Retrieve group name if needed 
        socket.on('groupJoin', async (user_id, group_id, role, user_name, group_name) => {
            console.log('groupJoin : ',user_id, group_id, role, user_name, group_name);
            const errors = SocketSanitizer.handleValidationErrors([
                { field: "user_id", value: user_id, validator: SocketSanitizer.validateId, message: "Invalid user ID" },
                { field: "group_id", value: group_id, validator: SocketSanitizer.validateId, message: "Invalid group ID" },
                { field: "role", value: role, validator: SocketSanitizer.validateRole, message: "Invalid role" },
                { field: "user_name", value: user_name, validator: SocketSanitizer.validateName, message: "Invalid user name" },
                { field: "group_name", value: group_name, validator: SocketSanitizer.validateName, message: "Invalid group name" }
            ]);
            if (errors) {
                socket.emit('error', { success: false, message: 'Invalid input', errors });
                return;
            }

            try {
                await GroupMembers.joinMember(user_id, group_id, role);

                const content = `${user_id} has joined the group`;
                await ChatHandler.postMessage(io, group_id, user_id, content, 'join_group');
                

                const socket_id = userSocketMap.get(user_id);
                const notificationContent = `You successfully joined the ${group_name}`;
                await NotificationHandler.storeAndEmitNotification(io, user_id, socket_id, 'join_group', '', group_id, notificationContent);
            } catch (error) {
                console.error('Error: ', error.message);
            }
            
        });

        // UserId : Admin who receives the request
        // SenderId : User who sends the request
        socket.on('groupJoinRequest', async (user_id, group_id, sender, sender_name, group_name) => {
            const errors = SocketSanitizer.handleValidationErrors([
                { field: "user_id", value: user_id, validator: SocketSanitizer.validateId, message: "Invalid user ID" },
                { field: "group_id", value: group_id, validator: SocketSanitizer.validateId, message: "Invalid group ID" },
                { field: "sender", value: sender, validator: SocketSanitizer.validateId, message: "Invalid sender ID" },
                { field: "sender_name", value: sender_name, validator: SocketSanitizer.validateName, message: "Invalid sender name" },
                { field: "group_name", value: group_name, validator: SocketSanitizer.validateName, message: "Invalid group name" }
            ]);
            if (errors) {
                socket.emit('error', { success: false, message: 'Invalid input', errors });
                return;
            }
            
            const content = `${sender_name} requested to join the ${group_name}`;
            const socket_id = userSocketMap.get(user_id);
            await NotificationHandler.storeAndEmitNotification(io, user_id, socket_id, 'join_request', sender, group_id, content);
        });

        // UserId : User who receives the invitation
        // SenderId : Admin who sends the invitation
        socket.on('groupInvite', async (user_id, group_id, sender, sender_name, group_name) => {
            const errors = SocketSanitizer.handleValidationErrors([
                { field: "user_id", value: user_id, validator: SocketSanitizer.validateId, message: "Invalid user ID" },
                { field: "group_id", value: group_id, validator: SocketSanitizer.validateId, message: "Invalid group ID" },
                { field: "sender", value: sender, validator: SocketSanitizer.validateId, message: "Invalid sender ID" },
                { field: "sender_name", value: sender_name, validator: SocketSanitizer.validateName, message: "Invalid sender name" },
                { field: "group_name", value: group_name, validator: SocketSanitizer.validateName, message: "Invalid group name" }
            ]);
            if (errors) {
                socket.emit('error', { success: false, message: 'Invalid input', errors });
                return;
            }
            
            try {
                const content = `${sender_name} invited you to join the group : ${group_name}`;
                const socket_id = userSocketMap.get(user_id);
                await NotificationHandler.storeAndEmitNotification(io, user_id, socket_id, 'invitation', sender, group_id, content);
                
            } catch (error) {
                socket.emit('errorNotification', { message: error.message });
            }
        });


        // When user logout from the page
        socket.on('disconnect', async () => {
            const user_id = [...userSocketMap].find(([key, value]) => value === socket.id)?.[0];
            //console.log('User disconnected:', socket.id);

            if(user_id) {
                userSocketMap.delete(user_id);
                await GroupMemberHandler.disconnectUserFromGroups(user_id, socket);          
                console.log(`User ${user_id} has been removed from all groups.`);
            }
        });
    });
};

  

export default SetupSocket;