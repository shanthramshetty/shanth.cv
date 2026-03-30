import { motion } from 'framer-motion'
import profileImg from '../assets/images/profile.jpeg'

const fade = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay, duration: 0.5, ease: 'easeOut' },
})

export default function About() {
  return (
    <main style={{ minHeight: '100vh', background: '#f0eeea', paddingTop: '64px' }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1rem, 4vw, 2.5rem) 5rem',
      }}>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-start">

          {/* Left: portrait */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <img
              src={profileImg} alt="Shanthram Shetty"
              style={{
                width: '100%', borderRadius: '10px', objectFit: 'cover',
                aspectRatio: '3/4', display: 'block',
              }}
            />
          </motion.div>

          {/* Right: content */}
          <div>
            <motion.h1 {...fade(0.1)} style={{ marginBottom: '0.15rem', lineHeight: 1 }}>
              <span style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 'clamp(48px, 6vw, 78px)',
                color: '#111', display: 'block', lineHeight: 1,
              }}>
                Hello,
              </span>
              <span style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(26px, 4vw, 52px)',
                fontWeight: 700, color: '#111', display: 'block',
                letterSpacing: '-0.02em', lineHeight: 1.1,
              }}>
                I'm Shanthram
              </span>
            </motion.h1>

            <motion.p {...fade(0.2)} style={{
              fontSize: '0.78rem', color: '#aaa', letterSpacing: '0.05em',
              marginBottom: '1.75rem', fontFamily: "'Inter', sans-serif", marginTop: '0.4rem',
            }}>
              Shanthram Shetty
            </motion.p>

            <motion.p {...fade(0.28)} style={{
              fontSize: '0.925rem', color: '#555', lineHeight: 1.85,
              marginBottom: '2.5rem', maxWidth: '480px',
              fontFamily: "'Inter', sans-serif",
            }}>
              I'm a product designer who thrives on ambiguity and complexity.
              I care deeply about the why behind every decision — from the first
              research session to the final shipped state. My work lives at the
              intersection of user insight, systems thinking, and measurable
              business impact.
            </motion.p>

            <motion.div {...fade(0.36)} className="about-stats">
              <div>
                <p style={{
                  fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: '#bbb', fontWeight: 600, marginBottom: '0.65rem',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  Day job
                </p>
                <p style={{ fontSize: '0.875rem', color: '#333', lineHeight: 1.75, fontFamily: "'Inter', sans-serif" }}>
                  Currently, I am a <strong style={{ fontWeight: 600, color: '#111' }}>Product Designer at 7EDGE</strong>.
                  Before that, I worked at NeST Digital and Luminar, and freelanced for
                  startups across fintech, e-commerce, and consumer apps. I hold
                  certifications in Google UX Design and AWS Cloud, with a background
                  in Computer Science.
                </p>
              </div>
              <div>
                <p style={{
                  fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: '#bbb', fontWeight: 600, marginBottom: '0.65rem',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  Out of office
                </p>
                <p style={{ fontSize: '0.875rem', color: '#333', lineHeight: 1.75, fontFamily: "'Inter', sans-serif" }}>
                  When I'm not designing, I'm building — Eventurox, my live event
                  discovery platform, is the clearest proof of that. I'm drawn to
                  hard problems, tight systems, and the overlap between design and
                  engineering. Feel free to reach out if any of that resonates.
                </p>
              </div>
            </motion.div>

            {/* Social icons */}
            <motion.div {...fade(0.44)} style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
              <a href="#" aria-label="Twitter / X"
                style={{ color: '#555', display: 'flex', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#111'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.733-8.835L2.25 2.25h6.961l4.265 5.637L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/shanthram-shetty-6a26a6376"
                target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                style={{ color: '#555', display: 'flex', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#111'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=shanthram.shetty98@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email"
                style={{ color: '#555', display: 'flex', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#111'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </main>
  )
}
