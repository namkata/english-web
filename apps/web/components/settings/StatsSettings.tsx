'use client'

import { useQuery } from '@tanstack/react-query'
import { Flame, Trophy, BookOpen, PenLine, ClipboardList, GraduationCap } from 'lucide-react'

import { apiClient } from '@/lib/api-client'
import { useLearningStore, useHasHydrated } from '@/lib/stores/learning-store'

function StatCard({ icon: Icon, label, value, sub }: { icon: typeof Flame; label: string; value: string | number; sub?: string | undefined }) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <Icon size={20} className="text-primary" />
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  )
}

export function StatsSettings() {
  const hydrated = useHasHydrated()
  const readingHistory = useLearningStore(s => s.readingHistory)
  const writingHistory = useLearningStore(s => s.writingHistory)
  const quizHistory = useLearningStore(s => s.quizHistory)
  const learnedIds = useLearningStore(s => s.learnedIds)

  const { data: stats } = useQuery({
    queryKey: ['gamification', 'me'],
    queryFn: () => apiClient.gamification.getMyStats(),
  })

  if (!hydrated) return <div className="h-64 rounded-2xl bg-muted animate-pulse" />

  const avgWriting = writingHistory.length
    ? Math.round(writingHistory.reduce((a, e) => a + e.score, 0) / writingHistory.length)
    : 0
  const bestQuiz = quizHistory.length ? Math.max(...quizHistory.map(q => q.percentage)) : 0

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Thống kê nhanh</h1>
        <p className="text-sm text-muted-foreground">Tổng quan tiến độ học tập của bạn trên thiết bị này.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard icon={Trophy} label="Tổng XP" value={stats?.totalXP ?? 0} />
        <StatCard icon={Flame} label="Chuỗi ngày" value={`${stats?.streakDays ?? 0} ngày`} sub={`Dài nhất ${stats?.longestStreak ?? 0}`} />
        <StatCard icon={GraduationCap} label="Từ đã thuộc" value={learnedIds.length} />
        <StatCard icon={BookOpen} label="Bài đọc đã làm" value={readingHistory.length} />
        <StatCard icon={PenLine} label="Câu đã viết" value={writingHistory.length} sub={writingHistory.length ? `Điểm TB ${avgWriting}/100` : undefined} />
        <StatCard icon={ClipboardList} label="Quiz đã làm" value={quizHistory.length} sub={quizHistory.length ? `Cao nhất ${bestQuiz}%` : undefined} />
      </div>
    </div>
  )
}
