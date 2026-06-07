import { Volume2 } from 'lucide-react'

export function PronunciationHeader() {
  return (
    <div className="flex items-center gap-3">
      <Volume2 size={28} className="text-primary" />
      <div>
        <h1 className="text-2xl font-bold">Luyện phát âm</h1>
        <p className="text-sm text-muted-foreground">
          Luyện âm đơn, từ vựng và câu hoàn chỉnh để phát âm chuẩn như người bản xứ.
        </p>
      </div>
    </div>
  )
}
