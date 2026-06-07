'use client'

import { useState } from 'react'
import { Play, CheckCircle2, RotateCcw, Volume2, Lightbulb } from 'lucide-react'
const SENTENCES = [
  {
    id: '1',
    sentence: 'The quick brown fox jumps over the lazy dog.',
    translation: 'Con cáo nâu nhanh nhẹn nhảy qua con chó lười.',
    phonetic: '/ðə kwɪk braʊn fɒks dʒʌmps ˈəʊvə ðə ˈleɪzi dɒɡ/',
    difficultWords: ['quick', 'brown', 'jumps', 'lazy'],
    tips: 'Chú ý âm /kw/, /br/, /ʤ/, /leɪ/',
  },
  {
    id: '2',
    sentence: 'She sells seashells by the seashore.',
    translation: 'Cô ấy bán vỏ sò ven biển.',
    phonetic: '/ʃi selz ˈsiːʃelz baɪ ðə ˈsiːʃɔː/',
    difficultWords: ['sells', 'seashells', 'seashore'],
    tips: 'Phân biệt /ʃ/ và /s/, chú ý nguyên âm dài /iː/',
  },
  {
    id: '3',
    sentence: 'I think this thing is worth thinking about.',
    translation: 'Tôi nghĩ điều này đáng để suy nghĩ.',
    phonetic: '/aɪ θɪŋk ðɪs θɪŋ ɪz wɜːθ ˈθɪŋkɪŋ əˈbaʊt/',
    difficultWords: ['think', 'this', 'thing', 'worth', 'thinking'],
    tips: 'Luyện âm /θ/ (không rung) và /ð/ (rung) liên tục',
  },
  {
    id: '4',
    sentence: 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?',
    translation: 'Một con chuột chũi có thể ném bao nhiêu gỗ nếu nó có thể ném gỗ?',
    phonetic: '/haʊ mʌtʃ wʊd wʊd ə ˈwʊdtʃʌk tʃʌk ɪf ə ˈwʊdtʃʌk kʊd tʃʌk wʊd/',
    difficultWords: ['wood', 'would', 'woodchuck', 'chuck'],
    tips: 'Phân biệt /w/ (môi tròn), /ʊ/ (ngắn), /tʃ/ (môi tròn + lưỡi), /d/ (đầu lưỡi)',
  },
]

export function SentencePractice() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showPhonetic, setShowPhonetic] = useState(false)
  const [showTips, setShowTips] = useState(false)
  const [practiced, setPracticed] = useState<Set<string>>(new Set())

  const sentence = SENTENCES[currentIndex]
  if (!sentence) return <div className="text-muted-foreground">Không có câu luyện tập.</div>

  const handleNext = () => {
    setCurrentIndex(i => (i + 1) % SENTENCES.length)
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
            Câu {currentIndex + 1}/{SENTENCES.length}
          </span>
          {practiced.has(sentence.id) && (
            <span className="text-xs text-green-600 flex items-center gap-1">
              <CheckCircle2 size={12} /> Đã luyện
            </span>
          )}
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6 space-y-5">
        {/* Sentence */}
        <div className="space-y-3">
          <p className="text-xl font-medium leading-relaxed">{sentence.sentence}</p>
          <p className="text-sm text-muted-foreground">{sentence.translation}</p>
          {showPhonetic && (
            <p className="text-sm font-mono text-muted-foreground bg-muted/50 px-3 py-2 rounded-xl">
              {sentence.phonetic}
            </p>
          )}
        </div>

        {/* Difficult Words */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Từ khó trong câu:</p>
          <div className="flex flex-wrap gap-2">
            {sentence.difficultWords.map(word => (
              <span
                key={word}
                className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Tips */}
        {showTips && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-sm text-amber-700">
              <span className="font-semibold">Mẹo:</span> {sentence.tips}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => {
              // Play audio
              handlePractice()
            }}
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
            <Lightbulb size={16} /> {showTips ? 'Ẩn' : 'Xem'} mẹo
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
