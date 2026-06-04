'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lightbulb, MessageSquare, Bug, Send, Loader2, CheckCircle } from 'lucide-react'
import { z } from 'zod'
import { cn } from '@/lib/utils'

const FeedbackSchema = z.object({
  type: z.enum(['feature', 'general', 'bug']),
  name: z.string().min(2, 'Vui lòng nhập tên của bạn').max(100),
  contact: z.string().min(3, 'Vui lòng nhập email hoặc cách liên hệ'),
  content: z.string().min(10, 'Nội dung phải có ít nhất 10 ký tự').max(2000),
})

type FeedbackInput = z.infer<typeof FeedbackSchema>

const FEEDBACK_TYPES = [
  { value: 'feature' as const, label: 'Gợi ý tính năng', icon: Lightbulb, desc: 'Đề xuất tính năng mới hoặc cải thiện' },
  { value: 'general' as const, label: 'Góp ý chung', icon: MessageSquare, desc: 'Chia sẻ trải nghiệm, nhận xét, đánh giá' },
  { value: 'bug' as const, label: 'Báo lỗi', icon: Bug, desc: 'Báo lỗi ứng dụng, tính năng không hoạt động' },
]

const CONTENT_PLACEHOLDERS: Record<FeedbackInput['type'], string> = {
  feature: 'Mô tả tính năng bạn mong muốn:\n\n1. Bạn muốn tính năng gì?\n2. Tính năng này giúp ích gì cho việc học của bạn?\n3. Bạn hình dung nó hoạt động thế nào?\n\nMọi ý tưởng đều quý giá — đừng ngại chia sẻ!',
  general: 'Chia sẻ trải nghiệm của bạn với English Web...',
  bug: 'Mô tả lỗi bạn gặp phải:\n\n1. Bạn đang làm gì khi lỗi xảy ra?\n2. Lỗi xuất hiện như thế nào?\n3. Thiết bị / trình duyệt bạn đang dùng?',
}

export function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackInput>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: { type: 'feature' },
  })

  const selectedType = watch('type')
  const contentLength = watch('content')?.length ?? 0

  const onSubmit = async (_data: FeedbackInput) => {
    // TODO: call API when feedback endpoint is ready
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <CheckCircle size={48} className="text-primary" />
        <h2 className="text-xl font-semibold">Cảm ơn bạn đã phản hồi!</h2>
        <p className="text-muted-foreground">Ý kiến của bạn giúp tôi cải thiện English Web mỗi ngày.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm text-primary font-medium hover:underline"
        >
          Gửi phản hồi khác
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Type selection */}
      <div className="grid grid-cols-3 gap-3">
        {FEEDBACK_TYPES.map(({ value, label, icon: Icon, desc }) => (
          <button
            key={value}
            type="button"
            onClick={() => setValue('type', value)}
            className={cn(
              'flex flex-col gap-2 p-4 rounded-2xl border text-left transition-colors',
              selectedType === value
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-muted-foreground',
            )}
          >
            <Icon size={20} className={selectedType === value ? 'text-primary' : 'text-muted-foreground'} />
            <p className="text-sm font-medium">{label}</p>
            <p className="text-xs text-muted-foreground leading-snug">{desc}</p>
          </button>
        ))}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">Tên của bạn</label>
        <input
          placeholder="Nhập tên để tôi có thể phản hồi bạn..."
          className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          {...register('name')}
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">Email / phương thức liên hệ</label>
        <input
          placeholder="email@example.com"
          className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          {...register('contact')}
        />
        {errors.contact && <p className="text-xs text-destructive">{errors.contact.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">
          Nội dung chi tiết <span className="text-destructive">*</span>
        </label>
        <textarea
          rows={8}
          placeholder={CONTENT_PLACEHOLDERS[selectedType]}
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
          {...register('content')}
        />
        <div className="flex items-center justify-between">
          {errors.content ? (
            <p className="text-xs text-destructive">{errors.content.message}</p>
          ) : (
            <span />
          )}
          <p className="text-xs text-muted-foreground">{contentLength} / 2000</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-3 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        Gửi phản hồi
      </button>
    </form>
  )
}
