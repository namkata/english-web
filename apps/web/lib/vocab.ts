/**
 * Vocabulary helpers shared across the flashcard, review and word-bank UIs.
 *
 * The seed data uses camelCase phonetic fields (`phoneticUk`/`phoneticUs`),
 * so this is the canonical word shape the vocabulary components consume.
 */
import { VOCAB_SETS } from '@/lib/seed-data/vocabulary'

export interface VocabWordItem {
  id: string
  word: string
  phoneticUk?: string
  phoneticUs?: string
  partOfSpeech: string
  definition: string
  exampleSentence: string
}

export interface VocabWordWithSet extends VocabWordItem {
  setId: string
  setName: string
  level: string
}

/** Flatten every seeded word together with the set it belongs to. */
export function getAllSeedWords(): VocabWordWithSet[] {
  return VOCAB_SETS.flatMap(({ set, words }) =>
    words.map(w => ({
      ...w,
      setId: set.id,
      setName: set.name,
      level: set.level,
    })),
  )
}

export const PART_OF_SPEECH_OPTIONS = [
  'noun',
  'verb',
  'adjective',
  'adverb',
  'preposition',
  'conjunction',
  'exclamation',
  'other',
] as const
