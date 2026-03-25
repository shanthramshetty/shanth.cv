import { motion } from 'framer-motion'
import profileImg from '../assets/profile.jpeg'

/* ─── SVG Mockup Thumbnails ─────────────────────────────────────── */

function MockupFintech() {
  return (
    <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="360" height="200" fill="#1a1f2e"/>
      {/* Sidebar */}
      <rect x="0" y="0" width="64" height="200" fill="#141824"/>
      <circle cx="32" cy="24" r="10" fill="#3b82f6" opacity="0.9"/>
      {[50,74,98,122].map((y,i) => (
        <rect key={i} x="14" y={y} width="36" height="6" rx="3" fill="white" opacity={i===0?0.5:0.15}/>
      ))}
      {/* Main area */}
      <rect x="76" y="16" width="110" height="52" rx="6" fill="#232b3e"/>
      <rect x="88" y="26" width="48" height="5" rx="2" fill="white" opacity="0.4"/>
      <rect x="88" y="36" width="28" height="14" rx="2" fill="#3b82f6" opacity="0.9"/>
      <rect x="88" y="54" width="40" height="4" rx="2" fill="#22c55e" opacity="0.7"/>
      <rect x="198" y="16" width="110" height="52" rx="6" fill="#232b3e"/>
      <rect x="210" y="26" width="48" height="5" rx="2" fill="white" opacity="0.4"/>
      <rect x="210" y="36" width="28" height="14" rx="2" fill="#a78bfa" opacity="0.9"/>
      <rect x="210" y="54" width="40" height="4" rx="2" fill="#f87171" opacity="0.7"/>
      {/* Chart */}
      <rect x="76" y="80" width="232" height="100" rx="6" fill="#232b3e"/>
      <rect x="88" y="90" width="60" height="5" rx="2" fill="white" opacity="0.4"/>
      {[0,1,2,3,4,5,6].map((i) => {
        const heights = [40,55,35,65,48,70,52]
        const h = heights[i]
        return <rect key={i} x={100 + i*28} y={165-h} width="16" height={h} rx="3" fill="#3b82f6" opacity={i===5?1:0.4}/>
      })}
      <polyline points="108,155 136,140 164,158 192,125 220,143 248,115 276,130" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.8"/>
    </svg>
  )
}

function MockupAIDashboard() {
  return (
    <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="360" height="200" fill="#f8f7f4"/>
      {/* Top bar */}
      <rect x="0" y="0" width="360" height="36" fill="white"/>
      <rect x="16" y="13" width="60" height="10" rx="3" fill="#111" opacity="0.7"/>
      <circle cx="328" cy="18" r="10" fill="#e5e3de"/>
      <rect x="220" y="12" width="48" height="12" rx="6" fill="#111" opacity="0.08"/>
      {/* Cards row */}
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={16+i*114} y="50" width="104" height="56" rx="8" fill="white" stroke="#eee" strokeWidth="1"/>
          <rect x={28+i*114} y="62" width="36" height="5" rx="2" fill="#999"/>
          <rect x={28+i*114} y="74" width={[52,44,60][i]} height="14" rx="3" fill={['#111','#3b82f6','#22c55e'][i]} opacity="0.85"/>
          <rect x={28+i*114} y="93" width="30" height="5" rx="2" fill={['#22c55e','#f59e0b','#f87171'][i]} opacity="0.7"/>
        </g>
      ))}
      {/* Chart area */}
      <rect x="16" y="118" width="220" height="68" rx="8" fill="white" stroke="#eee" strokeWidth="1"/>
      <rect x="28" y="128" width="50" height="6" rx="2" fill="#333" opacity="0.5"/>
      {[0,1,2,3,4,5,6,7].map(i => {
        const h = [28,40,22,50,34,44,38,30][i]
        return <rect key={i} x={30+i*24} y={175-h} width="14" height={h} rx="3" fill="#6366f1" opacity={i===5?1:0.25}/>
      })}
      {/* Side panel */}
      <rect x="248" y="118" width="96" height="68" rx="8" fill="white" stroke="#eee" strokeWidth="1"/>
      <rect x="260" y="128" width="40" height="5" rx="2" fill="#999"/>
      {[0,1,2].map(i=>(
        <g key={i}>
          <circle cx="264" cy={148+i*14} r="4" fill={['#6366f1','#22c55e','#f59e0b'][i]} opacity="0.8"/>
          <rect x="274" cy={145+i*14} y={145+i*14} width={[40,32,36][i]} height="5" rx="2" fill="#ccc"/>
        </g>
      ))}
    </svg>
  )
}

function MockupMobileApp() {
  return (
    <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="360" height="200" fill="#fdf4f0"/>
      {/* Phone frame left */}
      <rect x="60" y="10" width="88" height="180" rx="16" fill="#1a1a1a"/>
      <rect x="66" y="22" width="76" height="156" rx="10" fill="#fff"/>
      <rect x="90" y="14" width="28" height="4" rx="2" fill="#333"/>
      {/* Screen content */}
      <rect x="70" y="26" width="68" height="148" rx="8" fill="#f97316" opacity="0.12"/>
      <circle cx="104" cy="50" r="16" fill="#f97316" opacity="0.25"/>
      <circle cx="104" cy="50" r="8" fill="#f97316" opacity="0.8"/>
      <rect x="76" y="74" width="56" height="6" rx="3" fill="#333" opacity="0.5"/>
      <rect x="80" y="85" width="48" height="4" rx="2" fill="#999"/>
      {[0,1,2].map(i=>(
        <rect key={i} x="76" y={100+i*18} width="56" height="12" rx="6" fill={i===0?"#f97316":"#eee"} opacity={i===0?0.9:1}/>
      ))}
      {/* Phone frame right */}
      <rect x="212" y="24" width="88" height="156" rx="16" fill="#1a1a1a"/>
      <rect x="218" y="34" width="76" height="134" rx="10" fill="#fff"/>
      <rect x="242" y="28" width="28" height="4" rx="2" fill="#333"/>
      {/* Screen 2 */}
      <rect x="222" y="38" width="68" height="126" rx="8" fill="#6366f1" opacity="0.08"/>
      <rect x="228" y="44" width="56" height="28" rx="6" fill="#6366f1" opacity="0.15"/>
      <rect x="234" y="50" width="36" height="6" rx="3" fill="#6366f1" opacity="0.8"/>
      <rect x="234" y="60" width="28" height="4" rx="2" fill="#999"/>
      {[0,1,2,3].map(i=>(
        <g key={i}>
          <rect x="228" y={82+i*22} width="56" height="16" rx="4" fill="white" stroke="#eee" strokeWidth="1"/>
          <circle cx="240" cy={90+i*22} r="5" fill={['#f97316','#6366f1','#22c55e','#f59e0b'][i]} opacity="0.8"/>
          <rect x="252" y={87+i*22} width={[28,22,32,26][i]} height="5" rx="2" fill="#ccc"/>
        </g>
      ))}
    </svg>
  )
}

function MockupDesignSystem() {
  return (
    <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="360" height="200" fill="#fafaf8"/>
      {/* Top nav mock */}
      <rect x="0" y="0" width="360" height="30" fill="white" stroke="#e5e5e5" strokeWidth="1"/>
      <circle cx="20" cy="15" r="6" fill="#111"/>
      {['Colors','Typography','Components','Icons'].map((t,i)=>(
        <rect key={i} x={48+i*72} y="10" width={[40,60,72,36][i]} height="10" rx="3" fill={i===2?"#111":"#ddd"} opacity={i===2?0.8:1}/>
      ))}
      {/* Component grid */}
      {[0,1,2,3,4,5].map(i=>{
        const cols = i%3, row = Math.floor(i/3)
        const colors = ['#6366f1','#f97316','#22c55e','#f59e0b','#ec4899','#14b8a6']
        return (
          <g key={i}>
            <rect x={16+cols*114} y={44+row*78} width="104" height="64" rx="8" fill="white" stroke="#e8e8e8" strokeWidth="1.5"/>
            <rect x={28+cols*114} y={56+row*78} width="24" height="24" rx="4" fill={colors[i]} opacity="0.15"/>
            <rect x={32+cols*114} y={62+row*78} width="16" height="12" rx="2" fill={colors[i]} opacity="0.7"/>
            <rect x={60+cols*114} y={60+row*78} width={[44,36,50,40,38,46][i]} height="6" rx="2" fill="#333" opacity="0.5"/>
            <rect x={60+cols*114} y={72+row*78} width={[32,28,36,30,34,28][i]} height="4" rx="2" fill="#bbb"/>
            <rect x={28+cols*114} y={96+row*78} width="80" height="6" rx="3" fill={colors[i]} opacity="0.2"/>
          </g>
        )
      })}
    </svg>
  )
}

function MockupEcommerce() {
  return (
    <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="360" height="200" fill="#fff"/>
      {/* Header */}
      <rect x="0" y="0" width="360" height="32" fill="white"/>
      <rect x="16" y="11" width="48" height="10" rx="3" fill="#111" opacity="0.7"/>
      <rect x="100" y="11" width="160" height="10" rx="5" fill="#f3f3f3"/>
      <rect x="324" y="8" width="20" height="16" rx="4" fill="#111" opacity="0.08"/>
      {/* Category pills */}
      {['All','Fintech','SaaS','Mobile','Branding'].map((t,i)=>(
        <rect key={i} x={16+i*62} y="40" width={[24,42,28,38,50][i]+16} height="16" rx="8" fill={i===0?"#111":"#f3f3f3"}/>
      ))}
      {/* Product grid */}
      {[0,1,2].map(i=>(
        <g key={i}>
          <rect x={16+i*114} y="66" width="104" height="80" rx="8" fill={['#fef3ec','#eff6ff','#f0fdf4'][i]}/>
          <rect x={28+i*114} y="78" width="80" height="44" rx="4" fill={['#f97316','#6366f1','#22c55e'][i]} opacity="0.15"/>
          <rect x={44+i*114} y="90" width="48" height="8" rx="3" fill={['#f97316','#6366f1','#22c55e'][i]} opacity="0.6"/>
          <rect x={44+i*114} y="102" width="36" height="6" rx="2" fill="#ccc"/>
          <rect x={28+i*114} y="130" width="44" height="7" rx="2" fill="#333" opacity="0.5"/>
          <rect x={28+i*114} y="142" width="28" height="6" rx="2" fill="#999"/>
        </g>
      ))}
      {/* Checkout panel */}
      <rect x="16" y="154" width="328" height="36" rx="8" fill="#111"/>
      <rect x="28" y="165" width="60" height="8" rx="3" fill="white" opacity="0.5"/>
      <rect x="268" y="163" width="64" height="12" rx="6" fill="white" opacity="0.9"/>
    </svg>
  )
}

function MockupFlutterApp() {
  return (
    <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="360" height="200" fill="#e8f4fd"/>
      {/* Two phone screens */}
      {[0,1].map(p => {
        const x = 40 + p * 160
        return (
          <g key={p}>
            <rect x={x} y="10" width="100" height="180" rx="18" fill="#0ea5e9" opacity={p===0?1:0.7}/>
            <rect x={x+6} y="22" width="88" height="156" rx="12" fill="white"/>
            <rect x={x+30} y="14" width="32" height="4" rx="2" fill={p===0?"#0284c7":"#38bdf8"}/>
            {/* Status bar */}
            <rect x={x+12} y="30" width="76" height="6" rx="2" fill="#f0f9ff"/>
            {/* Hero img */}
            <rect x={x+12} y="42" width="76" height="44" rx="8" fill={p===0?"#bae6fd":"#e0f2fe"}/>
            <circle cx={x+50} cy={p===0?60:64} r={p===0?14:10} fill={p===0?"#0ea5e9":"#38bdf8"} opacity="0.5"/>
            {/* Text */}
            <rect x={x+16} y="92" width="60" height="7" rx="3" fill="#0c4a6e" opacity="0.6"/>
            <rect x={x+16} y="104" width="46" height="5" rx="2" fill="#7dd3fc" opacity="0.8"/>
            {/* Buttons */}
            <rect x={x+16} y="116" width="68" height="16" rx="8" fill={p===0?"#0ea5e9":"#e0f2fe"}/>
            <rect x={x+16} y="137" width="52" height="8" rx="4" fill="#bae6fd" opacity="0.7"/>
            <rect x={x+16} y="150" width="40" height="8" rx="4" fill="#bae6fd" opacity="0.5"/>
            {/* Bottom nav */}
            <rect x={x+12} y="164" width="76" height="8" rx="4" fill="#f0f9ff"/>
            {[0,1,2,3].map(j=>(
              <circle key={j} cx={x+22+j*18} cy={168} r="3" fill={j===0?"#0ea5e9":"#bae6fd"}/>
            ))}
          </g>
        )
      })}
    </svg>
  )
}

const MOCKUPS = [MockupFintech, MockupAIDashboard, MockupMobileApp, MockupDesignSystem, MockupEcommerce, MockupFlutterApp]

const projects = [
  {
    id: 0,
    title: 'Fintech SaaS Platform',
    badge: 'CASE STUDY',
    company: '7EDGE',
    year: '2025',
    description: 'End-to-end UX for a fintech platform — research, IA, wireframing, and high-fidelity prototypes for complex transaction dashboards.',
  },
  {
    id: 1,
    title: 'AI-Driven Dashboard',
    badge: 'CASE STUDY',
    company: '7EDGE',
    year: '2025',
    description: 'Redesigned IA and user flows for an AI SaaS product. Focused on accessibility, responsiveness, and cross-platform consistency.',
  },
  {
    id: 2,
    title: 'Mobile App UI/UX',
    badge: 'FREELANCE',
    company: 'Freelance',
    year: '2024',
    description: 'Branding and UI/UX for mobile apps across freelance clients. Logos, marketing assets, and user interfaces.',
  },
  {
    id: 3,
    title: 'Design System',
    badge: 'SYSTEM DESIGN',
    company: '7EDGE',
    year: '2024',
    description: 'Built and maintained a reusable design system for visual consistency and dev efficiency across product modules.',
  },
  {
    id: 4,
    title: 'E-Commerce Redesign',
    badge: 'FREELANCE',
    company: 'Freelance',
    year: '2023',
    description: 'Full UX audit and redesign of an e-commerce platform, focusing on checkout flow and conversion optimization.',
  },
  {
    id: 5,
    title: 'Flutter App — NeST',
    badge: 'SHIPPED',
    company: 'NeST Digital',
    year: '2023',
    description: 'Designed and shipped a cross-platform Flutter app with a focus on performance and intuitive navigation patterns.',
  },
]

function ProjectCard({ project, index }) {
  const Mockup = MOCKUPS[project.id]
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.1)' }}
      style={{
        borderRadius: '12px', overflow: 'hidden',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        cursor: 'pointer',
        transition: 'box-shadow 0.25s',
      }}
    >
      {/* Mockup thumbnail */}
      <div style={{ height: '180px', overflow: 'hidden', display: 'block', lineHeight: 0 }}>
        <Mockup />
      </div>

      {/* Info */}
      <div style={{ padding: '1rem 1.1rem 1.2rem' }}>
        <h3 style={{
          fontSize: '0.92rem', fontWeight: 600, color: 'rgba(255,255,255,0.88)',
          marginBottom: '0.35rem', letterSpacing: '-0.01em',
          fontFamily: "'Inter', sans-serif",
        }}>
          {project.title}
        </h3>
        <p style={{
          fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.6,
          marginBottom: '0.8rem', fontFamily: "'Inter', sans-serif",
        }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            padding: '0.14rem 0.6rem', fontSize: '0.62rem', fontWeight: 600,
            letterSpacing: '0.06em', background: 'rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.5)', borderRadius: '100px', fontFamily: "'Inter', sans-serif",
          }}>
            {project.badge}
          </span>
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', fontFamily: "'Inter', sans-serif" }}>
            {project.company} · {project.year}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0b', paddingTop: '68px' }}>

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
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.55 }}
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(1.25rem, 2.8vw, 2rem)',
                color: 'rgba(255,255,255,0.35)', fontWeight: 400,
                letterSpacing: '-0.01em', lineHeight: 1.2,
                marginBottom: '3.5rem',
              }}
            >
              I love crafting clean, meaningful digital experiences
            </motion.p>

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
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
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
              fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8,
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

      {/* Project cards grid */}
      <div id="work" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2.5rem 6rem' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>

    </main>
  )
}
