'use client'

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'

export function GrammarTopics() {
  const { data, isLoading } = useQuery({
    queryKey: ['grammar', 'topics'],
    queryFn: () => apiClient.grammar.getTopics(),
  })

  if (isLoading) return <div className="h-32 rounded-2xl bg-muted animate-pulse" />

  const topics = data?.topics ?? []
  if (topics.length === 0) return null

  return (
    <div className="space-y-2">
      {topics.map(t => (
        <div key={t.label} className="flex items-center justify-between p-4 rounded-2xl border bg-card">
          <span className="text-sm font-medium">{t.label}</span>
          <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">{t.count} lỗi</span>
        </div>
      ))}
    </div>
  )
}
