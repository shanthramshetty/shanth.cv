import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Data ──────────────────────────────────────────────────────────────────────
const PHOTOS = [
  { id:1,  src:'https://picsum.photos/seed/p01/600/800', cat:'Street',       title:'Monsoon Street',  date:'Aug 2024' },
  { id:2,  src:'https://picsum.photos/seed/p02/600/800', cat:'Nature',        title:'Western Ghats',   date:'Jun 2024' },
  { id:3,  src:'https://picsum.photos/seed/p03/600/800', cat:'Portrait',      title:'Candid Light',    date:'Mar 2024' },
  { id:4,  src:'https://picsum.photos/seed/p04/600/800', cat:'Street',        title:'Old City',        date:'Jan 2024' },
  { id:5,  src:'https://picsum.photos/seed/p05/600/800', cat:'Landscape',     title:'Golden Hour',     date:'Nov 2023' },
  { id:6,  src:'https://picsum.photos/seed/p06/600/800', cat:'Portrait',      title:'Shadow Play',     date:'Sep 2023' },
  { id:7,  src:'https://picsum.photos/seed/p07/600/800', cat:'Architecture',  title:'Geometry',        date:'Jul 2023' },
  { id:8,  src:'https://picsum.photos/seed/p08/600/800', cat:'Street',        title:'Night Walk',      date:'May 2023' },
  { id:9,  src:'https://picsum.photos/seed/p09/600/800', cat:'Nature',        title:'After Rain',      date:'Apr 2023' },
  { id:10, src:'https://picsum.photos/seed/p10/600/800', cat:'Portrait',      title:'Still',           date:'Feb 2023' },
  { id:11, src:'https://picsum.photos/seed/p11/600/800', cat:'Architecture',  title:'Symmetry',        date:'Dec 2022' },
  { id:12, src:'https://picsum.photos/seed/p12/600/800', cat:'Nature',        title:'Solitude',        date:'Oct 2022' },
]

const DESIGNS = [
  { id:1, title:'Banking App Redesign',     tags:['Mobile','Fintech'],    bg:'linear-gradient(150deg,#060d1a 0%,#0d1e30 100%)', accent:'#3db5ff', desc:'Reducing cognitive load in a digital banking experience.' },
  { id:2, title:'E-Commerce Checkout Flow', tags:['Web','Commerce'],      bg:'linear-gradient(150deg,#060d0a 0%,#0d2216 100%)', accent:'#3dffaa', desc:'Frictionless checkout that cut drop-off by 28%.' },
  { id:3, title:'Design System Library',    tags:['System','Components'], bg:'linear-gradient(150deg,#0d0614 0%,#1a0d28 100%)', accent:'#9b6dff', desc:'A scalable token-based system for a product team of 12.' },
  { id:4, title:'Analytics Dashboard',      tags:['Data','UI'],           bg:'linear-gradient(150deg,#140a04 0%,#261608 100%)', accent:'#ff9d3d', desc:'Complex data made legible through visual hierarchy.' },
  { id:5, title:'Onboarding Experience',    tags:['Mobile','UX'],         bg:'linear-gradient(150deg,#06100a 0%,#0d2018 100%)', accent:'#a8ff3d', desc:'A warm, progressive onboarding for a wellness app.' },
]

const ANIM_DEMOS = [
  { id:1, title:'Button Ripple',   desc:'Click to trigger the ripple effect.',      tag:'Micro-interaction' },
  { id:2, title:'Spring Toggle',   desc:'Physics-based toggle with overshoot.',     tag:'Input' },
  { id:3, title:'Dot Loader',      desc:'Looping staggered bounce animation.',      tag:'Loading state' },
  { id:4, title:'Card Flip',       desc:'Click to reveal the reverse face.',        tag:'Transition' },
]

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`
const EASE  = [0.16, 1, 0.3, 1]
const VP    = { once: true, amount: 0.1 }

// ─── SectionTitle — word-by-word stack reveal ──────────────────────────────────
function SectionTitle({ number, title }) {
  const words = title.split(' ')
  return (
    <div style={{ marginBottom:'3.5rem' }}>
      <motion.span
        initial={{ opacity:0, y:6 }} whileInView={{ opacity:1, y:0 }} viewport={VP}
        transition={{ duration:0.5 }}
        style={{ display:'block', fontFamily:"'Inter',sans-serif", fontSize:'0.54rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(255,255,255,0.28)', marginBottom:'0.7rem' }}
      >
        {number}
      </motion.span>
      <div style={{ display:'flex', flexWrap:'wrap', gap:'0 0.28em', overflow:'hidden', paddingBottom:'0.05em' }}>
        {words.map((word, i) => (
          <span key={i} style={{ display:'inline-block', overflow:'hidden', lineHeight:1.15 }}>
            <motion.span
              initial={{ y:'105%', opacity:0 }}
              whileInView={{ y:'0%', opacity:1 }}
              viewport={VP}
              transition={{ duration:0.62, delay:0.08 + i*0.1, ease:EASE }}
              style={{ display:'inline-block', fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontWeight:300, fontSize:'clamp(2.2rem,4vw,3.2rem)', color:'rgba(255,255,255,0.9)', letterSpacing:'-0.01em' }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </div>
      <motion.div
        initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={VP}
        transition={{ duration:0.7, delay:0.08 + words.length*0.1, ease:EASE }}
        style={{ height:1, background:'rgba(255,255,255,0.1)', transformOrigin:'left', marginTop:'1.1rem' }}
      />
    </div>
  )
}

// ─── Photography ───────────────────────────────────────────────────────────────
function PhotoCard({ photo, delay, onClick }) {
  const containerRef = useRef(null)
  const [pan,  setPan]  = useState({ x:0, y:0 })
  const [over, setOver] = useState(false)

  const onMouseMove = useCallback(e => {
    if (!containerRef.current) return
    const r = containerRef.current.getBoundingClientRect()
    setPan({ x: ((e.clientX-r.left)/r.width  - 0.5) * 14,
             y: ((e.clientY-r.top) /r.height - 0.5) * 10 })
  }, [])

  const onMouseLeave = useCallback(() => { setPan({ x:0, y:0 }); setOver(false) }, [])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }} viewport={VP}
      transition={{ duration:0.65, delay, ease:EASE }}
      style={{ aspectRatio:'3/4', overflow:'hidden', borderRadius:8, cursor:'zoom-in', position:'relative' }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {/* Parallax image layer */}
      <motion.div
        animate={{ x:pan.x, y:pan.y, scale:over ? 1.09 : 1 }}
        transition={{ type:'spring', stiffness:160, damping:22, mass:0.6 }}
        style={{ position:'absolute', inset:0 }}
      >
        <img
          src={photo.src} alt={photo.title} loading="lazy" draggable={false}
          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
        />
      </motion.div>

      {/* Hover info overlay */}
      <motion.div
        animate={{ opacity:over ? 1 : 0 }}
        transition={{ duration:0.22 }}
        style={{
          position:'absolute', inset:0, pointerEvents:'none',
          background:'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
          display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'0.8rem',
        }}
      >
        <span style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.46rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.42)', marginBottom:'0.15rem', display:'block' }}>
          {photo.cat} · {photo.date}
        </span>
        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'0.92rem', color:'rgba(255,255,255,0.9)', fontWeight:300, lineHeight:1.2 }}>
          {photo.title}
        </span>
      </motion.div>
    </motion.div>
  )
}

// ─── Design Stack ──────────────────────────────────────────────────────────────
function DesignMockup({ design }) {
  const { id, accent } = design
  const a = accent

  if (id === 1) return ( // Banking
    <div style={{ padding:'12px 14px' }}>
      <div style={{ background:`${a}16`, borderRadius:8, padding:'10px 12px', marginBottom:10 }}>
        <div style={{ width:'38%', height:4, background:'rgba(255,255,255,0.13)', borderRadius:2, marginBottom:6 }} />
        <div style={{ width:'60%', height:11, background:`${a}55`, borderRadius:2 }} />
      </div>
      {[[70,40],[55,35],[80,45]].map(([w1,w2],i) => (
        <div key={i} style={{ display:'flex', gap:8, alignItems:'center', marginBottom:7 }}>
          <div style={{ width:22, height:22, borderRadius:'50%', background:'rgba(255,255,255,0.06)', flexShrink:0 }} />
          <div style={{ flex:1 }}>
            <div style={{ height:4, background:'rgba(255,255,255,0.14)', borderRadius:2, marginBottom:3, width:`${w1}%` }} />
            <div style={{ height:3, background:'rgba(255,255,255,0.07)', borderRadius:2, width:`${w2}%` }} />
          </div>
          <div style={{ height:5, width:28, background:`${a}30`, borderRadius:2 }} />
        </div>
      ))}
    </div>
  )

  if (id === 2) return ( // E-commerce
    <div style={{ display:'flex', gap:12, padding:'12px 14px', height:'100%' }}>
      <div style={{ width:'42%', background:`${a}12`, borderRadius:8, flexShrink:0 }} />
      <div style={{ flex:1, paddingTop:4 }}>
        <div style={{ height:6, background:`${a}50`, borderRadius:2, marginBottom:5, width:'90%' }} />
        <div style={{ height:4, background:'rgba(255,255,255,0.1)', borderRadius:2, marginBottom:3 }} />
        <div style={{ height:4, background:'rgba(255,255,255,0.1)', borderRadius:2, marginBottom:3, width:'75%' }} />
        <div style={{ height:4, background:'rgba(255,255,255,0.07)', borderRadius:2, marginBottom:12, width:'55%' }} />
        <div style={{ height:18, background:`${a}35`, borderRadius:6, width:'85%' }} />
      </div>
    </div>
  )

  if (id === 3) return ( // Design System
    <div style={{ padding:'12px 14px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:5, marginBottom:10 }}>
        {[1,0.75,0.55,0.35,0.18, 0.9,0.65,0.45,0.28,0.12].map((o,i) => (
          <div key={i} style={{ height:20, borderRadius:4, background:`${a}`, opacity:o }} />
        ))}
      </div>
      <div style={{ display:'flex', gap:6 }}>
        {[40,28,20,14,10].map((s,i) => (
          <div key={i} style={{ flex:1, height:s, background:'rgba(255,255,255,0.12)', borderRadius:2, alignSelf:'flex-end' }} />
        ))}
      </div>
    </div>
  )

  if (id === 4) return ( // Dashboard
    <div style={{ padding:'10px 14px' }}>
      <div style={{ display:'flex', gap:8, marginBottom:10 }}>
        {[1,0,0].map((hi,i) => (
          <div key={i} style={{ flex:1, height:30, background:hi ? `${a}20` : 'rgba(255,255,255,0.04)', borderRadius:6, border:`1px solid ${hi ? a+'35' : 'rgba(255,255,255,0.05)'}` }} />
        ))}
      </div>
      <div style={{ display:'flex', gap:5, alignItems:'flex-end', height:58 }}>
        {[38,62,48,88,42,74,58].map((h,i) => (
          <div key={i} style={{ flex:1, height:`${h}%`, background:i===3 ? a : `${a}38`, borderRadius:'3px 3px 0 0' }} />
        ))}
      </div>
    </div>
  )

  // id === 5  Onboarding
  return (
    <div style={{ padding:'12px 14px', display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
      <div style={{ display:'flex', gap:7 }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ width:i===1?22:8, height:8, borderRadius:4, background:i===1 ? a : 'rgba(255,255,255,0.14)' }} />
        ))}
      </div>
      <div style={{ width:62, height:62, borderRadius:14, background:`${a}14`, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:26, height:26, borderRadius:'50%', background:`${a}50` }} />
      </div>
      <div style={{ height:4, background:'rgba(255,255,255,0.08)', borderRadius:2, width:'90%' }} />
      <div style={{ height:4, background:'rgba(255,255,255,0.08)', borderRadius:2, width:'70%' }} />
      <div style={{ height:18, width:'72%', borderRadius:20, background:`${a}30` }} />
    </div>
  )
}

function DesignCard({ design, index, total, hoveredIdx, onEnter, onLeave }) {
  const isHovered = hoveredIdx === index
  const anyHovered = hoveredIdx !== null
  const isOther = anyHovered && !isHovered

  return (
    <motion.div
      initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={VP}
      transition={{ duration:0.6, delay:index*0.08, ease:EASE }}
      animate={{
        y:   isHovered ? -20 : 0,
        scale: isHovered ? 1.025 : isOther ? 0.985 : 1,
        filter: isOther ? 'brightness(0.72)' : 'brightness(1)',
      }}
      style={{
        marginTop: index === 0 ? 0 : -28,
        position:'relative',
        zIndex: isHovered ? 100 : total - index,
        cursor:'pointer',
        willChange:'transform',
      }}
      transition={{ type:'spring', stiffness:300, damping:32 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <motion.div
        animate={{ boxShadow: isHovered ? '0 28px 70px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.1)' : '0 6px 22px rgba(0,0,0,0.55)' }}
        transition={{ duration:0.3 }}
        style={{ background:design.bg, borderRadius:12, border:'1px solid rgba(255,255,255,0.07)', overflow:'hidden' }}
      >
        {/* Mock UI preview */}
        <div style={{ height:175, overflow:'hidden', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
          <DesignMockup design={design} />
        </div>

        {/* Card info */}
        <div style={{ padding:'1rem 1.25rem 1.1rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'0.75rem', marginBottom:'0.35rem' }}>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.12rem', color:'rgba(255,255,255,0.88)', fontWeight:300, lineHeight:1.2, margin:0 }}>
              {design.title}
            </p>
            <div style={{ display:'flex', gap:5, flexShrink:0, flexWrap:'wrap', justifyContent:'flex-end' }}>
              {design.tags.map(t => (
                <span key={t} style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.44rem', letterSpacing:'0.16em', textTransform:'uppercase', color:design.accent, border:`1px solid ${design.accent}45`, borderRadius:20, padding:'0.1rem 0.42rem', whiteSpace:'nowrap' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.64rem', color:'rgba(255,255,255,0.3)', lineHeight:1.6, margin:0 }}>
            {design.desc}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function DesignStack() {
  const [hoveredIdx, setHoveredIdx] = useState(null)
  return (
    <div style={{ maxWidth:680, margin:'0 auto' }}>
      {DESIGNS.map((d, i) => (
        <DesignCard
          key={d.id} design={d} index={i} total={DESIGNS.length}
          hoveredIdx={hoveredIdx}
          onEnter={() => setHoveredIdx(i)}
          onLeave={() => setHoveredIdx(null)}
        />
      ))}
    </div>
  )
}

// ─── Animation Demos ───────────────────────────────────────────────────────────
function RippleButton() {
  const [ripples, setRipples] = useState([])
  const fire = e => {
    const r = e.currentTarget.getBoundingClientRect()
    const id = Date.now()
    setRipples(prev => [...prev, { id, x: e.clientX-r.left, y: e.clientY-r.top }])
    setTimeout(() => setRipples(prev => prev.filter(rp => rp.id !== id)), 750)
  }
  return (
    <button
      onClick={fire}
      style={{ position:'relative', overflow:'hidden', padding:'11px 28px', background:'rgba(61,181,255,0.1)', border:'1px solid rgba(61,181,255,0.35)', borderRadius:8, color:'#3db5ff', cursor:'pointer', fontFamily:"'Inter',sans-serif", fontSize:'0.76rem', letterSpacing:'0.08em', userSelect:'none' }}
    >
      Click me
      {ripples.map(rp => (
        <motion.span
          key={rp.id}
          initial={{ scale:0, opacity:0.55 }}
          animate={{ scale:5, opacity:0 }}
          transition={{ duration:0.68, ease:'easeOut' }}
          style={{ position:'absolute', left:rp.x-18, top:rp.y-18, width:36, height:36, borderRadius:'50%', background:'#3db5ff', pointerEvents:'none' }}
        />
      ))}
    </button>
  )
}

function ToggleDemo() {
  const [on, setOn] = useState(false)
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'0.9rem' }}>
      <span style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.7rem', color: on ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.55)', transition:'color 0.3s' }}>Off</span>
      <motion.button
        onClick={() => setOn(!on)}
        animate={{ background: on ? '#3dffaa' : 'rgba(255,255,255,0.1)' }}
        transition={{ duration:0.28 }}
        style={{ width:52, height:28, borderRadius:14, border:'none', cursor:'pointer', position:'relative', flexShrink:0, padding:0 }}
      >
        <motion.div
          animate={{ x: on ? 26 : 3 }}
          transition={{ type:'spring', stiffness:420, damping:30 }}
          style={{ position:'absolute', top:3, left:0, width:22, height:22, borderRadius:'50%', background:'#fff', boxShadow:'0 1px 4px rgba(0,0,0,0.3)' }}
        />
      </motion.button>
      <span style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.7rem', color: on ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.28)', transition:'color 0.3s' }}>On</span>
    </div>
  )
}

function DotLoader() {
  return (
    <div style={{ display:'flex', gap:10, alignItems:'center' }}>
      {[0,1,2].map(i => (
        <motion.div
          key={i}
          animate={{ y:[0,-16,0], scale:[1,0.82,1] }}
          transition={{ duration:0.75, delay:i*0.16, repeat:Infinity, ease:'easeInOut' }}
          style={{ width:13, height:13, borderRadius:'50%', background:'#9b6dff' }}
        />
      ))}
    </div>
  )
}

function CardFlip() {
  const [flipped, setFlipped] = useState(false)
  return (
    <div
      onClick={() => setFlipped(!flipped)}
      style={{ perspective:700, cursor:'pointer', userSelect:'none' }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration:0.5, ease:EASE }}
        style={{ width:90, height:68, position:'relative', transformStyle:'preserve-3d' }}
      >
        <div style={{ position:'absolute', inset:0, borderRadius:9, background:'linear-gradient(135deg,#1a1a2e,#2e2e50)', border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', backfaceVisibility:'hidden' }}>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'0.88rem', color:'rgba(255,255,255,0.55)', fontWeight:300 }}>Front</span>
        </div>
        <div style={{ position:'absolute', inset:0, borderRadius:9, background:'linear-gradient(135deg,#1a0d28,#2a1440)', border:'1px solid rgba(155,109,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center', backfaceVisibility:'hidden', transform:'rotateY(180deg)' }}>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'0.88rem', color:'#9b6dff', fontWeight:300 }}>Back</span>
        </div>
      </motion.div>
      <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.48rem', letterSpacing:'0.16em', textTransform:'uppercase', color:'rgba(255,255,255,0.22)', textAlign:'center', marginTop:'0.5rem' }}>tap to flip</p>
    </div>
  )
}

const DEMO_COMPONENTS = [RippleButton, ToggleDemo, DotLoader, CardFlip]

function AnimCard({ demo, index }) {
  const DemoComp = DEMO_COMPONENTS[demo.id - 1]
  return (
    <motion.div
      initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={VP}
      transition={{ duration:0.62, delay:index*0.1, ease:EASE }}
      style={{ background:'#0f0f0f', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, overflow:'hidden' }}
    >
      {/* Live demo area */}
      <div style={{ height:160, display:'flex', alignItems:'center', justifyContent:'center', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
        <DemoComp />
      </div>
      {/* Info */}
      <div style={{ padding:'0.95rem 1.15rem' }}>
        <span style={{ display:'block', fontFamily:"'Inter',sans-serif", fontSize:'0.46rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.22)', marginBottom:'0.28rem' }}>
          {demo.tag}
        </span>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontSize:'1.05rem', color:'rgba(255,255,255,0.85)', fontWeight:300, margin:'0 0 0.22rem' }}>
          {demo.title}
        </p>
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.62rem', color:'rgba(255,255,255,0.28)', lineHeight:1.55, margin:0 }}>
          {demo.desc}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Fun page ──────────────────────────────────────────────────────────────────
export default function Fun() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&display=swap');
      `}</style>

      {/* Grain */}
      <div aria-hidden style={{ position:'fixed', inset:0, zIndex:1, pointerEvents:'none', backgroundImage:GRAIN, backgroundRepeat:'repeat', opacity:0.04, mixBlendMode:'screen' }} />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{ position:'relative', minHeight:'100vh', background:'#000', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', paddingTop:'64px', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 65% 55% at 50% 42%, rgba(100,60,255,0.07) 0%, transparent 65%)' }} />
        <motion.div
          animate={{ scale:[1,1.18,1], opacity:[0.6,1,0.6] }}
          transition={{ duration:9, repeat:Infinity, ease:'easeInOut' }}
          style={{ position:'absolute', top:'15%', left:'12%', width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle,rgba(80,50,220,0.1) 0%,transparent 70%)', pointerEvents:'none' }}
        />
        <motion.div
          animate={{ scale:[1,1.22,1], opacity:[0.5,0.85,0.5] }}
          transition={{ duration:11, repeat:Infinity, ease:'easeInOut', delay:3 }}
          style={{ position:'absolute', bottom:'20%', right:'10%', width:240, height:240, borderRadius:'50%', background:'radial-gradient(circle,rgba(50,150,255,0.08) 0%,transparent 70%)', pointerEvents:'none' }}
        />

        <motion.span
          initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4, duration:0.8 }}
          style={{ position:'absolute', top:'calc(64px + 1.4rem)', left:'2.5rem', fontFamily:"'Inter',sans-serif", fontSize:'0.56rem', letterSpacing:'0.26em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)', zIndex:2 }}
        >
          Fun / Creative Playground
        </motion.span>
        <motion.span
          initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5, duration:0.8 }}
          style={{ position:'absolute', top:'calc(64px + 1.4rem)', right:'2.5rem', fontFamily:"'Inter',sans-serif", fontSize:'0.56rem', letterSpacing:'0.22em', color:'rgba(255,255,255,0.14)', zIndex:2 }}
        >
          2022 — 2024
        </motion.span>

        <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'0 2rem', maxWidth:820 }}>
          <motion.p
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7, duration:0.9 }}
            style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.52rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(255,255,255,0.22)', marginBottom:'1.6rem' }}
          >
            Photography · Designs · Animations
          </motion.p>
          <motion.h1
            initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.88, duration:1, ease:EASE }}
            style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontWeight:300, fontSize:'clamp(2.8rem,7vw,5.8rem)', color:'rgba(255,255,255,0.9)', lineHeight:1.06, letterSpacing:'-0.01em', margin:'0 0 2rem' }}
          >
            This is where I explore,<br/>experiment, and<br/>capture moments.
          </motion.h1>
          <motion.p
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.22, duration:0.9 }}
            style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.78rem', color:'rgba(255,255,255,0.26)', letterSpacing:'0.03em', lineHeight:1.75, maxWidth:400, margin:'0 auto' }}
          >
            Photography, design experiments, and motion work — the unstructured side of design.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.7, duration:0.8 }}
          style={{ position:'absolute', bottom:'2.2rem', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.45rem', zIndex:2, pointerEvents:'none' }}
        >
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.46rem', letterSpacing:'0.24em', textTransform:'uppercase', color:'rgba(255,255,255,0.2)' }}>Scroll</p>
          <motion.div
            animate={{ y:[0,8,0] }} transition={{ duration:1.6, repeat:Infinity, ease:'easeInOut' }}
            style={{ width:1, height:28, background:'rgba(255,255,255,0.18)' }}
          />
        </motion.div>
      </section>

      {/* ── PHOTOGRAPHY ──────────────────────────────────────────────────────── */}
      <section style={{ background:'#0a0a0a', padding:'6rem 2.5rem 5rem' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <SectionTitle number="01" title="Photography" />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
            {PHOTOS.map((p, i) => (
              <PhotoCard key={p.id} photo={p} delay={i*0.04} onClick={() => setLightbox(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FUN DESIGNS (STACK) ───────────────────────────────────────────────── */}
      <section style={{ background:'#050505', padding:'5rem 2.5rem 6rem' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <SectionTitle number="02" title="Fun Designs" />
          <DesignStack />
        </div>
      </section>

      {/* ── ANIMATIONS ───────────────────────────────────────────────────────── */}
      <section style={{ background:'#0a0a0a', padding:'5rem 2.5rem 7rem' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <SectionTitle number="03" title="Animations" />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14 }}>
            {ANIM_DEMOS.map((d, i) => <AnimCard key={d.id} demo={d} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── OUTRO ────────────────────────────────────────────────────────────── */}
      <section style={{ background:'#000', padding:'7rem 2.5rem 5rem', textAlign:'center' }}>
        <motion.div
          initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.5 }}
          transition={{ duration:0.9, ease:EASE }}
        >
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic', fontWeight:300, fontSize:'clamp(1.2rem,2.5vw,1.8rem)', color:'rgba(255,255,255,0.3)', letterSpacing:'0.02em', marginBottom:'0.8rem' }}>
            That&rsquo;s a wrap — for now.
          </p>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'0.52rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.14)' }}>
            More experiments loading...
          </p>
        </motion.div>
      </section>

      {/* ── LIGHTBOX ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (() => {
          const lb = PHOTOS[lightbox]
          return (
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              transition={{ duration:0.24 }}
              onClick={() => setLightbox(null)}
              style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(4,4,4,0.97)', display:'flex', alignItems:'center', justifyContent:'center' }}
            >
              <button onClick={() => setLightbox(null)} style={{ position:'absolute', top:'1.25rem', left:'1.75rem', background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.35)', fontSize:'0.62rem', fontFamily:"'Inter',sans-serif", letterSpacing:'0.12em', textTransform:'uppercase' }}>
                Close
              </button>
              <div style={{ position:'absolute', top:'1.35rem', right:'1.75rem', fontSize:'0.56rem', color:'rgba(255,255,255,0.2)', fontFamily:"'Inter',sans-serif", letterSpacing:'0.14em' }}>
                {lightbox+1} / {PHOTOS.length}
              </div>
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightbox} src={lb.src} alt={lb.title}
                  initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.96 }}
                  transition={{ duration:0.2 }}
                  onClick={e => e.stopPropagation()}
                  style={{ maxHeight:'84vh', maxWidth:'88vw', objectFit:'contain', userSelect:'none', borderRadius:6 }}
                />
              </AnimatePresence>
              <div style={{ position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)', textAlign:'center', pointerEvents:'none', whiteSpace:'nowrap' }}>
                <p style={{ fontSize:'0.52rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.22)', fontFamily:"'Inter',sans-serif", marginBottom:'0.25rem' }}>{lb.cat} · {lb.date}</p>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontStyle:'italic', fontSize:'1rem', color:'rgba(255,255,255,0.46)', letterSpacing:'0.04em' }}>{lb.title}</p>
              </div>
              <button onClick={e => { e.stopPropagation(); setLightbox(i => (i-1+PHOTOS.length)%PHOTOS.length) }} style={{ position:'absolute', left:'1.25rem', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.3)', fontSize:'1.4rem', padding:'0.75rem', transition:'color 0.2s' }} onMouseEnter={e=>e.currentTarget.style.color='#fff'} onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.3)'}>←</button>
              <button onClick={e => { e.stopPropagation(); setLightbox(i => (i+1)%PHOTOS.length) }} style={{ position:'absolute', right:'1.25rem', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.3)', fontSize:'1.4rem', padding:'0.75rem', transition:'color 0.2s' }} onMouseEnter={e=>e.currentTarget.style.color='#fff'} onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.3)'}>→</button>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </>
  )
}
