import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  return NextResponse.json({
    success: true,
    data: {
      id: `session-${Date.now()}`,
      difficulty: body.difficulty || 'easy',
      topic: body.topic || 'General',
      mode: body.mode || 'sentence_writing',
      level: body.level || 'B1',
      totalSentences: 5,
      completedSentences: 0,
      averageScore: 0,
      createdAt: new Date().toISOString(),
    },
  }, { status: 201 })
}
