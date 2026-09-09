import { useCallback, useEffect, useState } from 'react'
import { ThemeContext } from './theme-context-object.js'

function readInitialTheme() {
  if (typeof document === 'undefined') return 'light'
  const attr = document.documentElement.getAttribute('data-theme')
  return attr === 'dark' ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitialTheme)

  const applyTheme = useCallback(next => {
    document.documentElement.setAttribute('data-theme', next)
    document.documentElement.style.colorScheme = next
    try { localStorage.setItem('theme', next) } catch { /* storage unavailable */ }
    setTheme(next)
  }, [])

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduceMotion && document.startViewTransition) {
      document.startViewTransition(() => applyTheme(next))
    } else {
      applyTheme(next)
    }
  }, [theme, applyTheme])

  /* Follow system preference live, but only while the user hasn't made an explicit choice */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = e => {
      let saved = null
      try { saved = localStorage.getItem('theme') } catch { /* storage unavailable */ }
      if (saved !== 'light' && saved !== 'dark') applyTheme(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [applyTheme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
