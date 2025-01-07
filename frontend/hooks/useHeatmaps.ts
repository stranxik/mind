"use client"

import { useState, useEffect } from 'react'
import heatmapsData from '@/data/heatmaps.json'

interface Position {
  x: number
  y: number
  value: number
}

interface ZoneData {
  zone: string
  percentage: number
  actions: number
}

interface PlayerHeatmap {
  id: string
  firstName: string
  lastName: string
  position: string
  matchId: string
  opponent: string
  date: string
  duration: number
  positions: Position[]
  zones: {
    attack: ZoneData[]
    midfield: ZoneData[]
    defense: ZoneData[]
  }
  stats: {
    distance: number
    sprints: number
    topSpeed: number
    possession: number
  }
}

interface HeatmapsState {
  lastUpdate: string
  teamId: string
  season: string
  heatmaps: PlayerHeatmap[]
}

export function useHeatmaps() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<HeatmapsState | null>(null)

  useEffect(() => {
    try {
      setData(heatmapsData as HeatmapsState)
      setLoading(false)
    } catch (err) {
      setError('Erreur lors du chargement des heatmaps')
      setLoading(false)
    }
  }, [])

  const getAllHeatmaps = () => {
    return data?.heatmaps || []
  }

  const getHeatmapById = (id: string) => {
    return data?.heatmaps.find(h => h.id === id)
  }

  const getHeatmapsByPlayer = (playerId: string) => {
    return data?.heatmaps.filter(h => h.id === playerId) || []
  }

  const getHeatmapsByMatch = (matchId: string) => {
    return data?.heatmaps.filter(h => h.matchId === matchId) || []
  }

  const getZoneStats = (heatmapId: string) => {
    const heatmap = getHeatmapById(heatmapId)
    if (!heatmap) return null

    return {
      attack: heatmap.zones.attack,
      midfield: heatmap.zones.midfield,
      defense: heatmap.zones.defense
    }
  }

  const getPlayerStats = (heatmapId: string) => {
    const heatmap = getHeatmapById(heatmapId)
    if (!heatmap) return null

    return heatmap.stats
  }

  return {
    loading,
    error,
    getAllHeatmaps,
    getHeatmapById,
    getHeatmapsByPlayer,
    getHeatmapsByMatch,
    getZoneStats,
    getPlayerStats
  }
} 