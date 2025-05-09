import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  platform: {
    type: String,
    enum: ['twitter', 'instagram', 'facebook'],
    required: true
  },
  metrics: {
    followers: Number,
    engagement: Number,
    impressions: Number,
    likes: Number,
    comments: Number,
    shares: Number
  },
  sentiment: {
    positive: Number,
    neutral: Number,
    negative: Number
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Create compound index for efficient querying
analyticsSchema.index({ userId: 1, platform: 1, timestamp: -1 });

export default mongoose.models.Analytics || mongoose.model('Analytics', analyticsSchema);