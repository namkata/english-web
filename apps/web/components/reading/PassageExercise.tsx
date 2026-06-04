'use client'
import type { ReadingPassageDetail } from '@english-web/types'

export function PassageExercise({ passage }: { passage: ReadingPassageDetail }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">{passage.title}</h1>
      <div className="prose prose-sm max-w-none bg-card rounded-2xl border p-6">
        <p>{passage.content}</p>
      </div>
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Câu hỏi</h2>
        {passage.questions.map((q, i) => (
          <div key={q.id} className="bg-card rounded-2xl border p-5">
            <p className="font-medium mb-3">{i + 1}. {q.questionText}</p>
            {q.options?.map((opt, j) => (
              <label key={j} className="flex items-center gap-3 py-2 cursor-pointer hover:text-primary transition-colors">
                <input type="radio" name={`q-${q.id}`} value={opt} className="accent-primary" />
                <span className="text-sm">{opt}</span>
              </label>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
