import { BookMarked } from 'lucide-react'

export function GrammarHeader() {
  return (
    <div className="flex items-center gap-3">
      <BookMarked size={28} className="text-primary" />
      <div>
        <h1 className="text-2xl font-bold">Ngữ pháp & Cấu trúc</h1>
        <p className="text-sm text-muted-foreground">
          Luyện phản xạ, ôn tập ghi nhớ và đọc cấu trúc câu qua các bài tập tương tác.
        </p>
      </div>
    </div>
  )
}
