const theme = ref<'light' | 'dark'>('light')

export function useTheme() {
  const initTheme = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
      if (saved) {
        theme.value = saved
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        theme.value = prefersDark ? 'dark' : 'light'
      }
      applyTheme()
    }
  }

  const applyTheme = () => {
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', theme.value === 'dark')
    }
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    if (import.meta.client) {
      localStorage.setItem('theme', theme.value)
    }
    applyTheme()
  }

  watch(theme, () => {
    applyTheme()
  })

  return {
    theme: readonly(theme),
    initTheme,
    toggleTheme
  }
}