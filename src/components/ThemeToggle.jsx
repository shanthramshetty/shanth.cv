import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../useTheme.js'

const EASE = [0.4, 0, 0.2, 1]

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{
        position: 'relative',
        width: '50px',
        height: '27px',
        flexShrink: 0,
        borderRadius: '999px',
        border: 'none',
        padding: '3px',
        cursor: 'pointer',
        background: 'var(--color-toggle-track)',
        transition: 'background-color 0.5s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex',
        alignItems: 'center',
        outline: 'none',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
      }}
    >
      {/* Static end icons — dim as the knob covers them */}
      <span style={{
        position: 'absolute', left: '6px', top: '50%',
        transform: 'translateY(-50%)', display: 'flex',
        opacity: isDark ? 0.3 : 1,
        transition: 'opacity 0.45s ease-in-out',
      }}>
        <SunIcon size={12} color={isDark ? 'rgba(255,255,255,0.4)' : '#f2a531'} />
      </span>
      <span style={{
        position: 'absolute', right: '6px', top: '50%',
        transform: 'translateY(-50%)', display: 'flex',
        opacity: isDark ? 1 : 0.3,
        transition: 'opacity 0.45s ease-in-out',
      }}>
        <MoonIcon size={11} color={isDark ? '#cfd6ff' : 'rgba(0,0,0,0.28)'} />
      </span>

      {/* Sliding knob */}
      <motion.span
        animate={{ x: isDark ? 23 : 0 }}
        transition={{ type: 'spring', stiffness: 480, damping: 30, mass: 0.9 }}
        style={{
          position: 'relative',
          width: '21px',
          height: '21px',
          borderRadius: '50%',
          background: 'var(--color-toggle-knob)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.28), 0 1px 1px rgba(0,0,0,0.16)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: -80, scale: 0.4 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 80, scale: 0.4 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ display: 'flex' }}
            >
              <MoonIcon size={12} color="#4b4b57" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: 80, scale: 0.4 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -80, scale: 0.4 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ display: 'flex' }}
            >
              <SunIcon size={12} color="#f2a531" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </button>
  )
}

function SunIcon({ size = 14, color = '#f2a531' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.3" fill={color} stroke="none" />
      <line x1="12" y1="1.4" x2="12" y2="3.8" />
      <line x1="12" y1="20.2" x2="12" y2="22.6" />
      <line x1="1.4" y1="12" x2="3.8" y2="12" />
      <line x1="20.2" y1="12" x2="22.6" y2="12" />
      <line x1="4.3" y1="4.3" x2="5.9" y2="5.9" />
      <line x1="18.1" y1="18.1" x2="19.7" y2="19.7" />
      <line x1="4.3" y1="19.7" x2="5.9" y2="18.1" />
      <line x1="18.1" y1="5.9" x2="19.7" y2="4.3" />
    </svg>
  )
}

function MoonIcon({ size = 14, color = '#cfd6ff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
      <path d="M20.7 15.4A9 9 0 1 1 8.6 3.3a7.15 7.15 0 0 0 12.1 12.1Z" />
    </svg>
  )
}
