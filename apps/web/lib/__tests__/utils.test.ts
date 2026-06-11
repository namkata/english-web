import { describe, expect, it } from 'vitest'

import { cn, formatXP, getGreeting } from '../utils'

describe('cn', () => {
  it('merges class names and resolves Tailwind conflicts', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
    expect(cn('text-sm', undefined, false, 'font-bold')).toBe('text-sm font-bold')
  })
})

describe('formatXP', () => {
  it('formats plain numbers below 1000', () => {
    expect(formatXP(0)).toBe('0')
    expect(formatXP(999)).toBe('999')
  })

  it('formats thousands with K suffix', () => {
    expect(formatXP(1_000)).toBe('1.0K')
    expect(formatXP(12_345)).toBe('12.3K')
  })

  it('formats millions with M suffix', () => {
    expect(formatXP(2_500_000)).toBe('2.5M')
  })
})

describe('getGreeting', () => {
  it('returns one of the Vietnamese greetings', () => {
    expect(['Chào buổi sáng', 'Chào buổi chiều', 'Chào buổi tối']).toContain(getGreeting())
  })
})
