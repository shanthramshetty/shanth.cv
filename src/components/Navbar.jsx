import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About',   page: 'about'   },
  { label: 'Work',    page: 'work'    },
  { label: 'Fun',     page: 'fun'     },
  { label: 'Contact', page: 'contact' },
]

export default function Navbar({ page, setPage }) {
  /* Active label — Home page intentionally has no active pill */
  const active =
    page === 'about'   ? 'About'   :
    page === 'work'    ? 'Work'    :
    page === 'fun'     ? 'Fun'     :
    page === 'contact' ? 'Contact' : ''

  /* Dark-mode navbar for dark-background pages */
  const dark = page === 'work' || page === 'fun'

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      backgroundColor: dark ? 'rgba(10,10,11,0.88)' : 'rgba(250,250,248,0.92)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderBottom: dark
        ? '1px solid rgba(255,255,255,0.06)'
        : '1px solid rgba(0,0,0,0.06)',
      transition: 'background-color 0.4s, border-color 0.4s',
      willChange: 'background-color',
      WebkitTransform: 'translateZ(0)',
      transform: 'translateZ(0)',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        height: '64px',
        padding: '0 clamp(1rem, 3.5vw, 2.5rem)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* ── Logo / Profile icon → Home ────────────────────────── */}
        <motion.button
          onClick={() => setPage('home')}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.93 }}
          transition={{ type: 'spring', stiffness: 420, damping: 20 }}
          aria-label="Go to home"
          style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: dark ? '#ffffff' : '#111',
            color: dark ? '#000' : '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            border: 'none', cursor: 'pointer',
            userSelect: 'none', flexShrink: 0,
            transition: 'background 0.4s, color 0.4s',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            outline: 'none',
          }}
        >
          Ss
        </motion.button>

        {/* ── Navigation pills ──────────────────────────────────── */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          style={{
            display: 'flex', alignItems: 'center', gap: '2px',
            background: dark
              ? 'rgba(255,255,255,0.07)'
              : 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderRadius: '999px',
            border: dark
              ? '1px solid rgba(255,255,255,0.1)'
              : '1px solid rgba(0,0,0,0.07)',
            padding: '0.24rem',
            transition: 'background 0.4s, border-color 0.4s',
          }}
        >
          {NAV_LINKS.map(link => {
            const isActive = active === link.label
            return (
              <button
                key={link.label}
                onClick={() => setPage(link.page)}
                aria-label={`Go to ${link.label}`}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  position: 'relative',
                  minHeight: '36px',
                  padding: 'clamp(0.28rem, 1vw, 0.36rem) clamp(0.65rem, 2.5vw, 1.15rem)',
                  borderRadius: '999px',
                  fontSize: 'clamp(0.75rem, 2.2vw, 0.85rem)',
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                  background: 'none', border: 'none',
                  cursor: 'pointer',
                  color: isActive
                    ? (dark ? '#000' : '#fff')
                    : (dark ? 'rgba(255,255,255,0.45)' : '#666'),
                  transition: 'color 0.2s',
                  zIndex: 1,
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  outline: 'none',
                  /* Extend tap area without affecting visual size */
                  WebkitAppearance: 'none',
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="navPill"
                    layout
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    style={{
                      position: 'absolute', inset: 0,
                      background: dark ? '#ffffff' : '#111',
                      borderRadius: '999px',
                      zIndex: -1,
                    }}
                  />
                )}
                {link.label}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
