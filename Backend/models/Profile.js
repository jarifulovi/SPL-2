import { Schema, model } from 'mongoose';

const ProfileSchema = new Schema({
    user_id: { type: String, ref: 'User', required: true, index: true },
    date_of_birth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other', 'prefer not to say'] },
    phone_number: { type: String },
    profile_picture: { type: String }, // Store URL or path to the profile picture
    address: { type: String },
    bio: { type: String },
    education: { type: String },
    hobby: { type: String },
    role: { type: String, enum: ['student', 'teacher'] },
    is_visible: { type: Boolean, default: true },

    // Student-specific fields
    course_of_study: { type: String },
    current_year_or_semester: { type: String },
    department: { type: String },
    skills: { type: [String] },
    grade_sheet: { type: String },
    resume: { type: String },

    // Teacher-specific fields
    subjects: { type: [String] },
    designation: { type: String },
    experience: { type: Number },
    qualifications: { type: [String] },
}, { timestamps: true });
  
export default model('Profile', ProfileSchema);
  