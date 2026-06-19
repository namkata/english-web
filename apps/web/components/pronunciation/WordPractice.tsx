'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Volume2, Play, CheckCircle2, RotateCcw } from 'lucide-react'
import { apiClient } from '@/lib/api-client'

export function WordPractice() {
  const { data: words = [], isLoading } = useQuery({
    queryKey: ['pronunciation', 'words'],
    queryFn: () => apiClient.pronunciation.getWords(),
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [showPhonetic, setShowPhonetic] = useState(false)
  const [showTips, setShowTips] = useState(false)
  const [practiced, setPracticed] = useState<Set<string>>(new Set())

  if (isLoading) return <div className="h-64 rounded-2xl bg-muted animate-pulse" />
  if (words.length === 0) return <div className="text-muted-foreground">Không có từ vựng.</div>

  const word = (words[currentIndex] ?? words[0])!

  const handleNext = () => {
    setCurrentIndex(i => (i + 1) % words.length)
    setShowPhonetic(false)
    setShowTips(false)
  }

  const handlePractice = () => {
    setPracticed(s => new Set(s).add(word.id))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            Từ {currentIndex + 1}/{words.length}
          </span>
          {practiced.has(word.id) && (
            <span className="text-xs text-green-600 flex items-center gap-1">
              <CheckCircle2 size={12} /> Đã luyện
            </span>
          )}
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6 space-y-5">
        <div className="text-center space-y-3">
          <div className="text-4xl font-bold text-primary">{word.word}</div>
          {showPhonetic && (
            <div className="text-lg font-mono text-muted-foreground">{word.phonetic}</div>
          )}
        </div>

        <div className="space-y-2 text-center">
          <p className="text-sm text-muted-foreground">{word.meaning}</p>
          <p className="text-sm italic text-muted-foreground">{word.example}</p>
          <p className="text-xs text-primary font-medium">Âm khó: {word.difficultSound}</p>
        </div>

        {showTips && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-sm text-amber-700">
              <span className="font-semibold">Mẹo:</span> {word.tips}
            </p>
          </div>
        )}

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
            <RotateCcw size={16} /> Từ tiếp theo
          </button>
        </div>
      </div>
    </div>
  )
}
