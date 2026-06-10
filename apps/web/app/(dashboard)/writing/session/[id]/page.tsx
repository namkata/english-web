'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { Send, Loader2, CheckCircle2, AlertTriangle, ArrowLeft, Lightbulb } from 'lucide-react'
import { apiClient } from '@/lib/api-client'

const MOCK_SENTENCES = [
  { id: '1', prompt: 'Describe your morning routine.', hint: 'I wake up at... Then I...', vietnamese: 'Mô tả thói quen buổi sáng của bạn.' },
  { id: '2', prompt: 'What did you do last weekend?', hint: 'Last weekend, I...', vietnamese: 'Bạn đã làm gì cuối tuần trước?' },
  { id: '3', prompt: 'Describe your best friend.', hint: 'My best friend is... He/She...', vietnamese: 'Mô tả người bạn thân nhất của bạn.' },
  { id: '4', prompt: 'What is your favourite food?', hint: 'My favourite food is... I like it because...', vietnamese: 'Món ăn yêu thích của bạn là gì?' },
  { id: '5', prompt: 'Where do you want to travel?', hint: 'I want to travel to... because...', vietnamese: 'Bạn muốn đi du lịch ở đâu?' },
]

interface FeedbackData {
  sentenceId: string
  userSentence: string
  score: number
  grammarErrors: Array<{ word: string; suggestion: string; rule: string }>
  vocabularyFeedback: string
  overallFeedback: string
  improvedVersion: string
}

export default function WritingSessionPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState<FeedbackData | null>(null)

  const submitMutation = useMutation({
    mutationFn: (userSentence: string) => apiClient.writing.submitSentence('demo-session', userSentence),
    onSuccess: (data: any) => {
      setFeedback(data as FeedbackData)
    },
  })

  const sentence = MOCK_SENTENCES[currentIndex]
  if (!sentence) return null

  const handleSubmit = () => {
    if (!input.trim()) return
    submitMutation.mutate(input)
  }

  const handleNext = () => {
    setCurrentIndex(i => Math.min(i + 1, MOCK_SENTENCES.length - 1))
    setInput('')
    setFeedback(null)
  }

  const scoreColor = feedback ? (feedback.score >= 80 ? 'text-green-600' : feedback.score >= 60 ? 'text-amber-600' : 'text-red-600') : ''

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-xl font-bold">Luyện viết câu</h1>
          <p className="text-sm text-muted-foreground">
            Câu {currentIndex + 1} / {MOCK_SENTENCES.length}
          </p>
        </div>
        <div className="ml-auto">
          <div className="h-1.5 w-32 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((currentIndex + 1) / MOCK_SENTENCES.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Prompt */}
      <div className="rounded-2xl border bg-card p-6 space-y-4">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase">Câu hỏi gợi ý</p>
          <p className="text-lg font-medium">{sentence.prompt}</p>
          <p className="text-sm text-muted-foreground">{sentence.vietnamese}</p>
        </div>

        <div className="p-3 rounded-xl bg-muted/50">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={14} className="text-amber-500" />
            <span className="text-xs font-medium text-amber-600">Gợi ý bắt đầu</span>
          </div>
          <p className="text-sm text-muted-foreground">{sentence.hint}</p>
        </div>
      </div>

      {/* Input */}
      {!feedback && (
        <div className="rounded-2xl border bg-card p-6 space-y-4">
          <p className="text-sm font-medium">Viết câu trả lời của bạn:</p>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Nhập câu tiếng Anh của bạn..."
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring min-h-[120px] resize-y"
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || submitMutation.isPending}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {submitMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            {submitMutation.isPending ? 'Đang chấm...' : 'Gửi và nhận phản hồi'}
          </button>
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div className="space-y-4 animate-fade-in">
          <div className="rounded-2xl border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Kết quả chấm điểm</h3>
              <span className={`text-2xl font-bold ${scoreColor}`}>{feedback.score}/100</span>
            </div>

            <div className="p-3 rounded-xl bg-muted/50">
              <p className="text-sm font-medium">Câu của bạn:</p>
              <p className="text-sm text-muted-foreground">{feedback.userSentence}</p>
            </div>

            {feedback.grammarErrors.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium flex items-center gap-1">
                  <AlertTriangle size={14} className="text-amber-500" /> Lỗi ngữ pháp
                </p>
                {feedback.grammarErrors.map((err, i) => (
                  <div key={i} className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-sm">
                    <span className="line-through text-red-500">{err.word}</span>
                    {' → '}
                    <span className="text-green-600 font-medium">{err.suggestion}</span>
                    <p className="text-xs text-amber-700 mt-1">{err.rule}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <p className="text-sm font-medium flex items-center gap-1">
                <Lightbulb size={14} className="text-blue-500" /> Nhận xét từ vựng
              </p>
              <p className="text-sm text-muted-foreground">{feedback.vocabularyFeedback}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium flex items-center gap-1">
                <CheckCircle2 size={14} className="text-green-500" /> Đánh giá tổng quan
              </p>
              <p className="text-sm text-muted-foreground">{feedback.overallFeedback}</p>
            </div>
          </div>

          {currentIndex < MOCK_SENTENCES.length - 1 ? (
            <button onClick={handleNext} className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90">
              Câu tiếp theo →
            </button>
          ) : (
            <button onClick={() => router.push('/writing')} className="w-full py-3 bg-green-600 text-white rounded-xl text-sm font-medium hover:opacity-90">
              Hoàn thành! Quay về
            </button>
          )}
        </div>
      )}
    </div>
  )
}
