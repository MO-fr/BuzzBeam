"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useProfileImage } from '@/hooks/use-profile-image'

export function ProfileDebugger() {
  const [isVisible, setIsVisible] = useState(false)
  const { data: session } = useSession()
  
  // Get values from hook
  const { profileImage, setProfileImage, removeProfileImage, hasCustomImage } = useProfileImage()
  
  // Generate a test image
  const generateTestImage = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 200
    canvas.height = 200
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    
    // Draw background
    ctx.fillStyle = '#3b82f6' // Blue
    ctx.fillRect(0, 0, 200, 200)
    
    // Draw text
    ctx.fillStyle = 'white'
    ctx.font = '20px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('TEST IMAGE', 100, 100)
    
    // Timestamp
    ctx.font = '12px Arial'
    ctx.fillText(new Date().toLocaleTimeString(), 100, 130)
    
    return canvas.toDataURL()
  }
  
  const setTestImage = () => {
    const testImage = generateTestImage()
    if (testImage) {
      setProfileImage(testImage)
      console.log('Set test profile image')
    }
  }
  
  if (!isVisible) {
    return (
      <Button
        className="fixed bottom-4 right-4 z-50 opacity-40 hover:opacity-100"
        size="sm"
        variant="outline"
        onClick={() => setIsVisible(true)}
      >
        Debug Profile
      </Button>
    )
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-background border rounded-lg shadow-lg p-4 w-72">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Profile Image Debug</h3>
        <Button size="sm" variant="ghost" onClick={() => setIsVisible(false)}>×</Button>
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="border rounded-md p-2 flex flex-col items-center">
            <p className="text-xs mb-1">Current</p>
            <div className="w-16 h-16 rounded-full overflow-hidden">
              {profileImage ? (
                <Image src={profileImage} alt="Profile" width={64} height={64} className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs text-gray-500">None</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="border rounded-md p-2 flex flex-col items-center">
            <p className="text-xs mb-1">Google</p>
            <div className="w-16 h-16 rounded-full overflow-hidden">
              {session?.user?.image ? (
                <Image src={session.user.image} alt="Google" width={64} height={64} className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs text-gray-500">None</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
        <div className="space-y-2">
        <div className="flex justify-between gap-2">
          <Button size="sm" className="w-full" onClick={setTestImage}>
            Test Image
          </Button>
          <Button size="sm" variant="destructive" className="w-full" onClick={removeProfileImage}>
            Clear
          </Button>
        </div>
        
        <div className="text-xs">
          <p>Custom: {hasCustomImage ? 'Yes' : 'No'}</p>
          <p>Updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  )
}
