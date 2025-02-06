import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const FileSchema = new Schema({
  file_id: { type: String, default: uuidv4 },
  file_name: { type: String, required: true },
  file_type: { type: String, required: true }, 
  file_size: { type: Number, required: true }, 
  file_path: { type: String, required: true }, 
  uploaded_at: { type: Date, default: Date.now },
  uploaded_by: { type: String, ref: 'User', required: true },
  description: { type: String }, 
  group_id: { type: String, ref: 'Group', required: true },
  user_id: { type: String, ref: 'User', required: true },
});

FileSchema.index({ group_id: 1, user_id : 1 });

export default model('File', FileSchema);
