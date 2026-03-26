import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import profileImg from '../assets/images/profile.jpeg'
import FlipWords from './FlipWords'

const TAGLINES = [
  'I love crafting clean, meaningful digital experiences',
  'I turn complex problems into intuitive interfaces',
  'I bridge the gap between design and development',
  'I build scalable design systems that teams love',
  'I design with empathy and ship with precision',
]



export default function Hero() {
  const [taglineIdx, setTaglineIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTaglineIdx(i => (i + 1) % TAGLINES.length), 3800)
    return () => clearInterval(t)
  }, [])

  return (
    <main style={{ minHeight: '100vh', background: '#0f0f11', paddingTop: '64px' }}>

      {/* Hero section */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3.5rem 2.5rem 4rem' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16">

          {/* Left column */}
          <div>
            <motion.h1
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: '1rem', lineHeight: 1 }}
            >
              <span style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 'clamp(54px, 7.5vw, 88px)',
                color: '#ffffff', display: 'block', lineHeight: 1,
              }}>
                Hello,
              </span>
              <span style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(34px, 5.5vw, 68px)',
                fontWeight: 700, color: '#ffffff', display: 'block',
                letterSpacing: '-0.025em', lineHeight: 1.05,
              }}>
                I'm Shanthram
              </span>
              <span style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(22px, 3.5vw, 44px)',
                fontWeight: 400, display: 'block',
                letterSpacing: '-0.01em', lineHeight: 1.2,
                marginTop: '0.25rem',
                color: 'rgba(255,255,255,0.55)',
              }}>
                <FlipWords words={["Designer","Builder","Thinker","Creator"]} color="rgba(255,255,255,0.55)" />
              </span>
            </motion.h1>

            <div style={{
              minHeight: 'clamp(2.6rem, 5vw, 3.8rem)',
              height: 'clamp(5rem, 8vw, 6.5rem)',
              overflow: 'hidden',
              marginBottom: '3.5rem',
              marginTop: '0.75rem',
              display: 'flex',
              alignItems: 'flex-start',
            }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={taglineIdx}
                  initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: 'clamp(1.25rem, 2.8vw, 2rem)',
                    color: 'rgba(255,255,255,0.4)', fontWeight: 400,
                    letterSpacing: '-0.01em', lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  {TAGLINES[taglineIdx]}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.32, duration: 0.5 }}
              style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}
            >
              {[
                { label: 'Currently', value: 'UX Designer I @ 7EDGE' },
                { label: 'Previously at', value: 'NeST Digital & Luminar' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{
                    fontSize: '0.62rem', letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                    marginBottom: '0.2rem', fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    {label}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: '#ffffff', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                    {value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ paddingTop: '0.25rem' }}
          >
            <img
              src={profileImg} alt="Shanthram"
              style={{
                width: '72px', height: '72px', borderRadius: '50%',
                objectFit: 'cover', objectPosition: 'center top',
                marginBottom: '1.1rem', display: 'block',
              }}
            />
            <p style={{
              fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8,
              marginBottom: '1.4rem', maxWidth: '272px',
              fontFamily: "'Inter', sans-serif",
            }}>
              I'm a Product UX Designer with 2+ years of experience
              designing for web and mobile. With a background in
              software engineering, I bridge design and development —
              from research and IA to prototyping and scalable
              design systems.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <a href="#" aria-label="Twitter / X"
                style={{ color: 'rgba(255,255,255,0.4)', display: 'flex', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.733-8.835L2.25 2.25h6.961l4.265 5.637L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/shanthram-shetty-6a26a6376"
                target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                style={{ color: 'rgba(255,255,255,0.4)', display: 'flex', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </motion.div>

        </div>
      </div>


    </main>
  )
}
