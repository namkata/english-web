'use client'

import { useLearningStore, useHasHydrated } from '@/lib/stores/learning-store'

export function GrammarStats() {
  const hydrated = useHasHydrated()
  const readingHistory = useLearningStore(s => s.readingHistory)
  const quizHistory = useLearningStore(s => s.quizHistory)

  if (!hydrated) return <div className="h-24 rounded-2xl bg-muted animate-pulse" />

  const totalErrors = Object.keys(
    [...quizHistory.flatMap(q => Object.keys(q.byType)), ...readingHistory.map(r => r.passageId)]
      .reduce((acc, k) => { (acc as Record<string, true>)[k] = true; return acc }, {} as Record<string, true>)
  ).length

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-2xl border bg-card p-4">
        <p className="text-2xl font-bold">{totalErrors}</p>
        <p className="text-sm text-muted-foreground">lỗi đã ghi nhận</p>
      </div>
      <div className="rounded-2xl border bg-card p-4">
        <p className="text-2xl font-bold">3</p>
        <p className="text-sm text-muted-foreground">chủ điểm ngữ pháp</p>
      </div>
    </div>
  )
}
