"use client"

import { useState, useEffect } from 'react'
import teamData from '@/data/team.json'

interface PlayerStats {
  goals: number
  assists: number
  minutesPlayed: number
  gamesPlayed: number
  yellowCards: number
  redCards: number
  passAccuracy: number
  tackles: number
  interceptions: number
  duelsWon: number
  duelsLost: number
  distanceCovered: number
  sprintSpeed: number
  recoveryScore: number
  averageRating?: number
  matchesPlayed?: number
}

interface Contract {
  startDate: string
  endDate: string
  value?: number
  buyoutClause?: number
}

interface Player {
  id: string
  firstName: string
  lastName: string
  number: number
  position: string
  birthDate: string
  nationality: string
  height: number
  weight: number
  preferredFoot: 'left' | 'right'
  status: 'available' | 'injured' | 'suspended'
  contract: Contract
  stats: PlayerStats
  marketValue: number
  photoUrl?: string
}

interface TeamStats {
  totalPlayers: number
  averageAge: number
  averageHeight: number
  averageWeight: number
  positionDistribution: {
    Gardien: number
    Défenseur: number
    Milieu: number
    Attaquant: number
  }
  nationalityDistribution: {
    [key: string]: number
  }
  totalMarketValue: number
  averageMarketValue: number
  averageRating?: number
  goalsScored?: number
  assists?: number
  ageDistribution?: {
    [key: string]: number
  }
}

interface TeamState {
  lastUpdate: string
  teamId: string
  season: string
  players: Player[]
  teamStats: TeamStats
}

export function useTeam() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<TeamState | null>(null)

  useEffect(() => {
    try {
      // Calculer les statistiques supplémentaires
      const teamDataWithStats = {
        ...teamData,
        teamStats: {
          ...teamData.teamStats,
          averageRating: 7.2, // Exemple de note moyenne
          goalsScored: teamData.players.reduce((acc, player) => acc + player.stats.goals, 0),
          assists: teamData.players.reduce((acc, player) => acc + player.stats.assists, 0),
          ageDistribution: {
            "18-21": teamData.players.filter(p => getAge(p.birthDate) >= 18 && getAge(p.birthDate) <= 21).length,
            "22-25": teamData.players.filter(p => getAge(p.birthDate) >= 22 && getAge(p.birthDate) <= 25).length,
            "26-29": teamData.players.filter(p => getAge(p.birthDate) >= 26 && getAge(p.birthDate) <= 29).length,
            "30+": teamData.players.filter(p => getAge(p.birthDate) >= 30).length
          }
        }
      }
      setData(teamDataWithStats as TeamState)
      setLoading(false)
    } catch (err) {
      setError('Erreur lors du chargement des données de l\'équipe')
      setLoading(false)
    }
  }, [])

  const getAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const getAllPlayers = () => {
    return data?.players || []
  }

  const getTeamStats = () => {
    return data?.teamStats
  }

  const getPlayerById = (playerId: string) => {
    return data?.players.find(player => player.id === playerId)
  }

  const getPlayerStats = (playerId: string) => {
    const player = getPlayerById(playerId)
    if (!player) return null
    
    return {
      ...player.stats,
      averageRating: 7.2, // Exemple de note moyenne
      matchesPlayed: player.stats.gamesPlayed
    }
  }

  const getPlayersByPosition = (position: string) => {
    return data?.players.filter(player => player.position === position) || []
  }

  const getPlayersByStatus = (status: Player['status']) => {
    return data?.players.filter(player => player.status === status) || []
  }

  const getPlayersByNationality = (nationality: string) => {
    return data?.players.filter(player => player.nationality === nationality) || []
  }

  const getTopScorers = (limit: number = 5) => {
    return [...(data?.players || [])]
      .sort((a, b) => b.stats.goals - a.stats.goals)
      .slice(0, limit)
  }

  const getTopAssisters = (limit: number = 5) => {
    return [...(data?.players || [])]
      .sort((a, b) => b.stats.assists - a.stats.assists)
      .slice(0, limit)
  }

  const getMostMinutesPlayed = (limit: number = 5) => {
    return [...(data?.players || [])]
      .sort((a, b) => b.stats.minutesPlayed - a.stats.minutesPlayed)
      .slice(0, limit)
  }

  return {
    loading,
    error,
    getAllPlayers,
    getTeamStats,
    getPlayerById,
    getPlayersByPosition,
    getPlayersByStatus,
    getPlayersByNationality,
    getTopScorers,
    getTopAssisters,
    getMostMinutesPlayed,
    getPlayerStats
  }
} 