import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeName = 'brown' | 'violet' | 'ocean'
export type ThemeMode = 'light' | 'dark'

interface ThemeState {
  theme: ThemeName
  mode: ThemeMode
  setTheme: (theme: ThemeName) => void
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'brown',
      mode: 'light',
      setTheme: (theme) => set({ theme }),
      setMode: (mode) => set({ mode }),
      toggleMode: () => set({ mode: get().mode === 'light' ? 'dark' : 'light' }),
    }),
    { name: 'drcondo-theme' }
  )
)

/** Aplica as classes de tema e modo no <html>. Chamar num useEffect. */
export function applyTheme(theme: ThemeName, mode: ThemeMode) {
  const html = document.documentElement
  html.classList.toggle('dark', mode === 'dark')
  html.classList.toggle('theme-violet', theme === 'violet')
  html.classList.toggle('theme-ocean', theme === 'ocean')
}
