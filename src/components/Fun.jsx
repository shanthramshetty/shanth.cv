import { useState, useRef, useEffect, useCallback } from 'react'
import {
  motion, AnimatePresence,
  useScroll, useTransform,
  useMotionValue, useSpring,
} from 'framer-motion'

// ─── Photo data ───────────────────────────────────────────────────────────────
// Replace src with your actual photo paths, e.g. '/photos/street-01.jpg'
const PHOTOS = [
  { id: 1,  src: 'https://picsum.photos/seed/ss01/800/1200',  category: 'Street',       caption: 'Mumbai, 2024'  },
  { id: 2,  src: 'https://picsum.photos/seed/ss02/1200/800',  category: 'Nature',       caption: 'Western Ghats' },
  { id: 3,  src: 'https://picsum.photos/seed/ss03/800/800',   category: 'Portrait',     caption: 'Candid Light'  },
  { id: 4,  src: 'https://picsum.photos/seed/ss04/800/1100',  category: 'Street',       caption: 'Old City'      },
  { id: 5,  src: 'https://picsum.photos/seed/ss05/1200/900',  category: 'Landscape',    caption: 'Golden Hour'   },
  { id: 6,  src: 'https://picsum.photos/seed/ss06/900/1200',  category: 'Portrait',     caption: 'Shadow Play'   },
  { id: 7,  src: 'https://picsum.photos/seed/ss07/1100/700',  category: 'Architecture', caption: 'Geometry'      },
  { id: 8,  src: 'https://picsum.photos/seed/ss08/800/1050',  category: 'Street',       caption: 'Night Walk'    },
  { id: 9,  src: 'https://picsum.photos/seed/ss09/1000/750',  category: 'Nature',       caption: 'After Rain'    },
  { id: 10, src: 'https://picsum.photos/seed/ss10/700/950',   category: 'Portrait',     caption: 'Still'         },
  { id: 11, src: 'https://picsum.photos/seed/ss11/1100/800',  category: 'Architecture', caption: 'Symmetry'      },
  { id: 12, src: 'https://picsum.photos/seed/ss12/900/1200',  category: 'Nature',       caption: 'Solitude'      },
]

const HERO_SRC   = 'https://picsum.photos/seed/sshero/1920/1080'
const CATEGORIES = ['All', ...new Set(PHOTOS.map(p => p.category))]
const GRAIN_BG   = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`

// ─── Animation variants ───────────────────────────────────────────────────────
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

// ─── PhotoCard ────────────────────────────────────────────────────────────────
function PhotoCard({ photo, onOpen }) {
  const ref   = useRef(null)
  const [hov, setHov] = useState(false)

  // Physics-based tilt springs
  const rX = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.5 })
  const rY = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.5 })
  const sc = useSpring(useMotionValue(1), { stiffness: 280, damping: 22 })

  const onMove = (e) => {
    if (!ref.current) return
    const b = ref.current.getBoundingClientRect()
    rX.set(((e.clientY - b.top)  / b.height - 0.5) * -8)
    rY.set(((e.clientX - b.left) / b.width  - 0.5) *  8)
  }
  const onEnter = () => { setHov(true);  sc.set(1.025) }
  const onLeave = () => { setHov(false); rX.set(0); rY.set(0); sc.set(1) }

  return (
    <motion.div variants={cardVariants} style={{ breakInside: 'avoid', marginBottom: '1.25rem', perspective: 900 }}>
      <motion.div
        ref={ref}
        style={{ rotateX: rX, rotateY: rY, scale: sc, position: 'relative', cursor: 'zoom-in', overflow: 'hidden', borderRadius: '2px', transformStyle: 'preserve-3d' }}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onOpen}
      >
        {/* Image — scales slightly more than the card for inner-depth feel */}
        <motion.img
          src={photo.src}
          alt={photo.caption}
          loading="lazy"
          animate={{ scale: hov ? 1.07 : 1 }}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />

        {/* Gradient overlay — slides up from bottom */}
        <motion.div
          animate={{ opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.32 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.28) 48%, transparent 100%)',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: '1.25rem',
          }}
        >
          <motion.span
            animate={{ opacity: hov ? 1 : 0, y: hov ? 0 : 10 }}
            transition={{ duration: 0.28, delay: 0.05 }}
            style={{
              fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.45)',
              marginBottom: '0.28rem',
            }}
          >
            {photo.category}
          </motion.span>
          <motion.span
            animate={{ opacity: hov ? 1 : 0, y: hov ? 0 : 12 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{
              fontSize: '0.95rem', fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300, color: 'rgba(255,255,255,0.92)', letterSpacing: '0.04em',
            }}
          >
            {photo.caption}
          </motion.span>
        </motion.div>

        {/* View indicator ring */}
        <motion.div
          animate={{ opacity: hov ? 1 : 0, scale: hov ? 1 : 0.65 }}
          transition={{ duration: 0.22 }}
          style={{
            position: 'absolute', top: '0.85rem', right: '0.85rem',
            width: '28px', height: '28px', borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.38)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', lineHeight: 1,
          }}
        >
          +
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Fun() {
  const [lightbox,     setLightbox]     = useState(null) // photo id or null
  const [activeFilter, setActiveFilter] = useState('All')
  const touchStartX                     = useRef(null)

  const filteredPhotos = activeFilter === 'All' ? PHOTOS : PHOTOS.filter(p => p.category === activeFilter)
  const lightboxPhoto  = PHOTOS.find(p => p.id === lightbox)
  const lightboxIdx    = filteredPhotos.findIndex(p => p.id === lightbox)

  // Hero parallax
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, 160])

  // ── Lightbox navigation ──
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const prevPhoto = useCallback(() => {
    const idx  = filteredPhotos.findIndex(p => p.id === lightbox)
    const prev = filteredPhotos[(idx - 1 + filteredPhotos.length) % filteredPhotos.length]
    setLightbox(prev.id)
  }, [lightbox, filteredPhotos])
  const nextPhoto = useCallback(() => {
    const idx  = filteredPhotos.findIndex(p => p.id === lightbox)
    const next = filteredPhotos[(idx + 1) % filteredPhotos.length]
    setLightbox(next.id)
  }, [lightbox, filteredPhotos])

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape')     closeLightbox()
      if (e.key === 'ArrowLeft')  prevPhoto()
      if (e.key === 'ArrowRight') nextPhoto()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, closeLightbox, prevPhoto, nextPhoto])

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) dx < 0 ? nextPhoto() : prevPhoto()
    touchStartX.current = null
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        .photo-grid { columns: 3; column-gap: 1.25rem; }
        @media (max-width: 1200px) { .photo-grid { columns: 2; } }
        @media (max-width: 768px)  { .photo-grid { columns: 1; } }
        .filter-btn { background: none; border: 1px solid rgba(255,255,255,0.1); border-radius: 999px; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.38rem 1rem; position: relative; transition: color 0.2s, border-color 0.2s; }
        .filter-btn:hover { border-color: rgba(255,255,255,0.25); }
        .lb-btn { background: none; border: none; cursor: pointer; transition: color 0.2s; }
        .lb-btn:hover { color: #fff !important; }
      `}</style>

      <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff', position: 'relative', overflowX: 'hidden' }}>

        {/* Film grain */}
        <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', backgroundImage: GRAIN_BG, backgroundRepeat: 'repeat', opacity: 0.04, mixBlendMode: 'screen' }} />

        {/* ════════════════ HERO ════════════════ */}
        <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
          <motion.div style={{ y: heroY, position: 'absolute', inset: '-10% 0', height: '120%' }}>
            <motion.img
              src={HERO_SRC}
              alt="Featured"
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 14, ease: 'easeOut' }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </motion.div>

          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.62) 100%)' }} />

          <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.6em' }}
              animate={{ opacity: 1, letterSpacing: '0.26em' }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
              style={{ fontSize: '0.68rem', fontFamily: "'Inter', sans-serif", fontWeight: 400, color: 'rgba(255,255,255,0.42)', textTransform: 'uppercase', marginBottom: '1.25rem' }}
            >
              Fun / Photography
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem, 8vw, 6.5rem)', fontWeight: 300, lineHeight: 1, letterSpacing: '0.05em', color: '#fff', textAlign: 'center' }}
            >
              Through My Lens
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
              style={{ width: '36px', height: '1px', background: 'rgba(255,255,255,0.3)', marginTop: '2.25rem' }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1 }}
            style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
          >
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>Scroll</span>
            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.2)' }}
            />
          </motion.div>
        </section>

        {/* ════════════════ GALLERY ════════════════ */}
        <section style={{ padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 5rem)', position: 'relative', zIndex: 2 }}>

          {/* Heading row */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9 }}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}
          >
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 300, color: 'rgba(255,255,255,0.82)', letterSpacing: '0.07em' }}>
                Selected Work
              </h2>
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.26)', fontFamily: "'Inter', sans-serif", marginTop: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeFilter}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {filteredPhotos.length} photograph{filteredPhotos.length !== 1 ? 's' : ''}
                  </motion.span>
                </AnimatePresence>
              </p>
            </div>

            {/* Category filter pills */}
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
              {CATEGORIES.map(cat => {
                const active = activeFilter === cat
                return (
                  <button
                    key={cat}
                    className="filter-btn"
                    onClick={() => setActiveFilter(cat)}
                    style={{ color: active ? '#000' : 'rgba(255,255,255,0.38)' }}
                  >
                    {active && (
                      <motion.span
                        layoutId="filterPill"
                        transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                        style={{ position: 'absolute', inset: 0, background: '#fff', borderRadius: '999px', zIndex: -1 }}
                      />
                    )}
                    {cat}
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* Masonry grid with filter-change animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="photo-grid"
              variants={gridVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {filteredPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  onOpen={() => setLightbox(photo.id)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ════════════════ FOOTER ════════════════ */}
        <footer style={{ padding: '2.5rem clamp(1.5rem, 5vw, 5rem)', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 2 }}>
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.18)', fontFamily: "'Inter', sans-serif", letterSpacing: '0.06em' }}>
            All photographs &copy; Shanthram Shetty
          </span>
          <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.12)', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', letterSpacing: '0.04em' }}>
            Shot on instinct.
          </span>
        </footer>
      </div>

      {/* ════════════════ LIGHTBOX ════════════════ */}
      <AnimatePresence>
        {lightbox !== null && lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={closeLightbox}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(4,4,4,0.97)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {/* Counter */}
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.75rem', fontSize: '0.66rem', color: 'rgba(255,255,255,0.25)', fontFamily: "'Inter', sans-serif", letterSpacing: '0.14em', userSelect: 'none' }}>
              {lightboxIdx + 1} / {filteredPhotos.length}
            </div>

            {/* Close */}
            <button
              className="lb-btn"
              onClick={closeLightbox}
              style={{ position: 'absolute', top: '1.25rem', left: '1.75rem', color: 'rgba(255,255,255,0.38)', fontSize: '0.7rem', fontFamily: "'Inter', sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.4rem 0' }}
            >
              Close
            </button>

            {/* Image crossfade */}
            <AnimatePresence mode="wait">
              <motion.img
                key={lightbox}
                src={lightboxPhoto.src}
                alt={lightboxPhoto.caption}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22 }}
                onClick={e => e.stopPropagation()}
                style={{ maxHeight: '84vh', maxWidth: '88vw', objectFit: 'contain', display: 'block', userSelect: 'none' }}
              />
            </AnimatePresence>

            {/* Caption */}
            <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.26)', fontFamily: "'Inter', sans-serif", marginBottom: '0.3rem' }}>
                {lightboxPhoto.category}
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '1rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.06em' }}>
                {lightboxPhoto.caption}
              </p>
            </div>

            {/* Prev */}
            <button
              className="lb-btn"
              onClick={e => { e.stopPropagation(); prevPhoto() }}
              aria-label="Previous photo"
              style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.32)', fontSize: '1.4rem', padding: '0.75rem' }}
            >
              ←
            </button>

            {/* Next */}
            <button
              className="lb-btn"
              onClick={e => { e.stopPropagation(); nextPhoto() }}
              aria-label="Next photo"
              style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.32)', fontSize: '1.4rem', padding: '0.75rem' }}
            >
              →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
