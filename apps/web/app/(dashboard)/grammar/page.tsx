import type { Metadata } from 'next'

import { GrammarStats } from '@/components/grammar/GrammarStats'
import { GrammarTopics } from '@/components/grammar/GrammarTopics'

export const metadata: Metadata = {
  title: 'Ngữ pháp & Số lỗi',
}

export default function GrammarPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Ngữ pháp & Số lỗi</h1>
        <p className="text-muted-foreground mt-1">
          Ôn tập các quy tắc ngữ pháp và rà lỗi hay gặp để sửa đúng ngay trong bài học.
        </p>
      </div>
      <GrammarStats />
      <GrammarTopics />
    </div>
  )
}
