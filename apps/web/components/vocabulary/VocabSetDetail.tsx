'use client'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'

export function VocabSetDetail({ setId }: { setId: string }) {
  const { data } = useQuery({
    queryKey: ['vocabulary', 'words', setId],
    queryFn: () => apiClient.vocabulary.getSetWords(setId),
  })

  const words = data?.items ?? []

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Từ vựng</h1>
      <div className="space-y-3">
        {words.map(word => (
          <div key={word.id} className="rounded-2xl border bg-card p-4 flex items-start gap-4">
            {word.imageUrl && (
              <Image src={word.imageUrl} alt={word.word} width={56} height={56} className="rounded-xl object-cover flex-shrink-0" unoptimized />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">{word.word}</span>
                {word.phonetic_uk && <span className="text-xs text-muted-foreground">UK /{word.phonetic_uk}/</span>}
                {word.phonetic_us && <span className="text-xs text-muted-foreground">US /{word.phonetic_us}/</span>}
              </div>
              <p className="text-sm text-muted-foreground italic mt-0.5">({word.partOfSpeech}) {word.definition}</p>
              <p className="text-sm mt-1">{word.exampleSentence}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
