'use client'

import { useState } from 'react'
import { Volume2, Play, CheckCircle2, RotateCcw } from 'lucide-react'
const WORDS = [
  {
    id: '1',
    word: 'through',
    phonetic: '/θruː/',
    meaning: 'xuyên qua',
    example: 'walk through the park',
    difficultSound: '/θ/',
    tips: 'Đặt lưỡi giữa 2 răng trước, thổi hơi mạnh',
  },
  {
    id: '2',
    word: 'thought',
    phonetic: '/θɔːt/',
    meaning: 'nghĩ',
    example: 'I thought about it',
    difficultSound: '/θ/',
    tips: 'Giữ lưỡi chạm răng, không rung dây thanh',
  },
  {
    id: '3',
    word: 'comfortable',
    phonetic: '/ˈkʌmftəbl/',
    meaning: 'thoải mái',
    example: 'This chair is comfortable',
    difficultSound: '/ftəbl/',
    tips: 'Đọc nhanh: /ˈkʌm-fə-təbl/, bỏ âm /t/ ở giữa',
  },
  {
    id: '4',
    word: ' schedule',
    phonetic: '/ˈʃedjuːl/ (Br) /ˈskedʒuːl/ (Am)',
    meaning: 'lịch trình',
    example: 'check the schedule',
    difficultSound: '/ʃ/ vs /sk/',
    tips: 'BrE: /ʃedjuːl/, AmE: /skedʒuːl/',
  },
  {
    id: '5',
    word: 'world',
    phonetic: '/wɜːld/',
    meaning: 'thế giới',
    example: 'around the world',
    difficultSound: '/ɜːl/',
    tips: '/ɜː/ lưỡi giữa, rồi /l/ đầu lưỡi chạm nướu',
  },
]

export function WordPractice() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showPhonetic, setShowPhonetic] = useState(false)
  const [showTips, setShowTips] = useState(false)
  const [practiced, setPracticed] = useState<Set<string>>(new Set())

  const word = WORDS[currentIndex]
  if (!word) return <div className="text-muted-foreground">Không có từ vựng.</div>

  const handleNext = () => {
    setCurrentIndex(i => (i + 1) % WORDS.length)
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
            Từ {currentIndex + 1}/{WORDS.length}
          </span>
          {practiced.has(word.id) && (
            <span className="text-xs text-green-600 flex items-center gap-1">
              <CheckCircle2 size={12} /> Đã luyện
            </span>
          )}
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6 space-y-5">
        {/* Word Display */}
        <div className="text-center space-y-3">
          <div className="text-4xl font-bold text-primary">{word.word}</div>
          {showPhonetic && (
            <div className="text-lg font-mono text-muted-foreground">{word.phonetic}</div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-2 text-center">
          <p className="text-sm text-muted-foreground">{word.meaning}</p>
          <p className="text-sm italic text-muted-foreground">{word.example}</p>
          <p className="text-xs text-primary font-medium">Âm khó: {word.difficultSound}</p>
        </div>

        {/* Tips */}
        {showTips && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-sm text-amber-700">
              <span className="font-semibold">Mẹo:</span> {word.tips}
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
