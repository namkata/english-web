'use client'
import { Sparkles } from 'lucide-react'

export function AIGenerateCard() {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 p-5 flex items-center justify-between">
      <div>
        <h3 className="font-semibold">Tạo đề bằng AI</h3>
        <p className="text-sm text-muted-foreground mt-0.5">AI sẽ tạo một đoạn văn tiếng Anh cùng câu hỏi trắc nghiệm phù hợp trình độ.</p>
      </div>
      <button className="flex items-center gap-2 bg-primary text-primary-foreground rounded-xl px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
        <Sparkles size={15} /> Mở trình tạo đề
      </button>
    </div>
  )
}
