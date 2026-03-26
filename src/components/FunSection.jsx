import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LightRays from './LightRays'

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

export default function FunSection() {
  const [lightboxIdx, setLightboxIdx] = useState(null)

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
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem',
        position: 'relative',
        textAlign: 'center',
      }}>
        {/* Light Rays background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
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
        </div>

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

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: '720px', position: 'relative', zIndex: 1 }}
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
            This is where I explore, experiment, and capture moments.
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

        {/* scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '2.5rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          zIndex: 1,
        }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>scroll</span>
          <div style={{ height: '28px', width: '1px', background: 'rgba(255,255,255,0.15)' }} />
        </div>
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

        {/* Masonry grid */}
        <div className="photo-masonry">
          {/* Photo 1 — tall, spans 2 rows */}
          <PhotoTile photo={PHOTOS[0]} className="photo-tall" style={{ gridRow: 'span 2' }} onClick={() => setLightboxIdx(0)} />
          {/* Photo 2 */}
          <PhotoTile photo={PHOTOS[1]} onClick={() => setLightboxIdx(1)} />
          {/* Photo 3 */}
          <PhotoTile photo={PHOTOS[2]} onClick={() => setLightboxIdx(2)} />
          {/* Photo 4 */}
          <PhotoTile photo={PHOTOS[3]} onClick={() => setLightboxIdx(3)} />
          {/* Photo 5 */}
          <PhotoTile photo={PHOTOS[4]} onClick={() => setLightboxIdx(4)} />
          {/* Photo 6 — wide, spans all 3 cols */}
          <PhotoTile photo={PHOTOS[5]} className="photo-wide" style={{ gridColumn: 'span 3' }} onClick={() => setLightboxIdx(5)} />
        </div>
      </section>

      {/* ── Quote ── */}
      <section style={{
        padding: '6rem 2rem',
        background: '#050505',
        textAlign: 'center',
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

      {/* ── Design Experiments Slider ── */}
      <ExperimentSlider />

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

function ExperimentSlider() {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)
  const dragStart = useRef(null)
  const total = EXPERIMENTS.length

  const go = (next) => {
    setDir(next > current ? 1 : -1)
    setCurrent((next + total) % total)
  }

  const handleDragStart = (e) => {
    dragStart.current = e.clientX ?? e.touches?.[0]?.clientX
  }
  const handleDragEnd = (e) => {
    const end = e.clientX ?? e.changedTouches?.[0]?.clientX
    if (dragStart.current === null || end === undefined) return
    const diff = dragStart.current - end
    if (Math.abs(diff) > 50) go(diff > 0 ? current + 1 : current - 1)
    dragStart.current = null
  }

  const exp = EXPERIMENTS[current]

  return (
    <section style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      {/* Label */}
      <div style={{
        position: 'absolute', top: '2.5rem', left: '2.5rem', zIndex: 10,
        display: 'flex', alignItems: 'center', gap: '0.5rem',
      }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>
          02 — Design Experiments
        </p>
      </div>

      {/* Slide */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={exp.id}
          custom={dir}
          initial={{ opacity: 0, x: dir * 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -80 }}
          transition={{ duration: 0.55, ease: [0.32, 0, 0.18, 1] }}
          style={{
            width: '100%', height: '88vh', minHeight: '520px',
            background: exp.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', cursor: 'grab', userSelect: 'none',
          }}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          {/* Visual */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <SlideVisual type={exp.visual} accent={exp.accent} />
          </div>

          {/* Vignette */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
          }} />

          {/* Bottom info bar */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '2.5rem 3rem',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
          }}>
            <div>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 300, fontStyle: 'italic',
                color: '#fff', lineHeight: 1.1,
                marginBottom: '0.4rem',
              }}>
                {exp.title}
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem', letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
              }}>
                {exp.subtitle}
              </p>
            </div>

            {/* Counter */}
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.7rem', letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.3)',
            }}>
              {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
          </div>

          {/* Accent tag */}
          <div style={{
            position: 'absolute', top: '2.5rem', right: '3rem',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.6rem', letterSpacing: '0.2em',
            color: exp.accent, opacity: 0.6,
            textTransform: 'uppercase',
          }}>
            {exp.tag}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav arrows */}
      <button
        onClick={() => go(current - 1)}
        style={{
          position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)',
          width: '48px', height: '48px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: '1.2rem',
          transition: 'background 0.2s, border-color 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
      >‹</button>
      <button
        onClick={() => go(current + 1)}
        style={{
          position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)',
          width: '48px', height: '48px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: '1.2rem',
          transition: 'background 0.2s, border-color 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
      >›</button>

      {/* Dots */}
      <div style={{
        position: 'absolute', bottom: '1.2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '6px', zIndex: 10,
      }}>
        {EXPERIMENTS.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            style={{
              width: i === current ? '20px' : '6px', height: '6px',
              borderRadius: '3px', border: 'none', cursor: 'pointer',
              background: i === current ? '#fff' : 'rgba(255,255,255,0.25)',
              transition: 'width 0.3s ease, background 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  )
}

function PhotoTile({ photo, style = {}, className = '', onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      whileInView={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
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
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.35s ease',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '1rem', left: '1rem',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0)' : 'translateY(6px)',
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
