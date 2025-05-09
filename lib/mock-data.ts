// User data
export const userData = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  avatar: "/placeholder.svg",
  timezone: "America/New_York",
  role: "Marketing Manager",
  company: "Acme Inc.",
}

// Connected platforms
export const connectedPlatforms = [
  {
    id: "twitter",
    name: "Twitter",
    username: "@janedoe",
    connected: true,
    lastSync: "2023-04-15T10:30:00Z",
    icon: "Twitter",
  },
  {
    id: "instagram",
    name: "Instagram",
    username: "@jane.doe",
    connected: true,
    lastSync: "2023-04-15T10:30:00Z",
    icon: "Instagram",
  },
  {
    id: "facebook",
    name: "Facebook",
    username: "Jane Doe",
    connected: true,
    lastSync: "2023-04-15T10:30:00Z",
    icon: "Facebook",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    username: "Jane Doe",
    connected: false,
    lastSync: null,
    icon: "Linkedin",
  },
  {
    id: "tiktok",
    name: "TikTok",
    username: "@janedoe",
    connected: true,
    lastSync: "2023-04-15T10:30:00Z",
    icon: "TikTok",
  },
]

// Follower growth data
export const followerGrowthData = [
  { name: "Jan", twitter: 4000, instagram: 2400, facebook: 2400 },
  { name: "Feb", twitter: 3000, instagram: 1398, facebook: 2210 },
  { name: "Mar", twitter: 2000, instagram: 9800, facebook: 2290 },
  { name: "Apr", twitter: 2780, instagram: 3908, facebook: 2000 },
  { name: "May", twitter: 1890, instagram: 4800, facebook: 2181 },
  { name: "Jun", twitter: 2390, instagram: 3800, facebook: 2500 },
  { name: "Jul", twitter: 3490, instagram: 4300, facebook: 2100 },
]

// Engagement data
export const engagementData = [
  { name: "Mon", likes: 4000, comments: 2400, shares: 2400 },
  { name: "Tue", likes: 3000, comments: 1398, shares: 2210 },
  { name: "Wed", likes: 2000, comments: 9800, shares: 2290 },
  { name: "Thu", likes: 2780, comments: 3908, shares: 2000 },
  { name: "Fri", likes: 1890, comments: 4800, shares: 2181 },
  { name: "Sat", likes: 2390, comments: 3800, shares: 2500 },
  { name: "Sun", likes: 3490, comments: 4300, shares: 2100 },
]

// Impressions data
export const impressionsData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
]

// Sentiment analysis data
export const sentimentData = [
  { name: "Positive", value: 65, color: "#10b981" },
  { name: "Neutral", value: 25, color: "#6b7280" },
  { name: "Negative", value: 10, color: "#ef4444" },
]

// Comments data
export const commentsData = [
  {
    id: 1,
    author: "Alex Johnson",
    avatar: "/placeholder.svg",
    comment: "Love your new product! The design is amazing and it works perfectly.",
    platform: "Instagram",
    date: "2023-04-15T10:30:00Z",
    sentiment: "positive",
  },
  {
    id: 2,
    author: "Sam Wilson",
    avatar: "/placeholder.svg",
    comment: "I've been using this for a week now. It's okay but could be better.",
    platform: "Twitter",
    date: "2023-04-14T14:20:00Z",
    sentiment: "neutral",
  },
  {
    id: 3,
    author: "Taylor Swift",
    avatar: "/placeholder.svg",
    comment: "This product is exactly what I needed. Thank you!",
    platform: "Facebook",
    date: "2023-04-13T09:15:00Z",
    sentiment: "positive",
  },
  {
    id: 4,
    author: "Jordan Peterson",
    avatar: "/placeholder.svg",
    comment: "I'm disappointed with the quality. Not worth the price.",
    platform: "Twitter",
    date: "2023-04-12T16:45:00Z",
    sentiment: "negative",
  },
  {
    id: 5,
    author: "Morgan Freeman",
    avatar: "/placeholder.svg",
    comment: "Just got my order today. Haven't tried it yet but it looks good.",
    platform: "Instagram",
    date: "2023-04-11T11:30:00Z",
    sentiment: "neutral",
  },
]

// Insights data
export const insightsData = [
  {
    id: 1,
    title: "Engagement Drop",
    description: "Your post engagement dropped by 20% this week compared to last week.",
    actionable: "Consider posting more interactive content like polls or questions.",
    severity: "warning",
    icon: "TrendingDown",
  },
  {
    id: 2,
    title: "Best Posting Time",
    description: "Your audience is most active between 6-8 PM on weekdays.",
    actionable: "Schedule your important posts during this time window.",
    severity: "info",
    icon: "Clock",
  },
  {
    id: 3,
    title: "Follower Growth",
    description: "You gained 125 new followers this week, a 15% increase!",
    actionable: "Keep up the good work with your current content strategy.",
    severity: "success",
    icon: "TrendingUp",
  },
  {
    id: 4,
    title: "Content Type Analysis",
    description: "Video content is performing 3x better than images on your profile.",
    actionable: "Consider creating more video content for higher engagement.",
    severity: "info",
    icon: "Video",
  },
]

// Messages data
export const messagesData = [
  {
    id: 1,
    sender: "Alex Johnson",
    avatar: "/placeholder.svg",
    message: "Hey! I love your latest post. Could you share more details about the product?",
    platform: "Instagram",
    date: "2023-04-15T10:30:00Z",
    read: false,
  },
  {
    id: 2,
    sender: "Sam Wilson",
    avatar: "/placeholder.svg",
    message: "I'm interested in collaborating with your brand. Let's discuss the possibilities.",
    platform: "Twitter",
    date: "2023-04-14T14:20:00Z",
    read: true,
  },
  {
    id: 3,
    sender: "Taylor Swift",
    avatar: "/placeholder.svg",
    message: "Thanks for the quick response! I'll check out your recommendations.",
    platform: "Facebook",
    date: "2023-04-13T09:15:00Z",
    read: true,
  },
  {
    id: 4,
    sender: "Jordan Peterson",
    avatar: "/placeholder.svg",
    message: "I have some concerns about my recent order. Can you help me resolve this issue?",
    platform: "Twitter",
    date: "2023-04-12T16:45:00Z",
    read: false,
  },
  {
    id: 5,
    sender: "Morgan Freeman",
    avatar: "/placeholder.svg",
    message: "Just wanted to say your customer service is outstanding! Thank you for your help.",
    platform: "Instagram",
    date: "2023-04-11T11:30:00Z",
    read: true,
  },
]

// Analytics data
export const analyticsData = {
  reachByPlatform: [
    { name: "Twitter", value: 35 },
    { name: "Instagram", value: 45 },
    { name: "Facebook", value: 20 },
  ],
  audienceAge: [
    { name: "18-24", value: 30 },
    { name: "25-34", value: 40 },
    { name: "35-44", value: 15 },
    { name: "45-54", value: 10 },
    { name: "55+", value: 5 },
  ],
  audienceGender: [
    { name: "Male", value: 45 },
    { name: "Female", value: 52 },
    { name: "Other", value: 3 },
  ],
  topPerformingContent: [
    {
      id: 1,
      title: "10 Tips for Better Social Media Marketing",
      platform: "Instagram",
      engagement: 1250,
      reach: 15000,
      date: "2023-04-10T10:30:00Z",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "New Product Launch Announcement",
      platform: "Twitter",
      engagement: 980,
      reach: 12000,
      date: "2023-04-05T14:20:00Z",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      title: "Behind the Scenes: Our Creative Process",
      platform: "Facebook",
      engagement: 850,
      reach: 9500,
      date: "2023-04-01T09:15:00Z",
      image: "/placeholder.svg",
    },
  ],
  performanceByTime: [
    { hour: "00:00", engagement: 120 },
    { hour: "02:00", engagement: 80 },
    { hour: "04:00", engagement: 50 },
    { hour: "06:00", engagement: 90 },
    { hour: "08:00", engagement: 250 },
    { hour: "10:00", engagement: 480 },
    { hour: "12:00", engagement: 580 },
    { hour: "14:00", engagement: 620 },
    { hour: "16:00", engagement: 750 },
    { hour: "18:00", engagement: 820 },
    { hour: "20:00", engagement: 690 },
    { hour: "22:00", engagement: 320 },
  ],
}

// Settings data
export const settingsData = {
  notifications: {
    email: {
      newComments: true,
      newFollowers: true,
      mentions: true,
      directMessages: false,
      weeklyDigest: true,
    },
    push: {
      newComments: true,
      newFollowers: false,
      mentions: true,
      directMessages: true,
      weeklyDigest: false,
    },
  },
  privacy: {
    profileVisibility: "public",
    showActivity: true,
    allowTagging: true,
    allowMentions: true,
  },
  security: {
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: "30m",
  },
  preferences: {
    language: "en",
    timezone: "America/New_York",
    theme: "system",
  },
}
