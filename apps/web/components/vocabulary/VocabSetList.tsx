'use client'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { cn } from '@/lib/utils'

const MOCK_SETS = [
  { id: '1', name: 'Thư viện từ vựng', totalWords: 9, learnedWords: 0, progressPercent: 0 },
  { id: '2', name: 'TOEIC 600 - Office', totalWords: 12, learnedWords: 12, progressPercent: 100 },
  { id: '3', name: 'TOEIC 600 - Meetings & Email', totalWords: 12, learnedWords: 0, progressPercent: 0 },
  { id: '4', name: 'Travel English - Star...', totalWords: 12, learnedWords: 0, progressPercent: 0 },
]

export function VocabSetList() {
  const { data: sets = [] } = useQuery({
    queryKey: ['vocabulary', 'sets'],
    queryFn: () => apiClient.vocabulary.listSets(),
    initialData: MOCK_SETS,
  })

  if (!sets.length) return (
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-16 rounded-2xl bg-muted animate-pulse" />
      ))}
    </div>
  )

  return (
    <div className="space-y-2">
      {sets.map(set => (
        <Link key={set.id} href={`/vocabulary/${set.id}`}
          className="flex items-center justify-between p-4 rounded-2xl border bg-card hover:border-primary/40 transition-colors">
          <div>
            <p className="font-medium text-sm">{set.name}</p>
            <p className="text-xs text-muted-foreground">{set.totalWords} từ · {set.learnedWords} đã thuộc · Cập nhật tuần trước</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={cn('text-sm font-semibold', set.progressPercent === 100 ? 'text-green-600' : 'text-muted-foreground')}>
              {set.progressPercent}%
            </span>
            <div className="w-24 h-1.5 rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${set.progressPercent}%` }} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
