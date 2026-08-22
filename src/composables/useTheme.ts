import { ref } from 'vue'

const THEME_KEY = 'qisoul_theme'

export type Theme = 'light' | 'dark'

const theme = ref<Theme>('light')

export function useTheme() {
  const initTheme = () => {
    const stored = localStorage.getItem(THEME_KEY) as Theme | null
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const resolved = stored || preferred
    theme.value = resolved
    applyTheme(resolved)
  }

  const applyTheme = (t: Theme) => {
    document.documentElement.classList.toggle('dark', t === 'dark')
  }

  const toggleTheme = () => {
    const next: Theme = theme.value === 'light' ? 'dark' : 'light'
    theme.value = next
    localStorage.setItem(THEME_KEY, next)
    applyTheme(next)
  }

  const setTheme = (t: Theme) => {
    theme.value = t
    localStorage.setItem(THEME_KEY, t)
    applyTheme(t)
  }

  return { theme, initTheme, toggleTheme, setTheme }
}
