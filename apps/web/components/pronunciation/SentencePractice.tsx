'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Play, CheckCircle2, RotateCcw, Volume2 } from 'lucide-react'
import { apiClient } from '@/lib/api-client'

export function SentencePractice() {
  const { data: sentences = [], isLoading } = useQuery({
    queryKey: ['pronunciation', 'sentences'],
    queryFn: () => apiClient.pronunciation.getSentences(),
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [showPhonetic, setShowPhonetic] = useState(false)
  const [showTips, setShowTips] = useState(false)
  const [practiced, setPracticed] = useState<Set<string>>(new Set())

  if (isLoading) return <div className="h-64 rounded-2xl bg-muted animate-pulse" />
  if (sentences.length === 0) return <div className="text-muted-foreground">Không có câu luyện tập.</div>

  const sentence = (sentences[currentIndex] ?? sentences[0])!

  const handleNext = () => {
    setCurrentIndex(i => (i + 1) % sentences.length)
    setShowPhonetic(false)
    setShowTips(false)
  }

  const handlePractice = () => {
    setPracticed(s => new Set(s).add(sentence.id))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            Câu {currentIndex + 1}/{sentences.length}
          </span>
          {practiced.has(sentence.id) && (
            <span className="text-xs text-green-600 flex items-center gap-1">
              <CheckCircle2 size={12} /> Đã luyện
            </span>
          )}
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6 space-y-5">
        <div className="space-y-3">
          <p className="text-xl font-medium leading-relaxed">{sentence.sentence}</p>
          <p className="text-sm text-muted-foreground">{sentence.translation}</p>
          {showPhonetic && (
            <p className="text-sm font-mono text-muted-foreground bg-muted/50 px-3 py-2 rounded-xl">
              {sentence.phonetic}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Từ khó: {sentence.difficultWords.join(', ')}</p>
          {showTips && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-sm text-amber-700">
                <span className="font-semibold">Mẹo:</span> {sentence.tips}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => handlePractice()}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Play size={16} /> Nghe mẫu
          </button>
          <button
            onClick={() => setShowPhonetic(!showPhonetic)}
            className="flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            <Volume2 size={16} /> {showPhonetic ? 'Ẩn' : 'Xem'} IPA
          </button>
          <button
            onClick={() => setShowTips(!showTips)}
            className="flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            {showTips ? 'Ẩn' : 'Xem'} mẹo
          </button>
          <button
            onClick={handlePractice}
            className="flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            <CheckCircle2 size={16} /> Đã luyện
          </button>
          <button
            onClick={handleNext}
            className="ml-auto flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            <RotateCcw size={16} /> Câu tiếp theo
          </button>
        </div>
      </div>
    </div>
  )
}
