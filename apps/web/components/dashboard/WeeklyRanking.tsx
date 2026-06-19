'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'

export function WeeklyRanking() {
  const { data: stats } = useQuery({
    queryKey: ['gamification', 'my-stats'],
    queryFn: () => apiClient.gamification.getMyStats(),
  })

  return (
    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
      <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
        THỨ HẠNG TUẦN
      </p>
      <p className="text-xl font-bold">
        {stats?.weeklyRank ? `Bạn đang ở #${stats.weeklyRank}` : 'Chưa xếp hạng'}
      </p>
      <Link
        href="/leaderboard"
        className="mt-3 inline-block text-sm text-primary font-medium border border-primary/30 rounded-xl px-4 py-1.5 hover:bg-primary/10 transition-colors"
      >
        Xem bảng xếp hạng
      </Link>
    </div>
  )
}
