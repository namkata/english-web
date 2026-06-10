'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, XCircle, ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const QUESTIONS = [
  {
    id: 'q1',
    type: 'choose_best_word',
    question: 'She _____ to school every day.',
    options: ['go', 'goes', 'going', 'gone'],
    correctAnswer: 'goes',
    explanation: 'Với chủ ngữ ngôi thứ 3 số ít (She), động từ ở thì hiện tại đơn cần chia thêm -s/-es.',
  },
  {
    id: 'q2',
    type: 'choose_best_word',
    question: 'I _____ coffee to tea.',
    options: ['prefer', 'prefers', 'preferring', 'preferred'],
    correctAnswer: 'prefer',
    explanation: 'Với chủ ngữ "I", động từ ở thì hiện tại đơn giữ nguyên dạng.',
  },
  {
    id: 'q3',
    type: 'fill_in_blank',
    question: 'They have _____ finished their homework.',
    options: [],
    correctAnswer: 'already',
    explanation: '"Already" được dùng trong thì hiện tại hoàn thành để nhấn mạnh hành động đã hoàn thành.',
  },
  {
    id: 'q4',
    type: 'choose_best_word',
    question: 'He _____ to the gym yesterday.',
    options: ['go', 'goes', 'went', 'gone'],
    correctAnswer: 'went',
    explanation: '"Yesterday" là dấu hiệu của thì quá khứ đơn. Động từ "go" ở quá khứ là "went".',
  },
  {
    id: 'q5',
    type: 'choose_best_word',
    question: 'If it _____, we will stay at home.',
    options: ['rain', 'rains', 'rained', 'raining'],
    correctAnswer: 'rains',
    explanation: 'Câu điều kiện loại 1: If + S + V(s/es), S + will + V. Chủ ngữ "it" → động từ thêm "s".',
  },
]

export default function QuizSessionPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const question = QUESTIONS[currentIndex]
  if (!question) return null

  const selectedAnswer = answers[question.id]
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100

  const handleSelect = (option: string) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [question.id]: option }))
  }

  const handleNext = () => {
    setShowExplanation(false)
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(i => i + 1)
    } else {
      setSubmitted(true)
    }
  }

  const handlePrev = () => {
    if (submitted) return
    setShowExplanation(false)
    setCurrentIndex(i => Math.max(i - 1, 0))
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const correctCount = Object.entries(answers).filter(([id, ans]) => QUESTIONS.find(q => q.id === id)?.correctAnswer === ans).length
  const totalAnswered = Object.keys(answers).length

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 rounded-xl hover:bg-muted transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-xl font-bold">Trắc nghiệm</h1>
          <p className="text-sm text-muted-foreground">
            Câu {currentIndex + 1} / {QUESTIONS.length}
          </p>
        </div>
        {!submitted && (
          <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={14} />
            <span>Đã trả lời: {totalAnswered}/{QUESTIONS.length}</span>
          </div>
        )}
      </div>

      {/* Progress */}
      {!submitted && (
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* Result Screen */}
      {submitted ? (
        <div className="space-y-6 animate-fade-in">
          <div className="rounded-2xl border bg-card p-8 text-center space-y-4">
            <div className="text-6xl font-bold text-primary">{Math.round((correctCount / QUESTIONS.length) * 100)}%</div>
            <div>
              <h2 className="text-xl font-semibold">Kết quả bài làm</h2>
              <p className="text-muted-foreground">Bạn đã trả lời đúng {correctCount}/{QUESTIONS.length} câu</p>
            </div>
            <div className="space-y-2">
              {QUESTIONS.map(q => {
                const userAnswer = answers[q.id]
                const correct = userAnswer === q.correctAnswer
                return (
                  <div key={q.id} className={cn('flex items-center gap-3 p-3 rounded-xl text-sm text-left', correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200')}>
                    {correct ? <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" /> : <XCircle size={16} className="text-red-600 flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{q.question}</p>
                      {!correct && <p className="text-xs text-red-600 mt-0.5">Đúng: {q.correctAnswer}</p>}
                    </div>
                  </div>
                )
              })}
            </div>
            <button onClick={() => router.push('/quiz')} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium">
              Làm bài khác
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Question Card */}
          <div className="rounded-2xl border bg-card p-6 space-y-5">
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
                          ? isCorrectOption ? 'border-green-300 bg-green-50 text-green-700' : isSelected ? 'border-red-300 bg-red-50 text-red-700' : 'border-border'
                          : isSelected ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-muted-foreground',
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

            {selectedAnswer && !showExplanation && (
              <button
                onClick={() => setShowExplanation(true)}
                className="px-4 py-2.5 text-sm text-primary font-medium hover:underline"
              >
                Xem giải thích
              </button>
            )}

            {currentIndex < QUESTIONS.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90"
              >
                Tiếp theo <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={totalAnswered < QUESTIONS.length}
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
