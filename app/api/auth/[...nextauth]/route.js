import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { connect } from "@/lib/db"
import { User } from "@/models/User"

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET is not defined. Please check your environment variables.')
}

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  // Explicitly configure session handling
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Explicitly set the secret
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          await connect()
          
          // Check if user already exists
          const existingUser = await User.findOne({ email: user.email })
          
          if (existingUser) {
            // Update user's information if needed
            existingUser.name = user.name
            existingUser.image = user.image
            await existingUser.save()
            return true
          }
          
          // Create new user if they don't exist
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            connectedAccounts: {
              google: true
            }
          })
          
          return true
        } catch (error) {
          console.error("Error saving user to MongoDB:", error)
          return false
        }
      }
      return true
    },    async session({ session }) {
      try {
        await connect()
        
        // Fetch user from database and add any additional fields to session
        const user = await User.findOne({ email: session.user.email })
        
        if (user) {
          session.user.id = user._id.toString()
          session.user.role = user.role
          session.user.image = user.image // Ensure image is included
          session.user.connectedAccounts = user.connectedAccounts
        }
        
        return session
      } catch (error) {
        console.error("Error fetching user session data:", error)
        return session
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  // Additional security options
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
