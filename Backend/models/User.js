import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const UserSchema = new Schema({
  user_id: { type: String, unique: true, default: uuidv4 },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, 
  name: { type: String, required: true },
  session_token: { type: String },
  status: { type: String, enum: ['active', 'suspended', 'deactivated'], default: 'active' },
  last_login: { type: Date },
  reset_token: { type: String },
  reset_token_expiry: { type: Date },
  created_at: { type: Date, default: Date.now }
});

// indexing for faster query
UserSchema.index({ email: 1, user_id: 1 });

export default model('User', UserSchema);
