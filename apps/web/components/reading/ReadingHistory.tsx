'use client'

import Link from 'next/link'
import { ArrowLeft, BookOpen } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useLearningStore, useHasHydrated } from '@/lib/stores/learning-store'

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function ReadingHistory() {
  const hydrated = useHasHydrated()
  const readingHistory = useLearningStore(s => s.readingHistory)

  if (!hydrated) return <div className="h-64 rounded-2xl bg-muted animate-pulse" />

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <Link
          href="/reading"
          className="rounded-xl p-2 hover:bg-muted transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Lịch sử đọc hiểu</h1>
          <p className="text-sm text-muted-foreground">
            Các bài đọc bạn đã làm và điểm số tương ứng.
          </p>
        </div>
      </div>

      {readingHistory.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-muted p-8 flex flex-col items-center gap-2 text-center">
          <BookOpen size={24} className="text-muted-foreground" />
          <p className="font-medium text-sm">Chưa có bài đọc nào</p>
          <p className="text-xs text-muted-foreground">
            Hãy luyện đọc hiểu để theo dõi tiến bộ của bạn tại đây.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {readingHistory.map(a => (
            <div key={a.id} className="rounded-2xl border bg-card p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-sm truncate flex-1">{a.title}</p>
                <span
                  className={cn(
                    'ml-3 text-sm font-bold flex-shrink-0',
                    a.percentage >= 80
                      ? 'text-green-600'
                      : a.percentage >= 60
                        ? 'text-amber-600'
                        : 'text-red-600',
                  )}
                >
                  {a.score}/{a.total}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span
                  className={cn(
                    'px-1.5 py-0.5 rounded font-medium',
                    a.percentage >= 80
                      ? 'bg-green-100 text-green-700'
                      : a.percentage >= 60
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700',
                  )}
                >
                  {a.percentage}%
                </span>
                <span>{formatDate(a.at)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
