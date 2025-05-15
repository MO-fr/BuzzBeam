import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Additional fields for user profile
  role: {
    type: String,
    default: 'user'
  },
  bio: String,
  company: String,
  location: String,
  connectedAccounts: {
    google: {
      type: Boolean,
      default: true
    },
    facebook: {
      type: Boolean,
      default: false
    },
    twitter: {
      type: Boolean,
      default: false
    },
    instagram: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true // Adds updatedAt field automatically
});

// Don't recreate the model if it already exists
export const User = mongoose.models.User || mongoose.model('User', userSchema);