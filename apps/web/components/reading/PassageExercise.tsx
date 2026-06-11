'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { ReadingPassageDetail } from '@english-web/types'
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, BookOpen } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useLearningStore } from '@/lib/stores/learning-store'

/**
 * Question shape as it actually arrives from the content seed/API. The shared
 * type uses `questionText`, but the seeded data uses `question`; we accept both
 * so the exercise renders correctly regardless of source.
 */
interface RawQuestion {
  id: string
  question?: string
  questionText?: string
  options?: string[]
  correctAnswer: string
  explanation?: string
}

const normalize = (s: string) => s.trim().toLowerCase()

export function PassageExercise({ passage }: { passage: ReadingPassageDetail }) {
  const questions = passage.questions as unknown as RawQuestion[]
  const logReading = useLearningStore(s => s.logReading)

  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const total = questions.length
  const answeredCount = Object.values(answers).filter(Boolean).length

  const result = useMemo(() => {
    const correctIds = questions
      .filter(q => normalize(answers[q.id] ?? '') === normalize(q.correctAnswer))
      .map(q => q.id)
    const score = correctIds.length
    return { score, percentage: total ? Math.round((score / total) * 100) : 0, correctIds }
  }, [answers, questions, total])

  const handleSelect = (qid: string, value: string) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [qid]: value }))
  }

  const handleSubmit = () => {
    setSubmitted(true)
    logReading({
      passageId: passage.id,
      title: passage.title,
      score: result.score,
      total,
      percentage: result.percentage,
    })
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleRetry = () => {
    setAnswers({})
    setSubmitted(false)
  }

  const scoreColor =
    result.percentage >= 80 ? 'text-green-600' : result.percentage >= 50 ? 'text-amber-600' : 'text-red-600'

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/reading" className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{passage.title}</h1>
          <p className="text-sm text-muted-foreground">
            {passage.level} · {passage.topic} · {passage.wordCount} từ · {total} câu hỏi
          </p>
        </div>
      </div>

      {/* Result summary */}
      {submitted && (
        <div className="rounded-2xl border bg-card p-6 text-center space-y-2 animate-fade-in">
          <p className="text-sm text-muted-foreground">Kết quả của bạn</p>
          <p className={cn('text-5xl font-bold', scoreColor)}>{result.percentage}%</p>
          <p className="text-muted-foreground">
            Đúng {result.score}/{total} câu
          </p>
          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 mt-2 px-4 py-2 border rounded-xl text-sm font-medium hover:bg-muted transition-colors"
          >
            <RotateCcw size={15} /> Làm lại
          </button>
        </div>
      )}

      {/* Passage */}
      <div className="rounded-2xl border bg-card p-6">
        <div className="flex items-center gap-2 mb-3 text-muted-foreground">
          <BookOpen size={16} />
          <span className="text-xs font-medium uppercase tracking-wide">Bài đọc</span>
        </div>
        <p className="leading-relaxed whitespace-pre-line">{passage.content}</p>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Câu hỏi</h2>
        {questions.map((q, i) => {
          const userAnswer = answers[q.id]
          const isCorrect = submitted && normalize(userAnswer ?? '') === normalize(q.correctAnswer)
          const isWrong = submitted && userAnswer && !isCorrect
          const text = q.questionText ?? q.question ?? ''
          const hasOptions = !!q.options && q.options.length > 0

          return (
            <div
              key={q.id}
              className={cn(
                'rounded-2xl border bg-card p-5 transition-colors',
                isCorrect && 'border-green-300',
                isWrong && 'border-red-300',
              )}
            >
              <div className="flex items-start gap-2 mb-3">
                <span className="font-medium">{i + 1}.</span>
                <p className="font-medium flex-1">{text}</p>
                {submitted &&
                  (isCorrect ? (
                    <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle size={18} className="text-red-600 flex-shrink-0" />
                  ))}
              </div>

              {hasOptions ? (
                <div className="space-y-2">
                  {q.options!.map((opt, j) => {
                    const selected = userAnswer === opt
                    const correctOption = submitted && normalize(opt) === normalize(q.correctAnswer)
                    return (
                      <label
                        key={j}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-xl border text-sm transition-colors',
                          submitted ? 'cursor-default' : 'cursor-pointer hover:border-muted-foreground',
                          correctOption && 'border-green-300 bg-green-50 text-green-700',
                          submitted && selected && !correctOption && 'border-red-300 bg-red-50 text-red-700',
                          !submitted && selected && 'border-primary bg-primary/5 text-primary',
                        )}
                      >
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          value={opt}
                          checked={selected}
                          onChange={() => handleSelect(q.id, opt)}
                          disabled={submitted}
                          className="accent-primary"
                        />
                        <span>
                          {String.fromCharCode(65 + j)}. {opt}
                        </span>
                      </label>
                    )
                  })}
                </div>
              ) : (
                <input
                  value={userAnswer ?? ''}
                  onChange={e => handleSelect(q.id, e.target.value)}
                  disabled={submitted}
                  placeholder="Nhập câu trả lời..."
                  className={cn(
                    'w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring',
                    submitted && (isCorrect ? 'border-green-300' : 'border-red-300'),
                  )}
                />
              )}

              {submitted && isWrong && (
                <p className="mt-3 text-sm text-green-700">
                  Đáp án đúng: <span className="font-semibold">{q.correctAnswer}</span>
                </p>
              )}
              {submitted && q.explanation && (
                <div className="mt-3 p-3 rounded-xl bg-blue-50 border border-blue-200">
                  <p className="text-sm text-blue-700">
                    <span className="font-semibold">Giải thích:</span> {q.explanation}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Submit */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={answeredCount < total}
          className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {answeredCount < total ? `Trả lời tất cả câu hỏi (${answeredCount}/${total})` : 'Nộp bài & xem kết quả'}
        </button>
      )}
    </div>
  )
}
