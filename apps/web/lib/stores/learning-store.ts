/**
 * Client-side learning progress store (persisted to localStorage).
 *
 * Holds spaced-repetition card states, custom user words, and practice history
 * for reading / writing / quiz. This keeps the Sprint 3 interactive flows fully
 * functional without the backend services running; it is the single source of
 * truth for "what has the learner done" on the device.
 */
'use client'

import { useEffect, useState } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { createCard, isMastered, reviewCard, type RecallGrade, type SrsCard, GRADE_QUALITY } from '@/lib/srs'

export type WordStatus = 'new' | 'learning' | 'learned'

export interface CustomWord {
  id: string
  word: string
  phoneticUk: string
  phoneticUs: string
  partOfSpeech: string
  definition: string
  exampleSentence: string
  createdAt: string
}

export interface ReadingAttempt {
  id: string
  passageId: string
  title: string
  score: number
  total: number
  percentage: number
  at: string
}

export interface WritingEntry {
  id: string
  mode: 'sentence_writing' | 'sentence_rewrite'
  topic: string
  prompt: string
  userSentence: string
  score: number
  at: string
}

export interface QuizAttempt {
  id: string
  level: string
  correct: number
  total: number
  percentage: number
  byType: Record<string, { correct: number; total: number }>
  at: string
}

interface LearningState {
  cards: Record<string, SrsCard>
  learnedIds: string[]
  customWords: CustomWord[]
  readingHistory: ReadingAttempt[]
  writingHistory: WritingEntry[]
  quizHistory: QuizAttempt[]

  /** Grade a flashcard during an SRS review session. */
  gradeCard: (wordId: string, grade: RecallGrade) => void
  /** Explicitly mark a word as learned (e.g. "Đã thuộc" in flashcards). */
  markLearned: (wordId: string) => void
  /** Reset a word back to "new". */
  resetWord: (wordId: string) => void
  /** Derive the status of a word from its card + learned set. */
  statusOf: (wordId: string) => WordStatus

  addCustomWord: (w: Omit<CustomWord, 'id' | 'createdAt'>) => void
  removeCustomWord: (id: string) => void

  logReading: (a: Omit<ReadingAttempt, 'id' | 'at'>) => void
  logWriting: (e: Omit<WritingEntry, 'id' | 'at'>) => void
  logQuiz: (a: Omit<QuizAttempt, 'id' | 'at'>) => void
}

const newId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      cards: {},
      learnedIds: [],
      customWords: [],
      readingHistory: [],
      writingHistory: [],
      quizHistory: [],

      gradeCard: (wordId, grade) =>
        set(state => {
          const current = state.cards[wordId] ?? createCard(wordId)
          const updated = reviewCard(current, GRADE_QUALITY[grade])
          const learnedIds =
            isMastered(updated) && !state.learnedIds.includes(wordId)
              ? [...state.learnedIds, wordId]
              : state.learnedIds
          return { cards: { ...state.cards, [wordId]: updated }, learnedIds }
        }),

      markLearned: wordId =>
        set(state => ({
          learnedIds: state.learnedIds.includes(wordId)
            ? state.learnedIds
            : [...state.learnedIds, wordId],
        })),

      resetWord: wordId =>
        set(state => {
          const cards = { ...state.cards }
          delete cards[wordId]
          return { cards, learnedIds: state.learnedIds.filter(id => id !== wordId) }
        }),

      statusOf: wordId => {
        const state = get()
        if (state.learnedIds.includes(wordId) || isMastered(state.cards[wordId])) return 'learned'
        const card = state.cards[wordId]
        if (card && card.repetitions > 0) return 'learning'
        return 'new'
      },

      addCustomWord: w =>
        set(state => ({
          customWords: [
            { ...w, id: `custom-${newId()}`, createdAt: new Date().toISOString() },
            ...state.customWords,
          ],
        })),

      removeCustomWord: id =>
        set(state => ({ customWords: state.customWords.filter(w => w.id !== id) })),

      logReading: a =>
        set(state => ({
          readingHistory: [{ ...a, id: newId(), at: new Date().toISOString() }, ...state.readingHistory].slice(0, 100),
        })),

      logWriting: e =>
        set(state => ({
          writingHistory: [{ ...e, id: newId(), at: new Date().toISOString() }, ...state.writingHistory].slice(0, 200),
        })),

      logQuiz: a =>
        set(state => ({
          quizHistory: [{ ...a, id: newId(), at: new Date().toISOString() }, ...state.quizHistory].slice(0, 100),
        })),
    }),
    { name: 'englishweb-learning' },
  ),
)

/**
 * Returns true once the persisted store has rehydrated from localStorage.
 * Use to avoid SSR/client hydration mismatches when rendering store-derived UI.
 */
export function useHasHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => {
    setHydrated(true)
  }, [])
  return hydrated
}
