import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({
    success: true,
    data: { score: 2, total: 3, correctAnswers: ['goes', 'already'], incorrectAnswers: ['preferring'] },
  })
}
