'use client'

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle2, XCircle, ArrowLeft, ArrowRight, Clock, AlertTriangle, Maximize2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { cn } from '@/lib/utils'
import { apiClient } from '@/lib/api-client'
import { useLearningStore } from '@/lib/stores/learning-store'

interface BankQuestion {
  id: string
  type: string
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

const TYPE_LABELS: Record<string, string> = {
  choose_best_word: 'Chọn từ thích hợp',
  fill_in_blank: 'Điền vào chỗ trống',
  grammar: 'Ngữ pháp',
  conditional: 'Câu điều kiện',
  preposition: 'Giới từ',
  word_form: 'Chuyển đổi từ loại',
  comparison: 'Câu so sánh',
  passive_voice: 'Câu bị động',
}

const SECONDS_PER_QUESTION = 45

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, '0')}`
}

function QuizSession() {
  const router = useRouter()
  const search = useSearchParams()
  const logQuiz = useLearningStore(s => s.logQuiz)

  const examMode = search.get('examMode') === 'true'
  const level = search.get('level') || 'B1'
  const count = Math.max(3, Math.min(50, Number(search.get('count')) || 5))

  const { data, isLoading, error } = useQuery({
    queryKey: ['quiz', 'questions', level, count],
    queryFn: () => apiClient.quiz.generateQuestions({ count, level }),
  })

  const questions = useMemo(() => data?.questions || [], [data])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [timeLeft, setTimeLeft] = useState(questions.length * SECONDS_PER_QUESTION)
  const [tabWarnings, setTabWarnings] = useState(0)
  const loggedRef = useRef(false)

  const question = questions[currentIndex]
  const selectedAnswer = question ? answers[question.id] : undefined
  const progress = ((currentIndex + 1) / (questions.length || 1)) * 100
  const totalAnswered = Object.keys(answers).length

  const correctCount = useMemo(
    () => questions.filter(q => answers[q.id] === q.correctAnswer).length,
    [answers, questions],
  )

  const byType = useMemo(() => {
    const acc: Record<string, { correct: number; total: number }> = {}
    for (const q of questions) {
      const label = TYPE_LABELS[q.type] ?? q.type
      acc[label] ??= { correct: 0, total: 0 }
      acc[label].total += 1
      if (answers[q.id] === q.correctAnswer) acc[label].correct += 1
    }
    return acc
  }, [answers, questions])

  const finish = useCallback(() => {
    setSubmitted(true)
    if (!loggedRef.current && questions.length > 0) {
      loggedRef.current = true
      logQuiz({
        level,
        correct: correctCount,
        total: questions.length,
        percentage: Math.round((correctCount / questions.length) * 100),
        byType,
      })
    }
  }, [byType, correctCount, level, logQuiz, questions.length])

  // Exam-mode countdown timer with auto-submit.
  useEffect(() => {
    if (!examMode || submitted) return
    if (timeLeft <= 0) {
      finish()
      return
    }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [examMode, submitted, timeLeft, finish])

  // Exam-mode leave-page warning + tab-switch detection.
  useEffect(() => {
    if (!examMode || submitted) return
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') setTabWarnings(n => n + 1)
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [examMode, submitted])

  if (!question || questions.length === 0) {
    if (isLoading) return <div className="max-w-3xl mx-auto h-40 rounded-2xl bg-muted animate-pulse" />
    if (error) return <div className="max-w-3xl mx-auto text-red-600 p-4 rounded-2xl border border-red-200">Lỗi khi tải câu hỏi: {error.message}</div>
    return <div className="max-w-3xl mx-auto text-muted-foreground p-4 rounded-2xl border">Không có câu hỏi được tạo.</div>
  }

  const handleSelect = (option: string) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [question.id]: option }))
  }

  const handleNext = () => {
    setShowExplanation(false)
    if (currentIndex < questions.length - 1) setCurrentIndex(i => i + 1)
    else finish()
  }

  const handlePrev = () => {
    if (submitted) return
    setShowExplanation(false)
    setCurrentIndex(i => Math.max(i - 1, 0))
  }

  const timerColor = timeLeft <= 30 ? 'text-red-600' : timeLeft <= 60 ? 'text-amber-600' : 'text-muted-foreground'

  return (
    <div className={cn('max-w-3xl mx-auto space-y-6', examMode && 'pt-2')}>
      {/* Exam-mode banner */}
      {examMode && !submitted && (
        <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-700">
          <Maximize2 size={15} />
          <span className="font-medium">Chế độ thi</span>
          <span className="text-amber-600">— không rời trang, thời gian được tính nghiêm ngặt.</span>
          {tabWarnings > 0 && (
            <span className="ml-auto flex items-center gap-1 text-red-600 font-medium">
              <AlertTriangle size={14} /> Rời trang {tabWarnings} lần
            </span>
          )}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3">
        {!examMode && (
          <button onClick={() => router.push('/quiz')} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <ArrowLeft size={18} />
          </button>
        )}
        <div>
          <h1 className="text-xl font-bold">Trắc nghiệm</h1>
          <p className="text-sm text-muted-foreground">
            {level} · Câu {currentIndex + 1} / {questions.length}
          </p>
        </div>
        {!submitted && (
          <div className="ml-auto flex items-center gap-2 text-sm">
            <Clock size={14} className={timerColor} />
            {examMode ? (
              <span className={cn('font-semibold tabular-nums', timerColor)}>{formatTime(timeLeft)}</span>
            ) : (
              <span className="text-muted-foreground">
                Đã trả lời: {totalAnswered}/{questions.length}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Progress */}
      {!submitted && (
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      )}

      {submitted ? (
        <div className="space-y-6 animate-fade-in">
          <div className="rounded-2xl border bg-card p-8 text-center space-y-4">
            <div className="text-6xl font-bold text-primary">{Math.round((correctCount / questions.length) * 100)}%</div>
            <div>
              <h2 className="text-xl font-semibold">Kết quả bài làm</h2>
              <p className="text-muted-foreground">
                Bạn đã trả lời đúng {correctCount}/{questions.length} câu
              </p>
            </div>

            {/* Breakdown by type */}
            <div className="text-left space-y-2 max-w-md mx-auto">
              <p className="text-sm font-medium text-center">Theo loại câu hỏi</p>
              {Object.entries(byType).map(([label, v]) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <span className="w-44 truncate text-muted-foreground">{label}</span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn('h-full rounded-full', v.correct === v.total ? 'bg-green-500' : 'bg-primary')}
                      style={{ width: `${(v.correct / v.total) * 100}%` }}
                    />
                  </div>
                  <span className="w-10 text-right tabular-nums">{v.correct}/{v.total}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review */}
          <div className="space-y-2">
            <h3 className="font-semibold">Xem lại</h3>
            {questions.map((q, i) => {
              const userAnswer = answers[q.id]
              const correct = userAnswer === q.correctAnswer
              return (
                <div key={q.id} className={cn('p-4 rounded-xl border text-sm', correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200')}>
                  <div className="flex items-start gap-2">
                    {correct ? (
                      <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{i + 1}. {q.question}</p>
                      {!correct && (
                        <p className="text-xs text-red-600 mt-1">
                          Bạn chọn: {userAnswer || '—'} · Đúng: <span className="font-semibold">{q.correctAnswer}</span>
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <button onClick={() => router.push('/quiz')} className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium">
            Làm bài khác
          </button>
        </div>
      ) : (
        <>
          {/* Question Card */}
          <div className="rounded-2xl border bg-card p-6 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-primary uppercase tracking-wide">
                {TYPE_LABELS[question.type] ?? question.type}
              </span>
            </div>
            <p className="text-lg font-medium">{question.question}</p>

            <div className="space-y-2">
              {question.options.length > 0 ? (
                question.options.map((option, i) => {
                  const isSelected = selectedAnswer === option
                  const showResult = showExplanation
                  const isCorrectOption = option === question.correctAnswer
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(option)}
                      className={cn(
                        'w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-colors',
                        showResult
                          ? isCorrectOption
                            ? 'border-green-300 bg-green-50 text-green-700'
                            : isSelected
                              ? 'border-red-300 bg-red-50 text-red-700'
                              : 'border-border'
                          : isSelected
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border hover:border-muted-foreground',
                      )}
                    >
                      {String.fromCharCode(65 + i)}. {option}
                    </button>
                  )
                })
              ) : (
                <input
                  value={selectedAnswer || ''}
                  onChange={e => handleSelect(e.target.value)}
                  placeholder="Nhập câu trả lời..."
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              )}
            </div>

            {showExplanation && (
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">Giải thích:</span> {question.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm hover:bg-muted disabled:opacity-40 transition-colors"
            >
              <ArrowLeft size={16} /> Trước
            </button>

            <div className="flex-1" />

            {/* "Xem giải thích" is disabled during exam mode to keep it strict. */}
            {!examMode && selectedAnswer && !showExplanation && (
              <button onClick={() => setShowExplanation(true)} className="px-4 py-2.5 text-sm text-primary font-medium hover:underline">
                Xem giải thích
              </button>
            )}

            {currentIndex < questions.length - 1 ? (
              <button onClick={handleNext} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90">
                Tiếp theo <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={finish}
                disabled={examMode ? false : totalAnswered < questions.length}
                className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50"
              >
                Nộp bài
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default function QuizSessionPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto h-40 rounded-2xl bg-muted animate-pulse" />}>
      <QuizSession />
    </Suspense>
  )
}
