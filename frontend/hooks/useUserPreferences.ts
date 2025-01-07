"use client"

import { useState, useEffect } from "react"

interface UserPreferences {
  defaultLeague: string
  defaultTeam: string
  followedPlayers: Array<{
    id: string
    name: string
  }>
  displaySettings: {
    theme: "light" | "dark" | "system"
    language: string
    notifications: boolean
  }
}

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        // Simuler un appel API
        const userPrefs = {
          defaultLeague: "ligue1",
          defaultTeam: "psg",
          followedPlayers: [
            { id: "mbappe", name: "Kylian Mbappé" }
          ],
          displaySettings: {
            theme: "system" as const,
            language: "fr",
            notifications: true
          }
        }
        setPreferences(userPrefs)
      } catch (error) {
        console.error("Error fetching user preferences:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPreferences()
  }, [])

  const updatePreferences = async (newPrefs: Partial<UserPreferences>) => {
    try {
      // Simuler un appel API
      setPreferences(prev => ({
        ...prev!,
        ...newPrefs
      }))
      // TODO: Synchroniser avec le backend
    } catch (error) {
      console.error("Error updating preferences:", error)
    }
  }

  return { preferences, loading, updatePreferences }
} 