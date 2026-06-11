'use client'

import { Suspense, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { Send, Loader2, CheckCircle2, AlertTriangle, ArrowLeft, Lightbulb, RefreshCw } from 'lucide-react'

import { apiClient } from '@/lib/api-client'
import { useLearningStore } from '@/lib/stores/learning-store'
import { getSentencesByLevel } from '@/lib/seed-data/sentences'

type WritingMode = 'sentence_writing' | 'sentence_rewrite'

interface PracticeItem {
  id: string
  /** What the learner reads — a prompt to answer, or a sentence to rewrite. */
  prompt: string
  /** Vietnamese gloss / translation. */
  vietnamese: string
  /** Starter hint shown under the prompt. */
  hint: string
}

interface FeedbackData {
  sentenceId: string
  userSentence: string
  score: number
  grammarErrors: Array<{ word: string; suggestion: string; rule: string }>
  vocabularyFeedback: string
  overallFeedback: string
  improvedVersion: string
}

const WRITING_PROMPTS: PracticeItem[] = [
  { id: 'w1', prompt: 'Describe your morning routine.', vietnamese: 'Mô tả thói quen buổi sáng của bạn.', hint: 'I wake up at... Then I...' },
  { id: 'w2', prompt: 'What did you do last weekend?', vietnamese: 'Bạn đã làm gì cuối tuần trước?', hint: 'Last weekend, I...' },
  { id: 'w3', prompt: 'Describe your best friend.', vietnamese: 'Mô tả người bạn thân nhất của bạn.', hint: 'My best friend is... He/She...' },
  { id: 'w4', prompt: 'What is your favourite food?', vietnamese: 'Món ăn yêu thích của bạn là gì?', hint: 'My favourite food is... I like it because...' },
  { id: 'w5', prompt: 'Where do you want to travel?', vietnamese: 'Bạn muốn đi du lịch ở đâu?', hint: 'I want to travel to... because...' },
]

function buildItems(mode: WritingMode, difficulty: string): PracticeItem[] {
  if (mode === 'sentence_rewrite') {
    const level = difficulty === 'easy' ? 'A1' : 'A2'
    return getSentencesByLevel(level)
      .slice(0, 5)
      .map(s => ({
        id: s.id,
        prompt: s.english,
        vietnamese: s.vietnamese,
        hint: 'Diễn đạt lại câu trên theo một cách khác mà vẫn giữ nguyên nghĩa.',
      }))
  }
  return WRITING_PROMPTS
}

function WritingSession() {
  const router = useRouter()
  const search = useSearchParams()
  const logWriting = useLearningStore(s => s.logWriting)

  const mode = (search.get('mode') as WritingMode) || 'sentence_writing'
  const topic = search.get('topic') || 'General'
  const difficulty = search.get('difficulty') || 'easy'

  const items = useMemo(() => buildItems(mode, difficulty), [mode, difficulty])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState<FeedbackData | null>(null)
  const [scores, setScores] = useState<number[]>([])

  const item = items[currentIndex]

  const submitMutation = useMutation({
    mutationFn: async (userSentence: string) => {
      const data = await apiClient.writing.submitSentence('session', userSentence)
      return data as unknown as FeedbackData
    },
    onSuccess: data => {
      setFeedback(data)
      setScores(prev => [...prev, data.score])
      if (item) {
        logWriting({
          mode,
          topic,
          prompt: item.prompt,
          userSentence: data.userSentence || input,
          score: data.score,
        })
      }
    },
  })

  if (!item) return null

  const isLast = currentIndex >= items.length - 1
  const heading = mode === 'sentence_rewrite' ? 'Luyện viết lại câu' : 'Luyện viết câu'
  const promptLabel = mode === 'sentence_rewrite' ? 'Câu gốc cần viết lại' : 'Câu hỏi gợi ý'
  const inputLabel = mode === 'sentence_rewrite' ? 'Viết lại câu theo cách của bạn:' : 'Viết câu trả lời của bạn:'

  const handleSubmit = () => {
    if (!input.trim()) return
    submitMutation.mutate(input)
  }

  const handleNext = () => {
    setCurrentIndex(i => Math.min(i + 1, items.length - 1))
    setInput('')
    setFeedback(null)
  }

  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
  const scoreColor = feedback
    ? feedback.score >= 80
      ? 'text-green-600'
      : feedback.score >= 60
        ? 'text-amber-600'
        : 'text-red-600'
    : ''

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.push('/writing')} className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-xl font-bold">{heading}</h1>
          <p className="text-sm text-muted-foreground">
            {topic} · Câu {currentIndex + 1} / {items.length}
          </p>
        </div>
        <div className="ml-auto">
          <div className="h-1.5 w-32 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Prompt */}
      <div className="rounded-2xl border bg-card p-6 space-y-4">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase">{promptLabel}</p>
          <p className="text-lg font-medium">{item.prompt}</p>
          <p className="text-sm text-muted-foreground">{item.vietnamese}</p>
        </div>

        <div className="p-3 rounded-xl bg-muted/50">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={14} className="text-amber-500" />
            <span className="text-xs font-medium text-amber-600">Gợi ý</span>
          </div>
          <p className="text-sm text-muted-foreground">{item.hint}</p>
        </div>
      </div>

      {/* Input */}
      {!feedback && (
        <div className="rounded-2xl border bg-card p-6 space-y-4">
          <p className="text-sm font-medium">{inputLabel}</p>
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

          {!isLast ? (
            <button onClick={handleNext} className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90">
              Câu tiếp theo →
            </button>
          ) : (
            <div className="rounded-2xl border bg-card p-6 text-center space-y-3">
              <p className="text-sm text-muted-foreground">Hoàn thành buổi luyện!</p>
              <p className="text-4xl font-bold text-primary">{avgScore}/100</p>
              <p className="text-sm text-muted-foreground">Điểm trung bình {scores.length} câu · Đã lưu vào lịch sử</p>
              <div className="flex gap-3 justify-center pt-1">
                <button
                  onClick={() => router.push('/writing')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:opacity-90"
                >
                  Quay về luyện viết
                </button>
                <button
                  onClick={() => router.refresh()}
                  className="flex items-center gap-2 px-5 py-2.5 border rounded-xl text-sm font-medium hover:bg-muted"
                >
                  <RefreshCw size={15} /> Buổi mới
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function WritingSessionPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto h-40 rounded-2xl bg-muted animate-pulse" />}>
      <WritingSession />
    </Suspense>
  )
}
