import Link from 'next/link'
import { BookOpen, History } from 'lucide-react'

export function ReadingHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <BookOpen size={28} className="text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Đọc hiểu</h1>
          <p className="text-sm text-muted-foreground">Luyện đọc hiểu tiếng Anh theo trình độ.</p>
        </div>
      </div>
      <Link href="/reading/history" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground border rounded-xl px-3 py-1.5 transition-colors">
        <History size={14} /> Lịch sử
      </Link>
    </div>
  )
}
