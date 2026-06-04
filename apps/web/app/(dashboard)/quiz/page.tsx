import type { Metadata } from 'next'

import { QuizSetup } from '@/components/quiz/QuizSetup'

export const metadata: Metadata = {
  title: 'Trắc nghiệm',
}

export default function QuizPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Bài tập trắc nghiệm</h1>
        <p className="text-muted-foreground mt-1">
          Tạo đề theo chủ đề, trình độ và dạng câu hỏi bạn muốn, với giao diện mới đồng bộ cùng các khu vực đã được làm lại.
        </p>
      </div>
      <QuizSetup />
    </div>
  )
}
