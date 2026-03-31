import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import profileImg from '../assets/images/profile.jpeg'

/* ─── Constants ─────────────────────────────────────────────────── */

const ROLES = ['Product Designer', 'UX Strategist', 'Design Engineer', 'Systems Thinker']

const SOCIAL = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shanthram-shetty-6a26a6376',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=shanthram.shetty98@gmail.com',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.733-8.835L2.25 2.25h6.961l4.265 5.637L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
      </svg>
    ),
  },
]

const STATS = [
  { value: '2+', label: 'Years Experience' },
  { value: '7+', label: 'Projects Shipped' },
  { value: '3',  label: 'Companies' },
]

/* ─── Entrance animation helper ─────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.62, ease: [0.22, 1, 0.36, 1] },
})

/* ─── Role badge that cycles with crossfade ─────────────────────── */

function RoleBadge() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % ROLES.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{
      height: 'clamp(1.6rem, 2.8vw, 2.1rem)',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden',
      marginBottom: '1.5rem',
    }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(1.15rem, 2.4vw, 1.7rem)',
            color: '#888',
            fontStyle: 'italic',
            display: 'block',
            letterSpacing: '-0.01em',
          }}
        >
          {ROLES[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

/* ─── Home ──────────────────────────────────────────────────────── */

export default function Home({ setPage }) {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#fafaf8',
      paddingTop: '64px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── Self-contained keyframes ─────────────────────────────── */}
      <style>{`
        @keyframes blobA {
          0%,100%{ transform:translate(0,0) scale(1) }
          33%    { transform:translate(28px,-38px) scale(1.04) }
          66%    { transform:translate(-18px,22px) scale(0.97) }
        }
        @keyframes blobB {
          0%,100%{ transform:translate(0,0) scale(1) }
          40%    { transform:translate(-32px,28px) scale(1.06) }
          70%    { transform:translate(22px,-18px) scale(0.96) }
        }
        @keyframes blobC {
          0%,100%{ transform:translate(0,0) scale(1) }
          50%    { transform:translate(18px,36px) scale(1.03) }
        }
        @keyframes photoFloat {
          0%,100%{ transform:translateY(0px) rotate(-1.5deg) }
          50%    { transform:translateY(-9px) rotate(0.8deg) }
        }
        @keyframes statusPulse {
          0%,100%{ box-shadow:0 0 0 3px rgba(99,102,241,0.18) }
          50%    { box-shadow:0 0 0 6px rgba(99,102,241,0.07) }
        }
        /* Pause photo animation on touch devices to avoid jank */
        @media (pointer: coarse) {
          .home-photo { animation:none !important; transform:rotate(-1.5deg) !important; }
        }
      `}</style>

      {/* ── Dot grid background ──────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 85% 75% at 50% 40%, black 25%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 40%, black 25%, transparent 100%)',
      }} />

      {/* ── Ambient color blobs ──────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: '5%', left: '-8%',
        width: 'clamp(320px, 42vw, 580px)', height: 'clamp(320px, 42vw, 580px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.11) 0%, transparent 70%)',
        filter: 'blur(72px)',
        animation: 'blobA 20s ease-in-out infinite',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', bottom: '8%', right: '-6%',
        width: 'clamp(260px, 34vw, 480px)', height: 'clamp(260px, 34vw, 480px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)',
        filter: 'blur(62px)',
        animation: 'blobB 25s ease-in-out infinite',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', top: '52%', left: '38%',
        width: 'clamp(200px, 26vw, 380px)', height: 'clamp(200px, 26vw, 380px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)',
        filter: 'blur(52px)',
        animation: 'blobC 30s ease-in-out infinite',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ── Main hero content ────────────────────────────────────── */}
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: 'clamp(3rem, 6.5vw, 5.5rem) clamp(1.25rem, 4vw, 2.5rem) 0',
        position: 'relative', zIndex: 1,
      }}>
        <div className="home-grid">

          {/* ── LEFT: text ───────────────────────────────────────── */}
          <div>

            {/* Status chip */}
            <motion.div {...fadeUp(0.05)}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                background: 'rgba(99,102,241,0.07)',
                border: '1px solid rgba(99,102,241,0.15)',
                borderRadius: '999px',
                padding: '0.3rem 0.9rem 0.3rem 0.65rem',
                marginBottom: '1.75rem',
              }}>
                <span style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: '#6366f1', flexShrink: 0,
                  animation: 'statusPulse 2.8s ease-in-out infinite',
                }} />
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.775rem', fontWeight: 500,
                  color: '#6366f1', letterSpacing: '0.005em',
                }}>
                  Product Designer @ 7EDGE
                </span>
              </div>
            </motion.div>

            {/* Greeting + name */}
            <motion.div {...fadeUp(0.12)}>
              <h1 style={{ marginBottom: '0.4rem', lineHeight: 1 }}>
                <span style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: 'clamp(26px, 3.8vw, 46px)',
                  color: '#aaa', display: 'block', lineHeight: 1.15,
                }}>
                  Hello, I'm
                </span>
                <span style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 'clamp(54px, 8.5vw, 100px)',
                  fontWeight: 400, color: '#111', display: 'block',
                  letterSpacing: '-0.035em', lineHeight: 0.95,
                }}>
                  Shanthram
                </span>
              </h1>
            </motion.div>

            {/* Animated role */}
            <motion.div {...fadeUp(0.18)}>
              <RoleBadge />
            </motion.div>

            {/* Bio */}
            <motion.p {...fadeUp(0.24)} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.875rem, 1.45vw, 1rem)',
              color: '#555', lineHeight: 1.88,
              maxWidth: '440px', marginBottom: '2rem',
            }}>
              I turn ambiguous problems into clear, impactful products —
              shipping end-to-end experiences across fintech, AI, and mobile
              with a background in software engineering.
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...fadeUp(0.30)} style={{
              display: 'flex', gap: '0.75rem',
              flexWrap: 'wrap', marginBottom: '2.25rem',
            }}>
              <button
                onClick={() => setPage('work')}
                className="home-cta-primary"
              >
                View My Work
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </button>
              <button
                onClick={() => setPage('about')}
                className="home-cta-outline"
              >
                About Me
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div {...fadeUp(0.36)} style={{
              display: 'flex', gap: '0.65rem', alignItems: 'center',
            }}>
              {SOCIAL.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="home-social-link"
                >
                  {icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: profile photo ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <div style={{ position: 'relative' }}>

              {/* Decorative gradient ring */}
              <div style={{
                position: 'absolute', inset: '-10px',
                borderRadius: '22px',
                background: 'linear-gradient(145deg, rgba(99,102,241,0.14), rgba(236,72,153,0.09), rgba(20,184,166,0.08))',
                zIndex: 0,
              }} />

              {/* Profile image */}
              <img
                src={profileImg}
                alt="Shanthram Shetty"
                className="home-photo"
                style={{
                  position: 'relative', zIndex: 1,
                  width: '100%',
                  maxWidth: 'clamp(230px, 30vw, 370px)',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  aspectRatio: '4/5',
                  display: 'block',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.11), 0 4px 18px rgba(0,0,0,0.06)',
                  animation: 'photoFloat 8s ease-in-out infinite',
                  transformOrigin: 'center bottom',
                }}
              />

              {/* Floating chip — bottom left */}
              <motion.div
                initial={{ opacity: 0, x: -14, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.6, duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute', bottom: '16%', left: '-18px', zIndex: 2,
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: '12px',
                  padding: '0.52rem 0.85rem',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.09)',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}
              >
                <span style={{ fontSize: '1rem', lineHeight: 1 }}>✦</span>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', fontWeight: 700, color: '#111', margin: 0, lineHeight: 1.25 }}>7+ Projects</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', color: '#aaa', margin: 0, lineHeight: 1.25 }}>Shipped end-to-end</p>
                </div>
              </motion.div>

              {/* Floating chip — top right */}
              <motion.div
                initial={{ opacity: 0, x: 14, y: -8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.7, duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute', top: '14%', right: '-18px', zIndex: 2,
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: '12px',
                  padding: '0.52rem 0.85rem',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.09)',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}
              >
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 0 3px rgba(34,197,94,0.2)',
                }} />
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', fontWeight: 600, color: '#111', margin: 0 }}>2+ yrs exp</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Stats strip ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.52, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          maxWidth: '1100px', margin: '0 auto',
          padding: 'clamp(2.5rem, 5vw, 4.5rem) clamp(1.25rem, 4vw, 2.5rem)',
          position: 'relative', zIndex: 1,
        }}
      >
        <div className="home-stats">
          {STATS.map(({ value, label }, i, arr) => (
            <div key={label} className="home-stat">
              <span style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
                color: '#111', lineHeight: 1,
                letterSpacing: '-0.03em',
              }}>
                {value}
              </span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.7rem', color: '#aaa',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                fontWeight: 500, marginTop: '0.3rem',
              }}>
                {label}
              </span>
              {i < arr.length - 1 && <div className="home-stat-sep" />}
            </div>
          ))}
        </div>
      </motion.div>
    </main>
  )
}
