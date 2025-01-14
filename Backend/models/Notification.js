import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const NotificationSchema = new Schema({
    notification_id: { type: String, default: uuidv4 },
    user_id: { type: String, ref: 'User', required: true }, 
    type: { 
      type: String, 
      enum: ['invitation', 'discussion_topic', 'join_request', 'join_group', 'file_shared', 'video_conferencing'], 
      required: true 
    },
    content: { type: String, required: true }, 
    sender: { type: String, ref: 'User' }, // Optional: all except group_join
    group_id: { type: String, ref: 'Group' },
    receive_date: { type: Date, default: Date.now }
});


export default model('Notification', NotificationSchema);



// All event notification contents

// Invitation
// Content : "name" invited you to join the "group_name"

// Join Request
// Content : "name" requested to join the "group_name"

// Join Group
// Content : You successfully joined the "group_name"

// Discussion Topic
// Content : "name" started a discussion "discussion_topic" in "group_name"

// File Shared
// Content : "name" shared a file "file_name" in "group_name"

// Video Conferencing
// Content : "name" started a video conferencing in "group_name"