import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import profileImg from '../assets/images/profile.jpeg'
import FlipWords from './FlipWords'
import TiltedCard from './TiltedCard'

/* ─── Data ───────────────────────────────────────────────────────── */

const EXPERIENCE = [
  {
    role:    'Product Designer',
    company: '7EDGE',
    period:  '2023 — Present',
    tag:     'Current',
    color:   '#6366f1',
  },
  {
    role:    'UX Designer',
    company: 'NeST Digital',
    period:  '2022 — 2023',
    tag:     null,
    color:   '#22d3ee',
  },
  {
    role:    'UI/UX Designer',
    company: 'Luminar',
    period:  '2021 — 2022',
    tag:     null,
    color:   '#f59e0b',
  },
]

const PRODUCTS = [
  {
    name:    'FluxPay',
    domain:  'Fintech · Mobile',
    desc:    'End-to-end payments & wallet redesign',
    color:   '#2B7FFF',
  },
  {
    name:    'AI Dashboard',
    domain:  'SaaS · Web',
    desc:    'Analytics platform for ML pipelines',
    color:   '#a78bfa',
  },
  {
    name:    'HealthTrack',
    domain:  'Health · Mobile',
    desc:    'Personal wellness & habit tracker',
    color:   '#34d399',
  },
  {
    name:    'FinovaX',
    domain:  'Fintech · Web',
    desc:    'B2B financial management suite',
    color:   '#fb923c',
  },
]

const TAGLINES = [
  'I turn ambiguous problems into clear, impactful products',
  'I bridge user needs, business goals, and technical constraints',
  'I design systems that scale — from discovery to delivery',
  'I ship products backed by research, iteration, and intent',
]

/* ─── Bento hover card ───────────────────────────────────────────── */

function BentoCard({ title, subtitle, icon, children, accentColor = '#6366f1' }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '20px',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)'}`,
        padding: '1.5rem',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered
          ? `0 0 0 1px ${accentColor}22, 0 16px 40px rgba(0,0,0,0.4)`
          : '0 4px 20px rgba(0,0,0,0.2)',
        height: '100%',
      }}
    >
      {/* Ambient glow on hover */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse at 20% 0%, ${accentColor}18 0%, transparent 65%)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }} />

      {/* Default state — title + subtitle */}
      <div style={{
        position: 'relative', zIndex: 1,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '1.2rem' }}>{icon}</span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.65rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: accentColor,
          }}>
            {title}
          </span>
        </div>
        <p style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
          color: 'rgba(255,255,255,0.85)',
          lineHeight: 1.3,
          marginBottom: '0.25rem',
        }}>
          {subtitle}
        </p>
      </div>

      {/* Hover-reveal content */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxHeight: hovered ? '300px' : '0px',
        opacity: hovered ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease',
        marginTop: hovered ? '1rem' : '0',
      }}>
        {children}
      </div>

      {/* Hint arrow */}
      <div style={{
        position: 'absolute', bottom: '1.1rem', right: '1.2rem',
        color: `${accentColor}99`,
        fontSize: '0.8rem',
        transform: hovered ? 'translate(2px,-2px)' : 'translate(0,0)',
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        opacity: hovered ? 0 : 0.6,
        fontFamily: "'Inter', sans-serif",
      }}>
        hover ↗
      </div>
    </div>
  )
}

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
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            {/* Status chip */}
            <div style={{
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
                fontFamily: "'Caveat', cursive",
                fontSize: 'clamp(32px, 5vw, 56px)',
                color: 'rgba(255,255,255,0.45)',
                display: 'block', lineHeight: 1.1,
              }}>
                Hello, I'm
              </span>
              <span style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(44px, 7vw, 84px)',
                fontWeight: 400, color: '#ffffff',
                display: 'block', letterSpacing: '-0.035em', lineHeight: 0.95,
              }}>
                Shanthram
              </span>
              <span style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(20px, 3vw, 36px)',
                fontWeight: 400,
                letterSpacing: '-0.01em', lineHeight: 1.2,
                marginTop: '0.3rem', display: 'block',
                color: 'rgba(255,255,255,0.45)',
              }}>
                <FlipWords words={['Designer', 'Builder', 'Thinker', 'Creator']} color="rgba(255,255,255,0.45)" />
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
              style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
            >
              <button
                onClick={() => setPage?.('about')}
                className="hero-btn-primary"
              >
                About Me
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </button>
              <button
                onClick={() => setPage?.('work')}
                className="hero-btn-outline"
              >
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
                background: 'linear-gradient(145deg, #18182a 0%, #1a1a3a 60%, #0f1628 100%)',
                boxShadow: '0 28px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)',
                padding: '1.25rem 1.25rem 1rem',
                width: 'clamp(220px, 26vw, 300px)',
              }}
            >
              {/* Inner glow */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '24px', pointerEvents: 'none',
                background: 'radial-gradient(ellipse at 40% 15%, rgba(99,102,241,0.14) 0%, transparent 65%)',
              }} />

              {/* Profile photo */}
              <div style={{
                position: 'relative', zIndex: 1,
                borderRadius: '16px', overflow: 'hidden',
                aspectRatio: '1 / 1.15',
              }}>
                <img
                  src={profileImg}
                  alt="Shanthram Shetty"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center top',
                    display: 'block',
                  }}
                />
                {/* Photo overlay gradient */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                  background: 'linear-gradient(to top, rgba(15,15,17,0.6) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }} />
              </div>

              {/* Name tag */}
              <div style={{
                position: 'relative', zIndex: 1,
                marginTop: '0.85rem', textAlign: 'center',
              }}>
                <p style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: '1rem', color: 'rgba(255,255,255,0.9)',
                  letterSpacing: '-0.01em', marginBottom: '0.25rem',
                }}>
                  Shanthram Shetty
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                  <span style={{
                    width: '5px', height: '5px', borderRadius: '50%',
                    background: '#22c55e',
                    boxShadow: '0 0 5px rgba(34,197,94,0.8)',
                  }} />
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)',
                  }}>
                    Available for opportunities
                  </span>
                </div>
              </div>
            </TiltedCard>
          </motion.div>
        </div>

        {/* ── Bento row — Experience + Products ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="hero-bento-row"
        >

          {/* Experience card */}
          <BentoCard
            title="Experience"
            subtitle="3+ years across fintech, AI & mobile"
            icon="💼"
            accentColor="#6366f1"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {EXPERIENCE.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: 'flex', alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: exp.color,
                    boxShadow: `0 0 6px ${exp.color}88`,
                    flexShrink: 0,
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.8rem', fontWeight: 600,
                      color: 'rgba(255,255,255,0.85)',
                      margin: 0,
                    }}>
                      {exp.role}
                      {exp.tag && (
                        <span style={{
                          marginLeft: '0.5rem',
                          fontSize: '0.6rem', fontWeight: 700,
                          letterSpacing: '0.08em', textTransform: 'uppercase',
                          color: exp.color,
                          background: `${exp.color}18`,
                          padding: '1px 6px', borderRadius: '999px',
                        }}>
                          {exp.tag}
                        </span>
                      )}
                    </p>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.72rem', color: 'rgba(255,255,255,0.38)',
                      margin: 0, marginTop: '1px',
                    }}>
                      {exp.company}
                    </p>
                  </div>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.65rem', color: 'rgba(255,255,255,0.28)',
                    whiteSpace: 'nowrap', flexShrink: 0,
                  }}>
                    {exp.period}
                  </span>
                </motion.div>
              ))}
            </div>
          </BentoCard>

          {/* Products card */}
          <BentoCard
            title="Products Shipped"
            subtitle="7+ end-to-end products launched"
            icon="🚀"
            accentColor="#22d3ee"
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              {PRODUCTS.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36,1] }}
                  style={{
                    padding: '0.65rem 0.75rem',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div style={{
                    width: '24px', height: '4px', borderRadius: '2px',
                    background: p.color,
                    marginBottom: '0.5rem',
                    boxShadow: `0 0 6px ${p.color}66`,
                  }} />
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.78rem', fontWeight: 600,
                    color: 'rgba(255,255,255,0.85)',
                    margin: 0, marginBottom: '2px',
                  }}>
                    {p.name}
                  </p>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.64rem', color: 'rgba(255,255,255,0.32)',
                    margin: 0,
                  }}>
                    {p.domain}
                  </p>
                </motion.div>
              ))}
            </div>
          </BentoCard>

        </motion.div>
      </div>

      <style>{`
        @keyframes heroPulse {
          0%,100%{ box-shadow: 0 0 4px rgba(99,102,241,0.6) }
          50%    { box-shadow: 0 0 10px rgba(99,102,241,0.2) }
        }
      `}</style>
    </main>
  )
}
