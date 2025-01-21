import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ChatSchema = new Schema({
  chat_id: { type: String, unique: true, default: uuidv4 },
  type: { 
    type: String, 
    enum: ['text_message', 'link', 'discussion_topic', 'files', 'video_conferencing', 'join_group'], 
    required: true 
  },
  // Additional field for discussion_topic
  topic: {
    type: String,
    required: function() { return this.type === 'discussion_topic'; },
  },
  discussionStatus: {
    type: String,
    enum: ['open', 'closed'],
    required: function() { return this.type === 'discussion_topic'; },
  },
  content: { type: String }, 
  sender: { type: String, ref: 'User', required: true },
  file: { type: String }, 
  group_id: { type: String, ref: 'Group', required: true },
  send_at: { type: Date, default: Date.now }
});

// Add indexes for efficient querying
ChatSchema.index({ group_id: 1, send_at: -1 });

export default model('Chat', ChatSchema);
