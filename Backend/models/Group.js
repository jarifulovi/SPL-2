import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const StudyGroupSchema = new Schema({
  group_id: { type: String, unique: true, default: uuidv4 },
  group_name: { type: String, required: true },
  group_description: { type: String },
  group_size: { type: Number, default: 1 },
  group_status: { type: String, enum: ['public', 'private'], default: 'public' },
  groupImage: { type: String }, // URL or path to the group image
  created_by: { type: String, ref: 'User', required: true }, // Reference to User schema
  created_at: { type: Date, default: Date.now },
});

StudyGroupSchema.index({ group_id : 1 });

export default model('StudyGroup', StudyGroupSchema);
