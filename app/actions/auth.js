'use server'

import { db } from "@/lib/db"
import { User } from "@/models/User"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

export async function signup(formData) {
  const email = formData.get("email")
  const password = formData.get("password")
  const name = formData.get("name")

  if (!email || !password || !name) {
    return { error: "All fields are required" }
  }

  try {
    await db.connect()
    
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return { error: "Email already exists" }
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    await User.create({
      email,
      name,
      password: hashedPassword,
    })

    redirect('/auth/login')
  } catch (error) {
    console.error('Signup error:', error)
    return { error: "Something went wrong" }
  }
}

export async function login(formData) {
  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "All fields are required" }
  }

  try {
    await db.connect()
    
    const user = await User.findOne({ email })
    if (!user || !user.password) {
      return { error: "Invalid credentials" }
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return { error: "Invalid credentials" }
    }

    return { success: true }
  } catch (error) {
    console.error('Login error:', error)
    return { error: "Something went wrong" }
  }
}

export async function updateProfile(formData) {
  const userId = formData.get("userId")
  const name = formData.get("name")
  const email = formData.get("email")
  const currentPassword = formData.get("currentPassword")
  const newPassword = formData.get("newPassword")

  if (!userId || !name || !email) {
    return { error: "Required fields are missing" }
  }

  try {
    await db.connect()
    const user = await User.findById(userId)
    
    if (!user) {
      return { error: "User not found" }
    }

    // Update basic info
    user.name = name
    user.email = email

    // Update password if provided
    if (currentPassword && newPassword) {
      const isValid = await bcrypt.compare(currentPassword, user.password)
      if (!isValid) {
        return { error: "Current password is incorrect" }
      }
      user.password = await bcrypt.hash(newPassword, 12)
    }

    await user.save()
    return { success: true }
  } catch (error) {
    console.error('Profile update error:', error)
    return { error: "Something went wrong" }
  }
}