import { describe, expect, it } from 'vitest'

import { createCard, GRADE_QUALITY, isDue, isMastered, reviewCard } from '../srs'

const NOW = new Date('2026-06-11T08:00:00Z')

describe('createCard', () => {
  it('starts unreviewed and due immediately', () => {
    const card = createCard('w1')
    expect(card.repetitions).toBe(0)
    expect(card.ease).toBe(2.5)
    expect(card.intervalDays).toBe(0)
    expect(card.lastReviewedAt).toBeNull()
    expect(isDue(card)).toBe(true)
  })
})

describe('reviewCard — SM-2 progression', () => {
  it('first successful review → 1-day interval', () => {
    const next = reviewCard(createCard('w1'), GRADE_QUALITY.good, NOW)
    expect(next.repetitions).toBe(1)
    expect(next.intervalDays).toBe(1)
    expect(next.dueDate).toBe(new Date('2026-06-12T08:00:00Z').toISOString())
  })

  it('second successful review → 6-day interval', () => {
    let card = reviewCard(createCard('w1'), 4, NOW)
    card = reviewCard(card, 4, NOW)
    expect(card.repetitions).toBe(2)
    expect(card.intervalDays).toBe(6)
  })

  it('third review multiplies interval by ease', () => {
    let card = reviewCard(createCard('w1'), 4, NOW)
    card = reviewCard(card, 4, NOW)
    const ease = card.ease
    card = reviewCard(card, 4, NOW)
    expect(card.intervalDays).toBe(Math.round(6 * ease))
  })

  it('lapse (quality < 3) resets repetitions and schedules tomorrow', () => {
    let card = reviewCard(createCard('w1'), 5, NOW)
    card = reviewCard(card, 5, NOW)
    card = reviewCard(card, GRADE_QUALITY.again, NOW)
    expect(card.repetitions).toBe(0)
    expect(card.intervalDays).toBe(1)
  })

  it('ease never drops below 1.3', () => {
    let card = createCard('w1')
    for (let i = 0; i < 10; i++) card = reviewCard(card, 0, NOW)
    expect(card.ease).toBeGreaterThanOrEqual(1.3)
  })

  it('clamps quality outside 0–5', () => {
    const high = reviewCard(createCard('w1'), 99, NOW)
    expect(high.repetitions).toBe(1)
    const low = reviewCard(createCard('w1'), -3, NOW)
    expect(low.intervalDays).toBe(1)
    expect(low.repetitions).toBe(0)
  })
})

describe('isDue / isMastered', () => {
  it('card due in the future is not due now', () => {
    const card = reviewCard(createCard('w1'), 4, NOW)
    expect(isDue(card, NOW)).toBe(false)
    expect(isDue(card, new Date('2026-06-13T08:00:00Z'))).toBe(true)
  })

  it('undefined card is treated as due and not mastered', () => {
    expect(isDue(undefined)).toBe(true)
    expect(isMastered(undefined)).toBe(false)
  })

  it('mastered after ≥3 reps and ≥21-day interval', () => {
    let card = createCard('w1')
    for (let i = 0; i < 5; i++) card = reviewCard(card, 5, NOW)
    expect(card.repetitions).toBeGreaterThanOrEqual(3)
    expect(isMastered(card)).toBe(card.intervalDays >= 21)
  })
})
