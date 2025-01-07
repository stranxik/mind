"use client"

import { useState, useEffect } from 'react'
import matchesData from '@/data/matches.json'

interface PlayerStats {
  playerId: string
  firstName: string
  lastName: string
  position: string
  minutesPlayed: number
  goals: number
  assists: number
  shots: number
  shotsOnTarget: number
  passes: number
  passAccuracy: number
  tackles: number
  interceptions: number
  fouls: number
  yellowCards: number
  redCards: number
  distance: number
  sprints: number
}

interface MatchStats {
  possession: number
  shots: number
  shotsOnTarget: number
  corners: number
  fouls: number
  yellowCards: number
  redCards: number
  offsides: number
  passes: number
  passAccuracy: number
  tackles: number
  interceptions: number
  distance: number
  sprints: number
}

interface Match {
  id: string
  competition: string
  homeTeam: string
  awayTeam: string
  date: string
  status: 'scheduled' | 'live' | 'completed' | 'postponed'
  score?: {
    home: number
    away: number
  }
  venue: string
  playerStats: PlayerStats[]
  teamStats: MatchStats
  highlights?: {
    time: string
    type: 'goal' | 'card' | 'substitution' | 'injury'
    description: string
  }[]
}

interface MatchesState {
  lastUpdate: string
  teamId: string
  season: string
  matches: Match[]
  upcomingMatches: Match[]
  completedMatches: Match[]
}

export function useMatches() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<MatchesState | null>(null)

  useEffect(() => {
    try {
      setData(matchesData as MatchesState)
      setLoading(false)
    } catch (err) {
      setError('Erreur lors du chargement des données des matches')
      setLoading(false)
    }
  }, [])

  const getAllMatches = () => {
    return data?.matches || []
  }

  const getUpcomingMatches = () => {
    return data?.upcomingMatches || []
  }

  const getCompletedMatches = () => {
    return data?.completedMatches || []
  }

  const getMatchById = (matchId: string) => {
    return data?.matches.find(match => match.id === matchId)
  }

  const getMatchesByCompetition = (competition: string) => {
    return data?.matches.filter(match => match.competition === competition) || []
  }

  const getMatchesByStatus = (status: Match['status']) => {
    return data?.matches.filter(match => match.status === status) || []
  }

  const getPlayerStats = (matchId: string, playerId: string) => {
    const match = getMatchById(matchId)
    return match?.playerStats.find(stats => stats.playerId === playerId)
  }

  const getTeamStats = (matchId: string) => {
    const match = getMatchById(matchId)
    return match?.teamStats
  }

  return {
    loading,
    error,
    getAllMatches,
    getUpcomingMatches,
    getCompletedMatches,
    getMatchById,
    getMatchesByCompetition,
    getMatchesByStatus,
    getPlayerStats,
    getTeamStats
  }
} 