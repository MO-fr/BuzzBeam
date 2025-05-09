import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { settingsData } from "@/lib/mock-data"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="mb-2">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader className="px-6 pt-6 pb-2">
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your basic account preferences</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Preferences</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue={settingsData.preferences.language}>
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="pt">Portuguese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue={settingsData.preferences.timezone}>
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select defaultValue={settingsData.preferences.theme}>
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Account Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Jane Doe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="jane.doe@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" defaultValue="Acme Inc." />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="Marketing Manager" />
                  </div>
                </div>
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader className="px-6 pt-6 pb-2">
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Choose how and when you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="email-comments">New comments</Label>
                    <Switch id="email-comments" defaultChecked={settingsData.notifications.email.newComments} />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="email-followers">New followers</Label>
                    <Switch id="email-followers" defaultChecked={settingsData.notifications.email.newFollowers} />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="email-mentions">Mentions</Label>
                    <Switch id="email-mentions" defaultChecked={settingsData.notifications.email.mentions} />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="email-messages">Direct messages</Label>
                    <Switch id="email-messages" defaultChecked={settingsData.notifications.email.directMessages} />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="email-digest">Weekly digest</Label>
                    <Switch id="email-digest" defaultChecked={settingsData.notifications.email.weeklyDigest} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Push Notifications</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="push-comments">New comments</Label>
                    <Switch id="push-comments" defaultChecked={settingsData.notifications.push.newComments} />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="push-followers">New followers</Label>
                    <Switch id="push-followers" defaultChecked={settingsData.notifications.push.newFollowers} />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="push-mentions">Mentions</Label>
                    <Switch id="push-mentions" defaultChecked={settingsData.notifications.push.mentions} />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="push-messages">Direct messages</Label>
                    <Switch id="push-messages" defaultChecked={settingsData.notifications.push.directMessages} />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="push-digest">Weekly digest</Label>
                    <Switch id="push-digest" defaultChecked={settingsData.notifications.push.weeklyDigest} />
                  </div>
                </div>
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader className="px-6 pt-6 pb-2">
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control your privacy and visibility</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Profile Visibility</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="profile-visibility">Who can see your profile</Label>
                    <Select defaultValue={settingsData.privacy.profileVisibility}>
                      <SelectTrigger id="profile-visibility">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public (Everyone)</SelectItem>
                        <SelectItem value="followers">Followers Only</SelectItem>
                        <SelectItem value="private">Private (Only You)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="show-activity">Show your activity status</Label>
                    <Switch id="show-activity" defaultChecked={settingsData.privacy.showActivity} />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="allow-tagging">Allow others to tag you</Label>
                    <Switch id="allow-tagging" defaultChecked={settingsData.privacy.allowTagging} />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="allow-mentions">Allow others to mention you</Label>
                    <Switch id="allow-mentions" defaultChecked={settingsData.privacy.allowMentions} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Usage</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="personalized-ads" className="block">
                        Personalized ads
                      </Label>
                      <p className="text-sm text-muted-foreground">Allow us to use your data for personalized ads</p>
                    </div>
                    <Switch id="personalized-ads" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="analytics" className="block">
                        Analytics
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Allow us to collect usage data to improve our services
                      </p>
                    </div>
                    <Switch id="analytics" defaultChecked />
                  </div>
                </div>
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader className="px-6 pt-6 pb-2">
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Password</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button className="w-fit">Change Password</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="two-factor" className="block">
                        Enable Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch id="two-factor" defaultChecked={settingsData.security.twoFactorAuth} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Login Security</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="login-alerts" className="block">
                        Login Alerts
                      </Label>
                      <p className="text-sm text-muted-foreground">Get notified when someone logs into your account</p>
                    </div>
                    <Switch id="login-alerts" defaultChecked={settingsData.security.loginAlerts} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="session-timeout">Session Timeout</Label>
                    <Select defaultValue={settingsData.security.sessionTimeout}>
                      <SelectTrigger id="session-timeout">
                        <SelectValue placeholder="Select timeout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15m">15 minutes</SelectItem>
                        <SelectItem value="30m">30 minutes</SelectItem>
                        <SelectItem value="1h">1 hour</SelectItem>
                        <SelectItem value="4h">4 hours</SelectItem>
                        <SelectItem value="1d">1 day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
