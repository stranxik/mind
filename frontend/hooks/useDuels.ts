"use client"

import { useState, useEffect } from "react"
import duelsData from '@/data/duels.json'

interface DuelStats {
  total: number
  won: number
  lost: number
  success: number
}

interface PlayerDuels {
  id: number
  firstName: string
  lastName: string
  position: string
  duels: {
    aerial: DuelStats
    ground: DuelStats
    tackle: DuelStats
    dribble: DuelStats
  }
  history: Array<{
    matchId: number
    opponent: string
    date: string
    duels: {
      aerial: DuelStats
      ground: DuelStats
      tackle: DuelStats
      dribble: DuelStats
    }
  }>
}

interface DuelsState {
  lastUpdate: string
  data: {
    teamId: number
    season: string
    players: PlayerDuels[]
  }
}

export function useDuels() {
  const [duels, setDuels] = useState<DuelsState | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 500))
        
        setDuels(duelsData as DuelsState)
        setError(null)
      } catch (err) {
        setError("Erreur lors du chargement des statistiques de duels")
        console.error("Erreur lors du chargement des statistiques de duels:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getAllPlayers = () => {
    if (!duels) return []
    return duels.data.players
  }

  const getPlayerById = (playerId: number) => {
    if (!duels) return null
    return duels.data.players.find(player => player.id === playerId)
  }

  const getPlayerHistory = (playerId: number) => {
    const player = getPlayerById(playerId)
    if (!player) return []
    return player.history
  }

  const getTopPerformers = (duelType: 'aerial' | 'ground' | 'tackle' | 'dribble', limit: number = 5) => {
    if (!duels) return []
    return duels.data.players
      .sort((a, b) => b.duels[duelType].success - a.duels[duelType].success)
      .slice(0, limit)
  }

  const getTeamStats = () => {
    if (!duels) return null
    const players = duels.data.players
    
    const calculateAverageStats = (duelType: 'aerial' | 'ground' | 'tackle' | 'dribble'): DuelStats => {
      const totals = players.reduce(
        (acc, player) => ({
          total: acc.total + player.duels[duelType].total,
          won: acc.won + player.duels[duelType].won,
          lost: acc.lost + player.duels[duelType].lost,
          success: 0
        }),
        { total: 0, won: 0, lost: 0, success: 0 }
      )
      
      return {
        ...totals,
        success: totals.total > 0 ? (totals.won / totals.total) * 100 : 0
      }
    }

    return {
      aerial: calculateAverageStats('aerial'),
      ground: calculateAverageStats('ground'),
      tackle: calculateAverageStats('tackle'),
      dribble: calculateAverageStats('dribble')
    }
  }

  return {
    duels,
    loading,
    error,
    getAllPlayers,
    getPlayerById,
    getPlayerHistory,
    getTopPerformers,
    getTeamStats
  }
} 