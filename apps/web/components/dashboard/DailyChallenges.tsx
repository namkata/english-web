'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { apiClient } from '@/lib/api-client'

const MOCK_CHALLENGES = [
  { id: '1', title: 'Bài đọc đạt chuẩn', completedSteps: 0, totalSteps: 1, xpReward: 10, isCompleted: false },
  { id: '2', title: 'Câu đúng Assignment', completedSteps: 0, totalSteps: 10, xpReward: 10, isCompleted: false },
  { id: '3', title: 'Thêm từ vựng mới', completedSteps: 0, totalSteps: 5, xpReward: 5, isCompleted: false },
]

export function DailyChallenges() {
  const { data: challenges = [] } = useQuery({
    queryKey: ['gamification', 'challenges'],
    queryFn: () => apiClient.gamification.getTodayChallenges(),
    initialData: MOCK_CHALLENGES,
  })

  const completed = challenges.filter((c) => c.isCompleted).length
  const total = challenges.length

  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Thử thách hôm nay</h3>
      </div>

      {total > 0 && (
        <div className="mb-3 p-2.5 rounded-xl bg-muted/60">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="bg-primary/15 text-primary font-semibold px-2 py-0.5 rounded-full">
              {completed}/{total} XONG
            </span>
            <span className="text-muted-foreground">Còn {total - completed} task</span>
          </div>
          <p className="text-xs font-medium">
            {challenges[0]?.title ?? 'Ưu tiên đọc + bài tập để hoàn thành'}
          </p>
          <div className="mt-2 h-1 rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="flex items-center gap-3">
            <div
              className={cn(
                'w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center',
                challenge.isCompleted
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'border-muted-foreground',
              )}
            >
              {challenge.isCompleted && (
                <svg viewBox="0 0 12 10" className="w-2.5 h-2.5" fill="none">
                  <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{challenge.title}</p>
              <p className="text-xs text-muted-foreground">
                {challenge.completedSteps}/{challenge.totalSteps} · Thưởng +{challenge.xpReward} XP
              </p>
            </div>
            <ChevronRight size={14} className="text-muted-foreground flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}
