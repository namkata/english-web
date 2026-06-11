import { NextRequest, NextResponse } from 'next/server'
import { createCard, reviewCard, type SrsCard } from '@/lib/srs'

interface ReviewBody {
  quality?: number
  card?: SrsCard
}

/**
 * POST /api/v1/vocabulary/words/:wordId/review
 * Applies one SM-2 review step. Accepts the current card state (client-held
 * until the Go content-service persists SRS data) plus a 0–5 quality grade,
 * and returns the updated card with the next due date.
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ wordId: string }> }) {
  const { wordId } = await params

  let body: ReviewBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { success: false, error: { message: 'Dữ liệu ôn tập không hợp lệ.' } },
      { status: 400 },
    )
  }

  const quality = body.quality
  if (typeof quality !== 'number' || quality < 0 || quality > 5) {
    return NextResponse.json(
      { success: false, error: { message: 'Điểm nhớ phải nằm trong khoảng 0–5.' } },
      { status: 400 },
    )
  }

  const card = body.card && body.card.wordId === wordId ? body.card : createCard(wordId)
  const updated = reviewCard(card, quality)

  return NextResponse.json({ success: true, data: updated })
}
