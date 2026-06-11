'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Flame } from 'lucide-react'

import { cn } from '@/lib/utils'
import { apiClient } from '@/lib/api-client'

type Period = 'weekly' | 'monthly' | 'all'

const PERIODS: Array<{ value: Period; label: string }> = [
  { value: 'weekly', label: 'Tuần' },
  { value: 'monthly', label: 'Tháng' },
  { value: 'all', label: 'Tổng' },
]

const MEDALS = ['🥇', '🥈', '🥉']

export function Leaderboard() {
  const [period, setPeriod] = useState<Period>('weekly')

  const { data: rows = [], isLoading } = useQuery({
    queryKey: ['gamification', 'leaderboard', period],
    queryFn: () => apiClient.gamification.getLeaderboard(period),
  })

  return (
    <div className="space-y-4">
      <div className="flex rounded-xl border bg-card p-1 w-fit">
        {PERIODS.map(p => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            className={cn(
              'px-4 py-1.5 rounded-lg text-sm font-medium transition-colors',
              period === p.value ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-14 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {rows.map(row => {
            const isMe = row.displayName === 'Bạn'
            return (
              <div
                key={row.userId}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-2xl border',
                  isMe ? 'border-primary bg-primary/5' : 'bg-card',
                )}
              >
                <div className="w-8 text-center font-bold">
                  {row.rank <= 3 ? <span className="text-lg">{MEDALS[row.rank - 1]}</span> : <span className="text-muted-foreground">{row.rank}</span>}
                </div>
                <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-sm font-bold border border-brand-200">
                  {row.displayName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm font-medium', isMe && 'text-primary')}>{row.displayName}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Flame size={11} className="text-orange-500" /> {row.streakDays} ngày
                  </p>
                </div>
                <span className="text-sm font-bold tabular-nums">{row.weeklyXP.toLocaleString('vi-VN')} XP</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
