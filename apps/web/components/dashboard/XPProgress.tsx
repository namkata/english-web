'use client'

import { useQuery } from '@tanstack/react-query'
import { Flame } from 'lucide-react'
import { apiClient } from '@/lib/api-client'
import { formatXP } from '@/lib/utils'

export function XPProgress() {
  const { data: stats } = useQuery({
    queryKey: ['gamification', 'my-stats'],
    queryFn: () => apiClient.gamification.getMyStats(),
    placeholderData: {
      userId: 'demo',
      todayXP: 0,
      dailyGoalXP: 200,
      totalXP: 35,
      streakDays: 0,
      longestStreak: 0,
      weeklyRank: null,
      writingCount: 0,
      readingCount: 0,
    } as any,
  })

  const todayXP = stats?.todayXP ?? 0
  const dailyGoal = stats?.dailyGoalXP ?? 200
  const totalXP = stats?.totalXP ?? 0
  const streak = stats?.streakDays ?? 0
  const progress = Math.min((todayXP / dailyGoal) * 100, 100)

  return (
    <div className="rounded-2xl border bg-card p-5 space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">XP HÔM NAY</p>
          <p className="text-2xl font-bold mt-1">{todayXP}</p>
          <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {progress < 100
              ? `+${25} XP thưởng khi đủ ${dailyGoal}`
              : '🎉 Đã đạt mục tiêu hôm nay!'}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">TỔNG XP</p>
          <p className="text-2xl font-bold mt-1">{formatXP(totalXP)}</p>
          <p className="text-xs text-muted-foreground mt-1">toàn thời gian</p>
        </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">STREAK</p>
            <div className="flex items-center gap-1.5 mt-1">
              <Flame size={20} className="text-orange-500" />
              <p className="text-2xl font-bold">{streak}</p>
              <span className="text-sm text-muted-foreground">ngày</span>
            </div>
            {streak === 0 ? (
              <p className="text-xs text-orange-500 mt-1">Bắt đầu streak</p>
            ) : (
              <p className="text-xs text-green-600 mt-1">Hệ số x{Math.min(streak, 5)}</p>
            )}
          </div>
      </div>
    </div>
  )
}
