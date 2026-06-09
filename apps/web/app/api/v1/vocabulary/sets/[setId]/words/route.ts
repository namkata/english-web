import { NextResponse } from 'next/server'

const WORDS: Record<string, Array<{ id: string; word: string; phoneticUk: string | null; phoneticUs: string | null; partOfSpeech: string; definition: string; exampleSentence: string; imageUrl: string | null; audioUrl: string | null }>> = {
  '1': [
    { id: 'w1', word: 'abandon', phoneticUk: '/əˈbændən/', phoneticUs: '/əˈbændən/', partOfSpeech: 'verb', definition: 'từ bỏ, bỏ rơi', exampleSentence: 'They had to abandon the plan.', imageUrl: null, audioUrl: null },
    { id: 'w2', word: 'ability', phoneticUk: '/əˈbɪləti/', phoneticUs: '/əˈbɪləti/', partOfSpeech: 'noun', definition: 'khả năng', exampleSentence: 'She has the ability to learn quickly.', imageUrl: null, audioUrl: null },
    { id: 'w3', word: 'abroad', phoneticUk: '/əˈbrɔːd/', phoneticUs: '/əˈbrɑːd/', partOfSpeech: 'adverb', definition: 'ở nước ngoài', exampleSentence: 'He studied abroad for two years.', imageUrl: null, audioUrl: null },
  ],
  '2': [
    { id: 'w4', word: 'agenda', phoneticUk: '/əˈdʒendə/', phoneticUs: '/əˈdʒendə/', partOfSpeech: 'noun', definition: 'chương trình nghị sự', exampleSentence: 'What is on the agenda today?', imageUrl: null, audioUrl: null },
    { id: 'w5', word: 'colleague', phoneticUk: '/ˈkɒliːɡ/', phoneticUs: '/ˈkɑːliːɡ/', partOfSpeech: 'noun', definition: 'đồng nghiệp', exampleSentence: 'I discussed it with my colleague.', imageUrl: null, audioUrl: null },
    { id: 'w6', word: 'deadline', phoneticUk: '/ˈdedlaɪn/', phoneticUs: '/ˈdedlaɪn/', partOfSpeech: 'noun', definition: 'hạn chót', exampleSentence: 'The deadline is next Friday.', imageUrl: null, audioUrl: null },
  ],
}

export async function GET(_req: Request, { params }: { params: Promise<{ setId: string }> }) {
  const { setId } = await params
  const words = WORDS[setId] || []
  return NextResponse.json({ success: true, data: { items: words, total: words.length } })
}
