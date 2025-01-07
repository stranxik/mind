"use client"

import { useState, useEffect } from 'react'
import physicalData from '@/data/physical.json'

interface PhysicalStats {
  distance: {
    total: number
    sprint: number
    highIntensity: number
  }
  speed: {
    max: number
    average: number
  }
  heartRate: {
    average: number
    max: number
  }
  recovery: {
    score: number
    status?: string
  }
}

interface Player {
  id: string
  firstName: string
  lastName: string
  position: string
  stats: PhysicalStats
  injury?: {
    type: string
    expectedReturn: string
  }
}

interface PhysicalState {
  lastUpdate: string
  teamId: string
  season: string
  teamAverages: PhysicalStats
  players: Player[]
}

export function usePhysical() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<PhysicalState | null>(null)

  useEffect(() => {
    try {
      setData(physicalData as PhysicalState)
      setLoading(false)
    } catch (err) {
      setError('Erreur lors du chargement des données physiques')
      setLoading(false)
    }
  }, [])

  const getTeamAverages = () => {
    return data?.teamAverages
  }

  const getAllPlayers = () => {
    return data?.players || []
  }

  const getInjuredPlayers = () => {
    return data?.players.filter(player => player.injury) || []
  }

  const getPlayersByRecoveryStatus = (status: string) => {
    return data?.players.filter(player => player.stats.recovery.status === status) || []
  }

  return {
    loading,
    error,
    getTeamAverages,
    getAllPlayers,
    getInjuredPlayers,
    getPlayersByRecoveryStatus
  }
} 