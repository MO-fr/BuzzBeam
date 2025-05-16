"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useProfileImage } from '@/hooks/use-profile-image'
import type { NextPage } from 'next'

interface DebugState {
  contextState: {
    profileImage: string | null
    hasCustomImage: boolean
    isGoogleImage: boolean
  }
  sessionState: {
    authenticated: boolean
    userImage: string | null
    userName: string | undefined
  }
}

const DebugPage: NextPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { profileImage, setProfileImage, removeProfileImage, hasCustomImage } = useProfileImage()
  
  const [localTime, setLocalTime] = useState<string>("")
  const [lastUpdate, setLastUpdate] = useState<string>("")

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      router.replace('/')
      return
    }

    // Update time every second to show the component is rendering
    const timer = setInterval(() => {
      setLocalTime(new Date().toLocaleTimeString())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [router])

  // Prevent flash of debug content in production
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  const handleResetStore = (): void => {
    removeProfileImage()
    setLastUpdate(new Date().toLocaleTimeString())
  }
  
  const handleSetMockImage = (): void => {
    setProfileImage("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzNiODJmNiIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+REVCVUc8L3RleHQ+PC9zdmc+")
    setLastUpdate(new Date().toLocaleTimeString())
  }

  const debugState: DebugState = {
    contextState: {
      profileImage: profileImage ? "[Image data exists]" : null,
      hasCustomImage,
      isGoogleImage: profileImage === session?.user?.image
    },
    sessionState: {
      authenticated: status === "authenticated",
      userImage: session?.user?.image ? "[Google image exists]" : null,
      userName: session?.user?.name || undefined
    }
  }
  
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto mb-8">
        <CardHeader>
          <CardTitle>Profile Image Debug</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Session Status</h3>
              <p>Auth status: <span className="font-mono">{status}</span></p>
              <p>Local time: <span className="font-mono">{localTime}</span></p>
              <p>Store last update: <span className="font-mono">{lastUpdate || "Never"}</span></p>
              <p>Custom image set: <span className="font-mono">{hasCustomImage ? "Yes" : "No"}</span></p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Actions</h3>
              <div className="space-y-2">
                <Button onClick={handleResetStore} variant="destructive">
                  Reset Store (Remove Image)
                </Button>
                <Button onClick={handleSetMockImage} variant="secondary">
                  Set Debug Image
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <h3 className="text-md font-medium mb-2">Google Image</h3>
              <div className="border-2 border-blue-500 rounded-full w-32 h-32 overflow-hidden">
                {session?.user?.image ? (
                  <Image 
                    src={session.user.image} 
                    alt="Google Profile" 
                    width={128} 
                    height={128} 
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                    No Google Image
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <h3 className="text-md font-medium mb-2">Store Image</h3>
              <div className="border-2 border-green-500 rounded-full w-32 h-32 overflow-hidden">
                {profileImage ? (
                  <Image 
                    src={profileImage} 
                    alt="Store Image" 
                    width={128} 
                    height={128} 
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                    No Store Image
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <h3 className="text-md font-medium mb-2">What Should Show</h3>
              <div className="border-2 border-purple-500 rounded-full w-32 h-32 overflow-hidden">
                {profileImage ? (
                  <Image 
                    src={profileImage} 
                    alt="Profile" 
                    width={128} 
                    height={128} 
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                    No Image
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <pre className="bg-gray-100 p-4 rounded-md text-xs overflow-x-auto">
            {JSON.stringify(debugState, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}

export default DebugPage
