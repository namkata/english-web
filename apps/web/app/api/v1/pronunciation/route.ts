import { NextResponse } from 'next/server'
import { PHONEME_CATEGORIES, PHONEMES } from '@/lib/seed-data/pronunciation'

export async function GET() {
  return NextResponse.json({ success: true, data: { categories: PHONEME_CATEGORIES, phonemes: PHONEMES } })
}
