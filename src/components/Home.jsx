import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import profileImg from '../assets/images/profile.jpeg'
import Lanyard from './Lanyard/Lanyard'

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
  { value: '3+', label: 'Years Experience' },
  { value: '7+', label: 'Projects Shipped' },
  { value: '3',  label: 'Companies' },
]

/* ─── Entrance animation helper ─────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.62, ease: [0.22, 1, 0.36, 1] },
})

/* ─── Animated role title ───────────────────────────────────────── */

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
      overflow: 'hidden', marginBottom: '1.5rem',
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
            color: '#888', fontStyle: 'italic',
            display: 'block', letterSpacing: '-0.01em',
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
      background: 'linear-gradient(160deg, #fafaf8 0%, #f4f2ef 50%, #fafaf8 100%)',
      paddingTop: '64px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── Keyframes ────────────────────────────────────────────── */}
      <style>{`
        @keyframes statusPulse {
          0%,100%{ box-shadow:0 0 0 3px rgba(99,102,241,0.18) }
          50%    { box-shadow:0 0 0 6px rgba(99,102,241,0.07) }
        }
        @keyframes blobA {
          0%,100%{ transform:translate(0,0) scale(1) }
          33%    { transform:translate(28px,-38px) scale(1.04) }
          66%    { transform:translate(-18px,22px) scale(0.97) }
        }
        @keyframes blobB {
          0%,100%{ transform:translate(0,0) scale(1) }
          50%    { transform:translate(-22px,30px) scale(1.05) }
        }
      `}</style>

      {/* ── Subtle ambient blobs ─────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: '5%', left: '-10%', pointerEvents: 'none', zIndex: 0,
        width: 'clamp(300px, 40vw, 520px)', height: 'clamp(300px, 40vw, 520px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)',
        filter: 'blur(72px)',
        animation: 'blobA 22s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', right: '-8%', pointerEvents: 'none', zIndex: 0,
        width: 'clamp(240px, 32vw, 440px)', height: 'clamp(240px, 32vw, 440px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)',
        filter: 'blur(64px)',
        animation: 'blobB 28s ease-in-out infinite',
      }} />

      {/* ── Hero: text left, lanyard right ───────────────────────── */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 clamp(1.25rem, 4vw, 2.5rem)',
        position: 'relative', zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        minHeight: 'calc(100svh - 64px - 120px)',
        gap: 'clamp(1rem, 3vw, 2rem)',
      }}
        className="home-hero-flex"
      >

        {/* ── LEFT: text content ───────────────────────────────── */}
        <div style={{ flex: '0 0 auto', width: 'clamp(280px, 42%, 500px)', zIndex: 2 }}
          className="home-text-col"
        >
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

          {/* Name */}
          <motion.div {...fadeUp(0.12)}>
            <h1 style={{ marginBottom: '0.4rem', lineHeight: 1 }}>
              <span style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 'clamp(24px, 3.5vw, 42px)',
                color: '#aaa', display: 'block', lineHeight: 1.15,
              }}>
                Hello, I'm
              </span>
              <span style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(50px, 7.5vw, 88px)',
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
            fontSize: 'clamp(0.875rem, 1.3vw, 0.975rem)',
            color: '#555', lineHeight: 1.88,
            maxWidth: '400px', marginBottom: '2rem',
          }}>
            I turn ambiguous problems into clear, impactful products —
            3+ years shipping end-to-end experiences across fintech, AI,
            and mobile with a background in software engineering.
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.30)} style={{
            display: 'flex', gap: '0.75rem',
            flexWrap: 'wrap', marginBottom: '2rem',
          }}>
            <button onClick={() => setPage('work')} className="home-cta-primary">
              View My Work
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </button>
            <button onClick={() => setPage('about')} className="home-cta-outline">
              About Me
            </button>
          </motion.div>

          {/* Social */}
          <motion.div {...fadeUp(0.36)} style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
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

        {/* ── RIGHT: Lanyard (main visual) ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.9, ease: 'easeOut' }}
          style={{ flex: '1 1 0', minWidth: 0, position: 'relative', zIndex: 1 }}
          className="home-lanyard-col"
        >
          <div className="home-lanyard-canvas">
            <Suspense fallback={<LanyardPlaceholder />}>
              <Lanyard
                position={[0, 0, 30]}
                gravity={[0, -40, 0]}
                fov={20}
                transparent={true}
                profileImage={profileImg}
              />
            </Suspense>
          </div>
        </motion.div>
      </div>

      {/* ── Stats strip ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          maxWidth: '1200px', margin: '0 auto',
          padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.25rem, 4vw, 2.5rem)',
          position: 'relative', zIndex: 1,
        }}
      >
        <div className="home-stats">
          {STATS.map(({ value, label }, i, arr) => (
            <div key={label} className="home-stat">
              <span style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                color: '#111', lineHeight: 1,
                letterSpacing: '-0.03em',
              }}>{value}</span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.7rem', color: '#aaa',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                fontWeight: 500, marginTop: '0.3rem',
              }}>{label}</span>
              {i < arr.length - 1 && <div className="home-stat-sep" />}
            </div>
          ))}
        </div>
      </motion.div>
    </main>
  )
}

/* ─── Placeholder while Lanyard loads ───────────────────────────── */

function LanyardPlaceholder() {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: '64px', height: '64px', borderRadius: '50%',
        border: '2px solid rgba(0,0,0,0.08)',
        borderTopColor: '#6366f1',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
