"use client"

import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"

// Simple in-memory storage since we don't want to persist between sessions anyway
let globalProfileImage = null

export function useProfileImage() {
  const { data: session } = useSession()
  const [profileImage, setProfileImageState] = useState(globalProfileImage)
  
  // Update our component state when the global value changes
  useEffect(() => {
    // This ensures we re-render when global image changes from elsewhere
    setProfileImageState(globalProfileImage)
  }, [globalProfileImage])
  
  // Set profile image both locally and globally
  const setProfileImage = (image) => {
    globalProfileImage = image
    setProfileImageState(image)
    console.log("Profile image set")
  }
  
  // Remove profile image both locally and globally
  const removeProfileImage = () => {
    globalProfileImage = null
    setProfileImageState(null)
    console.log("Profile image removed")
  }
  
  // Use Google profile image as fallback
  const displayImage = profileImage || session?.user?.image || null
  
  return {
    profileImage: displayImage,
    setProfileImage,
    removeProfileImage,
    hasCustomImage: !!profileImage
  }
}
