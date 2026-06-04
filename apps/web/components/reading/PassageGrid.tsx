'use client'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { BookOpen } from 'lucide-react'
import { apiClient } from '@/lib/api-client'

const MOCK_PASSAGES = [
  { id: '1', title: 'My Neighborhood', content: 'I live in a small neighborhood. It is quiet, clean, and friendly. My house is on a street with many trees. In the morning, I often hea...', length: 'medium', questionCount: 7 },
  { id: '2', title: 'A Morning in the Kitchen', content: 'Anna gets up early every day. She walks into the kitchen and turns on the light. The kitchen is small, but it is clean and bright....', length: 'medium', questionCount: 7 },
  { id: '3', title: 'A Day at the Zoo', content: 'On Saturday morning, Mia went to the zoo with her mother and younger brother, Ben. They arrived early because the zoo was ve...', length: 'long', questionCount: 9 },
  { id: '4', title: 'Weekend Games', content: 'On Saturday, Mia and her brother Tom stay at home because it is raining. After breakfast, they play a board game at the...', length: 'short', questionCount: 5 },
  { id: '5', title: 'A Trip to the Market', content: 'Every Saturday, Mia goes to the small market with her mother. They buy fruits and vegetables for the week. Mia likes bright re...', length: 'short', questionCount: 5 },
  { id: '6', title: 'A Visit to the Farm', content: 'Mia goes with her class to a small farm. The farm is near her town. There are many animals on the farm, and Mia is very happy...', length: 'long', questionCount: 9 },
]

export function PassageGrid() {
  const { data } = useQuery({
    queryKey: ['reading', 'passages'],
    queryFn: () => apiClient.reading.listPassages({ limit: 6 }),
    placeholderData: { items: MOCK_PASSAGES, total: 6 } as any,
  })

  const passages = data?.items ?? []

  if (!passages.length) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border bg-muted/40 h-48 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {passages.map((p) => (
        <div key={p.id} className="rounded-2xl border bg-card flex flex-col">
          <div className="p-4 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded-full">{p.length === 'short' ? 'Ngắn' : p.length === 'medium' ? 'Vừa' : 'Dài'}</span>
              <span className="text-xs text-muted-foreground">{p.questionCount} câu</span>
            </div>
            <h3 className="font-semibold mb-1">{p.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">{p.content.slice(0, 120)}...</p>
          </div>
          <div className="p-4 pt-0">
            <Link href={`/reading/${p.id}`} className="w-full flex items-center justify-center gap-2 rounded-xl border py-2 text-sm font-medium hover:bg-muted transition-colors">
              <BookOpen size={15} /> Làm bài
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
