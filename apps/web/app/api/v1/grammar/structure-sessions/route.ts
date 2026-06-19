import { NextResponse } from 'next/server'
import { STRUCTURE_SESSIONS } from '@/lib/seed-data/grammar'

export async function GET() {
  return NextResponse.json({ success: true, data: STRUCTURE_SESSIONS })
}
