"use client"

import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Camera, Facebook, Instagram, Twitter, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ImageEditorDialog } from "@/components/features/image-editor-dialog"
import { ImagePreviewDialog } from "@/components/features/image-preview-dialog"
import { useProfileImage } from "@/hooks/use-profile-image"

const DEMO_USER = {
  name: "Demo User",
  email: "demo@example.com",
  role: "Developer",
  company: "Tech Corp",
  location: "San Francisco, CA",
  bio: "👋 Hi! I'm a demo user exploring this dashboard.",
  connectedAccounts: {
    facebook: true,
    twitter: false,
    instagram: true
  }
}

export default function ProfilePage() {
  const { data: session } = useSession()
  const [animateAvatar, setAnimateAvatar] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const fileInputRef = useRef(null)
  const { profileImage, setProfileImage, removeProfileImage, hasCustomImage } = useProfileImage()
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [localAvatar, setLocalAvatar] = useState(null)
  
  // Initialize with session data if available, otherwise use demo data
  const [formData, setFormData] = useState(() => ({
    ...DEMO_USER,
    ...(session?.user && {
      name: session.user.name || DEMO_USER.name,
      email: session.user.email || DEMO_USER.email,
    })
  }))
  const [formErrors, setFormErrors] = useState({})
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    // Trigger avatar animation after a delay
    setTimeout(() => setAnimateAvatar(true), 100)
  }, [])

  // Update form data when session changes
  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user.name || prev.name,
        email: session.user.email || prev.email,
      }))
      
      // Update local avatar with Google image when session changes
      if (!hasCustomImage) {
        setLocalAvatar(session.user.image || null)
        console.log("Setting Google profile image:", session.user.image)
      } else if (profileImage) {
        setLocalAvatar(profileImage)
        console.log("Setting custom profile image:", profileImage)
      }
    }
  }, [session, hasCustomImage, profileImage])

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setUploadError("Please upload a valid image (JPG, PNG, or WebP)")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be smaller than 5MB")
      return
    }

    setUploadError("")
    setSelectedFile(file)
    setIsEditorOpen(true)
  }

  const handleSaveImage = (imageDataUrl) => {
    // Save to Context
    setProfileImage(imageDataUrl)
    
    // Update local state to immediately show change
    setLocalAvatar(imageDataUrl)
    
    // Flag form as dirty for "Save Changes" button
    setIsDirty(true)
    
    // Debug to verify the update happened
    console.log("Profile image saved:", imageDataUrl.substring(0, 50) + "...")
  }

  const handleRemoveImage = () => {
    // Clear from Context
    removeProfileImage()
    
    // Update local state to immediately show change
    setLocalAvatar(session?.user?.image || null)
    
    // Flag form as dirty for "Save Changes" button
    setIsDirty(true)
    
    // Debug
    console.log("Profile image removed, reverting to Google image")
  }

  const validateField = (name, value) => {
    const errors = { ...formErrors }
    
    switch (name) {
      case "name":
        if (!value.trim()) {
          errors.name = "Full name is required"
        } else if (value.length < 2) {
          errors.name = "Name must be at least 2 characters long"
        } else {
          delete errors.name
        }
        break
        
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value.trim()) {
          errors.email = "Email is required"
        } else if (!emailRegex.test(value)) {
          errors.email = "Please enter a valid email address"
        } else {
          delete errors.email
        }
        break
        
      default:
        break
    }
    
    setFormErrors(errors)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setIsDirty(true)
    validateField(name, value)
  }

  const handleConnectedAccountToggle = (platform) => {
    setFormData(prev => ({
      ...prev,
      connectedAccounts: {
        ...prev.connectedAccounts,
        [platform.toLowerCase()]: !prev.connectedAccounts[platform.toLowerCase()]
      }
    }))
    setIsDirty(true)
  }

  const handleSave = async () => {
    // This is where you would integrate with your backend
    console.log('Saving profile changes:', { formData, profileImage })
    setIsDirty(false)
  }

  return (
    <div className="container mx-auto py-6 space-y-8 animate-in fade-in-50">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Manage your profile information and connected accounts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <Avatar 
                className={cn(
                  "h-32 w-32 transition-all duration-300 cursor-pointer",
                  animateAvatar ? "scale-100 opacity-100" : "scale-95 opacity-0",
                  "group-hover:ring-4 ring-offset-2 ring-offset-background ring-primary/20"
                )}
                onClick={() => profileImage && setIsPreviewOpen(true)}
              >
                <AvatarImage asChild>
                  <Image 
                    src={localAvatar || profileImage || "/placeholder-user.jpg"}
                    alt={formData.name}
                    className="object-cover"
                    width={128}
                    height={128}
                    priority
                  />
                </AvatarImage>
                <AvatarFallback className="bg-primary/10 text-primary-foreground text-2xl">
                  {formData.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 right-0 flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Change profile picture</span>
                </Button>
                {hasCustomImage && (
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove profile picture</span>
                  </Button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            {uploadError && (
              <Alert variant="destructive" className="max-w-md">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{uploadError}</AlertDescription>
              </Alert>
            )}
          </div>

          <Separator />

          {/* Profile Form */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                className={cn(formErrors.name && "border-destructive")}
              />
              {formErrors.name && (
                <p className="text-sm text-destructive">{formErrors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className={cn(formErrors.email && "border-destructive")}
              />
              {formErrors.email && (
                <p className="text-sm text-destructive">{formErrors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                name="role"
                placeholder="Your role"
                value={formData.role}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                placeholder="Company name"
                value={formData.company}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="Your location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              placeholder="Tell us about yourself"
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          <Separator />

          {/* Connected Accounts */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Connected Accounts</h3>
            <div className="space-y-4">
              {[
                { name: "Facebook", icon: Facebook },
                { name: "Twitter", icon: Twitter },
                { name: "Instagram", icon: Instagram }
              ].map(({ name, icon: Icon }) => {
                const platform = name.toLowerCase()
                const connected = formData.connectedAccounts[platform]
                return (
                  <div key={name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Icon className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{name}</p>
                        <p className="text-sm text-muted-foreground">
                          {connected ? "Connected" : "Not Connected"}
                        </p>
                      </div>
                    </div>
                    <Switch 
                      checked={connected}
                      onCheckedChange={() => handleConnectedAccountToggle(name)}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              size="lg"
              disabled={Object.keys(formErrors).length > 0 || !isDirty}
              className="w-full sm:w-auto"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      <ImageEditorDialog
        open={isEditorOpen}
        onOpenChange={setIsEditorOpen}
        imageFile={selectedFile}
        onSave={handleSaveImage}
      />

      <ImagePreviewDialog
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        imageUrl={profileImage || "/placeholder-user.jpg"}
        userName={formData.name}
      />
    </div>
  )
}
