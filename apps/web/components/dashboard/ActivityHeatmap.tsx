'use client'

import { useQuery } from '@tanstack/react-query'
import { cn } from '@/lib/utils'
import { apiClient } from '@/lib/api-client'

const INTENSITY_COLORS = [
  'bg-muted',          // 0 — no activity
  'bg-primary/20',     // 1 — low
  'bg-primary/40',     // 2 — medium-low
  'bg-primary/70',     // 3 — medium-high
  'bg-primary',        // 4 — high
]

const MOCK_ACTIVITY = Array.from({ length: 91 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (90 - i))
  const dateStr = date.toISOString().split('T')[0]!
  const intensity = Math.random() > 0.6 ? Math.floor(Math.random() * 4) + 1 : 0
  return { date: dateStr, intensity, xp: intensity * 25 }
})

export function ActivityHeatmap() {
  const { data: activity = [] } = useQuery({
    queryKey: ['gamification', 'activity'],
    queryFn: () => apiClient.gamification.getActivityHeatmap(3),
    placeholderData: MOCK_ACTIVITY as any,
  })

  // Build a 13-week × 7-day grid (91 cells)
  const today = new Date()
  const cells = Array.from({ length: 91 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (90 - i))
    const dateStr = date.toISOString().split('T')[0]!
    const entry = activity.find((a) => a.date === dateStr)
    return { date: dateStr, intensity: entry?.intensity ?? 0, xp: entry?.xp ?? 0 }
  })

  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold">Hoạt động luyện tập</h3>
          <p className="text-xs text-muted-foreground">
            Bạn đã hoàn thành {activity.filter((a) => a.xp > 0).length} bài học trong 3 tháng gần nhất
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Ít</span>
          {INTENSITY_COLORS.map((color, i) => (
            <div key={i} className={cn('w-3 h-3 rounded-sm', color)} />
          ))}
          <span>Nhiều</span>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(13,1fr)] gap-1">
        {Array.from({ length: 13 }, (_, week) =>
          cells.slice(week * 7, week * 7 + 7).map((cell) => (
            <div
              key={cell.date}
              title={`${cell.date}: ${cell.xp} XP`}
              className={cn('w-full aspect-square rounded-sm cursor-default', INTENSITY_COLORS[cell.intensity])}
            />
          )),
        )}
      </div>
    </div>
  )
}
