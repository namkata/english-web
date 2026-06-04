import type { Metadata } from 'next'
import { Headphones } from 'lucide-react'

import { ListeningModules } from '@/components/listening/ListeningModules'

export const metadata: Metadata = {
  title: 'Luyện nghe',
}

export default function ListeningPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-2xl border bg-muted/30 p-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <Headphones size={16} className="text-brand-500" /> Listening
          </span>
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
            Đang hoàn thiện
          </span>
        </div>
        <h1 className="text-4xl font-bold text-foreground">Listening</h1>
      </div>
      <ListeningModules />
    </div>
  )
}
