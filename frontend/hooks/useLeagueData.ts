"use client"

import { useState, useEffect } from "react"
import leagueData from "@/data/leagues.json"
import matchesData from "@/data/matches.json"
import playersData from "@/data/players.json"
import teamsData from "@/data/teams.json"

interface LeagueStats {
  topScorer: {
    name: string
    goals: number
    team: string
    image: string
  } | null
  topAssists: {
    name: string
    assists: number
    team: string
    image: string
  } | null
  standings: Array<{
    position: number
    team: string
    played: number
    won: number
    drawn: number
    lost: number
    gf: number
    ga: number
    gd: number
    points: number
  }>
  recentMatches: Array<{
    date: string
    homeTeam: string
    awayTeam: string
    score: string
  }>
  upcomingMatches: Array<{
    date: string
    homeTeam: string
    awayTeam: string
  }>
}

export function useLeagueData(leagueId: string) {
  const [leagueStats, setLeagueStats] = useState<LeagueStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeagueData = () => {
      try {
        // Simuler un appel API avec nos données JSON
        const league = leagueData.find(l => l.id === leagueId)
        const leagueMatches = matchesData.filter(m => m.leagueId === leagueId)
        const leaguePlayers = playersData.filter(p => p.leagueId === leagueId)
        const leagueTeams = teamsData.filter(t => t.leagueId === leagueId)

        // Calculer les statistiques
        const stats: LeagueStats = {
          topScorer: leaguePlayers[0] ? {
            name: leaguePlayers[0].name,
            goals: leaguePlayers[0].stats.goals,
            team: leaguePlayers[0].team,
            image: leaguePlayers[0].image
          } : null,
          topAssists: leaguePlayers[1] ? {
            name: leaguePlayers[1].name,
            assists: leaguePlayers[1].stats.assists,
            team: leaguePlayers[1].team,
            image: leaguePlayers[1].image
          } : null,
          standings: leagueTeams.map((team, index) => ({
            position: index + 1,
            team: team.name,
            played: team.stats.played,
            won: team.stats.won,
            drawn: team.stats.drawn,
            lost: team.stats.lost,
            gf: team.stats.goalsFor,
            ga: team.stats.goalsAgainst,
            gd: team.stats.goalDifference,
            points: team.stats.points
          })),
          recentMatches: leagueMatches
            .filter(m => m.status === "finished")
            .slice(0, 5)
            .map(match => ({
              date: match.date,
              homeTeam: match.homeTeam,
              awayTeam: match.awayTeam,
              score: `${match.homeScore}-${match.awayScore}`
            })),
          upcomingMatches: leagueMatches
            .filter(m => m.status === "scheduled")
            .slice(0, 5)
            .map(match => ({
              date: match.date,
              homeTeam: match.homeTeam,
              awayTeam: match.awayTeam
            }))
        }

        setLeagueStats(stats)
      } catch (error) {
        console.error("Error fetching league data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeagueData()
  }, [leagueId])

  return { leagueStats, loading }
} 