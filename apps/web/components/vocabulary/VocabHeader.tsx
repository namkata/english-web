import { FileText } from 'lucide-react'

export function VocabHeader() {
  return (
    <div className="flex items-center gap-3">
      <FileText size={28} className="text-primary" />
      <div>
        <h1 className="text-2xl font-bold">Bộ từ của tôi</h1>
        <p className="text-sm text-muted-foreground">Từ vựng theo bộ với spaced repetition.</p>
      </div>
    </div>
  )
}
