import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("=== JWT Callback ===")
      console.log("Input token:", token)
      console.log("Input user:", user)
      
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.accessToken = user.accessToken
      }
      
      console.log("Output token:", token)
      return token
    },
    async session({ session, token }) {
      console.log("=== Session Callback ===")
      console.log("Input session:", session)
      console.log("Input token:", token)
      
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email
        session.user.name = token.name
        session.accessToken = token.accessToken as string
      }
      
      console.log("Output session:", session)
      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      return true
    }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { username, password } = credentials as { username: string; password: string }

        if (!username || !password) return null

        try {
          const formData = new URLSearchParams()
          formData.append('username', username)
          formData.append('password', password)

          const response = await fetch("http://localhost:8006/auth/login", {
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
          console.log("=== Login Response ===")
          console.log("Full data:", data)
          console.log("User data:", data.user)
          console.log("Access token:", data.access_token)
          
          const user = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.username,
            accessToken: data.access_token
          }
          
          console.log("Returning user:", user)
          return user
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/logout"
  },
  debug: false
} satisfies NextAuthConfig