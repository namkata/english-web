'use client'

import Link from 'next/link'
import { ArrowLeft, Clock, Tag, Zap } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useLearningStore, useHasHydrated } from '@/lib/stores/learning-store'

const MODE_LABEL: Record<string, string> = {
  sentence_writing: 'Viết câu',
  sentence_rewrite: 'Viết lại câu',
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

export function WritingHistoryDetail({ id }: Props) {
  const hydrated = useHasHydrated()
  const entry = useLearningStore(s => s.writingHistory.find(e => e.id === id))

  if (!hydrated) return <div className="h-64 rounded-2xl bg-muted animate-pulse" />

  if (!entry) {
    return (
      <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
        <div className="flex items-center gap-3">
          <Link
            href="/settings/writing-history"
            className="rounded-xl p-2 hover:bg-muted transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Không tìm thấy</h1>
            <p className="text-sm text-muted-foreground">
              Bài viết này không tồn tại hoặc đã bị xoá.
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
          href="/settings/writing-history"
          className="rounded-xl p-2 hover:bg-muted transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Chi tiết bài viết</h1>
          <p className="text-sm text-muted-foreground">
            Xem lại câu bạn đã viết và điểm số.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-5 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium">
            <Zap size={12} />
            {MODE_LABEL[entry.mode] ?? entry.mode}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium">
            <Tag size={12} />
            {entry.topic}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium">
            <Clock size={12} />
            {formatDate(entry.at)}
          </span>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
            Đề bài
          </p>
          <p className="text-sm text-muted-foreground bg-muted/50 rounded-xl p-3">
            {entry.prompt}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
            Câu trả lời của bạn
          </p>
          <p className="text-sm font-medium bg-primary/5 border border-primary/10 rounded-xl p-3">
            {entry.userSentence}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <p className="text-sm text-muted-foreground">Điểm AI chấm</p>
          <span
            className={cn(
              'text-xl font-bold',
              entry.score >= 80
                ? 'text-green-600'
                : entry.score >= 60
                  ? 'text-amber-600'
                  : 'text-red-600',
            )}
          >
            {entry.score}/100
          </span>
        </div>
      </div>
    </div>
  )
}
