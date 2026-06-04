import type { Metadata } from 'next'

import { FeedbackForm } from '@/components/feedback/FeedbackForm'

export const metadata: Metadata = {
  title: 'Gửi phản hồi',
}

export default function FeedbackPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Gửi phản hồi</h1>
        <p className="text-muted-foreground mt-1">Ý kiến của bạn giúp tôi xây dựng sản phẩm tốt hơn mỗi ngày.</p>
      </div>
      <FeedbackForm />
    </div>
  )
}
