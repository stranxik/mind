"use client"

import { useState, useEffect } from "react"
import physicalData from "@/data/physical.json"

interface PhysicalStats {
  intensity: {
    highIntensityRuns: number
    distanceCovered: number
    averageSpeed: number
    maxSpeed: number
    intensityZones: {
      low: number
      medium: number
      high: number
    }
  }
  sprints: {
    total: number
    maxSpeed: number
    averageDistance: number
    sprintZones: {
      explosive: number
      sustained: number
      repeated: number
    }
  }
  duels: {
    total: number
    won: number
    lost: number
    types: {
      aerial: {
        total: number
        won: number
      }
      ground: {
        total: number
        won: number
      }
    }
  }
  medical: {
    injuries: Array<{
      type: string
      startDate: string
      endDate: string
      duration: number
      status: "recovered" | "recovering" | "treatment"
    }>
    fitness: {
      level: number
      trend: "improving" | "stable" | "declining"
    }
    availability: {
      lastThreeMonths: number
      season: number
    }
  }
}

export function usePhysicalData(playerId: string) {
  const [physicalStats, setPhysicalStats] = useState<PhysicalStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPhysicalData = () => {
      try {
        const playerData = physicalData.find(p => p.playerId === playerId)
        if (playerData) {
          setPhysicalStats(playerData.stats)
        }
      } catch (error) {
        console.error("Error fetching physical data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPhysicalData()
  }, [playerId])

  return { physicalStats, loading }
} 