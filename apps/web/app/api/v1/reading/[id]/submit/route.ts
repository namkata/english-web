import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const answers: Record<string, string> = body.answers || {}
  const total = Object.keys(answers).length || 7
  const correct = Math.min(total, Math.floor(Math.random() * 3) + Math.floor(total / 2))
  return NextResponse.json({
    success: true,
    data: {
      score: correct,
      total,
      percentage: Math.round((correct / total) * 100),
      correctAnswers: Object.keys(answers).slice(0, correct),
      incorrectAnswers: Object.keys(answers).slice(correct),
    },
  })
}
