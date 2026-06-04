
import { Library } from 'lucide-react'

export function WordLibraryBanner() {
  return (
    <div className="rounded-2xl border bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 p-4 flex items-center gap-3">
      <Library size={20} className="text-yellow-700 dark:text-yellow-400 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium">Thư viện từ vựng ↗</p>
        <p className="text-xs text-muted-foreground">9 bộ từ vựng phổ biến TOEIC/IELTS/Giao tiếp</p>
      </div>
    </div>
  )
}
