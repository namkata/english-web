'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, RotateCw, Check, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { VocabWordItem } from '@/lib/vocab'
import { useLearningStore } from '@/lib/stores/learning-store'

/**
 * Classic flip-card practice: tap to reveal the Vietnamese meaning, then mark
 * the word as known ("Đã thuộc") or keep practising ("Chưa thuộc").
 */
export function Flashcard({ words }: { words: VocabWordItem[] }) {
  const markLearned = useLearningStore(s => s.markLearned)
  const resetWord = useLearningStore(s => s.resetWord)

  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  if (!words.length) {
    return <p className="text-center text-muted-foreground py-12">Bộ từ này chưa có từ nào.</p>
  }

  const word = words[index]!
  const atEnd = index >= words.length - 1

  const go = (delta: number) => {
    setFlipped(false)
    setIndex(i => Math.max(0, Math.min(words.length - 1, i + delta)))
  }

  const grade = (known: boolean) => {
    if (known) markLearned(word.id)
    else resetWord(word.id)
    if (!atEnd) go(1)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Thẻ {index + 1} / {words.length}
        </span>
        <div className="h-1.5 w-40 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((index + 1) / words.length) * 100}%` }} />
        </div>
      </div>

      {/* Card */}
      <button
        onClick={() => setFlipped(f => !f)}
        className={cn(
          'w-full min-h-[220px] rounded-3xl border-2 p-8 flex flex-col items-center justify-center text-center transition-colors',
          flipped ? 'bg-primary/5 border-primary/30' : 'bg-card hover:border-muted-foreground',
        )}
      >
        {!flipped ? (
          <>
            <p className="text-3xl font-bold">{word.word}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {word.phoneticUk && <span>UK {word.phoneticUk}</span>}
              {word.phoneticUs && <span className="ml-2">US {word.phoneticUs}</span>}
            </p>
            <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
              <RotateCw size={12} /> Nhấn để xem nghĩa
            </p>
          </>
        ) : (
          <>
            <p className="text-xs font-medium text-primary uppercase">{word.partOfSpeech}</p>
            <p className="text-2xl font-semibold mt-1">{word.definition}</p>
            <p className="mt-4 text-sm text-muted-foreground italic">&ldquo;{word.exampleSentence}&rdquo;</p>
          </>
        )}
      </button>

      {/* Grade buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => grade(false)}
          className="flex items-center justify-center gap-2 py-3 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors"
        >
          <X size={16} /> Chưa thuộc
        </button>
        <button
          onClick={() => grade(true)}
          className="flex items-center justify-center gap-2 py-3 rounded-xl border border-green-200 bg-green-50 text-green-600 text-sm font-medium hover:bg-green-100 transition-colors"
        >
          <Check size={16} /> Đã thuộc
        </button>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => go(-1)}
          disabled={index === 0}
          className="flex items-center gap-2 px-4 py-2 border rounded-xl text-sm hover:bg-muted disabled:opacity-40 transition-colors"
        >
          <ArrowLeft size={16} /> Trước
        </button>
        <button
          onClick={() => go(1)}
          disabled={atEnd}
          className="flex items-center gap-2 px-4 py-2 border rounded-xl text-sm hover:bg-muted disabled:opacity-40 transition-colors"
        >
          Sau <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
