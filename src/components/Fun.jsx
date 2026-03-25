import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Data ──────────────────────────────────────────────────────────────────────
const PHOTOS = [
  { id:1,  src:'https://picsum.photos/seed/fn01/750/1000', aspect:'3/4',  cat:'Street',       title:'Monsoon Street',  date:'Aug 2024' },
  { id:2,  src:'https://picsum.photos/seed/fn02/1000/700', aspect:'10/7', cat:'Nature',        title:'Western Ghats',   date:'Jun 2024' },
  { id:3,  src:'https://picsum.photos/seed/fn03/800/800',  aspect:'1/1',  cat:'Portrait',      title:'Candid Light',    date:'Mar 2024' },
  { id:4,  src:'https://picsum.photos/seed/fn04/750/1050', aspect:'5/7',  cat:'Street',        title:'Old City',        date:'Jan 2024' },
  { id:5,  src:'https://picsum.photos/seed/fn05/1000/700', aspect:'10/7', cat:'Landscape',     title:'Golden Hour',     date:'Nov 2023' },
  { id:6,  src:'https://picsum.photos/seed/fn06/750/1100', aspect:'3/4',  cat:'Portrait',      title:'Shadow Play',     date:'Sep 2023' },
  { id:7,  src:'https://picsum.photos/seed/fn07/800/800',  aspect:'1/1',  cat:'Architecture',  title:'Geometry',        date:'Jul 2023' },
  { id:8,  src:'https://picsum.photos/seed/fn08/1000/700', aspect:'10/7', cat:'Street',        title:'Night Walk',      date:'May 2023' },
  { id:9,  src:'https://picsum.photos/seed/fn09/750/1000', aspect:'3/4',  cat:'Nature',        title:'After Rain',      date:'Apr 2023' },
  { id:10, src:'https://picsum.photos/seed/fn10/800/800',  aspect:'1/1',  cat:'Portrait',      title:'Still',           date:'Feb 2023' },
  { id:11, src:'https://picsum.photos/seed/fn11/1000/720', aspect:'10/7', cat:'Architecture',  title:'Symmetry',        date:'Dec 2022' },
  { id:12, src:'https://picsum.photos/seed/fn12/750/1000', aspect:'3/4',  cat:'Nature',        title:'Solitude',        date:'Oct 2022' },
]

const QUOTES = [
  { line1:'Designer by profession,', line2:'observer by instinct.', sub:'Always looking for patterns in chaos.' },
  { line1:"I capture moments", line2:"when I'm not designing.", sub:'Every frame is a decision.' },
]

const EXPERIMENTS = [
  { id:1, label:'Typography', title:'Kinetic Type',     desc:'Letters in motion — meaning in flux.',         bg:'linear-gradient(145deg,#0d0d1a 0%,#1c0d30 100%)', accent:'#9b6dff' },
  { id:2, label:'Color',      title:'Gradient Systems', desc:'Color as language, not decoration.',           bg:'linear-gradient(145deg,#051a0d 0%,#0d2e1a 100%)', accent:'#3dffaa' },
  { id:3, label:'Motion',     title:'Spring Physics',   desc:'Friction-free, physics-based interactions.',  bg:'linear-gradient(145deg,#1a0d05 0%,#2e1505 100%)', accent:'#ff7d3d' },
  { id:4, label:'Systems',    title:'Grid Studies',     desc:'Breaking the grid — intentionally.',           bg:'linear-gradient(145deg,#05101a 0%,#0d1e30 100%)', accent:'#3db5ff' },
  { id:5, label:'Interface',  title:'Dark Glass',       desc:'Depth through material and light.',            bg:'linear-gradient(145deg,#111 0%,#222 100%)',       accent:'#ffffff' },
]

const MOTION_ITEMS = [
  { id:1, title:'Particle Field',  desc:'Points reacting to cursor motion and gravity.',  tags:['WebGL','GLSL'] },
  { id:2, title:'Waveform UI',     desc:'Audio-reactive interface visualization.',         tags:['Canvas','FFT'] },
  { id:3, title:'Morph Sequence',  desc:'Shape-morphing with spring interpolation.',       tags:['SVG','Spring'] },
]

// Stable random values for animations (pre-computed at module level)
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  x1: (i * 37 + 11) % 100, y1: (i * 53 + 7)  % 100,
  x2: (i * 61 + 29) % 100, y2: (i * 41 + 17) % 100,
  dur: 4 + (i % 4), delay: (i * 0.32) % 4,
}))
const WAVE_BARS = Array.from({ length: 22 }, (_, i) => ({
  dur: 0.9 + (i % 5) * 0.1, delay: (i * 0.07) % 0.8,
}))

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`

// ─── Shared helpers ────────────────────────────────────────────────────────────
const inView = { once: true, amount: 0.12 }
const ease   = [0.16, 1, 0.3, 1]

function SectionTitle({ number, title }) {
  const words = title.split(' ')
  return (
    <div style={{ marginBottom: '3.5rem' }}>
      {/* Number tag */}
      <motion.span
        initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView}
        transition={{ duration: 0.5 }}
        style={{ display: 'block', fontFamily:"'Inter',sans-serif", fontSize:'0.54rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(255,255,255,0.28)', marginBottom:'0.7rem' }}
      >
        {number}
      </motion.span>

      {/* Big title — word-by-word stack reveal */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.3em', overflow: 'hidden', paddingBottom: '0.06em' }}>
        {words.map((word, i) => (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', lineHeight: 1.15 }}>
            <motion.span
              initial={{ y: '105%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={inView}
              transition={{ duration: 0.62, delay: 0.08 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'inline-block',
                fontFamily: "'Cormorant Garamond',serif",
                fontStyle: 'italic', fontWeight: 300,
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                color: 'rgba(255,255,255,0.9)',
                letterSpacing: '-0.01em',
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </div>

      {/* Rule draws in after text */}
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={inView}
        transition={{ duration: 0.7, delay: 0.08 + words.length * 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: 1, background: 'rgba(255,255,255,0.1)', transformOrigin: 'left', marginTop: '1.1rem' }}
      />
    </div>
  )
}

// ─── PhotoCard ─────────────────────────────────────────────────────────────────
function PhotoCard({ photo, delay, onClick }) {
  const ref     = useRef(null)
  const [tilt,  setTilt]    = useState({ rx:0, ry:0 })
  const [hover, setHover]   = useState(false)

  return (
    <motion.div
      initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={inView}
      transition={{ duration:0.7, delay, ease }}
      style={{ marginBottom:12, breakInside:'avoid', cursor:'zoom-in', perspective:1000 }}
    >
      <motion.div
        ref={ref}
        animate={{ rotateX:tilt.rx, rotateY:tilt.ry, scale:hover ? 1.024 : 1 }}
        transition={{ type:'spring', stiffness:220, damping:24 }}
        style={{ position:'relative', overflow:'hidden', borderRadius:6 }}
        onMouseMove={e => {
          const r = ref.current.getBoundingClientRect()
          setTilt({ rx:((e.clientY-r.top)/r.height-.5)*-8, ry:((e.clientX-r.left)/r.width-.5)*8 })
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setTilt({ rx:0, ry:0 }); setHover(false) }}
        onClick={onClick}
      >
        <img
          src={photo.src} alt={photo.title} draggable={false} loading="lazy"
          style={{ width:'100%', aspectRatio:photo.aspect, objectFit:'cover', display:'block' }}
        />
        <motion.div
          animate={{ opacity: hover ? 1 : 0 }}
          transition={{ duration:0.18 }}
          style={{
            position:'absolute', inset:0, pointerEvents:'none',
            background:'linear-gradient(to top, rgba(0,0,0,0.76) 0%, rgba(0,0,0,0.08) 52%, transparent 100%)',
            display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'0.8rem',
          }}
        >
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.48rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.42)', marginBottom:'0.18rem', display:'block' }}>
            {photo.cat} · {photo.date}
          </span>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'0.95rem', color:'rgba(255,255,255,0.9)', fontWeight:300, lineHeight:1.2 }}>
            {photo.title}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ─── ExperimentVisual ──────────────────────────────────────────────────────────
function ExperimentVisual({ id, accent, hovered }) {
  if (id === 1) return (
    <motion.span
      animate={{ opacity: hovered ? 1 : 0.25, scale: hovered ? 1.08 : 1 }}
      transition={{ duration:0.4 }}
      style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'4.5rem', color:accent, fontWeight:300, userSelect:'none', lineHeight:1 }}
    >
      Aa
    </motion.span>
  )
  if (id === 2) return (
    <motion.div
      animate={{ rotate: hovered ? 360 : 0 }}
      transition={{ duration:3, ease:'linear', repeat: hovered ? Infinity : 0 }}
      style={{ width:72, height:72, borderRadius:'50%', background:`conic-gradient(from 0deg, ${accent}, transparent 60%, ${accent})`, opacity:0.55 }}
    />
  )
  if (id === 3) return (
    <motion.div
      animate={{ y: hovered ? [-18, 18] : 0, scale: hovered ? [1, 0.85, 1] : 1 }}
      transition={{ duration:0.55, repeat: hovered ? Infinity : 0, repeatType:'reverse', ease:[0.36,0,0.66,-0.56] }}
      style={{ width:26, height:26, borderRadius:'50%', background:accent, opacity:0.85 }}
    />
  )
  if (id === 4) return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:9 }}>
      {Array.from({ length:16 }).map((_,i) => (
        <motion.div
          key={i}
          animate={{ opacity: hovered ? [0.15, 1, 0.15] : 0.15, scale: hovered ? [1, 1.5, 1] : 1 }}
          transition={{ duration:1.1, delay:i*0.07, repeat: hovered ? Infinity : 0, ease:'easeInOut' }}
          style={{ width:5, height:5, borderRadius:'50%', background:accent }}
        />
      ))}
    </div>
  )
  // id === 5
  return (
    <div style={{ position:'relative', width:85, height:64 }}>
      {[0,1,2].map(i => (
        <motion.div
          key={i}
          animate={{ y: hovered ? i*-7 : 0, x: hovered ? i*5 : 0, opacity: hovered ? 0.9-i*0.22 : 0.45-i*0.1 }}
          transition={{ duration:0.38, delay:i*0.06 }}
          style={{ position:'absolute', top:i*9, left:i*6, width:78, height:46, borderRadius:6, border:'1px solid rgba(255,255,255,0.18)', background:'rgba(255,255,255,0.03)' }}
        />
      ))}
    </div>
  )
}

// ─── ExperimentCard ────────────────────────────────────────────────────────────
function ExperimentCard({ exp, index }) {
  const ref   = useRef(null)
  const [tilt,  setTilt]  = useState({ rx:0, ry:0 })
  const [hover, setHover] = useState(false)

  return (
    <motion.div
      initial={{ opacity:0, y:36 }} whileInView={{ opacity:1, y:0 }} viewport={inView}
      transition={{ duration:0.65, delay:index*0.1, ease }}
      style={{ flex:'0 0 206px', perspective:900 }}
    >
      <motion.div
        ref={ref}
        animate={{
          rotateX:tilt.rx, rotateY:tilt.ry,
          boxShadow: hover
            ? `0 24px 60px rgba(0,0,0,0.85), 0 0 0 1px ${exp.accent}25`
            : '0 8px 26px rgba(0,0,0,0.55)',
        }}
        transition={{ type:'spring', stiffness:210, damping:26 }}
        style={{ height:288, background:exp.bg, borderRadius:10, border:'1px solid rgba(255,255,255,0.07)', position:'relative', overflow:'hidden', cursor:'pointer' }}
        onMouseMove={e => {
          const r = ref.current.getBoundingClientRect()
          setTilt({ rx:((e.clientY-r.top)/r.height-.5)*-8, ry:((e.clientX-r.left)/r.width-.5)*8 })
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setTilt({ rx:0, ry:0 }); setHover(false) }}
      >
        {/* Glow */}
        <motion.div
          animate={{ opacity: hover ? 0.14 : 0 }}
          transition={{ duration:0.4 }}
          style={{ position:'absolute', top:'-25%', left:'50%', transform:'translateX(-50%)', width:'70%', height:'70%', background:exp.accent, borderRadius:'50%', filter:'blur(44px)', pointerEvents:'none' }}
        />
        {/* Visual */}
        <div style={{ position:'absolute', top:'1.25rem', left:'1.25rem', right:'1.25rem', height:120, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <ExperimentVisual id={exp.id} accent={exp.accent} hovered={hover} />
        </div>
        {/* Text */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'1.2rem' }}>
          <div style={{ width:18, height:2, background:exp.accent, borderRadius:1, marginBottom:'0.55rem' }} />
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.48rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.28)', marginBottom:'0.2rem' }}>{exp.label}</p>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.1rem', color:'rgba(255,255,255,0.88)', fontWeight:300, lineHeight:1.2, marginBottom:'0.28rem' }}>{exp.title}</p>
          <motion.p
            animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 6 }}
            transition={{ duration:0.22 }}
            style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.61rem', color:'rgba(255,255,255,0.38)', lineHeight:1.5 }}
          >
            {exp.desc}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── MotionPreview ─────────────────────────────────────────────────────────────
function MotionPreview({ id }) {
  if (id === 1) return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden' }}>
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          animate={{ x:[`${p.x1}%`,`${p.x2}%`], y:[`${p.y1}%`,`${p.y2}%`], opacity:[0,0.65,0] }}
          transition={{ duration:p.dur, repeat:Infinity, delay:p.delay, ease:'linear' }}
          style={{ position:'absolute', width:2, height:2, borderRadius:'50%', background:'#3db5ff' }}
        />
      ))}
    </div>
  )
  if (id === 2) return (
    <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', padding:'0 1.5rem' }}>
      <div style={{ display:'flex', gap:4, alignItems:'center', height:56, width:'100%', justifyContent:'center' }}>
        {WAVE_BARS.map((b, i) => (
          <motion.div
            key={i}
            animate={{ scaleY:[0.15, 1, 0.15] }}
            transition={{ duration:b.dur, repeat:Infinity, delay:b.delay, ease:'easeInOut' }}
            style={{ flex:'1 1 0', maxWidth:5, height:'100%', background:'rgba(61,255,170,0.55)', borderRadius:2, transformOrigin:'center' }}
          />
        ))}
      </div>
    </div>
  )
  // id === 3
  return (
    <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <motion.div
        animate={{ borderRadius:['50%','30% 70% 70% 30% / 30% 30% 70% 70%','50%','70% 30% 30% 70% / 70% 70% 30% 30%','50%'] }}
        transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
        style={{ width:90, height:90, background:'linear-gradient(135deg,rgba(255,125,61,0.5) 0%,rgba(200,61,220,0.45) 100%)' }}
      />
    </div>
  )
}

// ─── MotionCard ────────────────────────────────────────────────────────────────
function MotionCard({ item, index }) {
  const [hover, setHover] = useState(false)

  return (
    <motion.div
      initial={{ opacity:0, y:36 }} whileInView={{ opacity:1, y:0 }} viewport={inView}
      transition={{ duration:0.7, delay:index*0.14, ease }}
      style={{ flex:'1 1 0', minWidth:0 }}
    >
      <motion.div
        animate={{ scale: hover ? 1.012 : 1 }}
        transition={{ duration:0.32 }}
        style={{ position:'relative', overflow:'hidden', borderRadius:10, aspectRatio:'4/3', background:'#0d0d0d', border:'1px solid rgba(255,255,255,0.07)', cursor:'pointer' }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <MotionPreview id={item.id} />
        <motion.div
          animate={{ opacity: hover ? 1 : 0.75 }}
          transition={{ duration:0.28 }}
          style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.22) 50%, transparent 100%)', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'1.4rem' }}
        >
          <div style={{ display:'flex', gap:'0.35rem', marginBottom:'0.55rem', flexWrap:'wrap' }}>
            {item.tags.map(t => (
              <span key={t} style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.46rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(255,255,255,0.38)', border:'1px solid rgba(255,255,255,0.14)', borderRadius:20, padding:'0.13rem 0.48rem' }}>{t}</span>
            ))}
          </div>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.25rem', color:'rgba(255,255,255,0.88)', fontWeight:300, marginBottom:'0.3rem', lineHeight:1.15 }}>{item.title}</p>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.66rem', color:'rgba(255,255,255,0.36)', lineHeight:1.55 }}>{item.desc}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ─── QuoteBlock ────────────────────────────────────────────────────────────────
function QuoteBlock({ line1, line2, sub }) {
  return (
    <motion.div
      initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true, amount:0.6 }}
      transition={{ duration:1.1, ease:'easeOut' }}
      style={{ padding:'5.5rem 2.5rem', textAlign:'center', maxWidth:680, margin:'0 auto' }}
    >
      <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontWeight:300, fontSize:'clamp(1.7rem,4vw,2.8rem)', color:'rgba(255,255,255,0.82)', lineHeight:1.2, letterSpacing:'-0.01em', marginBottom:'1.1rem' }}>
        &ldquo;{line1}<br/>{line2}&rdquo;
      </p>
      <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.68rem', color:'rgba(255,255,255,0.25)', letterSpacing:'0.08em' }}>
        — {sub}
      </p>
    </motion.div>
  )
}

// ─── Fun page ──────────────────────────────────────────────────────────────────
export default function Fun() {
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    const fn = e => {
      if (lightbox === null) return
      if (e.key === 'Escape')      setLightbox(null)
      if (e.key === 'ArrowLeft')   setLightbox(i => (i-1+PHOTOS.length)%PHOTOS.length)
      if (e.key === 'ArrowRight')  setLightbox(i => (i+1)%PHOTOS.length)
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [lightbox])

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&display=swap');
        .fun-scroll::-webkit-scrollbar { display: none; }
        .fun-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Grain overlay */}
      <div aria-hidden style={{ position:'fixed', inset:0, zIndex:1, pointerEvents:'none', backgroundImage:GRAIN, backgroundRepeat:'repeat', opacity:0.04, mixBlendMode:'screen' }} />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{ position:'relative', minHeight:'100vh', background:'#000', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', overflow:'hidden', paddingTop:'64px' }}>
        {/* Radial ambient */}
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 60% at 50% 44%, rgba(120,80,255,0.06) 0%, transparent 65%)' }} />
        {/* Animated glow orbs */}
        <motion.div
          animate={{ scale:[1,1.15,1], opacity:[0.5,0.8,0.5] }}
          transition={{ duration:8, repeat:Infinity, ease:'easeInOut' }}
          style={{ position:'absolute', top:'18%', left:'15%', width:320, height:320, borderRadius:'50%', background:'radial-gradient(circle, rgba(100,60,255,0.1) 0%, transparent 70%)', pointerEvents:'none' }}
        />
        <motion.div
          animate={{ scale:[1,1.2,1], opacity:[0.4,0.7,0.4] }}
          transition={{ duration:10, repeat:Infinity, ease:'easeInOut', delay:3 }}
          style={{ position:'absolute', bottom:'22%', right:'12%', width:260, height:260, borderRadius:'50%', background:'radial-gradient(circle, rgba(61,181,255,0.08) 0%, transparent 70%)', pointerEvents:'none' }}
        />

        {/* Label row */}
        <motion.span
          initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4, duration:0.8 }}
          style={{ position:'absolute', top:'calc(64px + 1.4rem)', left:'2.5rem', fontFamily:"'Inter',sans-serif", fontSize:'0.58rem', letterSpacing:'0.24em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', zIndex:2 }}
        >
          Fun / Creative Playground
        </motion.span>
        <motion.span
          initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5, duration:0.8 }}
          style={{ position:'absolute', top:'calc(64px + 1.4rem)', right:'2.5rem', fontFamily:"'Inter',sans-serif", fontSize:'0.58rem', letterSpacing:'0.22em', color:'rgba(255,255,255,0.14)', zIndex:2 }}
        >
          2022 — 2024
        </motion.span>

        {/* Hero text */}
        <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'0 2rem', maxWidth:860 }}>
          <motion.p
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.65, duration:0.9 }}
            style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.54rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(255,255,255,0.22)', marginBottom:'1.6rem' }}
          >
            Photography · Motion · Experiments
          </motion.p>
          <motion.h1
            initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.85, duration:1, ease }}
            style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontWeight:300, fontSize:'clamp(2.8rem,7vw,5.8rem)', color:'rgba(255,255,255,0.9)', lineHeight:1.06, letterSpacing:'-0.01em', marginBottom:'2rem' }}
          >
            This is where I explore,<br/>experiment, and<br/>capture moments.
          </motion.h1>
          <motion.p
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2, duration:0.9 }}
            style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.8rem', color:'rgba(255,255,255,0.26)', letterSpacing:'0.03em', lineHeight:1.75, maxWidth:420, margin:'0 auto' }}
          >
            The unstructured side of design — photography, motion&nbsp;experiments,
            and visual explorations that live outside the brief.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.7, duration:0.8 }}
          style={{ position:'absolute', bottom:'2.2rem', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.45rem', zIndex:2, pointerEvents:'none' }}
        >
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.48rem', letterSpacing:'0.24em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)' }}>Scroll</p>
          <motion.div
            animate={{ y:[0,7,0] }}
            transition={{ duration:1.6, repeat:Infinity, ease:'easeInOut' }}
            style={{ width:1, height:26, background:'rgba(255,255,255,0.18)' }}
          />
        </motion.div>
      </section>

      {/* ── PHOTOGRAPHY ──────────────────────────────────────────────────────── */}
      <section style={{ background:'#0a0a0a', padding:'6rem 2.5rem 3rem' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <SectionTitle number="01" title="Photography" />
          <div style={{ columns:3, columnGap:12 }}>
            {PHOTOS.map((p, i) => (
              <PhotoCard key={p.id} photo={p} delay={i * 0.045} onClick={() => setLightbox(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE 1 ─────────────────────────────────────────────────────────── */}
      <div style={{ background:'#0a0a0a' }}>
        <QuoteBlock {...QUOTES[0]} />
      </div>

      {/* ── EXPERIMENTS ─────────────────────────────────────────────────────── */}
      <section style={{ background:'#050505', padding:'4rem 2.5rem 5.5rem' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <SectionTitle number="02" title="Creative Experiments" />
          <div className="fun-scroll" style={{ display:'flex', gap:14, overflowX:'auto', paddingBottom:'0.5rem' }}>
            {EXPERIMENTS.map((exp, i) => <ExperimentCard key={exp.id} exp={exp} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── QUOTE 2 ─────────────────────────────────────────────────────────── */}
      <div style={{ background:'#050505' }}>
        <QuoteBlock {...QUOTES[1]} />
      </div>

      {/* ── MOTION / ANIMATION ──────────────────────────────────────────────── */}
      <section style={{ background:'#0a0a0a', padding:'4rem 2.5rem 6rem' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <SectionTitle number="03" title="Motion & Animation" />
          <div style={{ display:'flex', gap:16 }}>
            {MOTION_ITEMS.map((item, i) => <MotionCard key={item.id} item={item} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── OUTRO ───────────────────────────────────────────────────────────── */}
      <section style={{ background:'#000', padding:'7rem 2.5rem 5rem', textAlign:'center' }}>
        <motion.div
          initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.5 }}
          transition={{ duration:0.9, ease }}
        >
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontWeight:300, fontSize:'clamp(1.2rem,2.5vw,1.85rem)', color:'rgba(255,255,255,0.32)', letterSpacing:'0.02em', marginBottom:'0.8rem' }}>
            That&rsquo;s a wrap — for now.
          </p>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.54rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.14)' }}>
            More experiments loading...
          </p>
        </motion.div>
      </section>

      {/* ── LIGHTBOX ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (() => {
          const lb = PHOTOS[lightbox]
          return (
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              transition={{ duration:0.25 }}
              onClick={() => setLightbox(null)}
              style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(4,4,4,0.97)', display:'flex', alignItems:'center', justifyContent:'center' }}
            >
              <button onClick={() => setLightbox(null)} style={{ position:'absolute', top:'1.25rem', left:'1.75rem', background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.35)', fontSize:'0.64rem', fontFamily:"'Inter',sans-serif", letterSpacing:'0.12em', textTransform:'uppercase' }}>
                Close
              </button>
              <div style={{ position:'absolute', top:'1.4rem', right:'1.75rem', fontSize:'0.58rem', color:'rgba(255,255,255,0.2)', fontFamily:"'Inter',sans-serif", letterSpacing:'0.14em' }}>
                {lightbox+1} / {PHOTOS.length}
              </div>

              <AnimatePresence mode="wait">
                <motion.img
                  key={lightbox}
                  src={lb.src} alt={lb.title}
                  initial={{ opacity:0, scale:0.96 }}
                  animate={{ opacity:1, scale:1 }}
                  exit={{    opacity:0, scale:0.96 }}
                  transition={{ duration:0.22 }}
                  onClick={e => e.stopPropagation()}
                  style={{ maxHeight:'84vh', maxWidth:'88vw', objectFit:'contain', userSelect:'none', borderRadius:4 }}
                />
              </AnimatePresence>

              <div style={{ position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)', textAlign:'center', pointerEvents:'none', whiteSpace:'nowrap' }}>
                <p style={{ fontSize:'0.54rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.22)', fontFamily:"'Inter',sans-serif", marginBottom:'0.28rem' }}>
                  {lb.cat} · {lb.date}
                </p>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontStyle:'italic', fontSize:'1rem', color:'rgba(255,255,255,0.48)', letterSpacing:'0.04em' }}>
                  {lb.title}
                </p>
              </div>

              <button onClick={e => { e.stopPropagation(); setLightbox(i => (i-1+PHOTOS.length)%PHOTOS.length) }} aria-label="Previous"
                style={{ position:'absolute', left:'1.25rem', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.3)', fontSize:'1.4rem', padding:'0.75rem', transition:'color 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.color='#fff'} onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.3)'}>←</button>
              <button onClick={e => { e.stopPropagation(); setLightbox(i => (i+1)%PHOTOS.length) }} aria-label="Next"
                style={{ position:'absolute', right:'1.25rem', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.3)', fontSize:'1.4rem', padding:'0.75rem', transition:'color 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.color='#fff'} onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.3)'}>→</button>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </>
  )
}
