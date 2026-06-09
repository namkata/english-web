import { NextResponse } from 'next/server'

export async function POST(req: Request, { params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params
  const body = await req.json().catch(() => ({}))
  return NextResponse.json({
    success: true,
    data: {
      sentenceId: `sent-${Date.now()}`,
      sessionId,
      userSentence: body.userSentence || '',
      score: 75,
      grammarErrors: [],
      vocabularyFeedback: 'Từ vựng phù hợp với ngữ cảnh.',
      overallFeedback: 'Câu viết tốt, có thể cải thiện thêm về cấu trúc.',
      improvedVersion: body.userSentence || '',
    },
  })
}
