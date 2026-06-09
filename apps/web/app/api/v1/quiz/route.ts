import { NextResponse } from 'next/server'

const MOCK_QUESTIONS = [
  { id: 'q1', type: 'choose_best_word', question: 'She _____ to school every day.', options: ['go', 'goes', 'going', 'gone'], correctAnswer: 'goes' },
  { id: 'q2', type: 'fill_in_blank', question: 'They have _____ finished their homework.', options: [], correctAnswer: 'already' },
  { id: 'q3', type: 'choose_best_word', question: 'I _____ coffee to tea.', options: ['prefer', 'prefers', 'preferring', 'preferred'], correctAnswer: 'prefer' },
]

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  return NextResponse.json({
    success: true,
    data: {
      id: `quiz-${Date.now()}`,
      level: body.level || 'B1',
      questionCount: body.questionCount || 15,
      questions: MOCK_QUESTIONS,
      examMode: body.examMode || false,
    },
  }, { status: 201 })
}
