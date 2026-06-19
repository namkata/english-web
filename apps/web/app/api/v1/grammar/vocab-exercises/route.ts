import { NextResponse } from 'next/server'
import { VOCAB_EXERCISES } from '@/lib/seed-data/grammar'

export async function GET() {
  return NextResponse.json({ success: true, data: VOCAB_EXERCISES })
}
