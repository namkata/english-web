'use client'

import { useMemo, useState } from 'react'
import { Eye, Sparkles, RotateCcw } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { VocabWordItem } from '@/lib/vocab'
import { useLearningStore, useHasHydrated } from '@/lib/stores/learning-store'
import { isDue, type RecallGrade } from '@/lib/srs'

const GRADES: Array<{ value: RecallGrade; label: string; hint: string; className: string }> = [
  { value: 'again', label: 'Lại', hint: 'Quên', className: 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100' },
  { value: 'hard', label: 'Khó', hint: 'Nhớ chật vật', className: 'border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100' },
  { value: 'good', label: 'Tốt', hint: 'Nhớ được', className: 'border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100' },
  { value: 'easy', label: 'Dễ', hint: 'Quá dễ', className: 'border-green-200 bg-green-50 text-green-600 hover:bg-green-100' },
]

/**
 * Spaced-repetition review using the SM-2 algorithm. Builds a queue from the
 * words that are due (or never seen), shows each card, and updates scheduling
 * based on the learner's self-graded recall.
 */
export function ReviewSession({ words }: { words: VocabWordItem[] }) {
  const hydrated = useHasHydrated()
  const cards = useLearningStore(s => s.cards)
  const gradeCard = useLearningStore(s => s.gradeCard)

  const [queue, setQueue] = useState<string[] | null>(null)
  const [pos, setPos] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [done, setDone] = useState(0)

  const dueWords = useMemo(() => words.filter(w => isDue(cards[w.id])), [words, cards])

  if (!hydrated) {
    return <div className="h-48 rounded-2xl bg-muted animate-pulse" />
  }

  // Start screen — show how many cards are due before beginning.
  if (queue === null) {
    const start = (all: boolean) => {
      setQueue((all ? words : dueWords).map(w => w.id))
      setPos(0)
      setRevealed(false)
      setDone(0)
    }
    return (
      <div className="rounded-2xl border bg-card p-8 text-center space-y-4">
        <Sparkles size={28} className="mx-auto text-primary" />
        <div>
          <p className="text-lg font-semibold">Ôn tập giãn cách (SM-2)</p>
          <p className="text-sm text-muted-foreground mt-1">
            {dueWords.length > 0
              ? `Có ${dueWords.length} thẻ cần ôn hôm nay.`
              : 'Không có thẻ nào đến hạn hôm nay. Bạn vẫn có thể ôn lại toàn bộ.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {dueWords.length > 0 && (
            <button
              onClick={() => start(false)}
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90"
            >
              Ôn {dueWords.length} thẻ đến hạn
            </button>
          )}
          <button
            onClick={() => start(true)}
            className="px-5 py-2.5 border rounded-xl text-sm font-medium hover:bg-muted"
          >
            Ôn lại toàn bộ ({words.length})
          </button>
        </div>
      </div>
    )
  }

  // Completed.
  if (pos >= queue.length) {
    return (
      <div className="rounded-2xl border bg-card p-8 text-center space-y-3">
        <Sparkles size={28} className="mx-auto text-green-500" />
        <p className="text-lg font-semibold">Hoàn thành buổi ôn!</p>
        <p className="text-sm text-muted-foreground">Bạn đã ôn {done} thẻ. Lịch ôn tiếp theo đã được cập nhật.</p>
        <button
          onClick={() => {
            setQueue(null)
          }}
          className="inline-flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-medium hover:bg-muted"
        >
          <RotateCcw size={15} /> Ôn tiếp
        </button>
      </div>
    )
  }

  const word = words.find(w => w.id === queue[pos])
  if (!word) {
    // Skip any word that disappeared from the set.
    setPos(p => p + 1)
    return null
  }

  const handleGrade = (grade: RecallGrade) => {
    gradeCard(word.id, grade)
    setDone(d => d + 1)
    setRevealed(false)
    setPos(p => p + 1)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Thẻ {pos + 1} / {queue.length}
        </span>
        <div className="h-1.5 w-40 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(pos / queue.length) * 100}%` }} />
        </div>
      </div>

      <div className="rounded-3xl border-2 bg-card p-8 min-h-[220px] flex flex-col items-center justify-center text-center">
        <p className="text-3xl font-bold">{word.word}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {word.phoneticUk && <span>UK {word.phoneticUk}</span>}
          {word.phoneticUs && <span className="ml-2">US {word.phoneticUs}</span>}
        </p>

        {revealed ? (
          <div className="mt-5 space-y-2 animate-fade-in">
            <p className="text-xs font-medium text-primary uppercase">{word.partOfSpeech}</p>
            <p className="text-xl font-semibold">{word.definition}</p>
            <p className="text-sm text-muted-foreground italic">&ldquo;{word.exampleSentence}&rdquo;</p>
          </div>
        ) : (
          <button
            onClick={() => setRevealed(true)}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90"
          >
            <Eye size={16} /> Hiện đáp án
          </button>
        )}
      </div>

      {revealed && (
        <div className="grid grid-cols-4 gap-2 animate-fade-in">
          {GRADES.map(g => (
            <button
              key={g.value}
              onClick={() => handleGrade(g.value)}
              className={cn('flex flex-col items-center py-3 rounded-xl border text-sm font-medium transition-colors', g.className)}
            >
              <span>{g.label}</span>
              <span className="text-[10px] opacity-70">{g.hint}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
