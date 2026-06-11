'use client'

import Link from 'next/link'
import { Check, Sparkles, Key } from 'lucide-react'

const SYSTEM_FEATURES = [
  'Chấm điểm bài viết bằng AI (giới hạn hằng ngày)',
  'Tạo quiz tự động theo trình độ',
  'Gợi ý chủ đề luyện viết',
]

const OWN_KEY_FEATURES = [
  'Không giới hạn lượt gọi AI',
  'Chọn model bất kỳ (GPT-4o, Claude, Gemini...)',
  'API key lưu riêng trên thiết bị của bạn',
]

export function PlanSettings() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Nâng cấp gói AI</h1>
        <p className="text-sm text-muted-foreground">So sánh gói AI hệ thống và dùng API key riêng của bạn.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* System plan */}
        <div className="rounded-2xl border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-primary" />
            <h2 className="font-semibold">Gói AI hệ thống</h2>
            <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Đang dùng</span>
          </div>
          <p className="text-3xl font-bold">Miễn phí</p>
          <ul className="space-y-2">
            {SYSTEM_FEATURES.map(f => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <Check size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Own key */}
        <div className="rounded-2xl border-2 border-primary bg-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Key size={18} className="text-primary" />
            <h2 className="font-semibold">Dùng API riêng</h2>
            <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Khuyên dùng</span>
          </div>
          <p className="text-3xl font-bold">
            Tự trả phí <span className="text-sm font-normal text-muted-foreground">theo provider</span>
          </p>
          <ul className="space-y-2">
            {OWN_KEY_FEATURES.map(f => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <Check size={16} className="text-primary flex-shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/settings/ai-provider"
            className="block text-center px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Thêm API provider →
          </Link>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        English Web không lưu API key của bạn trên máy chủ. Mọi khóa được giữ cục bộ trên thiết bị này.
      </p>
    </div>
  )
}
