import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import LightRays from './LightRays'
import FlipWords from './FlipWords'

const PHOTOS = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
    title: 'Alpine Peaks',
    category: 'Landscape',
    date: '2024',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80',
    title: 'Highland Pass',
    category: 'Travel',
    date: '2024',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1540821924489-7690c70c4eac?w=700&q=80',
    title: 'Morning Market',
    category: 'Street',
    date: '2025',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=700&q=80',
    title: 'Paris in Fog',
    category: 'Travel',
    date: '2023',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=700&q=80',
    title: 'Winter Light',
    category: 'Landscape',
    date: '2024',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80',
    title: 'Golden Hour',
    category: 'Landscape',
    date: '2023',
  },
]

const EXPERIMENTS = [
  {
    id: 1,
    title: 'Kinetic Type',
    subtitle: 'Typography in motion',
    tag: '01',
    bg: 'linear-gradient(135deg, #0e0e0e 0%, #1a1008 100%)',
    accent: '#f59e0b',
    visual: 'type',
  },
  {
    id: 2,
    title: 'Gradient Systems',
    subtitle: 'Color & light studies',
    tag: '02',
    bg: 'linear-gradient(135deg, #081a15 0%, #0d1f2d 100%)',
    accent: '#34d399',
    visual: 'gradient',
  },
  {
    id: 3,
    title: 'Spring Physics',
    subtitle: 'Motion & interaction',
    tag: '03',
    bg: 'linear-gradient(135deg, #1a0c08 0%, #1a0818 100%)',
    accent: '#fb923c',
    visual: 'spring',
  },
  {
    id: 4,
    title: 'Grid Studies',
    subtitle: 'Structure & rhythm',
    tag: '04',
    bg: 'linear-gradient(135deg, #090912 0%, #12091a 100%)',
    accent: '#a78bfa',
    visual: 'grid',
  },
  {
    id: 5,
    title: 'Dark Glass',
    subtitle: 'Material & depth',
    tag: '05',
    bg: 'linear-gradient(135deg, #0a0a10 0%, #0a1018 100%)',
    accent: '#38bdf8',
    visual: 'glass',
  },
]

function SlideVisual({ type, accent }) {
  if (type === 'type') return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(8rem, 18vw, 22rem)',
        fontStyle: 'italic',
        fontWeight: 300,
        color: accent,
        opacity: 0.12,
        userSelect: 'none',
        lineHeight: 1,
        letterSpacing: '-0.04em',
      }}>Aa</span>
    </div>
  )
  if (type === 'gradient') return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: 'clamp(160px, 28vw, 360px)', height: 'clamp(160px, 28vw, 360px)',
        borderRadius: '50%',
        background: `radial-gradient(circle at 35% 30%, ${accent}, #059669 50%, #064e3b)`,
        boxShadow: `0 0 120px ${accent}30`,
        opacity: 0.7,
      }} />
    </div>
  )
  if (type === 'spring') return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3vw' }}>
      {[1, 0.6, 0.35].map((s, i) => (
        <div key={i} style={{
          width: `clamp(40px, ${8 * s}vw, 120px)`, height: `clamp(40px, ${8 * s}vw, 120px)`,
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 30%, ${accent}, #ea580c)`,
          opacity: s * 0.7,
          boxShadow: `0 0 60px ${accent}25`,
        }} />
      ))}
    </div>
  )
  if (type === 'grid') return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="clamp(160px,28vw,340px)" height="clamp(160px,28vw,340px)" viewBox="0 0 200 200">
        {Array.from({ length: 8 }).map((_, r) =>
          Array.from({ length: 8 }).map((_, c) => (
            <circle key={`${r}-${c}`}
              cx={12 + c * 25} cy={12 + r * 25} r="3"
              fill={accent}
              opacity={0.06 + (r + c) * 0.018}
            />
          ))
        )}
      </svg>
    </div>
  )
  if (type === 'glass') return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2vw' }}>
      {[{ w: '18vw', h: '28vw', r: '16px' }, { w: '12vw', h: '20vw', r: '12px' }, { w: '8vw', h: '14vw', r: '10px' }].map((s, i) => (
        <div key={i} style={{
          width: `clamp(60px,${s.w},260px)`, height: `clamp(90px,${s.h},380px)`,
          borderRadius: s.r,
          background: `linear-gradient(135deg, ${accent}12, ${accent}04)`,
          border: `1px solid ${accent}22`,
          boxShadow: `inset 0 1px 0 ${accent}18, 0 20px 60px rgba(0,0,0,0.4)`,
          backdropFilter: 'blur(12px)',
        }} />
      ))}
    </div>
  )
  return null
}

function ParallaxLayer({ children, speed = 0.4, style = {} }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])
  const y = useSpring(rawY, { stiffness: 80, damping: 20, mass: 0.4 })
  return (
    <motion.div ref={ref} style={{ y, ...style }}>
      {children}
    </motion.div>
  )
}

export default function FunSection() {
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const [hoveredPhotoIdx, setHoveredPhotoIdx] = useState(null)
  const heroRef = useRef(null)

  // Hero parallax — text drifts up, rays drift slower
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroTextY = useTransform(heroScroll, [0, 1], ['0%', '35%'])
  const heroRaysY = useTransform(heroScroll, [0, 1], ['0%', '15%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0])

  const handleKeyDown = (e) => {
    if (lightboxIdx === null) return
    if (e.key === 'Escape') setLightboxIdx(null)
    if (e.key === 'ArrowRight') setLightboxIdx(i => (i + 1) % PHOTOS.length)
    if (e.key === 'ArrowLeft') setLightboxIdx(i => (i - 1 + PHOTOS.length) % PHOTOS.length)
  }

  return (
    <div
      style={{ background: '#080808', color: '#fff', minHeight: '100vh' }}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* ── Hero ── */}
      <section ref={heroRef} style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem',
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* Light Rays — slow parallax layer */}
        <motion.div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', y: heroRaysY }}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={0.6}
            lightSpread={1.2}
            rayLength={1.8}
            fadeDistance={0.85}
            saturation={0.6}
            followMouse={true}
            mouseInfluence={0.08}
            pulsating={false}
          />
        </motion.div>

        {/* breadcrumb */}
        <div style={{
          position: 'absolute', top: '2rem', left: '2.5rem',
          display: 'flex', gap: '0.4rem', alignItems: 'center',
          zIndex: 1,
        }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>Fun</span>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.7rem' }}>›</span>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>Creative Playground</span>
        </div>

        {/* Hero text — faster parallax + fade */}
        <motion.div
          style={{ maxWidth: '720px', position: 'relative', zIndex: 1, y: heroTextY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.15,
              color: '#fff',
              marginBottom: '2rem',
            }}>
              This is where I{' '}
              <FlipWords words={["explore","experiment","capture","create"]} color="#fff" interval={2200} />
              {' '}moments.
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.38)',
              lineHeight: 1.75,
              maxWidth: '400px',
              margin: '0 auto',
            }}>
              The quintessential taste of design in photography, random experiments, and visual explorations that live outside the brief.
            </p>
          </motion.div>
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          style={{
            position: 'absolute', bottom: '2.5rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
            zIndex: 1, opacity: heroOpacity,
          }}
        >
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>scroll</span>
          <div style={{ height: '28px', width: '1px', background: 'rgba(255,255,255,0.15)' }} />
        </motion.div>
      </section>

      {/* ── Photography ── */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1rem, 4vw, 2.5rem) 6rem', maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <p style={{
            fontSize: '0.65rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)',
          }}>
            01 — Photography
          </p>
        </motion.div>

        {/* Masonry grid — alternating parallax speeds + Focus Cards effect */}
        <div className="photo-masonry">
          <ParallaxLayer speed={-0.08} style={{ gridRow: 'span 2' }}>
            <PhotoTile photo={PHOTOS[0]} className="photo-tall" style={{ height: '100%' }} onClick={() => setLightboxIdx(0)}
              isFocused={hoveredPhotoIdx === 0} isAnyHovered={hoveredPhotoIdx !== null}
              onFocus={() => setHoveredPhotoIdx(0)} onBlur={() => setHoveredPhotoIdx(null)} />
          </ParallaxLayer>
          <ParallaxLayer speed={0.06}>
            <PhotoTile photo={PHOTOS[1]} onClick={() => setLightboxIdx(1)}
              isFocused={hoveredPhotoIdx === 1} isAnyHovered={hoveredPhotoIdx !== null}
              onFocus={() => setHoveredPhotoIdx(1)} onBlur={() => setHoveredPhotoIdx(null)} />
          </ParallaxLayer>
          <ParallaxLayer speed={-0.05}>
            <PhotoTile photo={PHOTOS[2]} onClick={() => setLightboxIdx(2)}
              isFocused={hoveredPhotoIdx === 2} isAnyHovered={hoveredPhotoIdx !== null}
              onFocus={() => setHoveredPhotoIdx(2)} onBlur={() => setHoveredPhotoIdx(null)} />
          </ParallaxLayer>
          <ParallaxLayer speed={0.09}>
            <PhotoTile photo={PHOTOS[3]} onClick={() => setLightboxIdx(3)}
              isFocused={hoveredPhotoIdx === 3} isAnyHovered={hoveredPhotoIdx !== null}
              onFocus={() => setHoveredPhotoIdx(3)} onBlur={() => setHoveredPhotoIdx(null)} />
          </ParallaxLayer>
          <ParallaxLayer speed={-0.04}>
            <PhotoTile photo={PHOTOS[4]} onClick={() => setLightboxIdx(4)}
              isFocused={hoveredPhotoIdx === 4} isAnyHovered={hoveredPhotoIdx !== null}
              onFocus={() => setHoveredPhotoIdx(4)} onBlur={() => setHoveredPhotoIdx(null)} />
          </ParallaxLayer>
          <ParallaxLayer speed={0.05} style={{ gridColumn: 'span 3' }}>
            <PhotoTile photo={PHOTOS[5]} className="photo-wide" onClick={() => setLightboxIdx(5)}
              isFocused={hoveredPhotoIdx === 5} isAnyHovered={hoveredPhotoIdx !== null}
              onFocus={() => setHoveredPhotoIdx(5)} onBlur={() => setHoveredPhotoIdx(null)} />
          </ParallaxLayer>
        </div>
      </section>

      {/* ── Quote ── */}
      <section style={{
        padding: '6rem 2rem',
        background: '#050505',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: '680px', margin: '0 auto' }}
        >
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#fff',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
          }}>
            "Designer by profession,<br />observer by instinct."
          </p>
          <cite style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.28)',
            letterSpacing: '0.06em',
            fontStyle: 'normal',
          }}>
            — Phrase made up by Shanthram (not really true)
          </cite>
        </motion.blockquote>
      </section>

      {/* ── Design Experiments ── */}
      <ExperimentCards />

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'rgba(0,0,0,0.96)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem',
            }}
            onClick={() => setLightboxIdx(null)}
          >
            <button
              onClick={e => { e.stopPropagation(); setLightboxIdx(null) }}
              style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem',
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)',
                fontSize: '1.8rem', cursor: 'pointer', lineHeight: 1,
              }}
            >×</button>
            <button
              onClick={e => { e.stopPropagation(); setLightboxIdx(i => (i - 1 + PHOTOS.length) % PHOTOS.length) }}
              style={{
                position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.06)', border: 'none', color: 'rgba(255,255,255,0.6)',
                fontSize: '1.8rem', cursor: 'pointer', borderRadius: '50%',
                width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >‹</button>
            <button
              onClick={e => { e.stopPropagation(); setLightboxIdx(i => (i + 1) % PHOTOS.length) }}
              style={{
                position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.06)', border: 'none', color: 'rgba(255,255,255,0.6)',
                fontSize: '1.8rem', cursor: 'pointer', borderRadius: '50%',
                width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >›</button>

            <motion.img
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              src={PHOTOS[lightboxIdx].src}
              alt={PHOTOS[lightboxIdx].title}
              style={{
                maxHeight: '85vh', maxWidth: '88vw',
                borderRadius: '8px', objectFit: 'contain',
              }}
              onClick={e => e.stopPropagation()}
            />

            <div style={{ position: 'absolute', bottom: '1.5rem', textAlign: 'center' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
                {PHOTOS[lightboxIdx].category} · {PHOTOS[lightboxIdx].date} · {lightboxIdx + 1} / {PHOTOS.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Aceternity 3D Card primitives ── */
const MouseEnterContext = React.createContext([false, () => {}])

function CardContainer({ children, style = {} }) {
  const containerRef = useRef(null)
  const [isMouseEntered, setIsMouseEntered] = useState(false)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) / 18
    const y = (e.clientY - top - height / 2) / 18
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`
  }

  const handleMouseEnter = () => {
    setIsMouseEntered(true)
  }

  const handleMouseLeave = () => {
    setIsMouseEntered(false)
    if (containerRef.current) {
      containerRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)'
    }
  }

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        style={{ perspective: '1000px', ...style }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={containerRef}
          style={{
            width: '100%', height: '100%',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.15s ease-out',
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  )
}

function CardBody({ children, style = {} }) {
  return (
    <div style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', ...style }}>
      {children}
    </div>
  )
}

function CardItem({ children, translateZ = 0, translateX = 0, translateY = 0, as: Tag = 'div', style = {}, ...props }) {
  const [isMouseEntered] = React.useContext(MouseEnterContext)
  const tz = isMouseEntered ? translateZ : 0
  const tx = isMouseEntered ? translateX : 0
  const ty = isMouseEntered ? translateY : 0
  return (
    <Tag
      style={{
        transform: `translateZ(${tz}px) translateX(${tx}px) translateY(${ty}px)`,
        transition: 'transform 0.25s ease-out',
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  )
}

/* ── Design Experiments 3D Card Grid ── */
function ExperimentCards() {
  return (
    <section style={{ padding: 'clamp(3rem, 5vw, 5rem) clamp(1rem, 4vw, 2.5rem) 8rem', maxWidth: '1280px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: '2.5rem' }}
      >
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>
          02 — Design Experiments
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
      }}>
        {EXPERIMENTS.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
          >
            <CardContainer style={{ width: '100%', height: '340px' }}>
              <CardBody style={{
                background: exp.bg,
                border: `1px solid ${exp.accent}28`,
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
              }}>
                {/* Background visual — deepest layer */}
                <CardItem translateZ={0} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                  <SlideVisual type={exp.visual} accent={exp.accent} />
                </CardItem>

                {/* Vignette */}
                <CardItem translateZ={0} style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
                }} />

                {/* Tag — floats at mid depth */}
                <CardItem translateZ={40} style={{
                  position: 'absolute', top: '1.25rem', right: '1.25rem',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.58rem', letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: exp.accent,
                  background: exp.accent + '18',
                  border: `1px solid ${exp.accent}30`,
                  borderRadius: '100px',
                  padding: '0.3rem 0.7rem',
                }}>
                  {exp.tag}
                </CardItem>

                {/* Title — highest floating layer */}
                <CardItem translateZ={70} translateY={-4} style={{
                  position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem',
                }}>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.6rem', fontWeight: 300, fontStyle: 'italic',
                    color: '#fff', lineHeight: 1.15, marginBottom: '0.3rem',
                  }}>
                    {exp.title}
                  </p>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.65rem', letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
                  }}>
                    {exp.subtitle}
                  </p>
                </CardItem>

                {/* Accent glow at bottom */}
                <CardItem translateZ={20} style={{
                  position: 'absolute', bottom: 0, left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60%', height: '1px',
                  background: `linear-gradient(to right, transparent, ${exp.accent}60, transparent)`,
                }} />
              </CardBody>
            </CardContainer>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function PhotoTile({ photo, style = {}, className = '', onClick, isFocused = false, isAnyHovered = false, onFocus, onBlur }) {
  // Focus Cards: dim + blur siblings; keep own hover effects when focused
  const blurred = isAnyHovered && !isFocused

  return (
    <motion.div
      whileInView={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onClick={onClick}
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
      className={className}
      animate={{
        filter: blurred ? 'blur(3px) brightness(0.55)' : 'blur(0px) brightness(1)',
        scale: isFocused ? 1.02 : 1,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderRadius: '6px',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        ...style,
      }}
    >
      <img
        src={photo.src}
        alt={photo.title}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
          transform: isFocused ? 'scale(1.04)' : 'scale(1)',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
        opacity: isFocused ? 1 : 0,
        transition: 'opacity 0.35s ease',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '1rem', left: '1rem',
        opacity: isFocused ? 1 : 0,
        transform: isFocused ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        pointerEvents: 'none',
      }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.62rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
          {photo.category} · {photo.date}
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontStyle: 'italic', color: '#fff' }}>
          {photo.title}
        </p>
      </div>
    </motion.div>
  )
}
