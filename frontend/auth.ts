import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const { username, password } = credentials as { username: string; password: string }

        if (!username || !password) return null

        try {
          const formData = new URLSearchParams()
          formData.append('username', username)
          formData.append('password', password)

          const baseUrl = typeof window === 'undefined' 
            ? process.env.BACKEND_URL 
            : process.env.NEXT_PUBLIC_BACKEND_URL

          const response = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
          })

          if (!response.ok) {
            console.error('Auth failed:', await response.text())
            return null
          }

          const data = await response.json()
          console.log("Login response:", data)
          
          if (!data.access_token) {
            console.error('Invalid response format:', data)
            return null
          }

          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.nickname,
            accessToken: data.access_token,
            isActive: true,
            isSuperuser: false
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      console.log("JWT Callback - Input:", { token, user, trigger })
      
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.accessToken = user.accessToken
        token.isActive = user.isActive
        token.isSuperuser = user.isSuperuser
      }
      
      console.log("JWT Callback - Output:", { token })
      return token
    },
    async session({ session, token }) {
      console.log("Session Callback - Input:", { session, token })
      
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.accessToken = token.accessToken as string
        session.user.isActive = token.isActive as boolean
        session.user.isSuperuser = token.isSuperuser as boolean
      }
      
      console.log("Session Callback - Output:", { session })
      return session
    }
  },
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET
}) 