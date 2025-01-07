import { getSession } from 'next-auth/react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8006'

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const session = await getSession()
  
  if (!session?.accessToken) {
    throw new Error('No access token available')
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session.accessToken}`,
    ...options.headers as Record<string, string>,
  }

  const response = await fetch(`${BACKEND_URL}${url}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`)
  }

  return response.json()
}

export async function getCurrentUser() {
  const response = await fetchWithAuth('/auth/session')
  return response.user
}

export async function updateUser(data: any) {
  return fetchWithAuth('/api/user/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export async function getTeams() {
  return fetchWithAuth('/api/teams')
}

export async function getMatches() {
  return fetchWithAuth('/api/matches')
}

export async function getStats() {
  return fetchWithAuth('/api/stats')
} 

export async function signOut() {
  return fetchWithAuth('/api/auth/signout')
}