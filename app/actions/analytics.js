'use server'

import { getServerSession } from "next-auth"

import { db } from '@/lib/db'
import Analytics from '@/models/Analytics'

export async function getAnalytics(platform, timeframe) {
  try {
    const session = await getServerSession()
    if (!session) {
      return { success: false, error: 'Authentication required' }
    }

    await db.connect()

    let query = { userId: session.user.id }
    if (platform && platform !== 'all') {
      query.platform = platform.toLowerCase()
    }

    const now = new Date()
    if (timeframe) {
      const dateRange = {
        '7d': new Date(now.setDate(now.getDate() - 7)),
        '30d': new Date(now.setDate(now.getDate() - 30)),
        '90d': new Date(now.setDate(now.getDate() - 90)),
        '12m': new Date(now.setDate(now.getDate() - 365))
      }[timeframe]

      if (dateRange) {
        query.timestamp = { $gte: dateRange }
      }
    }

    const rawData = await Analytics.find(query).sort({ timestamp: -1 })    // Process metrics by platform
    const metrics = {
      posts: rawData.length || 0
    };

    // Group data by platform
    const platformData = rawData.reduce((acc, item) => {
      if (!acc[item.platform]) {
        acc[item.platform] = {
          followers: 0,
          engagement: 0,
          impressions: 0,
          likes: 0,
          shares: 0,
          comments: 0
        };
      }
      
      const platform = acc[item.platform];
      platform.followers += item.metrics?.followers || 0;
      platform.engagement += item.metrics?.engagement || 0;
      platform.impressions += item.metrics?.impressions || 0;
      platform.likes += item.metrics?.likes || 0;
      platform.shares += item.metrics?.shares || 0;
      platform.comments += item.metrics?.comments || 0;
      
      return acc;
    }, {});

    // Add platform-specific metrics to the metrics object
    Object.entries(platformData).forEach(([platform, data]) => {
      metrics[platform] = data;
    });    // Generate daily engagement data for the past 7 days
    const engagementTrends = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        date: date.toLocaleDateString(),
        twitter: Math.floor(Math.random() * 1000),
        instagram: Math.floor(Math.random() * 1000),
        facebook: Math.floor(Math.random() * 1000)
      };
    });

    return {
      success: true,
      data: {
        metrics,
        engagementTrends,
        audienceAge: [
          { name: '18-24', value: 20 },
          { name: '25-34', value: 35 },
          { name: '35-44', value: 25 },
          { name: '45+', value: 20 }
        ],
        audienceGender: [
          { name: 'Male', value: 45 },
          { name: 'Female', value: 48 },
          { name: 'Other', value: 7 }
        ],
        performanceByTime: Array.from({ length: 24 }, (_, i) => ({
          hour: `${i}:00`,
          engagement: Math.floor(Math.random() * 1000)
        })),
        impressions: Array.from({ length: 7 }, (_, i) => ({
          name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
          value: Math.floor(Math.random() * 10000)
        }))
      }
    }

  } catch (error) {
    console.error('Analytics error:', error)
    return { 
      success: false, 
      error: 'Failed to fetch analytics data. Please try again later.' 
    }
  }
}
