import { NextResponse } from 'next/server'

const SETTINGS = {
  name: 'Demo User',
  email: 'demo@example.com',
  avatarUrl: null,
  dailyGoalXP: 200,
}

export async function GET() {
  return NextResponse.json({ success: true, data: SETTINGS })
}

export async function PUT(req: Request) {
  const body = await req.json().catch(() => ({}))
  Object.assign(SETTINGS, body)
  return NextResponse.json({ success: true, data: SETTINGS })
}
