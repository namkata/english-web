import { NextResponse } from 'next/server'
import { GRAMMAR_TOPICS } from '@/lib/seed-data/grammar'

export async function GET() {
  return NextResponse.json({ success: true, data: { topics: GRAMMAR_TOPICS } })
}
