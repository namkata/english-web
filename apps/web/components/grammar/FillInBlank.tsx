'use client'

import { useState } from 'react'
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'

const EXERCISES = [
  {
    id: '1',
    sentence: 'I ______ love you anymore.',
    translation: 'Anh không còn yêu em nữa.',
    answer: "don't",
    grammarPoint: 'Phủ định với động từ thường (thì hiện tại đơn)',
    hint: 'do + not',
    fullSentence: "I don't love you anymore.",
  },
  {
    id: '2',
    sentence: 'She ______ to the gym every morning.',
    translation: 'Cô ấy đi đến phòng gym mỗi buổi sáng.',
    answer: 'goes',
    grammarPoint: 'Động từ chia ở ngôi thứ 3 số ít (thì hiện tại đơn)',
    hint: 'go + es',
    fullSentence: 'She goes to the gym every morning.',
  },
  {
    id: '3',
    sentence: 'They ______ finished their homework yet.',
    translation: 'Họ vẫn chưa làm xong bài tập về nhà.',
    answer: "haven't",
    grammarPoint: 'Phủ định thì hiện tại hoàn thành',
    hint: 'have + not',
    fullSentence: "They haven't finished their homework yet.",
  },
  {
    id: '4',
    sentence: 'If it ______ tomorrow, we will stay at home.',
    translation: 'Nếu ngày mai trời mưa, chúng tôi sẽ ở nhà.',
    answer: 'rains',
    grammarPoint: 'Câu điều kiện loại 1 (If + present simple, will + V)',
    hint: 'rain + s',
    fullSentence: 'If it rains tomorrow, we will stay at home.',
  },
  {
    id: '5',
    sentence: 'I wish I ______ taller.',
    translation: 'Tôi ước gì tôi cao hơn.',
    answer: 'were',
    grammarPoint: 'Câu ước với wish (hiện tại không có thật)',
    hint: 'be → were',
    fullSentence: 'I wish I were taller.',
  },
]

export function FillInBlank() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [input, setInput] = useState('')
  const [checked, setChecked] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const exercise = EXERCISES[currentIndex]
  if (!exercise) return <div className="text-muted-foreground">Không có bài tập.</div>
  const isCorrect = checked && input.trim().toLowerCase() === exercise.answer.toLowerCase()

  const handleCheck = () => {
    if (!input.trim()) return
    const correct = input.trim().toLowerCase() === exercise.answer.toLowerCase()
    setChecked(true)
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
  }

  const handleNext = () => {
    setCurrentIndex(i => (i + 1) % EXERCISES.length)
    setInput('')
    setShowHint(false)
    setChecked(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            Câu {currentIndex + 1}/{EXERCISES.length}
          </span>
        </div>
        <div className="text-sm text-muted-foreground">
          Đúng: {score.correct}/{score.total}
        </div>
      </div>

      {/* Exercise Card */}
      <div className="rounded-2xl border bg-card p-6 space-y-5">
        {/* Grammar Point */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-brand-50 border border-brand-100">
          <Lightbulb size={16} className="text-brand-500" />
          <span className="text-sm text-brand-700">{exercise.grammarPoint}</span>
        </div>

        {/* Sentence */}
        <div className="space-y-3">
          <p className="text-lg font-medium leading-relaxed">
            {exercise.sentence.split('______').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="inline-block mx-1">
                    <input
                      value={checked ? exercise.answer : input}
                      onChange={e => setInput(e.target.value)}
                      disabled={checked}
                      className={cn(
                        'w-32 text-center px-2 py-1 rounded-lg border text-sm font-medium outline-none focus:ring-2 focus:ring-ring',
                        checked
                          ? isCorrect
                            ? 'border-green-300 bg-green-50 text-green-700'
                            : 'border-red-300 bg-red-50 text-red-700'
                          : 'border-input bg-background',
                      )}
                    />
                  </span>
                )}
              </span>
            ))}
          </p>
          <p className="text-sm text-muted-foreground italic">{exercise.translation}</p>
        </div>

        {/* Hint */}
        {showHint && !checked && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-sm text-amber-700">Gợi ý: {exercise.hint}</p>
          </div>
        )}

        {/* Feedback */}
        {checked && (
          <div className="space-y-2">
            {isCorrect ? (
              <p className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 size={18} /> Chính xác! {exercise.fullSentence}
              </p>
            ) : (
              <div className="space-y-1">
                <p className="flex items-center gap-2 text-sm text-red-600">
                  <XCircle size={18} /> Chưa đúng.
                </p>
                <p className="text-sm text-muted-foreground">
                  Đáp án: <span className="font-semibold text-foreground">{exercise.answer}</span>
                </p>
                <p className="text-sm">{exercise.fullSentence}</p>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
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
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors"
              >
                <Lightbulb size={16} /> {showHint ? 'Ẩn gợi ý' : 'Gợi ý'}
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
      </div>
    </div>
  )
}
