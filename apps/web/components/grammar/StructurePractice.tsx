'use client'

import { useState } from 'react'
import { CheckCircle2, XCircle, Shuffle, BookOpen, Lightbulb, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Session {
  id: string
  title: string
  formula: string
  formulaVi: string
  explanation: string
  examples: Array<{ en: string; vi: string }>
  exercises: Array<{
    id: string
    scrambled: string[]
    answer: string
    translation: string
  }>
}

const SESSIONS: Session[] = [
  {
    id: 'conditional-1',
    title: 'Câu điều kiện loại 1',
    formula: 'If + S + V(s/es), S + will + V',
    formulaVi: 'Nếu + chủ ngữ + động từ hiện tại, chủ ngữ + will + động từ nguyên thể',
    explanation: 'Diễn tả sự việc có thể xảy ra ở hiện tại hoặc tương lai. Mệnh đề IF dùng thì hiện tại đơn, mệnh đề chính dùng will + V.',
    examples: [
      { en: 'If it rains, I will stay at home.', vi: 'Nếu trời mưa, tôi sẽ ở nhà.' },
      { en: 'If you study hard, you will pass the exam.', vi: 'Nếu bạn học chăm, bạn sẽ đỗ kỳ thi.' },
    ],
    exercises: [
      {
        id: 'c1-1',
        scrambled: ['if', 'rains', 'it', 'tomorrow', 'stay', 'will', 'we', 'at', 'home'],
        answer: 'If it rains tomorrow, we will stay at home.',
        translation: 'Nếu ngày mai trời mưa, chúng tôi sẽ ở nhà.',
      },
      {
        id: 'c1-2',
        scrambled: ['will', 'you', 'if', 'call', 'me', 'I', 'need', 'help'],
        answer: 'If you need help, call me.',
        translation: 'Nếu bạn cần giúp đỡ, hãy gọi cho tôi.',
      },
    ],
  },
  {
    id: 'present-perfect',
    title: 'Thì hiện tại hoàn thành',
    formula: 'S + have/has + V3/ed',
    formulaVi: 'Chủ ngữ + have/has + động từ phân từ II',
    explanation: 'Diễn tả hành động đã xảy ra trong quá khứ và có kết quả/kết nối với hiện tại. Dùng have với I/you/we/they, has với he/she/it.',
    examples: [
      { en: 'I have finished my homework.', vi: 'Tôi đã làm xong bài tập về nhà.' },
      { en: 'She has lived here for 10 years.', vi: 'Cô ấy đã sống ở đây được 10 năm.' },
    ],
    exercises: [
      {
        id: 'pp-1',
        scrambled: ['have', 'never', 'I', 'been', 'to', 'Paris'],
        answer: 'I have never been to Paris.',
        translation: 'Tôi chưa bao giờ đến Paris.',
      },
      {
        id: 'pp-2',
        scrambled: ['has', 'she', 'the', 'finished', 'project', 'yet'],
        answer: 'Has she finished the project yet?',
        translation: 'Cô ấy đã làm xong dự án chưa?',
      },
    ],
  },
  {
    id: 'passive-voice',
    title: 'Câu bị động',
    formula: 'S + be + V3/ed + (by + O)',
    formulaVi: 'Chủ ngữ + be + động từ phân từ II + (bởi + tân ngữ)',
    explanation: 'Diễn tả hành động mà chủ ngữ "bị" tác động bởi một tác nhân khác. Be chia theo thì, động từ chính luôn ở dạng V3/ed.',
    examples: [
      { en: 'The letter was written by him.', vi: 'Bức thư được viết bởi anh ấy.' },
      { en: 'English is spoken all over the world.', vi: 'Tiếng Anh được nói ở khắp nơi trên thế giới.' },
    ],
    exercises: [
      {
        id: 'pv-1',
        scrambled: ['was', 'the', 'cake', 'made', 'by', 'my', 'mom'],
        answer: 'The cake was made by my mom.',
        translation: 'Chiếc bánh được làm bởi mẹ tôi.',
      },
      {
        id: 'pv-2',
        scrambled: ['is', 'English', 'in', 'spoken', 'many', 'countries'],
        answer: 'English is spoken in many countries.',
        translation: 'Tiếng Anh được nói ở nhiều quốc gia.',
      },
    ],
  },
  {
    id: 'wh-questions',
    title: 'Câu hỏi với Wh-',
    formula: 'Wh- + do/does/did + S + V?',
    formulaVi: 'Từ hỏi + do/does/did + chủ ngữ + động từ nguyên thể?',
    explanation: 'Dùng để hỏi thông tin cụ thể (what, where, when, why, who, how). Sau Wh- là trợ động từ do/does/did, rồi đến chủ ngữ và động từ nguyên thể.',
    examples: [
      { en: 'Where do you live?', vi: 'Bạn sống ở đâu?' },
      { en: 'What did she buy yesterday?', vi: 'Cô ấy đã mua gì hôm qua?' },
    ],
    exercises: [
      {
        id: 'wh-1',
        scrambled: ['does', 'she', 'work', 'where', '?'],
        answer: 'Where does she work?',
        translation: 'Cô ấy làm việc ở đâu?',
      },
      {
        id: 'wh-2',
        scrambled: ['did', 'you', 'what', 'do', 'last', 'weekend', '?'],
        answer: 'What did you do last weekend?',
        translation: 'Bạn đã làm gì cuối tuần trước?',
      },
    ],
  },
  {
    id: 'relative-clause',
    title: 'Mệnh đề quan hệ',
    formula: 'S + V + who/which/that/where + S + V',
    formulaVi: 'Chủ ngữ + động từ + đại từ quan hệ + chủ ngữ + động từ',
    explanation: 'Dùng để bổ nghĩa cho danh từ đứng trước. Who cho người, which cho vật, that cho cả người và vật, where cho nơi chốn.',
    examples: [
      { en: 'The man who is talking is my teacher.', vi: 'Người đàn ông đang nói chuyện là thầy giáo tôi.' },
      { en: 'This is the book that I bought yesterday.', vi: 'Đây là cuốn sách tôi đã mua hôm qua.' },
    ],
    exercises: [
      {
        id: 'rc-1',
        scrambled: ['the', 'man', 'who', 'is', 'my', 'teacher', 'talking'],
        answer: 'The man who is talking is my teacher.',
        translation: 'Người đàn ông đang nói chuyện là thầy giáo tôi.',
      },
      {
        id: 'rc-2',
        scrambled: ['this', 'is', 'the', 'book', 'that', 'I', 'bought', 'yesterday'],
        answer: 'This is the book that I bought yesterday.',
        translation: 'Đây là cuốn sách tôi đã mua hôm qua.',
      },
    ],
  },
]

export function StructurePractice() {
  const [activeSession, setActiveSession] = useState(0)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [checked, setChecked] = useState(false)
  const [showFormula, setShowFormula] = useState(true)
  const [sessionProgress, setSessionProgress] = useState<Record<string, number>>({})

  const session = SESSIONS[activeSession]
  if (!session) return <div className="text-muted-foreground">Không có session.</div>

  const exercise = session.exercises[currentExercise]
  if (!exercise) return <div className="text-muted-foreground">Không có bài tập.</div>
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
      {/* Session Selector */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Chọn công thức để luyện tập</p>
        <div className="flex flex-wrap gap-2">
          {SESSIONS.map((s, i) => {
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

      {/* Formula Card */}
      {showFormula && (
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

          {/* Formula Display */}
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-2">
            <p className="text-lg font-mono font-semibold text-primary text-center">{session.formula}</p>
            <p className="text-sm text-muted-foreground text-center">{session.formulaVi}</p>
          </div>

          {/* Explanation */}
          <p className="text-sm text-muted-foreground leading-relaxed">{session.explanation}</p>

          {/* Examples */}
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
      )}

      {/* Exercise Card */}
      {!showFormula && (
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
              <button
                onClick={() => setShowFormula(true)}
                className="text-xs text-primary hover:underline"
              >
                Xem lại công thức
              </button>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 space-y-5">
            {/* Translation */}
            <p className="text-sm text-muted-foreground">{exercise.translation}</p>

            {/* Scrambled Words */}
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

            {/* User Answer */}
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

            {/* Feedback */}
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

            {/* Actions */}
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
