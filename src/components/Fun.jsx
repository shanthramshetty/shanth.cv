import { useState, useRef, useEffect, useCallback } from 'react'
import {
  motion, AnimatePresence,
  useScroll, useTransform, useSpring, useMotionValueEvent,
} from 'framer-motion'

// ─── Photo data ────────────────────────────────────────────────────────────────
const PHOTOS = [
  { id: 1,  image: 'https://picsum.photos/seed/ss01/900/1200', category: 'Street',       title: 'Monsoon Street',   description: 'Caught between two rain showers, the city paused.',       date: 'Aug 2024' },
  { id: 2,  image: 'https://picsum.photos/seed/ss02/900/1200', category: 'Nature',        title: 'Western Ghats',    description: 'Mist and silence — nature at its most honest.',           date: 'Jun 2024' },
  { id: 3,  image: 'https://picsum.photos/seed/ss03/900/1200', category: 'Portrait',      title: 'Candid Light',     description: 'An unguarded moment, frozen in soft afternoon sun.',      date: 'Mar 2024' },
  { id: 4,  image: 'https://picsum.photos/seed/ss04/900/1200', category: 'Street',        title: 'Old City',         description: 'Ancient walls still standing against the new.',           date: 'Jan 2024' },
  { id: 5,  image: 'https://picsum.photos/seed/ss05/900/1200', category: 'Landscape',     title: 'Golden Hour',      description: 'The last ten minutes before dark — nothing compares.',    date: 'Nov 2023' },
  { id: 6,  image: 'https://picsum.photos/seed/ss06/900/1200', category: 'Portrait',      title: 'Shadow Play',      description: 'Light bends itself into architecture.',                   date: 'Sep 2023' },
  { id: 7,  image: 'https://picsum.photos/seed/ss07/900/1200', category: 'Architecture',  title: 'Geometry',         description: 'Cities are just shapes waiting to be noticed.',          date: 'Jul 2023' },
  { id: 8,  image: 'https://picsum.photos/seed/ss08/900/1200', category: 'Street',        title: 'Night Walk',       description: 'The streets speak differently after midnight.',           date: 'May 2023' },
  { id: 9,  image: 'https://picsum.photos/seed/ss09/900/1200', category: 'Nature',        title: 'After Rain',       description: 'Everything is sharper once the clouds clear.',           date: 'Apr 2023' },
  { id: 10, image: 'https://picsum.photos/seed/ss10/900/1200', category: 'Portrait',      title: 'Still',            description: 'Presence, without the need to perform.',                 date: 'Feb 2023' },
  { id: 11, image: 'https://picsum.photos/seed/ss11/900/1200', category: 'Architecture',  title: 'Symmetry',         description: 'Human hands built this, but nature corrected it.',       date: 'Dec 2022' },
  { id: 12, image: 'https://picsum.photos/seed/ss12/900/1200', category: 'Nature',        title: 'Solitude',         description: 'Distance is not empty — it is full of quiet.',          date: 'Oct 2022' },
]

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`

// ─── RippleGrid — pure WebGL 1 ─────────────────────────────────────────────────
const RIPPLE_VERT = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }`

const RIPPLE_FRAG = `
  precision highp float;
  uniform float iTime;
  uniform vec2  iResolution;
  uniform vec3  gridColor;
  uniform float rippleIntensity;
  uniform float gridSize;
  uniform float gridThickness;
  uniform float fadeDistance;
  uniform float vignetteStrength;
  uniform float glowIntensity;
  uniform float uOpacity;
  varying vec2 vUv;

  float pi = 3.141592;

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float dist  = length(uv);
    float func  = sin(pi * (iTime - dist));
    vec2 rippleUv = uv + uv * func * rippleIntensity;

    vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);
    vec2 b = abs(a);

    float aw = 0.5;
    vec2 sb = vec2(smoothstep(0.0, aw, b.x), smoothstep(0.0, aw, b.y));

    vec3 color = vec3(0.0);
    color += exp(-gridThickness * sb.x * (0.8 + 0.5 * sin(pi * iTime)));
    color += exp(-gridThickness * sb.y);
    color += 0.5 * exp(-(gridThickness / 4.0) * sin(sb.x));
    color += 0.5 * exp(-(gridThickness / 3.0) * sb.y);
    if (glowIntensity > 0.0) {
      color += glowIntensity * exp(-gridThickness * 0.5 * sb.x);
      color += glowIntensity * exp(-gridThickness * 0.5 * sb.y);
    }

    float ddd     = exp(-2.0 * clamp(pow(dist, fadeDistance), 0.0, 1.0));
    vec2  vc      = vUv - 0.5;
    float vignette = clamp(1.0 - pow(length(vc) * 2.0, vignetteStrength), 0.0, 1.0);
    float fade    = ddd * vignette;

    float alpha = length(color) * fade * uOpacity;
    gl_FragColor = vec4(color * gridColor * fade * uOpacity, alpha);
  }`

function RippleGrid({ gridColor = '#ffffff', rippleIntensity = 0.06, gridSize = 10.0, gridThickness = 20.0, fadeDistance = 1.5, vignetteStrength = 2.5, glowIntensity = 0.08, opacity = 0.12 }) {
  const ref = useRef(null)
  useEffect(() => {
    const container = ref.current
    if (!container) return
    const hexToRgb = h => {
      const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h)
      return r ? [parseInt(r[1],16)/255, parseInt(r[2],16)/255, parseInt(r[3],16)/255] : [1,1,1]
    }
    const canvas = document.createElement('canvas')
    Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' })
    container.appendChild(canvas)
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true })
    if (!gl) return
    gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    const mkSh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s }
    const prog = gl.createProgram()
    gl.attachShader(prog, mkSh(gl.VERTEX_SHADER, RIPPLE_VERT))
    gl.attachShader(prog, mkSh(gl.FRAGMENT_SHADER, RIPPLE_FRAG))
    gl.linkProgram(prog); gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(prog, 'position')
    gl.enableVertexAttribArray(posLoc); gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)
    const u = n => gl.getUniformLocation(prog, n)
    const uTime=u('iTime'), uRes=u('iResolution'), uColor=u('gridColor'), uRipple=u('rippleIntensity')
    const uGSize=u('gridSize'), uThick=u('gridThickness'), uFade=u('fadeDistance')
    const uVig=u('vignetteStrength'), uGlow=u('glowIntensity'), uOp=u('uOpacity')
    const [r,g,b] = hexToRgb(gridColor)
    gl.uniform3f(uColor,r,g,b); gl.uniform1f(uRipple,rippleIntensity); gl.uniform1f(uGSize,gridSize)
    gl.uniform1f(uThick,gridThickness); gl.uniform1f(uFade,fadeDistance)
    gl.uniform1f(uVig,vignetteStrength); gl.uniform1f(uGlow,glowIntensity); gl.uniform1f(uOp,opacity)
    const resize = () => {
      const dpr=Math.min(2,window.devicePixelRatio), w=container.clientWidth, h=container.clientHeight
      canvas.width=Math.round(w*dpr); canvas.height=Math.round(h*dpr)
      gl.viewport(0,0,canvas.width,canvas.height); gl.uniform2f(uRes,w,h)
    }
    window.addEventListener('resize', resize); resize()
    let raf
    const render = t => { gl.uniform1f(uTime, t*0.001); gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLES,0,3); raf=requestAnimationFrame(render) }
    raf = requestAnimationFrame(render)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); gl.getExtension('WEBGL_lose_context')?.loseContext(); if (container.contains(canvas)) container.removeChild(canvas) }
  }, [])
  return <div ref={ref} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />
}

// ─── ScrambleText ──────────────────────────────────────────────────────────────
const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function ScrambleText({ text, style, stagger = 30, hoverRadius = 90 }) {
  const ref    = useRef(null)
  const active = useRef(new Set())
  const run = useCallback((span) => {
    const idx = span.dataset.idx; const orig = span.dataset.char
    if (active.current.has(idx) || orig === ' ') return
    active.current.add(idx)
    let count = 0; const max = 4 + Math.floor(Math.random() * 5)
    const id = setInterval(() => {
      if (count++ < max) span.textContent = CHARS[Math.floor(Math.random() * CHARS.length)]
      else { span.textContent = orig; clearInterval(id); active.current.delete(idx) }
    }, 48)
  }, [])
  useEffect(() => {
    if (!ref.current) return
    active.current.clear()
    const spans  = Array.from(ref.current.querySelectorAll('[data-idx]'))
    const timers = spans.map((s, i) => setTimeout(() => run(s), Math.min(i * stagger, 600)))
    return () => { timers.forEach(clearTimeout); active.current.clear() }
  }, [text, stagger, run])
  useEffect(() => {
    const el = ref.current; if (!el) return
    const onMove = e => {
      el.querySelectorAll('[data-idx]').forEach(s => {
        const r = s.getBoundingClientRect()
        if (Math.hypot(e.clientX - r.left - r.width/2, e.clientY - r.top - r.height/2) < hoverRadius) run(s)
      })
    }
    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [text, hoverRadius, run])
  return (
    <span ref={ref} style={{ ...style, display: 'block' }}>
      {text.split(' ').map((word, wi, arr) => (
        <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, ci) => {
            const flat = arr.slice(0, wi).reduce((a, w) => a + w.length + 1, 0) + ci
            return <span key={ci} data-idx={String(flat)} data-char={char} style={{ display: 'inline-block' }}>{char}</span>
          })}
          {wi < arr.length - 1 && <span style={{ display: 'inline-block', width: '0.28em' }}> </span>}
        </span>
      ))}
    </span>
  )
}

// ─── PhotoCard with 3D tilt ────────────────────────────────────────────────────
function PhotoCard({ photo, cardW, cardH, dist, onClick }) {
  const ref    = useRef(null)
  const [tilt, setTilt]       = useState({ rx: 0, ry: 0 })
  const [hovered, setHovered] = useState(false)

  const scale   = dist === 0 ? 1.06 : dist === 1 ? 0.96 : dist === 2 ? 0.90 : 0.84
  const opacity = dist === 0 ? 1    : dist === 1 ? 0.70 : dist === 2 ? 0.48 : 0.28

  const onMouseMove = useCallback(e => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setTilt({ rx: ((e.clientY - r.top)  / r.height - 0.5) * -10,
              ry: ((e.clientX - r.left) / r.width  - 0.5) * 10 })
  }, [])

  const onMouseLeave = useCallback(() => { setTilt({ rx: 0, ry: 0 }); setHovered(false) }, [])

  return (
    <motion.div
      ref={ref}
      animate={{ scale, opacity }}
      transition={{ type: 'spring', stiffness: 160, damping: 24 }}
      style={{ width: cardW, height: cardH, flexShrink: 0, cursor: 'zoom-in', perspective: 900 }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <motion.div
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        style={{
          width: '100%', height: '100%',
          position: 'relative', overflow: 'hidden', borderRadius: 6,
          boxShadow: dist === 0
            ? '0 28px 70px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.12)'
            : '0 10px 30px rgba(0,0,0,0.55)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        <img
          src={photo.image} alt={photo.title} draggable={false}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', userSelect: 'none' }}
        />

        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.18 }}
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1rem 0.9rem',
          }}
        >
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.5rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '0.2rem', display: 'block' }}>
            {photo.category}
          </span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: `${Math.round(cardW * 0.068)}px`, color: 'rgba(255,255,255,0.9)', fontWeight: 300, lineHeight: 1.15 }}>
            {photo.title}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ─── Fun page ──────────────────────────────────────────────────────────────────
const NAVBAR_H = 64

export default function Fun() {
  const containerRef = useRef(null)
  const [vw, setVw] = useState(() => typeof window !== 'undefined' ? window.innerWidth  : 1440)
  const [vh, setVh] = useState(() => typeof window !== 'undefined' ? window.innerHeight : 900)
  const [activeIdx, setActiveIdx] = useState(1)
  const [lightbox,  setLightbox]  = useState(null)

  // Scroll to top on mount so gallery starts fresh
  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    const update = () => { setVw(window.innerWidth); setVh(window.innerHeight) }
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // ── Geometry ──────────────────────────────────────────────────────────────────
  const CARD_W = Math.round(Math.min(272, Math.max(170, vw * 0.205)))
  const CARD_H = Math.round(CARD_W * 1.44)
  const GAP    = 22
  const PAD    = Math.round(Math.max(60, (vw - CARD_W * 4.5 - GAP * 3.5) / 2))  // ~4.5 cards visible initially

  const TOTAL_STRIP_W = PHOTOS.length * (CARD_W + GAP) - GAP
  const startX        = PAD
  const endX          = -(TOTAL_STRIP_W - vw + PAD)
  const scrollDist    = startX - endX   // = TOTAL_STRIP_W - vw + 2*PAD
  const containerH    = scrollDist + vh

  // ── Scroll-driven pan ─────────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const spring = useSpring(scrollYProgress, { stiffness: 52, damping: 22, mass: 0.55 })
  const stripX = useTransform(spring, [0, 1], [startX, endX])

  // Track which card is nearest the viewport center
  useMotionValueEvent(stripX, 'change', latest => {
    const center = -latest + vw / 2
    const idx    = Math.round((center - CARD_W / 2) / (CARD_W + GAP))
    setActiveIdx(Math.max(0, Math.min(PHOTOS.length - 1, idx)))
  })

  // Initialise activeIdx when vw changes
  useEffect(() => {
    const center = -startX + vw / 2
    const idx    = Math.round((center - CARD_W / 2) / (CARD_W + GAP))
    setActiveIdx(Math.max(0, Math.min(PHOTOS.length - 1, idx)))
  }, [vw, CARD_W, startX])

  // Fade out scroll hint as user scrolls
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0])

  // ── Lightbox ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fn = e => {
      if (lightbox === null) return
      if (e.key === 'Escape')      setLightbox(null)
      if (e.key === 'ArrowLeft')   setLightbox(i => (i - 1 + PHOTOS.length) % PHOTOS.length)
      if (e.key === 'ArrowRight')  setLightbox(i => (i + 1) % PHOTOS.length)
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [lightbox])

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const photo = PHOTOS[activeIdx]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
      `}</style>

      {/* Film grain */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', backgroundImage: GRAIN_BG, backgroundRepeat: 'repeat', opacity: 0.04, mixBlendMode: 'screen' }} />

      {/* ── Tall scroll container ── */}
      <div ref={containerRef} style={{ height: containerH, position: 'relative' }}>

        {/* ── Sticky viewport ── */}
        <div style={{
          position: 'sticky', top: NAVBAR_H, height: `calc(100vh - ${NAVBAR_H}px)`,
          overflow: 'hidden', background: '#000',
        }}>

          {/* RippleGrid */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <RippleGrid gridColor="#ffffff" opacity={0.09} rippleIntensity={0.06} gridSize={10} gridThickness={20} fadeDistance={1.5} vignetteStrength={2.5} glowIntensity={0.08} />
          </div>

          {/* Top bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 4, pointerEvents: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.4rem 2.4rem' }}>
            <motion.span
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}
            >
              Fun / Photography
            </motion.span>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIdx}
                initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.56rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.14)' }}
              >
                {String(activeIdx + 1).padStart(2, '0')} / {String(PHOTOS.length).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* ── Photo strip ── */}
          <div style={{
            position: 'absolute',
            top: '3.5rem', bottom: '152px',
            left: 0, right: 0,
            zIndex: 2,
            display: 'flex', alignItems: 'center',
            pointerEvents: 'none',
          }}>
            <motion.div style={{ x: stripX, display: 'flex', gap: GAP, alignItems: 'center', pointerEvents: 'auto' }}>
              {PHOTOS.map((p, i) => (
                <PhotoCard
                  key={p.id}
                  photo={p}
                  cardW={CARD_W}
                  cardH={CARD_H}
                  dist={Math.abs(i - activeIdx)}
                  onClick={() => setLightbox(i)}
                />
              ))}
            </motion.div>
          </div>

          {/* ── Bottom metadata ── */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '152px',
            zIndex: 3, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '0.2rem', pointerEvents: 'none',
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0  }}
                exit={{    opacity: 0, y: -6  }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                style={{ textAlign: 'center' }}
              >
                <span style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '0.54rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: '0.32rem' }}>
                  {photo.category}
                </span>
                <ScrambleText
                  key={`title-${activeIdx}`}
                  text={photo.title}
                  stagger={36}
                  hoverRadius={0}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(1.4rem, 2.6vw, 2rem)',
                    fontWeight: 300, fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.86)',
                    letterSpacing: '0.04em', lineHeight: 1,
                    marginBottom: '0.32rem',
                  }}
                />
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.02em', lineHeight: 1.55,
                  maxWidth: '340px', margin: '0 auto',
                }}>
                  {photo.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div style={{ display: 'flex', gap: 5, alignItems: 'center', marginTop: '0.6rem' }}>
              {PHOTOS.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: i === activeIdx ? 20 : 4,
                    background: i === activeIdx ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.16)',
                  }}
                  transition={{ duration: 0.32, ease: 'easeOut' }}
                  style={{ height: 2, borderRadius: 2 }}
                />
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <motion.div
            style={{
              opacity: hintOpacity,
              position: 'absolute', bottom: '1.3rem', right: '2.4rem',
              zIndex: 4, pointerEvents: 'none',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              fontFamily: "'Inter', sans-serif", fontSize: '0.54rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.18)',
            }}
          >
            Scroll to explore
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </motion.div>

        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (() => {
          const lb = PHOTOS[lightbox]
          return (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.26 }}
              onClick={() => setLightbox(null)}
              style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(4,4,4,0.97)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '1.25rem', left: '1.75rem', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', fontSize: '0.66rem', fontFamily: "'Inter', sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase' }}>Close</button>
              <div style={{ position: 'absolute', top: '1.4rem', right: '1.75rem', fontSize: '0.6rem', color: 'rgba(255,255,255,0.22)', fontFamily: "'Inter', sans-serif", letterSpacing: '0.14em' }}>{lightbox + 1} / {PHOTOS.length}</div>

              <AnimatePresence mode="wait">
                <motion.img
                  key={lightbox}
                  src={lb.image} alt={lb.title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1    }}
                  exit={{    opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.22 }}
                  onClick={e => e.stopPropagation()}
                  style={{ maxHeight: '84vh', maxWidth: '88vw', objectFit: 'contain', userSelect: 'none', borderRadius: 4 }}
                />
              </AnimatePresence>

              <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
                <p style={{ fontSize: '0.56rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.24)', fontFamily: "'Inter', sans-serif", marginBottom: '0.3rem' }}>{lb.category} · {lb.date}</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: 'italic', fontSize: '1.05rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>{lb.description}</p>
              </div>

              <button onClick={e => { e.stopPropagation(); setLightbox(i => (i - 1 + PHOTOS.length) % PHOTOS.length) }} aria-label="Previous" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', fontSize: '1.4rem', padding: '0.75rem', transition: 'color 0.2s' }} onMouseEnter={e=>e.currentTarget.style.color='#fff'} onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.3)'}>←</button>
              <button onClick={e => { e.stopPropagation(); setLightbox(i => (i + 1) % PHOTOS.length) }} aria-label="Next" style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', fontSize: '1.4rem', padding: '0.75rem', transition: 'color 0.2s' }} onMouseEnter={e=>e.currentTarget.style.color='#fff'} onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.3)'}>→</button>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </>
  )
}
