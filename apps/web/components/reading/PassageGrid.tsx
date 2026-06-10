'use client'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { apiClient } from '@/lib/api-client'

export function PassageGrid() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['reading', 'passages'],
    queryFn: () => apiClient.reading.listPassages({ limit: 6 }),
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border bg-muted/40 h-48 animate-pulse" />
        ))}
      </div>
    )
  }

  if (error || !data?.items?.length) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Không có bài đọc nào. Vui lòng thử lại sau.</p>
      </div>
    )
  }

  const passages = data.items

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {passages.map((p) => (
        <div key={p.id} className="rounded-2xl border bg-card flex flex-col">
          <div className="p-4 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(
                'text-xs font-medium px-2 py-0.5 rounded-full',
                p.length === 'short' ? 'bg-green-100 text-green-700' : p.length === 'medium' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
              )}>
                {p.length === 'short' ? 'Ngắn' : p.length === 'medium' ? 'Vừa' : 'Dài'}
              </span>
              <span className="text-xs text-muted-foreground">{p.questionCount} câu</span>
            </div>
            <h3 className="font-semibold mb-1">{p.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">{p.content}</p>
          </div>
          <div className="p-4 pt-0">
            <Link href={`/reading/${p.id}`} className="w-full flex items-center justify-center gap-2 rounded-xl border py-2 text-sm font-medium hover:bg-muted transition-colors">
              <BookOpen size={15} /> Làm bài
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
