/**
 * Subscribe to the realtime notification SSE stream.
 *
 * Returns the accumulated notifications, the unread count, and a `markAllRead`
 * action. The EventSource connects on mount and is torn down on unmount.
 */
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export interface Notification {
  id: string
  type: 'streak' | 'challenge' | 'community' | 'system'
  title: string
  body: string
  at: string
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''
const MAX_NOTIFICATIONS = 30

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unread, setUnread] = useState(0)
  const [connected, setConnected] = useState(false)
  const sourceRef = useRef<EventSource | null>(null)

  useEffect(() => {
    const url = `${BASE_URL}/api/v1/notifications/stream`
    let source: EventSource
    try {
      source = new EventSource(url)
    } catch {
      return
    }
    sourceRef.current = source

    source.onopen = () => setConnected(true)
    source.onmessage = event => {
      try {
        const n = JSON.parse(event.data) as Notification
        setNotifications(prev => {
          if (prev.some(p => p.id === n.id)) return prev
          return [n, ...prev].slice(0, MAX_NOTIFICATIONS)
        })
        setUnread(c => c + 1)
      } catch {
        /* ignore malformed event */
      }
    }
    source.onerror = () => setConnected(false)

    return () => {
      source.close()
      sourceRef.current = null
    }
  }, [])

  const markAllRead = useCallback(() => setUnread(0), [])

  return { notifications, unread, connected, markAllRead }
}
