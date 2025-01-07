"use client"

import { useState, useEffect } from "react"
import overviewData from '@/data/overview.json'

interface Score {
  home: number
  away: number
}

interface MatchStats {
  possession: number
  shots: number
  shotsOnTarget: number
  corners: number
  fouls: number
}

interface BaseMatch {
  id: number
  competition: string
  opponent: string
  date: string
}

interface FullMatch extends BaseMatch {
  venue: string
  kickoff: string
}

interface LastMatch extends BaseMatch {
  score: Score
  stats: MatchStats
}

interface Standings {
  position: number
  points: number
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  form: string[]
}

interface Player {
  id: number
  firstName: string
  lastName: string
  goals?: number
  assists?: number
  minutesPlayed?: number
  injury?: string
  expectedReturn?: string
  status?: string
}

interface News {
  id: number
  title: string
  date: string
  category: string
  content: string
}

interface Overview {
  nextMatch: FullMatch
  lastMatch: LastMatch
  standings: Standings
  topScorers: Player[]
  recentNews: News[]
  injuries: Player[]
  upcomingFixtures: FullMatch[]
}

interface OverviewData {
  teamId: number
  season: string
  overview: Overview
}

interface OverviewState {
  lastUpdate: string
  data: OverviewData
}

export function useOverview() {
  const [overview, setOverview] = useState<OverviewState | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 500))
        
        setOverview(overviewData as OverviewState)
        setError(null)
      } catch (err) {
        setError("Erreur lors du chargement des données")
        console.error("Erreur lors du chargement des données:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getNextMatch = () => {
    if (!overview) return null
    return overview.data.overview.nextMatch
  }

  const getLastMatch = () => {
    if (!overview) return null
    return overview.data.overview.lastMatch
  }

  const getStandings = () => {
    if (!overview) return null
    return overview.data.overview.standings
  }

  const getTopScorers = () => {
    if (!overview) return []
    return overview.data.overview.topScorers
  }

  const getRecentNews = () => {
    if (!overview) return []
    return overview.data.overview.recentNews
  }

  const getInjuries = () => {
    if (!overview) return []
    return overview.data.overview.injuries
  }

  const getUpcomingFixtures = () => {
    if (!overview) return []
    return overview.data.overview.upcomingFixtures
  }

  return {
    overview,
    loading,
    error,
    getNextMatch,
    getLastMatch,
    getStandings,
    getTopScorers,
    getRecentNews,
    getInjuries,
    getUpcomingFixtures
  }
} 