"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { userData } from "@/lib/mock-data"

export default function ProfilePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [animateAvatar, setAnimateAvatar] = useState(false)
  
  useEffect(() => {
    setIsLoaded(true)
    
    // Animate avatar after a delay
    const timer = setTimeout(() => {
      setAnimateAvatar(true)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col gap-8 py-6">
      <div className={`transition-opacity duration-500 px-1 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-3xl font-bold tracking-tight animate-slide-in mb-2">Profile</h1>
        <p className="text-muted-foreground animate-slide-in stagger-1">Manage your account settings and connected platforms</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 animate-grid">
        <Card className="hover-lift">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="animate-fade-in text-xl">Personal Information</CardTitle>
            <CardDescription className="animate-fade-in stagger-1">Update your personal details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <Avatar className={`h-24 w-24 ring-2 ring-border transition-all duration-700 ${animateAvatar ? 'scale-100 rotate-0' : 'scale-0 rotate-45'}`}>
                <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2 text-center sm:text-left animate-fade-in stagger-2">
                <h3 className="text-xl font-semibold">{userData.name}</h3>
                <p className="text-sm text-muted-foreground">{userData.email}</p>
                <p className="text-sm text-muted-foreground">
                  {userData.role} at {userData.company}
                </p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 button-pop animate-fade-in stagger-3">
                Change Avatar
              </Button>
            </div>

            <Separator className="my-8" />

            <div className="space-y-6 animate-list">
              <div className="grid gap-3">
                <Label htmlFor="name" className="animate-fade-in">Full Name</Label>
                <Input
                  id="name"
                  defaultValue={userData.name}
                  className="input-focus"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email" className="animate-fade-in">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={userData.email}
                  className="input-focus"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="role" className="animate-fade-in">Role</Label>
                <Input
                  id="role"
                  defaultValue={userData.role}
                  className="input-focus"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="company" className="animate-fade-in">Company</Label>
                <Input
                  id="company"
                  defaultValue={userData.company}
                  className="input-focus"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="location" className="animate-fade-in">Location</Label>
                <Input
                  id="location"
                  defaultValue={userData.location}
                  className="input-focus"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="bio" className="animate-fade-in">Bio</Label>
                <Input
                  id="bio"
                  defaultValue={userData.bio}
                  className="input-focus"
                />
              </div>
              <Button className="w-full sm:w-auto button-pop hover-glow">Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="hover-lift">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="animate-fade-in text-xl">Connected Accounts</CardTitle>
              <CardDescription className="animate-fade-in stagger-1">Manage your connected social media accounts</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="space-y-5">
                {[
                  { platform: 'Twitter', icon: Twitter, color: '#1DA1F2', connected: true },
                  { platform: 'Instagram', icon: Instagram, color: '#E1306C', connected: true },
                  { platform: 'Facebook', icon: Facebook, color: '#4267B2', connected: false },
                ].map((account) => {
                  const Icon = account.icon
                  return (
                    <div key={account.platform} className="flex items-center justify-between space-x-4 p-3 rounded-lg hover:bg-accent/10 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2.5 rounded-full transition-colors duration-300`} style={{ backgroundColor: `${account.color}20` }}>
                          <Icon className={`h-5 w-5 transition-transform duration-300 hover:scale-110`} style={{ color: account.color }} />
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-sm font-medium leading-none">{account.platform}</p>
                          <p className="text-sm text-muted-foreground">
                            {account.connected ? 'Connected' : 'Not connected'}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant={account.connected ? "destructive" : "outline"}
                        size="sm"
                        className="button-pop"
                      >
                        {account.connected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="animate-fade-in text-xl">Account Settings</CardTitle>
              <CardDescription className="animate-fade-in stagger-1">Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="space-y-5">
                {[
                  {
                    title: 'Profile Visibility',
                    description: 'Make your profile visible to everyone',
                    enabled: true,
                  },
                  {
                    title: 'Email Notifications',
                    description: 'Receive email notifications about activity',
                    enabled: true,
                  },
                  {
                    title: 'Push Notifications',
                    description: 'Receive push notifications about activity',
                    enabled: false,
                  },
                  {
                    title: 'Activity Status',
                    description: 'Show when you\'re active on the platform',
                    enabled: true,
                  },
                ].map((setting) => (
                  <div
                    key={setting.title}
                    className="flex items-center justify-between space-x-4 p-3 rounded-lg hover:bg-accent/10 transition-colors"
                  >
                    <div className="space-y-1.5">
                      <p className="text-sm font-medium leading-none">{setting.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {setting.description}
                      </p>
                    </div>
                    <Switch
                      checked={setting.enabled}
                      className="switch-toggle"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
