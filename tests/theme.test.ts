import { describe, expect, it } from 'vitest'
import { nextTheme, parseTheme, resolveTheme } from '../src/utils/theme'

describe('theme policy', () => {
  it.each([
    [null, 'auto'],
    [undefined, 'auto'],
    ['', 'auto'],
    ['garbage', 'auto'],
    ['auto', 'auto'],
    ['dark', 'dark'],
    ['light', 'light'],
  ])('parses %j as %s', (value, expected) => {
    expect(parseTheme(value)).toBe(expected)
  })

  it.each([
    ['auto', true, 'dark'],
    ['auto', false, 'light'],
    ['dark', false, 'dark'],
    ['light', true, 'light'],
  ] as const)(
    'resolves %s with prefersDark=%s',
    (preference, dark, expected) => {
      expect(resolveTheme(preference, dark)).toBe(expected)
    },
  )

  it.each([
    ['auto', true, 'light'],
    ['auto', false, 'dark'],
    ['dark', true, 'auto'],
    ['light', false, 'auto'],
  ] as const)(
    'advances %s with prefersDark=%s',
    (preference, dark, expected) => {
      expect(nextTheme(preference, dark)).toBe(expected)
    },
  )
})
