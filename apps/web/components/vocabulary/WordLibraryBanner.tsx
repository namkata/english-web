import Link from 'next/link'
import { Library, ChevronRight } from 'lucide-react'

export function WordLibraryBanner() {
  return (
    <Link
      href="/vocabulary/library"
      className="rounded-2xl border bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 p-4 flex items-center gap-3 hover:border-yellow-400 transition-colors"
    >
      <Library size={20} className="text-yellow-700 dark:text-yellow-400 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium">Thư viện từ vựng</p>
        <p className="text-xs text-muted-foreground">Tra cứu, tìm kiếm và lọc theo trạng thái học</p>
      </div>
      <ChevronRight size={18} className="text-muted-foreground" />
    </Link>
  )
}
