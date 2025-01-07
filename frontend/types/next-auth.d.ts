import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name: string
    accessToken: string
    isActive: boolean
    isSuperuser: boolean
  }

  interface Session {
    accessToken: string
    user: User & {
      id: string
      email: string
      name: string
      isActive: boolean
      isSuperuser: boolean
    }
  }
} 