import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Photo data ────────────────────────────────────────────────────────────────
const PHOTOS = [
  { id: 1,  image: 'https://picsum.photos/seed/ss01/900/900', category: 'Street',       title: 'Monsoon Street',   description: 'Caught between two rain showers, the city paused.',       date: 'Aug 2024' },
  { id: 2,  image: 'https://picsum.photos/seed/ss02/900/900', category: 'Nature',        title: 'Western Ghats',    description: 'Mist and silence — nature at its most honest.',           date: 'Jun 2024' },
  { id: 3,  image: 'https://picsum.photos/seed/ss03/900/900', category: 'Portrait',      title: 'Candid Light',     description: 'An unguarded moment, frozen in soft afternoon sun.',      date: 'Mar 2024' },
  { id: 4,  image: 'https://picsum.photos/seed/ss04/900/900', category: 'Street',        title: 'Old City',         description: 'Ancient walls still standing against the new.',           date: 'Jan 2024' },
  { id: 5,  image: 'https://picsum.photos/seed/ss05/900/900', category: 'Landscape',     title: 'Golden Hour',      description: 'The last ten minutes before dark — nothing compares.',    date: 'Nov 2023' },
  { id: 6,  image: 'https://picsum.photos/seed/ss06/900/900', category: 'Portrait',      title: 'Shadow Play',      description: 'Light bends itself into architecture.',                   date: 'Sep 2023' },
  { id: 7,  image: 'https://picsum.photos/seed/ss07/900/900', category: 'Architecture',  title: 'Geometry',         description: 'Cities are just shapes waiting to be noticed.',          date: 'Jul 2023' },
  { id: 8,  image: 'https://picsum.photos/seed/ss08/900/900', category: 'Street',        title: 'Night Walk',       description: 'The streets speak differently after midnight.',           date: 'May 2023' },
  { id: 9,  image: 'https://picsum.photos/seed/ss09/900/900', category: 'Nature',        title: 'After Rain',       description: 'Everything is sharper once the clouds clear.',           date: 'Apr 2023' },
  { id: 10, image: 'https://picsum.photos/seed/ss10/900/900', category: 'Portrait',      title: 'Still',            description: 'Presence, without the need to perform.',                 date: 'Feb 2023' },
  { id: 11, image: 'https://picsum.photos/seed/ss11/900/900', category: 'Architecture',  title: 'Symmetry',         description: 'Human hands built this, but nature corrected it.',       date: 'Dec 2022' },
  { id: 12, image: 'https://picsum.photos/seed/ss12/900/900', category: 'Nature',        title: 'Solitude',         description: 'Distance is not empty — it is full of quiet.',          date: 'Oct 2022' },
]

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`

// ─── RippleGrid — pure WebGL 1, no external libs ───────────────────────────────
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

function RippleGrid({
  gridColor       = '#ffffff',
  rippleIntensity = 0.06,
  gridSize        = 10.0,
  gridThickness   = 20.0,
  fadeDistance    = 1.5,
  vignetteStrength= 2.5,
  glowIntensity   = 0.08,
  opacity         = 0.12,
}) {
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
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    const mkSh = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src); gl.compileShader(s); return s
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, mkSh(gl.VERTEX_SHADER,   RIPPLE_VERT))
    gl.attachShader(prog, mkSh(gl.FRAGMENT_SHADER, RIPPLE_FRAG))
    gl.linkProgram(prog); gl.useProgram(prog)

    // Full-screen triangle (covers entire clip space with one triangle)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(prog, 'position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const u = name => gl.getUniformLocation(prog, name)
    const uTime    = u('iTime');    const uRes    = u('iResolution')
    const uColor   = u('gridColor'); const uRipple = u('rippleIntensity')
    const uGSize   = u('gridSize'); const uThick  = u('gridThickness')
    const uFade    = u('fadeDistance'); const uVig = u('vignetteStrength')
    const uGlow    = u('glowIntensity'); const uOp = u('uOpacity')

    const [r,g,b] = hexToRgb(gridColor)
    gl.uniform3f(uColor, r, g, b)
    gl.uniform1f(uRipple, rippleIntensity); gl.uniform1f(uGSize, gridSize)
    gl.uniform1f(uThick, gridThickness);    gl.uniform1f(uFade, fadeDistance)
    gl.uniform1f(uVig, vignetteStrength);   gl.uniform1f(uGlow, glowIntensity)
    gl.uniform1f(uOp, opacity)

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio)
      const w = container.clientWidth, h = container.clientHeight
      canvas.width  = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, w, h)
    }
    window.addEventListener('resize', resize); resize()

    let raf
    const render = t => {
      gl.uniform1f(uTime, t * 0.001)
      gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      if (container.contains(canvas)) container.removeChild(canvas)
    }
  }, []) // intentionally run once

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

// ─── Fun page ──────────────────────────────────────────────────────────────────
export default function Fun() {
  const [idx,     setIdx]     = useState(0)
  const [dir,     setDir]     = useState(0)
  const [lightbox,setLightbox]= useState(null)
  const touchX = useRef(null)

  const photo = PHOTOS[idx]

  const goPrev = useCallback(() => { setDir(-1); setIdx(i => (i - 1 + PHOTOS.length) % PHOTOS.length) }, [])
  const goNext = useCallback(() => { setDir(1);  setIdx(i => (i + 1) % PHOTOS.length) }, [])

  const closeLB = useCallback(() => setLightbox(null), [])
  const prevLB  = useCallback(() => setLightbox(i => (i - 1 + PHOTOS.length) % PHOTOS.length), [])
  const nextLB  = useCallback(() => setLightbox(i => (i + 1) % PHOTOS.length), [])

  // Unified keyboard handler
  useEffect(() => {
    const fn = e => {
      if (lightbox !== null) {
        if (e.key === 'Escape')     closeLB()
        if (e.key === 'ArrowLeft')  prevLB()
        if (e.key === 'ArrowRight') nextLB()
      } else {
        if (e.key === 'ArrowLeft')  goPrev()
        if (e.key === 'ArrowRight') goNext()
      }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [lightbox, closeLB, prevLB, nextLB, goPrev, goNext])

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const onTouchStart = e => { touchX.current = e.touches[0].clientX }
  const onTouchEnd   = e => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 50) dx < 0 ? goNext() : goPrev()
    touchX.current = null
  }

  const arrowBtn = (onClick, label, side) => (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        position: 'absolute', top: '50%', transform: 'translateY(-50%)',
        [side]: '1.5rem', zIndex: 3,
        width: '42px', height: '42px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        cursor: 'pointer', color: 'rgba(255,255,255,0.32)',
        fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(6px)', transition: 'border-color 0.2s, color 0.2s, background 0.2s',
      }}
      onMouseEnter={e => { Object.assign(e.currentTarget.style, { borderColor: 'rgba(255,255,255,0.4)', color: '#fff', background: 'rgba(255,255,255,0.08)' }) }}
      onMouseLeave={e => { Object.assign(e.currentTarget.style, { borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.32)', background: 'rgba(255,255,255,0.04)' }) }}
    >
      {label === 'Previous' ? '←' : '→'}
    </button>
  )

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
      `}</style>

      {/* Film grain */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', backgroundImage: GRAIN_BG, backgroundRepeat: 'repeat', opacity: 0.04, mixBlendMode: 'screen' }} />

      {/* Stage */}
      <div
        style={{ position: 'relative', height: 'calc(100vh - 64px)', background: '#000', overflow: 'hidden' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* ── RippleGrid background ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <RippleGrid
            gridColor="#ffffff"
            opacity={0.1}
            rippleIntensity={0.06}
            gridSize={10}
            gridThickness={20}
            fadeDistance={1.5}
            vignetteStrength={2.5}
            glowIntensity={0.08}
          />
        </div>

        {/* ── Page label ── */}
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            position: 'absolute', top: '1.75rem', left: '2.5rem', zIndex: 3,
            pointerEvents: 'none',
            fontFamily: "'Inter', sans-serif", fontSize: '0.6rem',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.22)',
          }}
        >
          Fun / Photography
        </motion.span>

        {/* ── Counter ── */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            position: 'absolute', top: '1.8rem', right: '2.5rem', zIndex: 3,
            pointerEvents: 'none',
            fontFamily: "'Inter', sans-serif", fontSize: '0.58rem',
            letterSpacing: '0.18em', color: 'rgba(255,255,255,0.15)',
          }}
        >
          {String(idx + 1).padStart(2, '0')} / {String(PHOTOS.length).padStart(2, '0')}
        </motion.span>

        {/* ── Centered content ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '1.8rem',
          padding: '5rem 6rem',
          pointerEvents: 'none',
        }}>
          {/* Photo */}
          <AnimatePresence mode="wait">
            <motion.img
              key={`photo-${idx}`}
              src={photo.image}
              alt={photo.title}
              initial={{ opacity: 0, x: dir * 45, scale: 0.97 }}
              animate={{ opacity: 1, x: 0,        scale: 1    }}
              exit={{    opacity: 0, x: dir * -45, scale: 0.97 }}
              transition={{ duration: 0.52, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                maxHeight: '44vh', maxWidth: '52vw',
                objectFit: 'contain', display: 'block',
                boxShadow: '0 30px 90px rgba(0,0,0,0.75)',
                cursor: 'zoom-in', pointerEvents: 'auto',
              }}
              onClick={() => setLightbox(idx)}
            />
          </AnimatePresence>

          {/* Text block — title + description centred */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${idx}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0  }}
              exit={{    opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center', pointerEvents: 'auto', maxWidth: '480px' }}
            >
              {/* Category tag */}
              <span style={{
                display: 'block',
                fontFamily: "'Inter', sans-serif", fontSize: '0.58rem',
                letterSpacing: '0.26em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.28)', marginBottom: '0.7rem',
              }}>
                {photo.category}
              </span>

              {/* Title — scrambled */}
              <ScrambleText
                key={`t-${idx}`}
                text={photo.title}
                stagger={38}
                hoverRadius={110}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 300, fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.92)',
                  letterSpacing: '0.04em', lineHeight: 1.05,
                  marginBottom: '0.85rem',
                }}
              />

              {/* Description — scrambled */}
              <ScrambleText
                key={`d-${idx}`}
                text={photo.description}
                stagger={10}
                hoverRadius={90}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.76rem', lineHeight: 1.68,
                  color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.01em',
                  marginBottom: '0.55rem',
                }}
              />

              {/* Date */}
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.57rem', letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.18)',
              }}>
                {photo.date}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Navigation arrows ── */}
        {arrowBtn(goPrev, 'Previous', 'left')}
        {arrowBtn(goNext, 'Next',     'right')}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={closeLB}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(4,4,4,0.97)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.75rem', fontSize: '0.66rem', color: 'rgba(255,255,255,0.25)', fontFamily: "'Inter', sans-serif", letterSpacing: '0.14em', userSelect: 'none' }}>
              {lightbox + 1} / {PHOTOS.length}
            </div>
            <button onClick={closeLB} style={{ position: 'absolute', top: '1.25rem', left: '1.75rem', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.38)', fontSize: '0.7rem', fontFamily: "'Inter', sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase' }}>Close</button>

            <AnimatePresence mode="wait">
              <motion.img
                key={lightbox}
                src={PHOTOS[lightbox].image}
                alt={PHOTOS[lightbox].title}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1    }}
                exit={{    opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22 }}
                onClick={e => e.stopPropagation()}
                style={{ maxHeight: '84vh', maxWidth: '88vw', objectFit: 'contain', userSelect: 'none' }}
              />
            </AnimatePresence>

            <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.26)', fontFamily: "'Inter', sans-serif", marginBottom: '0.3rem' }}>{PHOTOS[lightbox].category}</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '1rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.06em' }}>{PHOTOS[lightbox].description}</p>
            </div>

            <button onClick={e => { e.stopPropagation(); prevLB() }} aria-label="Previous" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.32)', fontSize: '1.4rem', padding: '0.75rem', transition: 'color 0.2s' }} onMouseEnter={e=>e.currentTarget.style.color='#fff'} onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.32)'}>←</button>
            <button onClick={e => { e.stopPropagation(); nextLB() }} aria-label="Next"     style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.32)', fontSize: '1.4rem', padding: '0.75rem', transition: 'color 0.2s' }} onMouseEnter={e=>e.currentTarget.style.color='#fff'} onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.32)'}>→</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
