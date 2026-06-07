'use client'

import { useState } from 'react'
import { Volume2, Play, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  { key: 'vowels', label: 'Nguyên âm', count: 12 },
  { key: 'consonants', label: 'Phụ âm', count: 24 },
  { key: 'tricky', label: 'Âm khó (dễ nhầm)', count: 8 },
]

const PHONEMES: Record<string, Array<{
  id: string
  symbol: string
  example: string
  exampleVi: string
  audioHint: string
  mouthPosition: string
}>> = {
  vowels: [
    { id: '1', symbol: '/iː/', example: 'sheep', exampleVi: 'cừu', audioHint: 'Mở miệng rộng, đẩy lưỡi lên', mouthPosition: 'Lưỡi cao, môi mở rộng' },
    { id: '2', symbol: '/ɪ/', example: 'ship', exampleVi: 'tàu', audioHint: 'Ngắn hơn /iː/, lưỡi thấp hơn', mouthPosition: 'Lưỡi giữa, môi nửa mở' },
    { id: '3', symbol: '/e/', example: 'bed', exampleVi: 'giường', audioHint: 'Mở miệng vừa, lưỡi giữa', mouthPosition: 'Lưỡi giữa, môi hơi mở' },
    { id: '4', symbol: '/æ/', example: 'cat', exampleVi: 'mèo', audioHint: 'Mở miệng rộng, hàm dưới hạ', mouthPosition: 'Lưỡi thấp, môi mở rộng' },
  ],
  consonants: [
    { id: '5', symbol: '/θ/', example: 'think', exampleVi: 'nghĩ', audioHint: 'Đặt lưỡi giữa 2 răng trước, thổi hơi', mouthPosition: 'Lưỡi chạm răng trước' },
    { id: '6', symbol: '/ð/', example: 'this', exampleVi: 'cái này', audioHint: 'Giống /θ/ nhưng rung dây thanh', mouthPosition: 'Lưỡi chạm răng trước, rung' },
    { id: '7', symbol: '/ʃ/', example: 'ship', exampleVi: 'tàu', audioHint: 'Môi tròn, đẩy hơi qua răng', mouthPosition: 'Môi tròn, răng gần nhau' },
    { id: '8', symbol: '/ʒ/', example: 'vision', exampleVi: 'tầm nhìn', audioHint: 'Giống /ʃ/ nhưng rung dây thanh', mouthPosition: 'Môi tròn, rung dây thanh' },
  ],
  tricky: [
    { id: '9', symbol: '/l/ vs /r/', example: 'light / right', exampleVi: 'ánh sáng / đúng', audioHint: '/l/ đầu lưỡi chạm răng, /r/ lưỡi cong về sau', mouthPosition: 'Lưỡi vị trí khác nhau' },
    { id: '10', symbol: '/v/ vs /w/', example: 'very / worry', exampleVi: 'rất / lo lắng', audioHint: '/v/ cắn môi dưới, /w/ môi tròn', mouthPosition: 'Môi khác nhau rõ ràng' },
    { id: '11', symbol: '/s/ vs /ʃ/', example: 'see / she', exampleVi: 'nhìn / cô ấy', audioHint: '/s/ lưỡi thẳng, /ʃ/ lưỡi cong, môi tròn', mouthPosition: 'Lưỡi và môi khác nhau' },
    { id: '12', symbol: '/t/ vs /θ/', example: 'tea / think', exampleVi: 'trà / nghĩ', audioHint: '/t/ chạm nướu, /θ/ chạm răng', mouthPosition: 'Vị trí chạm lưỡi khác nhau' },
  ],
}

export function PhonemePractice() {
  const [category, setCategory] = useState('vowels')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [showMouth, setShowMouth] = useState(false)
  const [attempted, setAttempted] = useState<Set<string>>(new Set())

  const phonemes = PHONEMES[category] || []
  const phoneme = phonemes[currentIndex]

  const handleNext = () => {
    setCurrentIndex(i => (i + 1) % phonemes.length)
    setShowHint(false)
    setShowMouth(false)
  }

  const handlePractice = () => {
    if (!phoneme) return
    setAttempted(s => new Set(s).add(phoneme.id))
  }

  if (!phoneme) {
    return <div className="text-muted-foreground">Không có dữ liệu âm.</div>
  }

  return (
    <div className="space-y-4">
      {/* Category Selector */}
      <div className="flex gap-2">
        {CATEGORIES.map(c => (
          <button
            key={c.key}
            onClick={() => {
              setCategory(c.key)
              setCurrentIndex(0)
              setShowHint(false)
              setShowMouth(false)
            }}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-xl text-sm border transition-colors',
              category === c.key
                ? 'bg-brand-50 text-brand-700 border-brand-200'
                : 'bg-card border-border text-muted-foreground hover:border-muted-foreground',
            )}
          >
            {c.label}
            <span className="text-xs text-muted-foreground">({c.count})</span>
          </button>
        ))}
      </div>

      {/* Phoneme Card */}
      <div className="rounded-2xl border bg-card p-6 space-y-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {currentIndex + 1}/{phonemes.length}
          </span>
          <span className="text-xs text-muted-foreground">{CATEGORIES.find(c => c.key === category)?.label}</span>
          {attempted.has(phoneme.id) && (
            <span className="ml-auto text-xs text-green-600 flex items-center gap-1">
              <Volume2 size={12} /> Đã luyện
            </span>
          )}
        </div>

        {/* Symbol */}
        <div className="text-center space-y-3">
          <div className="text-5xl font-bold font-mono text-primary">{phoneme.symbol}</div>
          <div className="text-lg font-medium">
            {phoneme.example} <span className="text-muted-foreground">— {phoneme.exampleVi}</span>
          </div>
        </div>

        {/* Hints */}
        <div className="space-y-2">
          {showHint && (
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
              <p className="text-sm text-blue-700">
                <span className="font-semibold">Gợi ý phát âm:</span> {phoneme.audioHint}
              </p>
            </div>
          )}
          {showMouth && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-sm text-amber-700">
                <span className="font-semibold">Vị trí miệng:</span> {phoneme.mouthPosition}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => {
              // Play audio mock
              handlePractice()
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Play size={16} /> Nghe mẫu
          </button>
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            {showHint ? 'Ẩn' : 'Gợi ý'} phát âm
          </button>
          <button
            onClick={() => setShowMouth(!showMouth)}
            className="flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            {showMouth ? 'Ẩn' : 'Xem'} vị trí miệng
          </button>
          <button
            onClick={handlePractice}
            className="flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            <Volume2 size={16} /> Đã luyện
          </button>
          <button
            onClick={handleNext}
            className="ml-auto flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            <ArrowRight size={16} /> Âm tiếp theo
          </button>
        </div>
      </div>
    </div>
  )
}
