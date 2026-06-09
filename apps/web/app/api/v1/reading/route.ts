import { NextResponse } from 'next/server'

const MOCK_PASSAGES = [
  { id: '1', title: 'My Neighborhood', content: 'I live in a small neighborhood. It is quiet, clean, and friendly...', level: 'A2', length: 'medium', topic: 'daily life', wordCount: 280, questionCount: 7, imageUrl: null, createdAt: '2026-05-01T00:00:00Z' },
  { id: '2', title: 'A Morning in the Kitchen', content: 'Anna gets up early every day. She walks into the kitchen and turns on the light...', level: 'A2', length: 'medium', topic: 'daily life', wordCount: 310, questionCount: 7, imageUrl: null, createdAt: '2026-05-02T00:00:00Z' },
  { id: '3', title: 'A Day at the Zoo', content: 'On Saturday morning, Mia went to the zoo with her mother and younger brother, Ben...', level: 'B1', length: 'long', topic: 'animals', wordCount: 450, questionCount: 9, imageUrl: null, createdAt: '2026-05-03T00:00:00Z' },
  { id: '4', title: 'Weekend Games', content: 'On Saturday, Mia and her brother Tom stay at home because it is raining...', level: 'A1', length: 'short', topic: 'hobbies', wordCount: 180, questionCount: 5, imageUrl: null, createdAt: '2026-05-04T00:00:00Z' },
  { id: '5', title: 'A Trip to the Market', content: 'Every Saturday, Mia goes to the small market with her mother. They buy fruits and vegetables...', level: 'A1', length: 'short', topic: 'shopping', wordCount: 200, questionCount: 5, imageUrl: null, createdAt: '2026-05-05T00:00:00Z' },
  { id: '6', title: 'A Visit to the Farm', content: 'Mia goes with her class to a small farm. The farm is near her town...', level: 'B1', length: 'long', topic: 'animals', wordCount: 420, questionCount: 9, imageUrl: null, createdAt: '2026-05-06T00:00:00Z' },
]

export async function GET() {
  return NextResponse.json({ success: true, data: { items: MOCK_PASSAGES, total: MOCK_PASSAGES.length } })
}
