'use client'

import Link from 'next/link'
import { ArrowLeft, Clock, Target } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useLearningStore, useHasHydrated } from '@/lib/stores/learning-store'

const TYPE_LABEL: Record<string, string> = {
  vocabulary: 'Từ vựng',
  grammar: 'Ngữ pháp',
  reading: 'Đọc hiểu',
  listening: 'Luyện nghe',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

interface Props {
  id: string
}

export function QuizHistoryDetail({ id }: Props) {
  const hydrated = useHasHydrated()
  const attempt = useLearningStore(s => s.quizHistory.find(e => e.id === id))

  if (!hydrated) return <div className="h-64 rounded-2xl bg-muted animate-pulse" />

  if (!attempt) {
    return (
      <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
        <div className="flex items-center gap-3">
          <Link
            href="/settings/stats"
            className="rounded-xl p-2 hover:bg-muted transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Không tìm thấy</h1>
            <p className="text-sm text-muted-foreground">
              Bài trắc nghiệm này không tồn tại hoặc đã bị xoá.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <Link
          href="/settings/stats"
          className="rounded-xl p-2 hover:bg-muted transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Chi tiết bài trắc nghiệm</h1>
          <p className="text-sm text-muted-foreground">
            Kết quả và phân tích theo từng loại câu hỏi.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-5 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium">
            <Target size={12} />
            Trình độ {attempt.level.toUpperCase()}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium">
            <Clock size={12} />
            {formatDate(attempt.at)}
          </span>
        </div>

        <div className="flex items-center justify-center gap-8 py-6">
          <div className="text-center">
            <p
              className={cn(
                'text-4xl font-bold',
                attempt.percentage >= 80
                  ? 'text-green-600'
                  : attempt.percentage >= 60
                    ? 'text-amber-600'
                    : 'text-red-600',
              )}
            >
              {attempt.percentage}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">Tổng điểm</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">
              {attempt.correct}/{attempt.total}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Số câu đúng</p>
          </div>
        </div>

        {Object.keys(attempt.byType).length > 0 && (
          <div className="space-y-2 pt-4 border-t">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2">
              Chi tiết theo loại câu hỏi
            </p>
            {Object.entries(attempt.byType).map(([type, { correct, total }]) => {
              const pct = total > 0 ? Math.round((correct / total) * 100) : 0
              return (
                <div
                  key={type}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                >
                  <span className="text-sm font-medium">
                    {TYPE_LABEL[type] ?? type}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {correct}/{total}
                    </span>
                    <span
                      className={cn(
                        'text-sm font-bold min-w-[3rem] text-right',
                        pct >= 80
                          ? 'text-green-600'
                          : pct >= 60
                            ? 'text-amber-600'
                            : 'text-red-600',
                      )}
                    >
                      {pct}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
