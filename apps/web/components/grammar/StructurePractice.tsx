'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CheckCircle2, XCircle, Shuffle, BookOpen, Lightbulb, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { apiClient } from '@/lib/api-client'

export function StructurePractice() {
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['grammar', 'structure-sessions'],
    queryFn: () => apiClient.grammar.getStructureSessions(),
  })

  const [activeSession, setActiveSession] = useState(0)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [checked, setChecked] = useState(false)
  const [showFormula, setShowFormula] = useState(true)
  const [sessionProgress, setSessionProgress] = useState<Record<string, number>>({})

  if (isLoading) return <div className="h-64 rounded-2xl bg-muted animate-pulse" />
  if (sessions.length === 0) return <div className="text-muted-foreground">Không có session.</div>

  const session = (sessions[activeSession] ?? sessions[0])!
  const exercise = (session.exercises[currentExercise] ?? session.exercises[0])!
  const isCorrect = checked && selectedWords.join(' ') === exercise.answer
  const progress = sessionProgress[session.id] || 0

  const handleWordClick = (word: string) => {
    if (checked) return
    if (selectedWords.includes(word)) {
      setSelectedWords(p => p.filter(w => w !== word))
    } else {
      setSelectedWords(p => [...p, word])
    }
  }

  const handleCheck = () => {
    if (selectedWords.length === 0) return
    const correct = selectedWords.join(' ') === exercise.answer
    setChecked(true)
    if (correct) {
      setSessionProgress(p => ({
        ...p,
        [session.id]: Math.min((p[session.id] || 0) + 1, session.exercises.length),
      }))
    }
  }

  const handleNext = () => {
    setCurrentExercise(i => (i + 1) % session.exercises.length)
    setSelectedWords([])
    setChecked(false)
  }

  const handleSessionChange = (index: number) => {
    setActiveSession(index)
    setCurrentExercise(0)
    setSelectedWords([])
    setChecked(false)
    setShowFormula(true)
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Chọn công thức để luyện tập</p>
        <div className="flex flex-wrap gap-2">
          {sessions.map((s, i) => {
            const isActive = activeSession === i
            const completed = sessionProgress[s.id] || 0
            const total = s.exercises.length
            return (
              <button
                key={s.id}
                onClick={() => handleSessionChange(i)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-xl text-sm border transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card border-border text-muted-foreground hover:border-muted-foreground',
                )}
              >
                <BookOpen size={14} />
                {s.title}
                {completed > 0 && (
                  <span className={cn(
                    'text-xs px-1.5 py-0.5 rounded-full',
                    isActive ? 'bg-primary-foreground/20' : 'bg-green-100 text-green-700',
                  )}>
                    {completed}/{total}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {showFormula ? (
        <div className="rounded-2xl border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb size={18} className="text-primary" />
              <h3 className="font-semibold">Công thức: {session.title}</h3>
            </div>
            <button
              onClick={() => setShowFormula(false)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Ẩn công thức →
            </button>
          </div>
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-2">
            <p className="text-lg font-mono font-semibold text-primary text-center">{session.formula}</p>
            <p className="text-sm text-muted-foreground text-center">{session.formulaVi}</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{session.explanation}</p>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Ví dụ:</p>
            <div className="space-y-2">
              {session.examples.map((ex, i) => (
                <div key={i} className="p-3 rounded-xl bg-muted/50 space-y-1">
                  <p className="text-sm font-medium">{ex.en}</p>
                  <p className="text-sm text-muted-foreground">{ex.vi}</p>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setShowFormula(false)}
            className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Bắt đầu luyện tập →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                Bài {currentExercise + 1}/{session.exercises.length}
              </span>
              <span className="text-xs text-muted-foreground">{session.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                Hoàn thành: {progress}/{session.exercises.length}
              </span>
              <button onClick={() => setShowFormula(true)} className="text-xs text-primary hover:underline">
                Xem lại công thức
              </button>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 space-y-5">
            <p className="text-sm text-muted-foreground">{exercise.translation}</p>

            <div className="flex flex-wrap gap-2">
              {exercise.scrambled.map((word, i) => {
                const isSelected = selectedWords.includes(word)
                return (
                  <button
                    key={`${word}-${i}`}
                    onClick={() => handleWordClick(word)}
                    disabled={checked}
                    className={cn(
                      'px-3 py-2 rounded-xl text-sm font-medium border transition-colors',
                      isSelected
                        ? 'bg-primary/10 text-primary border-primary/30'
                        : 'bg-card border-border hover:border-muted-foreground',
                    )}
                  >
                    {word}
                  </button>
                )
              })}
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Câu của bạn:</p>
              <div
                className={cn(
                  'min-h-[48px] p-3 rounded-xl border text-sm font-medium',
                  checked
                    ? isCorrect
                      ? 'border-green-300 bg-green-50'
                      : 'border-red-300 bg-red-50'
                    : 'border-input bg-background',
                )}
              >
                {selectedWords.join(' ') || <span className="text-muted-foreground">Nhấn vào các từ để sắp xếp...</span>}
              </div>
            </div>

            {checked && (
              <div>
                {isCorrect ? (
                  <p className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle2 size={18} /> Chính xác!
                  </p>
                ) : (
                  <div className="space-y-1">
                    <p className="flex items-center gap-2 text-sm text-red-600">
                      <XCircle size={18} /> Chưa đúng.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Đáp án: <span className="font-semibold text-foreground">{exercise.answer}</span>
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-3">
              {!checked ? (
                <>
                  <button
                    onClick={handleCheck}
                    disabled={selectedWords.length === 0}
                    className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    <CheckCircle2 size={16} /> Kiểm tra
                  </button>
                  <button
                    onClick={() => setSelectedWords([])}
                    disabled={selectedWords.length === 0}
                    className="flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors"
                  >
                    <Shuffle size={16} /> Xóa chọn
                  </button>
                </>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <ArrowRight size={16} /> Câu tiếp theo
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
