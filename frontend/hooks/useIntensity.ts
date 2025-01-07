"use client"

import { useState, useEffect } from 'react'
import intensityData from '@/data/intensity.json'

interface IntensityZones {
  low: number
  moderate: number
  high: number
  severe: number
}

interface WeeklyLoad {
  current: number
  previous: number
  target: number
  variation: number
}

interface TrainingSession {
  completed: number
  totalDuration: number
  averageIntensity: number
}

interface DailyIntensity {
  date: string
  value: number
}

interface PlayerWeeklyStats {
  load: WeeklyLoad
  intensityDistribution: IntensityZones
  sessions: TrainingSession
}

interface Player {
  id: string
  firstName: string
  lastName: string
  position: string
  weeklyStats: PlayerWeeklyStats
  dailyIntensity: DailyIntensity[]
}

interface TeamAverages {
  weeklyLoad: WeeklyLoad
  intensityZones: IntensityZones
  weeklyTraining: {
    sessions: number
    totalDuration: number
    averageIntensity: number
  }
}

interface IntensityState {
  lastUpdate: string
  teamId: string
  season: string
  teamAverages: TeamAverages
  players: Player[]
}

export function useIntensity() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<IntensityState | null>(null)

  useEffect(() => {
    try {
      setData(intensityData as IntensityState)
      setLoading(false)
    } catch (err) {
      setError('Erreur lors du chargement des données d\'intensité')
      setLoading(false)
    }
  }, [])

  const getTeamAverages = () => {
    return data?.teamAverages
  }

  const getAllPlayers = () => {
    return data?.players || []
  }

  const getPlayerById = (playerId: string) => {
    return data?.players.find(player => player.id === playerId)
  }

  const getPlayersDailyIntensity = () => {
    return data?.players.map(player => ({
      id: player.id,
      name: `${player.firstName} ${player.lastName}`,
      data: player.dailyIntensity
    })) || []
  }

  return {
    loading,
    error,
    getTeamAverages,
    getAllPlayers,
    getPlayerById,
    getPlayersDailyIntensity
  }
} 