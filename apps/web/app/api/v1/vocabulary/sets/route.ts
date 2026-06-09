import { NextResponse } from 'next/server'
import { VOCAB_SETS } from '@/lib/seed-data/vocabulary'

export async function GET() {
  const sets = VOCAB_SETS.map(({ set }) => set)
  return NextResponse.json({ success: true, data: sets })
}
