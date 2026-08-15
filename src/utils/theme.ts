export type ThemePreference = 'auto' | 'dark' | 'light'
export type ResolvedTheme = 'dark' | 'light'

export function parseTheme(value: unknown): ThemePreference {
  return value === 'dark' || value === 'light' || value === 'auto'
    ? value
    : 'auto'
}

export function resolveTheme(
  preference: ThemePreference,
  prefersDark: boolean,
): ResolvedTheme {
  if (preference === 'auto') return prefersDark ? 'dark' : 'light'
  return preference
}

/** Explicit choices return to Auto; Auto chooses the palette opposite the OS. */
export function nextTheme(
  preference: ThemePreference,
  prefersDark: boolean,
): ThemePreference {
  if (preference !== 'auto') return 'auto'
  return prefersDark ? 'light' : 'dark'
}
