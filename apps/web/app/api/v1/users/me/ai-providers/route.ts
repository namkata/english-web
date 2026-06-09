import { NextResponse } from 'next/server'

const MOCK_PROVIDERS = [
  { id: 'p1', name: 'OpenAI GPT-4o', provider: 'openai', model: 'gpt-4o', isActive: true, createdAt: '2026-05-01T00:00:00Z' },
]

export async function GET() {
  return NextResponse.json({ success: true, data: MOCK_PROVIDERS })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const provider = {
    id: `p-${Date.now()}`,
    name: body.name || 'New Provider',
    provider: body.provider || 'openai',
    model: body.model || 'gpt-4o',
    isActive: true,
    createdAt: new Date().toISOString(),
  }
  return NextResponse.json({ success: true, data: provider }, { status: 201 })
}
