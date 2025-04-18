import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    website: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    logo: {
      type: String,
      default: ''
    },
    industry: {
      type: String,
      default: ''
    },
    size: {
      type: String, // e.g., "11-50", "51-200", etc.
      default: ''
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
      }
    ],
    applications:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Aplications'
    }
  },
  {
    timestamps: true
  }
);

const Company = mongoose.model('Company', companySchema);
export default Company;
