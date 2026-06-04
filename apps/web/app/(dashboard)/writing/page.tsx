import type { Metadata } from 'next'

import { WritingSetup } from '@/components/writing/WritingSetup'

export const metadata: Metadata = {
  title: 'Luyện viết',
}

export default function WritingPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Luyện viết có hướng dẫn</h1>
        <p className="text-muted-foreground mt-1">
          Chọn chung level và topic trước, sau đó quyết định bạn muốn luyện viết từng câu hay luyện viết lại câu.
        </p>
      </div>
      <WritingSetup />
    </div>
  )
}
