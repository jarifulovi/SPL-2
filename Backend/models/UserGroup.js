import { Schema, model } from 'mongoose';

const UserGroupSchema = new Schema({
  user_id: { type: String, ref: 'User', required: true },
  group_id: { type: String, ref: 'StudyGroup', required: true },
  role: { type: String, enum: ['admin', 'member'], default: 'member' }, 
  joined_at: { type: Date, default: Date.now },
});

UserGroupSchema.index({ user_id: 1, group_id: 1 }, { unique: true });

export default model('UserGroup', UserGroupSchema);
