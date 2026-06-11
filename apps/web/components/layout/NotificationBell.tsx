'use client'

import { useEffect, useRef, useState } from 'react'
import { Bell, Flame, Trophy, Users, Info } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useNotifications, type Notification } from '@/lib/hooks/useNotifications'

const ICONS: Record<Notification['type'], typeof Bell> = {
  streak: Flame,
  challenge: Trophy,
  community: Users,
  system: Info,
}

const ICON_COLOR: Record<Notification['type'], string> = {
  streak: 'text-orange-500',
  challenge: 'text-amber-500',
  community: 'text-blue-500',
  system: 'text-muted-foreground',
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60_000)
  if (m < 1) return 'vừa xong'
  if (m < 60) return `${m} phút trước`
  return `${Math.floor(m / 60)} giờ trước`
}

export function NotificationBell() {
  const { notifications, unread, markAllRead } = useNotifications()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  const toggle = () => {
    setOpen(o => {
      const next = !o
      if (next) markAllRead()
      return next
    })
  }

  return (
    <div className="relative" ref={ref}>
      <button onClick={toggle} className="relative rounded-xl border p-2.5 hover:bg-muted transition-colors">
        <Bell size={20} />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-primary text-primary-foreground rounded-full text-[10px] font-bold flex items-center justify-center">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
        <span className="sr-only">Thông báo</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-2xl border bg-card shadow-lg z-50 animate-fade-in">
          <div className="flex items-center justify-between px-4 py-3 border-b sticky top-0 bg-card">
            <span className="font-semibold text-sm">Thông báo</span>
            <span className="text-xs text-muted-foreground">{notifications.length} mục</span>
          </div>

          {notifications.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">Chưa có thông báo nào.</div>
          ) : (
            <div className="divide-y">
              {notifications.map(n => {
                const Icon = ICONS[n.type]
                return (
                  <div key={n.id} className="flex gap-3 px-4 py-3 hover:bg-muted/50 transition-colors">
                    <Icon size={18} className={cn('flex-shrink-0 mt-0.5', ICON_COLOR[n.type])} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{n.body}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{timeAgo(n.at)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
