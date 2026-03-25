import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About', page: 'about' },
  { label: 'Work', page: 'home' },
  { label: 'Fun', page: 'fun' },
  { label: 'Contact', page: 'contact' },
]

export default function Navbar({ page, setPage }) {
  const active =
    page === 'about' ? 'About' :
    page === 'home' ? 'Work' :
    page === 'fun' ? 'Fun' :
    page === 'contact' ? 'Contact' : ''

  const dark = page === 'home'

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      backgroundColor: dark ? 'rgba(10,10,11,0.85)' : 'rgba(240,238,234,0.92)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
      transition: 'background-color 0.4s, border-color 0.4s',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '0.85rem 2.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <motion.button
          onClick={() => setPage('home')}
          whileHover={{ scale: 1.06 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: dark ? '#ffffff' : '#111',
            color: dark ? '#000' : '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 700, fontFamily: "'Inter', sans-serif",
            border: 'none', cursor: 'pointer', userSelect: 'none', flexShrink: 0,
            transition: 'background 0.4s, color 0.4s',
          }}
        >
          Ss
        </motion.button>

        {/* Nav pills */}
        <nav style={{
          display: 'flex', alignItems: 'center', gap: '2px',
          background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(8px)',
          borderRadius: '999px',
          border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.07)',
          padding: '0.22rem',
          transition: 'background 0.4s, border-color 0.4s',
        }}>
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => setPage(link.page)}
              style={{
                position: 'relative',
                padding: '0.38rem 1.1rem',
                borderRadius: '999px',
                fontSize: '0.85rem', fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
                background: 'none', border: 'none', cursor: 'pointer',
                color: active === link.label ? (dark ? '#000' : '#fff') : (dark ? 'rgba(255,255,255,0.45)' : '#666'),
                transition: 'color 0.2s',
                zIndex: 1,
              }}
            >
              {active === link.label && (
                <motion.span
                  layoutId="navPill"
                  transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                  style={{
                    position: 'absolute', inset: 0,
                    background: dark ? '#ffffff' : '#111', borderRadius: '999px', zIndex: -1,
                  }}
                />
              )}
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
