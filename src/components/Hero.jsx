import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import profileImg from '../assets/images/profile-hero.png'
import TiltedCard from './TiltedCard'
import TrueFocus from './TrueFocus'
import RotatingText from './RotatingText'

/* ─── Data ───────────────────────────────────────────────────────── */

const TAGLINES = [
  'I turn ambiguous problems into clear, impactful products',
  'I bridge user needs, business goals, and technical constraints',
  'I design systems that scale — from discovery to delivery',
  'I ship products backed by research, iteration, and intent',
]

/* ─── Hero ───────────────────────────────────────────────────────── */

export default function Hero({ setPage }) {
  const [taglineIdx, setTaglineIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTaglineIdx(i => (i + 1) % TAGLINES.length), 3800)
    return () => clearInterval(t)
  }, [])

  return (
    <main style={{ minHeight: '100vh', background: '#0f0f11', paddingTop: '64px' }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1.25rem, 4vw, 2.5rem) 4rem',
      }}>

        {/* ── Top hero row ─────────────────────────────────────────── */}
        <div className="hero-top-grid">

          {/* Left — name + tagline + buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="hero-text-col"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            {/* Status chip */}
            <div className="hero-chip-wrap" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '999px',
              padding: '0.3rem 0.9rem 0.3rem 0.6rem',
              marginBottom: '1.6rem',
              width: 'fit-content',
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#6366f1',
                boxShadow: '0 0 6px rgba(99,102,241,0.8)',
                animation: 'heroPulse 2.4s ease-in-out infinite',
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.72rem', fontWeight: 500,
                color: '#a5b4fc', letterSpacing: '0.02em',
              }}>
                Open to work · Product Designer
              </span>
            </div>

            {/* Name block */}
            <h1 style={{ marginBottom: '1rem', lineHeight: 1 }}>
              <span style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(40px, 6.5vw, 78px)',
                fontWeight: 400, color: '#ffffff',
                display: 'block', letterSpacing: '-0.035em', lineHeight: 1,
              }}>
                Product Designer
              </span>
              {/* Rotating second line */}
              <span style={{ display: 'block', overflow: 'hidden', lineHeight: 1.05 }}>
                <RotatingText
                  texts={['Flutter Developer', 'UI/UX Engineer', 'Design Systems', 'Mobile Builder']}
                  splitBy="characters"
                  staggerFrom="first"
                  staggerDuration={0.04}
                  rotationInterval={3200}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: '-80%', opacity: 0, filter: 'blur(4px)' }}
                  elementLevelClassName="hero-grad-char"
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: 'clamp(40px, 6.5vw, 78px)',
                    fontWeight: 400,
                    letterSpacing: '-0.035em',
                  }}
                />
              </span>
              <span style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 'clamp(22px, 3.2vw, 42px)',
                color: 'rgba(255,255,255,0.4)',
                display: 'block', lineHeight: 1.3,
                marginTop: '0.35rem',
              }}>
                with an engineering background
              </span>
            </h1>

            {/* Tagline */}
            <div style={{ height: 'clamp(2.4rem, 4vw, 3rem)', overflow: 'hidden', marginBottom: '2rem' }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={taglineIdx}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
                    color: 'rgba(255,255,255,0.38)',
                    lineHeight: 1.5, margin: 0,
                  }}
                >
                  {TAGLINES[taglineIdx]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="hero-btn-row"
              style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
            >
              <button onClick={() => setPage?.('about')} className="hero-btn-primary">
                About Me
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </button>
              <button onClick={() => setPage?.('work')} className="hero-btn-outline">
                My Works
              </button>
            </motion.div>
          </motion.div>

          {/* Right — profile photo in TiltedCard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <TiltedCard
              maxTilt={16}
              scale={1.03}
              glareOpacity={0.12}
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 28px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)',
                width: 'clamp(220px, 26vw, 300px)',
                aspectRatio: '1 / 1',
                padding: 0,
              }}
            >
              <img
                src={profileImg}
                alt="Shanthram Shetty"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center center',
                  display: 'block',
                  position: 'relative', zIndex: 1,
                }}
              />
            </TiltedCard>
          </motion.div>
        </div>

        {/* ── TrueFocus text sections ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hero-focus-row"
        >

          {/* Experience */}
          <div className="hero-focus-block">
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.62rem', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#6366f1', display: 'block', marginBottom: '0.85rem',
            }}>
              Experience
            </span>
            <TrueFocus
              sentence="7EDGE NeST Luminar"
              blurAmount={4}
              borderColor="#6366f1"
              glowColor="rgba(99,102,241,0.3)"
              animDuration={0.45}
              pauseBetween={1.4}
              fontSize="clamp(1.5rem, 3vw, 2.2rem)"
              fontFamily="'DM Serif Display', serif"
              color="rgba(255,255,255,0.9)"
            />
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.72rem', color: 'rgba(255,255,255,0.28)',
              marginTop: '0.75rem', lineHeight: 1.6,
            }}>
              Product Designer · UX Designer · UI/UX Designer
            </p>
          </div>

          {/* Divider */}
          <div className="hero-focus-divider" />

          {/* Products */}
          <div className="hero-focus-block">
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.62rem', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#22d3ee', display: 'block', marginBottom: '0.85rem',
            }}>
              Products Shipped
            </span>
            <TrueFocus
              sentence="FluxPay FinovaX HealthTrack Dashboard"
              blurAmount={4}
              borderColor="#22d3ee"
              glowColor="rgba(34,211,238,0.28)"
              animDuration={0.45}
              pauseBetween={1.4}
              fontSize="clamp(1.5rem, 3vw, 2.2rem)"
              fontFamily="'DM Serif Display', serif"
              color="rgba(255,255,255,0.9)"
            />
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.72rem', color: 'rgba(255,255,255,0.28)',
              marginTop: '0.75rem', lineHeight: 1.6,
            }}>
              Fintech · SaaS · Health · AI
            </p>
          </div>

        </motion.div>
      </div>

      <style>{`
        @keyframes heroPulse {
          0%,100%{ box-shadow: 0 0 4px rgba(99,102,241,0.6) }
          50%    { box-shadow: 0 0 10px rgba(99,102,241,0.2) }
        }
        .hero-grad-char {
          background: linear-gradient(90deg, #f0b429 0%, #e8952a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </main>
  )
}
