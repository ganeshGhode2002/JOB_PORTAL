import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true
    },
    company: {

      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: [true, 'Company name is required']
    },
    location: {
      type: String,
      required: [true, 'Job location is required']
    },
    jobType: {
      type: String,
      enum: ['Full-Time', 'Part-Time', 'Internship', 'Remote', 'Contract'],
      default: 'Full-Time'
    },
    description: {
      type: String,
      required: [true, 'Job description is required']
    },
    skillsRequired: {
      type: [String],
      default: []
    },
    salary: {
      type: String
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    applicants: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        resume: String,
        status: {
          type: String,
          enum: ['Applied', 'Shortlisted', 'Rejected', 'Interview'],
          default: 'Applied'
        },
        appliedAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Job = mongoose.model('Job', jobSchema);
export default Job;
