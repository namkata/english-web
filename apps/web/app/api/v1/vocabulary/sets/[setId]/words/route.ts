import { NextResponse } from 'next/server'
import { VOCAB_SETS } from '@/lib/seed-data/vocabulary'

export async function GET(_req: Request, { params }: { params: Promise<{ setId: string }> }) {
  const { setId } = await params
  const found = VOCAB_SETS.find(s => s.set.id === setId)
  const words = found?.words || []
  return NextResponse.json({ success: true, data: { items: words, total: words.length } })
}
