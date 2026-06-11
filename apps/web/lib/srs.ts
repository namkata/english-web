/**
 * SM-2 spaced-repetition algorithm (SuperMemo 2).
 *
 * Each review produces an updated card with a new interval (days), ease factor,
 * repetition count and due date. Recall quality is graded 0–5:
 *   0–2 → lapse (reset repetitions, review again tomorrow)
 *   3   → correct but hard
 *   4   → correct
 *   5   → perfect
 */

export interface SrsCard {
  /** Identifier of the word this card tracks. */
  wordId: string
  /** Number of consecutive successful reviews. */
  repetitions: number
  /** Ease factor — minimum 1.3, starts at 2.5. */
  ease: number
  /** Current interval in days until the next review. */
  intervalDays: number
  /** ISO date string for when the card is next due. */
  dueDate: string
  /** ISO date string of the last review, or null if never reviewed. */
  lastReviewedAt: string | null
}

/** Recall grades surfaced in the review UI, mapped to SM-2 quality scores. */
export type RecallGrade = 'again' | 'hard' | 'good' | 'easy'

export const GRADE_QUALITY: Record<RecallGrade, number> = {
  again: 1,
  hard: 3,
  good: 4,
  easy: 5,
}

/** Create a fresh, never-reviewed card for a word (due immediately). */
export function createCard(wordId: string): SrsCard {
  return {
    wordId,
    repetitions: 0,
    ease: 2.5,
    intervalDays: 0,
    dueDate: new Date().toISOString(),
    lastReviewedAt: null,
  }
}

function addDays(from: Date, days: number): Date {
  const d = new Date(from)
  d.setDate(d.getDate() + days)
  return d
}

/**
 * Apply one SM-2 review to a card and return the updated card.
 * @param card  The current card state.
 * @param quality  Recall quality 0–5.
 * @param now  Reference time (defaults to now) — injectable for tests.
 */
export function reviewCard(card: SrsCard, quality: number, now: Date = new Date()): SrsCard {
  const q = Math.max(0, Math.min(5, Math.round(quality)))

  let { repetitions, ease, intervalDays } = card

  if (q < 3) {
    // Lapse: relearn from the start, but keep an adjusted ease.
    repetitions = 0
    intervalDays = 1
  } else {
    if (repetitions === 0) intervalDays = 1
    else if (repetitions === 1) intervalDays = 6
    else intervalDays = Math.round(intervalDays * ease)
    repetitions += 1
  }

  // Standard SM-2 ease adjustment, floored at 1.3.
  ease = Math.max(1.3, ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))

  return {
    ...card,
    repetitions,
    ease: Math.round(ease * 100) / 100,
    intervalDays,
    dueDate: addDays(now, intervalDays).toISOString(),
    lastReviewedAt: now.toISOString(),
  }
}

/** Whether a card is due for review at the given time. */
export function isDue(card: SrsCard | undefined, now: Date = new Date()): boolean {
  if (!card) return true
  return new Date(card.dueDate).getTime() <= now.getTime()
}

/** A word is considered "mastered" once it survives to a long interval. */
export function isMastered(card: SrsCard | undefined): boolean {
  return !!card && card.repetitions >= 3 && card.intervalDays >= 21
}
