'use client'
import { Sparkles } from 'lucide-react'

export function AIGenerateCard() {
  return (
    <div className="relative rounded-2xl bg-gradient-to-r from-brand-50 to-white border border-brand-200 p-5 flex items-center justify-between overflow-hidden">
      <Sparkles size={80} className="absolute right-8 top-1/2 -translate-y-1/2 text-brand-200/40 pointer-events-none" strokeWidth={1} />
      <div className="relative z-10">
        <h3 className="font-semibold">Tạo đề bằng AI</h3>
        <p className="text-sm text-muted-foreground mt-0.5">AI sẽ tạo một đoạn văn tiếng Anh cùng câu hỏi trắc nghiệm phù hợp trình độ.</p>
      </div>
      <button className="relative z-10 flex items-center gap-2 bg-primary text-primary-foreground rounded-xl px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
        <Sparkles size={15} /> Mở trình tạo đề
      </button>
    </div>
  )
}
