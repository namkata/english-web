import { NextResponse } from 'next/server'
import { ALL_PASSAGES } from '@/lib/seed-data/reading'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const passage = ALL_PASSAGES.find(p => p.id === id)
  if (!passage) {
    return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Không tìm thấy bài đọc.' } }, { status: 404 })
  }
  return NextResponse.json({ success: true, data: passage })
}
