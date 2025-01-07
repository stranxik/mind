"use client"

import { useState, useEffect } from "react"
import teamData from '@/data/team.json'

interface Stadium {
  name: string
  capacity: number
  surface: string
  address: string
}

interface Staff {
  id: number
  firstName: string
  lastName: string
  nationality: string
  role: string
  since?: string
}

interface Player {
  id: number
  firstName: string
  lastName: string
  number: number
  nationality: string
  birthDate: string
  height: number
  weight: number
  foot: 'left' | 'right'
  position: string
  status: string
}

interface PlayingStyle {
  possession: number
  pressingIntensity: string
  defensiveStyle: string
  attackingStyle: string
}

interface TeamData {
  teamId: number
  name: string
  founded: number
  stadium: Stadium
  staff: {
    coach: Staff
    assistants: Staff[]
  }
  squad: {
    goalkeepers: Player[]
    defenders: Player[]
    midfielders: Player[]
    forwards: Player[]
  }
  tactics: {
    preferredFormation: string
    alternativeFormations: string[]
    playingStyle: PlayingStyle
  }
}

interface TeamState {
  lastUpdate: string
  data: TeamData
}

export function useTeamDetails() {
  const [team, setTeam] = useState<TeamState | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 500))
        
        setTeam(teamData as TeamState)
        setError(null)
      } catch (err) {
        setError("Erreur lors du chargement des données de l'équipe")
        console.error("Erreur lors du chargement des données de l'équipe:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getAllPlayers = () => {
    if (!team) return []
    return [
      ...team.data.squad.goalkeepers,
      ...team.data.squad.defenders,
      ...team.data.squad.midfielders,
      ...team.data.squad.forwards
    ]
  }

  const getPlayersByPosition = (position: 'Gardien' | 'Défenseur' | 'Milieu' | 'Attaquant') => {
    if (!team) return []
    switch (position) {
      case 'Gardien':
        return team.data.squad.goalkeepers
      case 'Défenseur':
        return team.data.squad.defenders
      case 'Milieu':
        return team.data.squad.midfielders
      case 'Attaquant':
        return team.data.squad.forwards
      default:
        return []
    }
  }

  const getSquadSize = () => {
    if (!team) return 0
    return getAllPlayers().length
  }

  return {
    team,
    loading,
    error,
    getAllPlayers,
    getPlayersByPosition,
    getSquadSize
  }
} 