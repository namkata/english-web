import { NextResponse } from 'next/server'

interface FeedbackBody {
  type?: string
  name?: string
  contact?: string
  content?: string
}

const VALID_TYPES = new Set(['feature', 'general', 'bug'])

/**
 * Accept user feedback. In production this would persist to the DB and notify
 * the admin (email/Slack); here it validates and acknowledges receipt.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as FeedbackBody
  const { type, name, contact, content } = body

  if (!type || !VALID_TYPES.has(type) || !name?.trim() || !contact?.trim() || !content || content.trim().length < 10) {
    return NextResponse.json(
      { success: false, error: { code: 'INVALID_INPUT', message: 'Phản hồi chưa hợp lệ. Vui lòng kiểm tra lại các trường.' } },
      { status: 400 },
    )
  }

  const record = {
    id: `fb-${Date.now()}`,
    type,
    name: name.trim(),
    contact: contact.trim(),
    content: content.trim(),
    receivedAt: new Date().toISOString(),
  }

  console.info('[feedback] received', { id: record.id, type: record.type, contact: record.contact })

  return NextResponse.json({ success: true, data: { id: record.id, receivedAt: record.receivedAt } }, { status: 201 })
}
