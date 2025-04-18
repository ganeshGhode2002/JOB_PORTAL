import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
      },
    role: {
      type: String,
      enum: ['jobseeker', 'recruiter'],
      default: 'jobseeker'
    },
    profile: {
      bio: {
        type: String,
        default: ''
      },
      resume: {
        type: String, // Store resume file URL or cloud link
        default: ''
      },
      company: {
        type: String,
        default: ''
      },
      skills: {
        type: [String], // Array of skills
        default: []
      },
      profilePhoto: {
        type: String, // Store image URL
        default: ''
      }
    },
  
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);
export default User;
