'use client'
import { useState } from 'react'
import { RefreshCw, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CEFRLevel } from '@english-web/types'

const LEVELS: Array<{ key: 'all' | CEFRLevel; label: string; count?: number }> = [
  { key: 'all', label: 'Đổi bài' },
  { key: 'A1', label: 'A1', count: 7 },
  { key: 'A2', label: 'A2', count: 7 },
  { key: 'B1', label: 'B1', count: 11 },
  { key: 'B2', label: 'B2', count: 9 },
  { key: 'C1', label: 'C1', count: 8 },
  { key: 'C2', label: 'C2', count: 6 },
]

export function LevelFilter() {
  const [selected, setSelected] = useState<'all' | CEFRLevel>('A1')

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {LEVELS.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => setSelected(key)}
          className={cn(
            'flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium border transition-colors',
            selected === key ? 'bg-foreground text-background border-foreground' : 'border-border hover:border-muted-foreground',
          )}
        >
          {key === 'all' && <RefreshCw size={12} />}
          {label}{count ? ` (${count})` : ''}
        </button>
      ))}
      <div className="ml-auto flex items-center gap-2 border rounded-full px-3 py-1.5">
        <Search size={14} className="text-muted-foreground" />
        <input placeholder="Tìm theo chủ đề hoặc từ khoá..." className="bg-transparent text-sm outline-none w-48" />
      </div>
    </div>
  )
}
