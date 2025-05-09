"use client"

import { Suspense, useEffect, useState } from "react"
import { ArrowUp, Clock, Facebook, Instagram, TrendingDown, TrendingUp, Twitter, Video } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { commentsData, insightsData } from "@/lib/mock-data"
import { dummyChartData } from "@/lib/dummy-chart-data"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export default function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTimeframe, setActiveTimeframe] = useState("7d")
  const [activePlatform, setActivePlatform] = useState("all")
  const [chartVisible, setChartVisible] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    // Delay chart animation for smoother loading
    const timer = setTimeout(() => {
      setChartVisible(true)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      notation: num >= 10000 ? 'compact' : 'standard',
      maximumFractionDigits: 1
    }).format(num)
  }

  const formatPercentage = (num) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(num) + '%'
  }

  return (
    <div className="flex flex-col gap-4">
      <div className={`flex flex-col gap-4 md:flex-row md:items-center md:justify-between transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="animate-slide-in">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Your social media performance at a glance</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center animate-slide-in-right">
          <Select value={activePlatform} onValueChange={setActivePlatform}>
            <SelectTrigger className="w-full sm:w-[180px] transition-all duration-300 hover:border-primary input-focus">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent className="animate-in zoom-in-95 duration-200">
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
            </SelectContent>
          </Select>
          <Select value={activeTimeframe} onValueChange={setActiveTimeframe}>
            <SelectTrigger className="w-full sm:w-[180px] transition-all duration-300 hover:border-primary input-focus">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent className="animate-in zoom-in-95 duration-200">
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-grid">
        {/* Total Followers Card */}
        <Card className="animate-card card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-6 pt-6">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
            <div className="rounded-full bg-green-100 p-1.5 dark:bg-green-900 transition-transform duration-300 hover:scale-110">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-4">
            <div className="text-2xl font-bold tabular-nums">{formatNumber(28439)}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400">{formatPercentage(2.5)}</span>
              <span>from last month</span>
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div className="flex items-center gap-2 justify-center transition-all duration-300 hover:scale-105">
                <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                <span className="text-sm tabular-nums">{formatNumber(12354)}</span>
              </div>
              <div className="flex items-center gap-2 justify-center transition-all duration-300 hover:scale-105">
                <Instagram className="h-4 w-4 text-[#E1306C]" />
                <span className="text-sm tabular-nums">{formatNumber(10211)}</span>
              </div>
              <div className="flex items-center gap-2 justify-center transition-all duration-300 hover:scale-105">
                <Facebook className="h-4 w-4 text-[#4267B2]" />
                <span className="text-sm tabular-nums">{formatNumber(5874)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Rate Card */}
        <Card className="animate-card card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-6 pt-6">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <div className="rounded-full bg-red-100 p-1.5 dark:bg-red-900 transition-transform duration-300 hover:scale-110">
              <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-4">
            <div className="text-2xl font-bold tabular-nums">{formatPercentage(4.3)}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="text-red-600 dark:text-red-400">-{formatPercentage(0.8)}</span>
              <span>from last month</span>
            </p>
            <div className="mt-6 grid grid-cols-3 gap-12 text-center">
              <div className="transition-all duration-300 hover:scale-105">
                <div className="text-sm font-medium mb-1">Likes</div>
                <div className="text-sm tabular-nums">{formatPercentage(3.2)}</div>
              </div>
              <div className="transition-all duration-300 hover:scale-105">
                <div className="text-sm font-medium mb-1">Comments</div>
                <div className="text-sm tabular-nums">{formatPercentage(0.8)}</div>
              </div>
              <div className="transition-all duration-300 hover:scale-105">
                <div className="text-sm font-medium mb-1">Shares</div>
                <div className="text-sm tabular-nums">{formatPercentage(0.3)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impressions Card */}
        <Card className="animate-card card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-6 pt-6">
            <CardTitle className="text-sm font-medium">Impressions</CardTitle>
            <div className="rounded-full bg-green-100 p-1.5 dark:bg-green-900 transition-transform duration-300 hover:scale-110">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-4">
            <div className="text-2xl font-bold tabular-nums">{formatNumber(143921)}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="text-green-600 dark:text-green-400">+{formatPercentage(12.3)}</span>
              <span>from last month</span>
            </p>
            <div className="mt-4">
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-2 w-[65%] rounded-full bg-primary transition-all duration-1000 animate-pulse-subtle"></div>
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <div className="tabular-nums">0</div>
                <div className="tabular-nums">Target: {formatNumber(220000)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sentiment Score Card */}
        <Card className="animate-card card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-6 pt-6">
            <CardTitle className="text-sm font-medium">Sentiment Score</CardTitle>
            <div className="rounded-full bg-green-100 p-1.5 dark:bg-green-900 transition-transform duration-300 hover:scale-110">
              <ArrowUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-4">
            <div className="text-2xl font-bold tabular-nums">78/100</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="text-green-600 dark:text-green-400">+5 points</span>
              <span>from last month</span>
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { color: 'bg-green-500', label: 'Positive', value: 65 },
                { color: 'bg-gray-500', label: 'Neutral', value: 25 },
                { color: 'bg-red-500', label: 'Negative', value: 10 }
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1">
                  <span className={`h-3 w-3 rounded-full ${item.color} transition-transform duration-300 hover:scale-125`}></span>
                  <span className="text-xs text-center">
                    {item.label}: {formatPercentage(item.value)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="growth" className="w-full animate-fade-in space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="growth" className="transition-all duration-300 data-[state=active]:animate-pulse-subtle">
            Follower Growth
          </TabsTrigger>
          <TabsTrigger value="engagement" className="transition-all duration-300 data-[state=active]:animate-pulse-subtle">
            Engagement
          </TabsTrigger>
          <TabsTrigger value="impressions" className="transition-all duration-300 data-[state=active]:animate-pulse-subtle">
            Impressions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="growth" className="animate-in slide-in-from-bottom-2 duration-300">
          <Card className="card-hover">
            <CardHeader className="space-y-2 px-6 pt-6">
              <CardTitle>Follower Growth</CardTitle>
              <CardDescription>Track your follower growth across platforms over time</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className={`h-[350px] transition-opacity duration-700 ${chartVisible ? 'opacity-100' : 'opacity-0'}`}>
                <Suspense fallback={<div className="flex h-full items-center justify-center animate-pulse-subtle">Loading chart...</div>}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={dummyChartData.followerGrowth}
                      margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="twitter"
                        stroke="#1DA1F2"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        animationDuration={1500}
                      />
                      <Line
                        type="monotone"
                        dataKey="instagram"
                        stroke="#E1306C"
                        strokeWidth={2}
                        animationDuration={1500}
                        animationBegin={200}
                      />
                      <Line
                        type="monotone"
                        dataKey="facebook"
                        stroke="#4267B2"
                        strokeWidth={2}
                        animationDuration={1500}
                        animationBegin={400}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Suspense>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="animate-in slide-in-from-bottom-2 duration-300">
          <Card className="card-hover">
            <CardHeader className="space-y-2 px-6 pt-6">
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>Likes, comments, and shares across your content</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className={`h-[350px] transition-opacity duration-700 ${chartVisible ? 'opacity-100' : 'opacity-0'}`}>
                <Suspense fallback={<div className="flex h-full items-center justify-center animate-pulse-subtle">Loading chart...</div>}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={dummyChartData.engagement}
                      margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="likes" fill="#10B981" stackId="a" animationDuration={1500} />
                      <Bar dataKey="comments" fill="#6366F1" stackId="a" animationDuration={1500} animationBegin={200} />
                      <Bar dataKey="shares" fill="#F43F5E" stackId="a" animationDuration={1500} animationBegin={400} />
                    </BarChart>
                  </ResponsiveContainer>
                </Suspense>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impressions" className="animate-in slide-in-from-bottom-2 duration-300">
          <Card className="card-hover">
            <CardHeader className="space-y-2 px-6 pt-6">
              <CardTitle>Impressions</CardTitle>
              <CardDescription>Total number of times your content was displayed</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className={`h-[350px] transition-opacity duration-700 ${chartVisible ? 'opacity-100' : 'opacity-0'}`}>
                <Suspense fallback={<div className="flex h-full items-center justify-center animate-pulse-subtle">Loading chart...</div>}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={dummyChartData.impressions}
                      margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#6366F1"
                        fillOpacity={1}
                        fill="url(#colorImpressions)"
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Suspense>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Sentiment Analysis Card */}
        <Card className="animate-card card-hover">
          <CardHeader className="px-6 pt-6 pb-2">
            <CardTitle>Sentiment Analysis</CardTitle>
            <CardDescription>Analysis of sentiment in comments and mentions</CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-6">
            <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
              <div className="relative">
                <div className={`h-[200px] w-[200px] transition-opacity duration-700 ${chartVisible ? 'opacity-100' : 'opacity-0'}`}>
                  <Suspense fallback={<div className="flex h-full items-center justify-center animate-pulse-subtle">Loading chart...</div>}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dummyChartData.sentiment}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          animationDuration={1500}
                        >
                          <Cell key="positive" fill="#10B981" />
                          <Cell key="neutral" fill="#6B7280" />
                          <Cell key="negative" fill="#EF4444" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Suspense>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 mt-8">
                <div className="flex items-center gap-3 transition-all duration-300 hover:translate-x-1">
                  <span className="h-3 w-3 rounded-full bg-[#10B981]"></span>
                  <span className="text-sm">Positive: {formatPercentage(65)}</span>
                </div>
                <div className="flex items-center gap-3 transition-all duration-300 hover:translate-x-1">
                  <span className="h-3 w-3 rounded-full bg-[#6B7280]"></span>
                  <span className="text-sm">Neutral: {formatPercentage(25)}</span>
                </div>
                <div className="flex items-center gap-3 transition-all duration-300 hover:translate-x-1">
                  <span className="h-3 w-3 rounded-full bg-[#EF4444]"></span>
                  <span className="text-sm">Negative: {formatPercentage(10)}</span>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <h4 className="text-sm font-medium mb-4">Recent Comments</h4>
              <div className="space-y-4">
                {commentsData.slice(0, 3).map((comment) => (
                  <div
                    key={comment.id}
                    className="flex gap-4 transition-all duration-300 hover:bg-accent/20 p-3 rounded-lg animate-slide-in"
                  >
                    <Avatar className="h-10 w-10 transition-transform duration-300 hover:scale-110">
                      <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                      <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium truncate">{comment.author}</span>
                        <Badge variant="outline" className="text-xs">
                          {comment.platform}
                        </Badge>
                        <Badge
                          className={`ml-auto text-xs shrink-0 ${
                            comment.sentiment === "positive"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : comment.sentiment === "negative"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                          }`}
                        >
                          {comment.sentiment}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{comment.comment}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(comment.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Smart Insights Card */}
        <Card className="animate-card card-hover">
          <CardHeader className="space-y-2 px-6 pt-6">
            <CardTitle>Smart Insights</CardTitle>
            <CardDescription>Actionable insights based on your social media performance</CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="space-y-6">
              {insightsData.map((insight, index) => (
                <Card
                  key={insight.id}
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-4 px-5">
                    <div
                      className={`rounded-full p-2 transition-transform duration-300 hover:scale-110 ${
                        insight.severity === "warning"
                          ? "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300"
                          : insight.severity === "success"
                          ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                          : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                      }`}
                    >
                      {insight.icon === "TrendingDown" ? (
                        <TrendingDown className="h-4 w-4" />
                      ) : insight.icon === "TrendingUp" ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : insight.icon === "Clock" ? (
                        <Clock className="h-4 w-4" />
                      ) : insight.icon === "Video" ? (
                        <Video className="h-4 w-4" />
                      ) : null}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">{insight.title}</CardTitle>
                      <CardDescription className="mt-1">{insight.description}</CardDescription>
                      <p className="mt-2 text-sm font-medium">Tip: {insight.actionable}</p>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
