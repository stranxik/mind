"use client"

import { useSession } from 'next-auth/react'

export function useUser() {
  const { data: session, status } = useSession()
  console.log('Session state:', { session, status })

  // Si la session est en cours de chargement
  if (status === 'loading') {
    return {
      user: undefined,
      isLoading: true,
      isAuthenticated: false
    }
  }

  // Si l'utilisateur n'est pas authentifié
  if (status !== 'authenticated' || !session?.user) {
    return {
      user: undefined,
      isLoading: false,
      isAuthenticated: false
    }
  }

  // L'utilisateur est authentifié et on a ses données
  return {
    user: session.user,
    isLoading: false,
    isAuthenticated: true
  }
} 