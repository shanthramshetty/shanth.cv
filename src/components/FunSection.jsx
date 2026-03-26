import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
  { id: 1, title: 'Kinetic Type', subtitle: 'Typography in motion', preview: 'type', bg: '#0e0e0e' },
  { id: 2, title: 'Gradient Systems', subtitle: 'Color & light studies', preview: 'gradient', bg: '#081a15' },
  { id: 3, title: 'Spring Physics', subtitle: 'Motion & interaction', preview: 'spring', bg: '#1a0c08' },
  { id: 4, title: 'Grid Studies', subtitle: 'Structure & rhythm', preview: 'grid', bg: '#090912' },
  { id: 5, title: 'Dark Glass', subtitle: 'Material & depth', preview: 'glass', bg: '#0a0a10' },
]

function ExperimentPreview({ type }) {
  if (type === 'type') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '4rem',
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.12)',
          userSelect: 'none',
          lineHeight: 1,
        }}>
          Aa
        </span>
      </div>
    )
  }
  if (type === 'gradient') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #34d399, #059669, #064e3b)',
          boxShadow: '0 0 40px rgba(52,211,153,0.15)',
        }} />
      </div>
    )
  }
  if (type === 'spring') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #fb923c, #ea580c)',
          boxShadow: '0 0 30px rgba(251,146,60,0.2)',
        }} />
      </div>
    )
  }
  if (type === 'grid') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <svg width="72" height="72" viewBox="0 0 72 72">
          {Array.from({ length: 5 }).map((_, r) =>
            Array.from({ length: 5 }).map((_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={8 + c * 14}
                cy={8 + r * 14}
                r="2"
                fill={`rgba(255,255,255,${0.08 + (r + c) * 0.025})`}
              />
            ))
          )}
        </svg>
      </div>
    )
  }
  if (type === 'glass') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div style={{
          width: '72px', height: '60px', borderRadius: '10px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
        }} />
      </div>
    )
  }
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
        {/* breadcrumb */}
        <div style={{
          position: 'absolute', top: '2rem', left: '2.5rem',
          display: 'flex', gap: '0.4rem', alignItems: 'center',
        }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>Fun</span>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.7rem' }}>›</span>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>Creative Playground</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: '720px' }}
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
        }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>scroll</span>
          <div style={{ height: '28px', width: '1px', background: 'rgba(255,255,255,0.15)' }} />
        </div>
      </section>

      {/* ── Photography ── */}
      <section style={{ padding: '4rem 2.5rem 6rem', maxWidth: '1280px', margin: '0 auto' }}>
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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: '280px 280px 320px',
          gap: '6px',
        }}>
          {/* Photo 1 — tall, spans 2 rows */}
          <PhotoTile photo={PHOTOS[0]} style={{ gridRow: 'span 2' }} onClick={() => setLightboxIdx(0)} />
          {/* Photo 2 */}
          <PhotoTile photo={PHOTOS[1]} onClick={() => setLightboxIdx(1)} />
          {/* Photo 3 */}
          <PhotoTile photo={PHOTOS[2]} onClick={() => setLightboxIdx(2)} />
          {/* Photo 4 */}
          <PhotoTile photo={PHOTOS[3]} onClick={() => setLightboxIdx(3)} />
          {/* Photo 5 */}
          <PhotoTile photo={PHOTOS[4]} onClick={() => setLightboxIdx(4)} />
          {/* Photo 6 — wide, spans all 3 cols */}
          <PhotoTile photo={PHOTOS[5]} style={{ gridColumn: 'span 3' }} onClick={() => setLightboxIdx(5)} />
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

      {/* ── Design Experiments ── */}
      <section style={{ padding: '5rem 2.5rem 8rem', maxWidth: '1280px', margin: '0 auto' }}>
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
            02 — Design Experiments
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '10px',
        }}>
          {EXPERIMENTS.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              style={{
                background: exp.bg,
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '10px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <div style={{ height: '180px', background: exp.bg }}>
                <ExperimentPreview type={exp.preview} />
              </div>
              <div style={{ padding: '1rem 1.1rem 1.2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8rem', fontWeight: 500,
                  color: 'rgba(255,255,255,0.65)',
                  marginBottom: '0.25rem',
                }}>
                  {exp.title}
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.68rem',
                  color: 'rgba(255,255,255,0.25)',
                  letterSpacing: '0.02em',
                }}>
                  {exp.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

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

function PhotoTile({ photo, style = {}, onClick }) {
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
