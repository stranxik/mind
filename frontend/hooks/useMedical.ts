"use client"

import { useState, useEffect } from 'react'
import medicalData from '@/data/medical.json'

interface Injury {
  playerId: string
  type: string
  location: string
  startDate: string
  expectedReturn?: string
  endDate?: string
  duration?: number
  severity: string
  status?: string
  progress?: number
}

interface RiskFactors {
  overall: string
  muscular: number
  joint: number
  fatigue: number
}

interface Player {
  id: string
  firstName: string
  lastName: string
  position: string
  status: string
  fitnessLevel: number
  currentInjury?: {
    type: string
    location: string
    startDate: string
    expectedReturn: string
    status: string
    progress: number
    severity: string
  }
  medicalHistory: {
    type: string
    location: string
    startDate: string
    endDate: string
    duration: number
    severity: string
  }[]
  riskFactors: RiskFactors
}

interface TeamStats {
  currentlyInjured: number
  averageInjuryDuration: number
  injuriesByType: {
    [key: string]: number
  }
  riskDistribution: {
    [key: string]: number
  }
}

interface MedicalState {
  lastUpdate: string
  teamId: string
  season: string
  currentInjuries: Injury[]
  players: Player[]
  teamStats: TeamStats
}

export function useMedical() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<MedicalState | null>(null)

  useEffect(() => {
    try {
      setData(medicalData as MedicalState)
      setLoading(false)
    } catch (err) {
      setError('Erreur lors du chargement des données médicales')
      setLoading(false)
    }
  }, [])

  const getCurrentInjuries = () => {
    return data?.currentInjuries || []
  }

  const getAllPlayers = () => {
    return data?.players || []
  }

  const getTeamStats = () => {
    return data?.teamStats
  }

  const getPlayersByStatus = (status: string) => {
    return data?.players.filter(player => player.status === status) || []
  }

  const getPlayersByRiskLevel = (riskLevel: string) => {
    return data?.players.filter(player => player.riskFactors.overall === riskLevel) || []
  }

  return {
    loading,
    error,
    getCurrentInjuries,
    getAllPlayers,
    getTeamStats,
    getPlayersByStatus,
    getPlayersByRiskLevel
  }
} 