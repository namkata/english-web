import { FileText, Plus } from 'lucide-react'
import Link from 'next/link'

export function VocabHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <FileText size={28} className="text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Bộ từ của tôi</h1>
          <p className="text-sm text-muted-foreground">Từ vựng theo bộ với spaced repetition.</p>
        </div>
      </div>
      <Link href="/vocabulary/add" className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-xl px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity">
        <Plus size={16} /> Thêm từ
      </Link>
    </div>
  )
}
