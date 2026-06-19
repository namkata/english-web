'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ArrowRightLeft, CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { apiClient } from '@/lib/api-client'

const DIRECTIONS = [
  { key: 'vi-en', label: 'Vi → En', desc: 'Nhìn tiếng Việt, viết tiếng Anh' },
  { key: 'en-vi', label: 'En → Vi', desc: 'Nhìn tiếng Anh, viết tiếng Việt' },
]

export function VocabPractice() {
  const { data: exercises = [], isLoading } = useQuery({
    queryKey: ['grammar', 'vocab-exercises'],
    queryFn: () => apiClient.grammar.getVocabExercises(),
  })

  const [direction, setDirection] = useState('vi-en')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [input, setInput] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  if (isLoading) return <div className="h-64 rounded-2xl bg-muted animate-pulse" />
  if (exercises.length === 0) return <div className="text-muted-foreground">Không có bài tập.</div>

  const exercise = (exercises[currentIndex] ?? exercises[0])!
  const isViEn = direction === 'vi-en'
  const prompt = isViEn ? exercise.vietnamese : exercise.english
  const target = isViEn ? exercise.english : exercise.vietnamese
  const hint = isViEn ? exercise.hint : exercise.vietnamese

  const handleCheck = () => {
    if (!input.trim()) return
    const isCorrect = input.trim().toLowerCase().includes(exercise.targetWord.toLowerCase())
    setChecked(true)
    setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }))
  }

  const handleNext = () => {
    setCurrentIndex(i => (i + 1) % exercises.length)
    setInput('')
    setShowAnswer(false)
    setChecked(false)
  }

  const isCorrect = checked && input.trim().toLowerCase().includes(exercise.targetWord.toLowerCase())

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {DIRECTIONS.map(d => (
          <button
            key={d.key}
            onClick={() => {
              setDirection(d.key)
              setInput('')
              setShowAnswer(false)
              setChecked(false)
            }}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-xl text-sm border transition-colors',
              direction === d.key
                ? 'bg-brand-50 text-brand-700 border-brand-200'
                : 'bg-card border-border text-muted-foreground hover:border-muted-foreground',
            )}
          >
            <ArrowRightLeft size={14} />
            {d.label}
          </button>
        ))}
        <div className="ml-auto text-sm text-muted-foreground">
          Đúng: {score.correct}/{score.total}
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6 space-y-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            Câu {currentIndex + 1}/{exercises.length}
          </span>
          <span className="text-xs text-muted-foreground">
            Từ mục tiêu: <span className="font-semibold text-foreground">{exercise.targetWord}</span>
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{isViEn ? 'Dịch sang tiếng Anh:' : 'Dịch sang tiếng Việt:'}</p>
          <p className="text-lg font-medium">{prompt}</p>
        </div>

        {!checked && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Gợi ý:</p>
            <p className="text-sm font-mono bg-muted/50 px-3 py-2 rounded-xl">{hint}</p>
          </div>
        )}

        <div className="space-y-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={checked}
            placeholder={isViEn ? 'Nhập câu tiếng Anh...' : 'Nhập câu tiếng Việt...'}
            className={cn(
              'w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring',
              checked
                ? isCorrect
                  ? 'border-green-300 bg-green-50'
                  : 'border-red-300 bg-red-50'
                : 'border-input bg-background',
            )}
          />
          {checked && (
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <span className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle2 size={16} /> Chính xác!
                </span>
              ) : (
                <span className="flex items-center gap-1 text-sm text-red-600">
                  <XCircle size={16} /> Chưa đúng. Đáp án: {target}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!checked ? (
            <>
              <button
                onClick={handleCheck}
                disabled={!input.trim()}
                className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                <CheckCircle2 size={16} /> Kiểm tra
              </button>
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors"
              >
                {showAnswer ? <EyeOff size={16} /> : <Eye size={16} />}
                {showAnswer ? 'Ẩn đáp án' : 'Xem đáp án'}
              </button>
            </>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Câu tiếp theo →
            </button>
          )}
        </div>

        {showAnswer && !checked && (
          <div className="p-3 rounded-xl bg-green-50 border border-green-200">
            <p className="text-sm text-green-700">Đáp án: {target}</p>
          </div>
        )}
      </div>
    </div>
  )
}
