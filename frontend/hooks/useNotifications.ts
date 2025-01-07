"use client"

import { useState, useEffect } from 'react'
import notificationsData from '@/data/notifications.json'

interface Notification {
  id: string
  type: 'info' | 'warning' | 'success' | 'error'
  title: string
  message: string
  timestamp: string
  read: boolean
  category: 'match' | 'training' | 'medical' | 'team' | 'system'
  priority: 'low' | 'medium' | 'high'
  link?: {
    url: string
    text: string
  }
  relatedTo?: {
    type: string
    id: string
    name: string
  }
}

interface NotificationsState {
  lastUpdate: string
  teamId: string
  notifications: Notification[]
  unreadCount: number
}

export function useNotifications() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<NotificationsState | null>(null)

  useEffect(() => {
    try {
      setData(notificationsData as NotificationsState)
      setLoading(false)
    } catch (err) {
      setError('Erreur lors du chargement des notifications')
      setLoading(false)
    }
  }, [])

  const getAllNotifications = () => {
    return data?.notifications || []
  }

  const getUnreadNotifications = () => {
    return data?.notifications.filter(notification => !notification.read) || []
  }

  const getNotificationsByType = (type: Notification['type']) => {
    return data?.notifications.filter(notification => notification.type === type) || []
  }

  const getNotificationsByCategory = (category: Notification['category']) => {
    return data?.notifications.filter(notification => notification.category === category) || []
  }

  const getNotificationsByPriority = (priority: Notification['priority']) => {
    return data?.notifications.filter(notification => notification.priority === priority) || []
  }

  const getUnreadCount = () => {
    return data?.unreadCount || 0
  }

  return {
    loading,
    error,
    getAllNotifications,
    getUnreadNotifications,
    getNotificationsByType,
    getNotificationsByCategory,
    getNotificationsByPriority,
    getUnreadCount
  }
} 