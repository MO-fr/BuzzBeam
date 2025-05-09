'use server'

import { getServerSession } from "next-auth"

import { db } from '@/lib/db'
import Analytics from '@/models/Analytics'

export async function getAnalytics(platform, timeframe) {
  try {
    const session = await getServerSession()
    if (!session) {
      throw new Error('Unauthorized')
    }

    await db.connect()

    let query = { userId: session.user.id }
    if (platform && platform !== 'all') {
      query.platform = platform
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

    const rawData = await Analytics.find(query).sort({ timestamp: -1 })

    // 🧠 Process rawData into dashboard structure
    const metrics = {
      posts: rawData.length,
      likes: rawData.reduce((acc, cur) => acc + (cur.likes || 0), 0),
      shares: rawData.reduce((acc, cur) => acc + (cur.shares || 0), 0),
      comments: rawData.reduce((acc, cur) => acc + (cur.comments || 0), 0),
    }

    const audienceAge = [
      { name: '18-24', value: 100 },
      { name: '25-34', value: 120 },
      { name: '35-44', value: 80 },
    ]

    const audienceGender = [
      { name: 'Male', value: 180 },
      { name: 'Female', value: 120 },
    ]

    const performanceByTime = rawData.map(item => ({
      timestamp: item.timestamp,
      engagement: (item.likes || 0) + (item.shares || 0) + (item.comments || 0),
    }))

    return {
      success: true,
      data: {
        metrics,
        audienceAge,
        audienceGender,
        performanceByTime
      }
    }

  } catch (error) {
    return { success: false, error: error.message }
  }
}
