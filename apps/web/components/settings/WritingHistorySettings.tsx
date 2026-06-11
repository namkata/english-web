'use client'

import { History } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useLearningStore, useHasHydrated } from '@/lib/stores/learning-store'

const MODE_LABEL: Record<string, string> = {
  sentence_writing: 'Viết câu',
  sentence_rewrite: 'Viết lại câu',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}

export function WritingHistorySettings() {
  const hydrated = useHasHydrated()
  const writingHistory = useLearningStore(s => s.writingHistory)

  if (!hydrated) return <div className="h-64 rounded-2xl bg-muted animate-pulse" />

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Lịch sử bài viết</h1>
        <p className="text-sm text-muted-foreground">Các câu bạn đã luyện viết và điểm AI chấm.</p>
      </div>

      {writingHistory.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-muted p-8 flex flex-col items-center gap-2 text-center">
          <History size={24} className="text-muted-foreground" />
          <p className="font-medium text-sm">Chưa có bài viết nào</p>
          <p className="text-xs text-muted-foreground">Hãy luyện viết để xem lịch sử và tiến bộ của bạn tại đây.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {writingHistory.map(e => (
            <div key={e.id} className="rounded-2xl border bg-card p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                <span className="bg-muted px-2 py-0.5 rounded-full font-medium">{MODE_LABEL[e.mode] ?? e.mode}</span>
                <span>{e.topic}</span>
                <span className="ml-auto">{formatDate(e.at)}</span>
              </div>
              <p className="text-sm text-muted-foreground">Đề: {e.prompt}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm font-medium truncate flex-1">{e.userSentence}</p>
                <span
                  className={cn(
                    'ml-3 text-sm font-bold flex-shrink-0',
                    e.score >= 80 ? 'text-green-600' : e.score >= 60 ? 'text-amber-600' : 'text-red-600',
                  )}
                >
                  {e.score}/100
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
