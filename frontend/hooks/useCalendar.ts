"use client"

import { useState, useEffect } from 'react'
import calendarData from '@/data/calendar.json'

interface Event {
  id: string
  type: 'match' | 'training' | 'recovery' | 'travel' | 'media'
  title: string
  description?: string
  startDate: string
  endDate: string
  location: string
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  competition?: string
  opponent?: string
  score?: {
    home: number
    away: number
  }
  attendance?: number
  broadcast?: {
    channel: string
    streamingPlatform: string
  }
  intensity?: 'low' | 'medium' | 'high'
  participants?: {
    id: string
    firstName: string
    lastName: string
    status: 'present' | 'absent' | 'doubtful'
  }[]
}

interface CalendarState {
  lastUpdate: string
  teamId: string
  season: string
  events: Event[]
  upcomingEvents: Event[]
  completedEvents: Event[]
}

export function useCalendar() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<CalendarState | null>(null)

  useEffect(() => {
    try {
      setData(calendarData as CalendarState)
      setLoading(false)
    } catch (err) {
      setError('Erreur lors du chargement des données du calendrier')
      setLoading(false)
    }
  }, [])

  const getAllEvents = () => {
    return data?.events || []
  }

  const getUpcomingEvents = () => {
    return data?.upcomingEvents || []
  }

  const getCompletedEvents = () => {
    return data?.completedEvents || []
  }

  const getEventById = (eventId: string) => {
    return data?.events.find(event => event.id === eventId)
  }

  const getEventsByType = (type: Event['type']) => {
    return data?.events.filter(event => event.type === type) || []
  }

  const getEventsByStatus = (status: Event['status']) => {
    return data?.events.filter(event => event.status === status) || []
  }

  const getEventsByDateRange = (startDate: string, endDate: string) => {
    return data?.events.filter(event => {
      const eventDate = new Date(event.startDate)
      return eventDate >= new Date(startDate) && eventDate <= new Date(endDate)
    }) || []
  }

  const getEventsByCompetition = (competition: string) => {
    return data?.events.filter(event => event.competition === competition) || []
  }

  return {
    loading,
    error,
    getAllEvents,
    getUpcomingEvents,
    getCompletedEvents,
    getEventById,
    getEventsByType,
    getEventsByStatus,
    getEventsByDateRange,
    getEventsByCompetition
  }
} 