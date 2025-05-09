"use client"

import { Suspense, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { chartColors } from "@/lib/chart-animations"
import { getAnalytics } from "@/app/actions/analytics"
import {
  Area, AreaChart, Bar, BarChart, Cell, Legend, Line, LineChart,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
} from "recharts"
import { useSession } from "next-auth/react"

export default function AnalyticsPage() {
  const { data: session } = useSession()
  const [chartVisible, setChartVisible] = useState(false)
  const [platform, setPlatform] = useState("all")
  const [timeframe, setTimeframe] = useState("30d")
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setChartVisible(true), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const result = await getAnalytics(platform, timeframe)
        if (result.success) {
          setAnalyticsData(result.data)
        } else {
          console.error('Error fetching analytics:', result.error)
        }
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    if (session?.user) {
      fetchData()
    }
  }, [platform, timeframe, session])

  const formatPercentage = (num) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(num) + '%'
  }

  // Process analytics data for charts
  const processAnalyticsForCharts = () => {
    if (!analyticsData || typeof analyticsData !== 'object') return {
      platformDistribution: {},
      engagementTrends: {}
    };
  
    const data = Object.values(analyticsData);
  
    return {
      platformDistribution: data.reduce((acc, item) => {
        if (!acc[item.platform]) acc[item.platform] = 0;
        acc[item.platform] += item.metrics?.followers || 0;
        return acc;
      }, {}),
  
      engagementTrends: data.reduce((acc, item) => {
        const date = new Date(item.timestamp).toLocaleDateString();
        if (!acc[date]) acc[date] = { date };
        acc[date][item.platform] = item.metrics?.engagement || 0;
        return acc;
      }, {})
    };
  };
  

  const chartData = processAnalyticsForCharts()

  // Transform data for platform distribution pie chart
  const platformData = chartData?.platformDistribution ? 
    Object.entries(chartData.platformDistribution).map(([platform, value]) => ({
      name: platform,
      value,
      color: chartColors.platforms[platform]
    })) : []

  // Transform data for engagement trends
  const engagementData = chartData?.engagementTrends ?
    Object.values(chartData.engagementTrends).sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    ) : []

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between transition-opacity duration-500">
        <div className="animate-slide-in">
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Detailed insights into your social media performance</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center animate-slide-in-right">
          <Select value={platform} onValueChange={setPlatform}>
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
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-full sm:w-[180px] transition-all duration-300 hover:border-primary input-focus">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent className="animate-in zoom-in-95 duration-200">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-grid">
        <Card className="hover-lift">
          <CardHeader className="px-6 pt-6 pb-2">
            <CardTitle className="animate-fade-in">Platform Distribution</CardTitle>
            <CardDescription className="animate-fade-in stagger-1">Distribution of your audience across platforms</CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="h-[300px] w-full transition-all duration-300 hover:scale-[1.02]">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatPercentage(value)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="px-6 pt-6 pb-2">
            <CardTitle className="animate-fade-in">Audience Demographics</CardTitle>
            <CardDescription className="animate-fade-in stagger-1">Age distribution of your audience</CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className={`h-[300px] transition-opacity duration-700 ${chartVisible ? "opacity-100" : "opacity-0"}`}>
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center animate-pulse-subtle">Loading chart...</div>
                }
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analyticsData?.audienceAge || []}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 0,
                    }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip animationDuration={300} />
                    <Bar
                      dataKey="value"
                      fill="#FF0050"
                      animationDuration={1500}
                      animationBegin={300}
                      animationEasing="ease-out"
                    >
                      {(analyticsData?.audienceAge || []).map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={chartColors.themes.tiktok[index % chartColors.themes.tiktok.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Suspense>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="px-6 pt-6 pb-2">
            <CardTitle className="animate-fade-in">Gender Distribution</CardTitle>
            <CardDescription className="animate-fade-in stagger-1">Gender breakdown of your audience</CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className={`h-[300px] transition-opacity duration-700 ${chartVisible ? "opacity-100" : "opacity-0"}`}>
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center animate-pulse-subtle">Loading chart...</div>
                }
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData?.audienceGender || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      animationDuration={1500}
                      animationBegin={300}
                      animationEasing="ease-out"
                    >
                      <Cell key="male" fill="#3B82F6" />
                      <Cell key="female" fill="#EC4899" />
                      <Cell key="other" fill="#6366F1" />
                    </Pie>
                    <Tooltip animationDuration={300} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Suspense>
            </div>
            <div className="mt-4 flex justify-center gap-4 animate-list">
              <div className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1">
                <span className="h-3 w-3 rounded-full bg-[#3B82F6]"></span>
                <span className="text-sm">Male: {analyticsData?.audienceGender?.[0]?.value || 0}%</span>
              </div>
              <div className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1">
                <span className="h-3 w-3 rounded-full bg-[#EC4899]"></span>
                <span className="text-sm">Female: {analyticsData?.audienceGender?.[1]?.value || 0}%</span>
              </div>
              <div className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1">
                <span className="h-3 w-3 rounded-full bg-[#6366F1]"></span>
                <span className="text-sm">Other: {analyticsData?.audienceGender?.[2]?.value || 0}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-slide-up stagger-2 hover-lift">
        <CardHeader className="px-6 pt-6 pb-2">
          <CardTitle className="animate-fade-in">Best Posting Times</CardTitle>
          <CardDescription className="animate-fade-in stagger-1">Engagement levels throughout the day</CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className={`h-[300px] transition-opacity duration-700 ${chartVisible ? "opacity-100" : "opacity-0"}`}>
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center animate-pulse-subtle">Loading chart...</div>
              }
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData?.performanceByTime || []}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip animationDuration={300} />
                  <Bar dataKey="engagement" animationDuration={1500} animationBegin={300} animationEasing="ease-out">
                    {(analyticsData?.performanceByTime || []).map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.engagement > 700 ? "#FF0050" : entry.engagement > 400 ? "#FF3370" : "#FF6690"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Suspense>
          </div>
          <div className="mt-4 animate-fade-in stagger-3">
            <h4 className="font-medium mb-3">Key Insights:</h4>
            <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground animate-list space-y-2">
              <li>Peak engagement times: 6-8 PM on weekdays</li>
              <li>Lowest engagement: 2-4 AM</li>
              <li>Weekend engagement is 15% lower than weekdays</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="animate-slide-up stagger-3 hover-lift">
          <CardHeader className="px-6 pt-6 pb-2">
            <CardTitle className="animate-fade-in">Engagement Trends</CardTitle>
            <CardDescription className="animate-fade-in stagger-1">
              How your engagement has changed over time
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className={`h-[300px] transition-opacity duration-700 ${chartVisible ? "opacity-100" : "opacity-0"}`}>
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center animate-pulse-subtle">Loading chart...</div>
                }
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={engagementData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="twitter"
                      stroke={chartColors.platforms.twitter}
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      animationDuration={1800}
                      animationEasing="ease-out"
                    />
                    <Line
                      type="monotone"
                      dataKey="instagram"
                      stroke={chartColors.platforms.instagram}
                      strokeWidth={2}
                      animationDuration={1800}
                      animationEasing="ease-out"
                      animationBegin={200}
                    />
                    <Line
                      type="monotone"
                      dataKey="facebook"
                      stroke={chartColors.platforms.facebook}
                      strokeWidth={2}
                      animationDuration={1800}
                      animationEasing="ease-out"
                      animationBegin={400}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Suspense>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-slide-up stagger-4 hover-lift">
          <CardHeader className="px-6 pt-6 pb-2">
            <CardTitle className="animate-fade-in">Content Performance</CardTitle>
            <CardDescription className="animate-fade-in stagger-1">Impressions by content type</CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className={`h-[300px] transition-opacity duration-700 ${chartVisible ? "opacity-100" : "opacity-0"}`}>
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center animate-pulse-subtle">Loading chart...</div>
                }
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={analyticsData?.impressions || []}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                      animationDuration={1800}
                      animationEasing="ease-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Suspense>
            </div>
            <div className="mt-4 flex justify-between">
              <Badge className="bg-[#8884d8] hover:bg-[#7a77c2]">Total Impressions: {analyticsData?.totalImpressions || 0}</Badge>
              <Button variant="outline" size="sm" className="button-pop">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
