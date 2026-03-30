import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import FlipWords from './FlipWords'

/* ─── SVG Mockup Previews ───────────────────────────────────────── */

function MockupFintech() {
  return (
    <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width="360" height="200" fill="#1a1f2e"/>
      <rect x="0" y="0" width="64" height="200" fill="#141824"/>
      <circle cx="32" cy="24" r="10" fill="#3b82f6" opacity="0.9"/>
      {[50,74,98,122].map((y,i) => <rect key={i} x="14" y={y} width="36" height="6" rx="3" fill="white" opacity={i===0?0.5:0.15}/>)}
      <rect x="76" y="16" width="110" height="52" rx="6" fill="#232b3e"/>
      <rect x="88" y="26" width="48" height="5" rx="2" fill="white" opacity="0.4"/>
      <rect x="88" y="36" width="28" height="14" rx="2" fill="#3b82f6" opacity="0.9"/>
      <rect x="88" y="54" width="40" height="4" rx="2" fill="#22c55e" opacity="0.7"/>
      <rect x="198" y="16" width="110" height="52" rx="6" fill="#232b3e"/>
      <rect x="210" y="26" width="48" height="5" rx="2" fill="white" opacity="0.4"/>
      <rect x="210" y="36" width="28" height="14" rx="2" fill="#a78bfa" opacity="0.9"/>
      <rect x="76" y="80" width="232" height="100" rx="6" fill="#232b3e"/>
      {[0,1,2,3,4,5,6].map(i => {
        const h=[40,55,35,65,48,70,52][i]
        return <rect key={i} x={100+i*28} y={165-h} width="16" height={h} rx="3" fill="#3b82f6" opacity={i===5?1:0.4}/>
      })}
      <polyline points="108,155 136,140 164,158 192,125 220,143 248,115 276,130" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.8"/>
    </svg>
  )
}

function MockupAIDashboard() {
  return (
    <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width="360" height="200" fill="#f8f7f4"/>
      <rect x="0" y="0" width="360" height="36" fill="white"/>
      <rect x="16" y="13" width="60" height="10" rx="3" fill="#111" opacity="0.7"/>
      <circle cx="328" cy="18" r="10" fill="#e5e3de"/>
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={16+i*114} y="50" width="104" height="56" rx="8" fill="white" stroke="#eee" strokeWidth="1"/>
          <rect x={28+i*114} y="62" width="36" height="5" rx="2" fill="#999"/>
          <rect x={28+i*114} y="74" width={[52,44,60][i]} height="14" rx="3" fill={['#111','#3b82f6','#22c55e'][i]} opacity="0.85"/>
        </g>
      ))}
      <rect x="16" y="118" width="220" height="68" rx="8" fill="white" stroke="#eee" strokeWidth="1"/>
      {[0,1,2,3,4,5,6,7].map(i => {
        const h=[28,40,22,50,34,44,38,30][i]
        return <rect key={i} x={30+i*24} y={175-h} width="14" height={h} rx="3" fill="#6366f1" opacity={i===5?1:0.25}/>
      })}
      <rect x="248" y="118" width="96" height="68" rx="8" fill="white" stroke="#eee" strokeWidth="1"/>
    </svg>
  )
}

function MockupMobileApp() {
  return (
    <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width="360" height="200" fill="#fdf4f0"/>
      <rect x="60" y="10" width="88" height="180" rx="16" fill="#1a1a1a"/>
      <rect x="66" y="22" width="76" height="156" rx="10" fill="#fff"/>
      <circle cx="104" cy="50" r="16" fill="#f97316" opacity="0.25"/>
      <circle cx="104" cy="50" r="8" fill="#f97316" opacity="0.8"/>
      <rect x="76" y="74" width="56" height="6" rx="3" fill="#333" opacity="0.5"/>
      {[0,1,2].map(i => <rect key={i} x="76" y={100+i*18} width="56" height="12" rx="6" fill={i===0?"#f97316":"#eee"} opacity={i===0?0.9:1}/>)}
      <rect x="212" y="24" width="88" height="156" rx="16" fill="#1a1a1a"/>
      <rect x="218" y="34" width="76" height="134" rx="10" fill="#fff"/>
      <rect x="228" y="44" width="56" height="28" rx="6" fill="#6366f1" opacity="0.15"/>
      <rect x="234" y="50" width="36" height="6" rx="3" fill="#6366f1" opacity="0.8"/>
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x="228" y={82+i*22} width="56" height="16" rx="4" fill="white" stroke="#eee" strokeWidth="1"/>
          <circle cx="240" cy={90+i*22} r="5" fill={['#f97316','#6366f1','#22c55e','#f59e0b'][i]} opacity="0.8"/>
        </g>
      ))}
    </svg>
  )
}

function MockupDesignSystem() {
  return (
    <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width="360" height="200" fill="#fafaf8"/>
      <rect x="0" y="0" width="360" height="30" fill="white" stroke="#e5e5e5" strokeWidth="1"/>
      <circle cx="20" cy="15" r="6" fill="#111"/>
      {[0,1,2,3,4,5].map(i => {
        const cols=i%3, row=Math.floor(i/3)
        const colors=['#6366f1','#f97316','#22c55e','#f59e0b','#ec4899','#14b8a6']
        return (
          <g key={i}>
            <rect x={16+cols*114} y={44+row*78} width="104" height="64" rx="8" fill="white" stroke="#e8e8e8" strokeWidth="1.5"/>
            <rect x={28+cols*114} y={56+row*78} width="24" height="24" rx="4" fill={colors[i]} opacity="0.15"/>
            <rect x={32+cols*114} y={62+row*78} width="16" height="12" rx="2" fill={colors[i]} opacity="0.7"/>
            <rect x={60+cols*114} y={60+row*78} width={[44,36,50,40,38,46][i]} height="6" rx="2" fill="#333" opacity="0.5"/>
          </g>
        )
      })}
    </svg>
  )
}

function MockupEcommerce() {
  return (
    <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width="360" height="200" fill="#fff"/>
      <rect x="0" y="0" width="360" height="32" fill="white"/>
      <rect x="16" y="11" width="48" height="10" rx="3" fill="#111" opacity="0.7"/>
      <rect x="100" y="11" width="160" height="10" rx="5" fill="#f3f3f3"/>
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={16+i*114} y="66" width="104" height="80" rx="8" fill={['#fef3ec','#eff6ff','#f0fdf4'][i]}/>
          <rect x={28+i*114} y="78" width="80" height="44" rx="4" fill={['#f97316','#6366f1','#22c55e'][i]} opacity="0.15"/>
          <rect x={44+i*114} y="90" width="48" height="8" rx="3" fill={['#f97316','#6366f1','#22c55e'][i]} opacity="0.6"/>
          <rect x={28+i*114} y="130" width="44" height="7" rx="2" fill="#333" opacity="0.5"/>
        </g>
      ))}
      <rect x="16" y="154" width="328" height="36" rx="8" fill="#111"/>
    </svg>
  )
}

function MockupFlutterApp() {
  return (
    <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width="360" height="200" fill="#e8f4fd"/>
      {[0,1].map(p => {
        const x=40+p*160
        return (
          <g key={p}>
            <rect x={x} y="10" width="100" height="180" rx="18" fill="#0ea5e9" opacity={p===0?1:0.7}/>
            <rect x={x+6} y="22" width="88" height="156" rx="12" fill="white"/>
            <rect x={x+12} y="42" width="76" height="44" rx="8" fill={p===0?"#bae6fd":"#e0f2fe"}/>
            <circle cx={x+50} cy={p===0?60:64} r={p===0?14:10} fill="#0ea5e9" opacity="0.5"/>
            <rect x={x+16} y="92" width="60" height="7" rx="3" fill="#0c4a6e" opacity="0.6"/>
            <rect x={x+16} y="116" width="68" height="16" rx="8" fill={p===0?"#0ea5e9":"#e0f2fe"}/>
          </g>
        )
      })}
    </svg>
  )
}

function MockupEventurox() {
  return (
    <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <linearGradient id="evg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.28"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
      </defs>
      {/* Page bg */}
      <rect width="360" height="200" fill="#0c0c0e"/>
      {/* Navbar */}
      <rect width="360" height="30" fill="#141416"/>
      <rect x="14" y="10" width="52" height="10" rx="3" fill="#f59e0b" opacity="0.85"/>
      <rect x="220" y="12" width="26" height="6" rx="2" fill="white" opacity="0.22"/>
      <rect x="254" y="12" width="26" height="6" rx="2" fill="white" opacity="0.22"/>
      <rect x="292" y="9" width="54" height="12" rx="6" fill="#f59e0b" opacity="0.75"/>
      {/* Hero banner */}
      <rect x="10" y="36" width="340" height="66" rx="8" fill="#1a1506"/>
      <rect x="10" y="36" width="340" height="66" rx="8" fill="url(#evg)"/>
      <rect x="22" y="46" width="8" height="8" rx="1.5" fill="#f59e0b" opacity="0.8"/>
      <rect x="36" y="46" width="72" height="8" rx="3" fill="white" opacity="0.72"/>
      <rect x="22" y="60" width="115" height="5" rx="2" fill="white" opacity="0.3"/>
      <rect x="22" y="72" width="46" height="14" rx="7" fill="#f59e0b" opacity="0.88"/>
      <rect x="74" y="74" width="38" height="10" rx="2" fill="white" opacity="0.18"/>
      {/* Event cards */}
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x={10 + i * 118} y="112" width="108" height="78" rx="8" fill="#161616"/>
          <rect x={10 + i * 118} y="112" width="108" height="38" rx="8"
            fill={['#1c1204','#04111c','#0c0418'][i]}/>
          <rect x={10 + i * 118} y="138" width="108" height="12" fill={['#1c1204','#04111c','#0c0418'][i]}/>
          <circle cx={30 + i * 118} cy={126} r={9}
            fill={['#f59e0b','#0ea5e9','#8b5cf6'][i]} opacity="0.32"/>
          <rect x={20 + i * 118} y="156" width="58" height="5" rx="2" fill="white" opacity="0.52"/>
          <rect x={20 + i * 118} y="165" width="40" height="4" rx="2" fill="white" opacity="0.2"/>
          <rect x={86 + i * 118} y="158" width="24" height="14" rx="4"
            fill={['#f59e0b','#0ea5e9','#8b5cf6'][i]} opacity="0.68"/>
        </g>
      ))}
    </svg>
  )
}

const MOCKUP_COMPONENTS = [MockupFintech, MockupAIDashboard, MockupMobileApp, MockupDesignSystem, MockupEcommerce, MockupFlutterApp, MockupEventurox]

/* ─── Project Data ──────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: 0, number: '01',
    title: 'Fintech SaaS Platform',
    category: 'Product Design',
    client: '7EDGE',
    year: '2025',
    role: 'Lead Product Designer',
    tools: 'Figma · FigJam · Notion',
    duration: '4 months',
    tagline: 'Redesigning complex financial workflows for clarity, speed, and scale.',
    problem: 'Finance teams were spending over 40% of their working time navigating a fragmented, outdated interface. Core tasks required six or more steps to complete, data was siloed with no visual hierarchy, and there was no shared design language across product modules — creating daily decision fatigue and an inconsistent experience as the product grew.',
    approach: 'We opened with a week of stakeholder interviews and user shadowing across three internal teams to align on the real problem before touching any pixels. I mapped all existing flows end-to-end, ran a task analysis to surface the highest-friction touchpoints, and rebuilt the information architecture from scratch. The design process ran in parallel with engineering, with weekly critique sessions to pressure-test trade-offs between ideal UX and implementation constraints. A modular component system was established early to ensure visual consistency and reduce handoff friction across all dashboard views.',
    outcome: 'Task completion time reduced by 63%. Internal satisfaction score rose from 2.9 to 4.8 out of 5. The resulting design system was adopted across three product teams, becoming the organisation\'s shared design foundation.',
    metrics: [
      { value: '63%', label: 'Faster task completion' },
      { value: '4.8', label: 'Satisfaction score (out of 5)' },
      { value: '3', label: 'Product teams adopted the system' },
    ],
    accent: '#3b82f6',
  },
  {
    id: 1, number: '02',
    title: 'AI Analytics Dashboard',
    category: 'Product Design · AI',
    client: '7EDGE',
    year: '2025',
    role: 'Product Designer',
    tools: 'Figma · Maze · Miro',
    duration: '3 months',
    tagline: 'Making AI outputs legible, trustworthy, and actionable.',
    problem: 'Users of the AI analytics product were overwhelmed by dense, unexplained data outputs with no narrative structure or progressive disclosure. Trust in the system was critically low — users couldn\'t understand why the AI made certain recommendations, so they ignored them entirely. The product had strong ML infrastructure but a broken human layer.',
    approach: 'Rather than jumping to visual redesign, I started by mapping the specific moments where trust collapsed — using Maze unmoderated tests and async interview recordings. The core insight: users needed to understand confidence, not just conclusions. I introduced a tiered confidence indicator system, contextual tooltips tied to model decisions, and a layered disclosure model that let power users drill down without overwhelming casual users. Data visualisation was rebuilt with narrative hierarchy as the primary goal, not data density.',
    outcome: 'Feature adoption increased by 47% within six weeks of launch. Support tickets related to AI confusion dropped by 38%. Users reported a 2× improvement in perceived understanding of AI recommendations — turning a trust problem into a product differentiator.',
    metrics: [
      { value: '+47%', label: 'Feature adoption increase' },
      { value: '−38%', label: 'Support ticket reduction' },
      { value: '2×', label: 'Improvement in AI trust & comprehension' },
    ],
    accent: '#8b5cf6',
  },
  {
    id: 2, number: '03',
    title: 'Consumer Mobile App',
    category: 'Mobile · Product Design',
    client: 'Freelance',
    year: '2024',
    role: 'Product Designer',
    tools: 'Figma · Principle · Zeplin',
    duration: '6 weeks',
    tagline: 'A consumer app built for habitual, effortless daily use.',
    problem: 'The client was launching a new consumer service with no design foundation and a tight deadline. Early prototypes built before my involvement had a 61% drop-off rate during onboarding — users couldn\'t understand the core value proposition before they abandoned. The product needed a complete rethink, not a polish pass.',
    approach: 'I started with competitive benchmarking and five rapid user interviews to understand where mental models broke down. From there I defined three distinct user personas and designed end-to-end flows for onboarding, core daily actions, and push notification strategies — with a deliberate focus on the first-time experience and habit formation. Each flow went through two rounds of prototype testing before high-fidelity delivery. Full interaction specifications and a Zeplin handoff ensured engineering had zero ambiguity.',
    outcome: 'The app launched with a 4.6 App Store rating. Onboarding completion reached 82%, up from 39% in early testing. The client retained me for two subsequent feature cycles — the clearest signal that the design held up under real-world use.',
    metrics: [
      { value: '4.6', label: 'App Store rating at launch' },
      { value: '82%', label: 'Onboarding completion rate' },
      { value: '2×', label: 'Feature cycles retained' },
    ],
    accent: '#f97316',
  },
  {
    id: 3, number: '04',
    title: 'Enterprise Design System',
    category: 'System Design',
    client: '7EDGE',
    year: '2024',
    role: 'Design System Lead',
    tools: 'Figma · Storybook · Confluence',
    duration: '5 months',
    tagline: 'One source of truth for a multi-product organisation.',
    problem: 'Five product teams were designing and shipping in silos — inconsistent UI patterns, duplicated effort, and no shared vocabulary between design and engineering. Users who moved across products encountered jarring inconsistencies, and designers were spending a significant portion of each sprint rebuilding components that already existed elsewhere.',
    approach: 'I ran a comprehensive UI audit across all five products to inventory what existed, what overlapped, and what contradicted. From there I defined a full token architecture — colour, typography, spacing, elevation, and motion — as the foundation before touching any components. Built a living Figma library of 200+ components with explicit usage guidelines, then mirrored the system in Storybook so engineering had a single documented reference. Adoption was rolled out product-by-product with embedded support to prevent the "we\'ll migrate later" trap.',
    outcome: 'Design-to-dev handoff time reduced by 50%. Cross-team design consistency score reached 94%. Eight designers across five products now work from a single shared library, with zero drift between Figma and production components.',
    metrics: [
      { value: '50%', label: 'Handoff time reduction' },
      { value: '94%', label: 'Cross-team consistency score' },
      { value: '200+', label: 'Components in the library' },
    ],
    accent: '#22c55e',
  },
  {
    id: 4, number: '05',
    title: 'E-Commerce Redesign',
    category: 'Product Redesign · Audit',
    client: 'Freelance',
    year: '2023',
    role: 'Product Designer',
    tools: 'Figma · Hotjar · Maze',
    duration: '8 weeks',
    tagline: 'Turning a leaky checkout funnel into a conversion engine.',
    problem: 'The client\'s e-commerce store had a 78% cart abandonment rate — significantly above the category average. Hotjar session recordings pointed to the same two moments: the address step and the payment stage. Users were hitting cognitive overload and bailing, not because they didn\'t want to buy, but because the product was failing them at the moment of highest intent.',
    approach: 'I began with a full heuristic evaluation and reviewed 120+ hours of session recordings to map exactly where attention fragmented. The diagnosis: too many fields on a single screen, no sense of progress, missing trust signals at the highest-anxiety touchpoints. I redesigned checkout as a linear, single-focus journey — one task per screen — with progress indicators, smart autofill, real-time inline validation, and trust signals placed precisely at the moments users hesitated. Each screen was tested with Maze before finalising.',
    outcome: 'Cart abandonment dropped from 78% to 41%. Revenue per session increased by 29%. Average time-to-checkout reduced by 35% — turning the highest-friction part of the product into a genuine competitive advantage.',
    metrics: [
      { value: '−37pp', label: 'Cart abandonment reduction' },
      { value: '+29%', label: 'Revenue per session increase' },
      { value: '35%', label: 'Faster checkout completion' },
    ],
    accent: '#ec4899',
  },
  {
    id: 5, number: '06',
    title: 'Flutter App — NeST',
    category: 'Mobile · Shipped',
    client: 'NeST Digital',
    year: '2023',
    role: 'Product Designer & Frontend',
    tools: 'Figma · Flutter · Firebase',
    duration: '3 months',
    tagline: 'A cross-platform internal tool that field teams actually use.',
    problem: 'NeST\'s field operations team relied on spreadsheets and WhatsApp to coordinate daily tasks. Information was scattered across channels, critical updates were missed with no accountability mechanism, and supervisors had no real-time visibility into field status. The team needed a real product — not a form repackaged as an app.',
    approach: 'Before opening Figma, I spent two weeks embedded with the field team — riding along on daily routes, observing handoff moments, and documenting the exact information flows that happened informally. I identified three core jobs-to-be-done and designed a minimal, task-first interface around them. Offline-first support was treated as a non-negotiable from day one given field connectivity. I collaborated directly with the Flutter developers throughout — designing within component feasibility constraints rather than handing off aspirational specs they couldn\'t build.',
    outcome: 'Adopted by 120+ field staff within two months. Spreadsheet and WhatsApp dependency eliminated across three departments. Won the internal recognition award for best tooling project of the year.',
    metrics: [
      { value: '120+', label: 'Field staff adopted the app' },
      { value: '3', label: 'Departments went fully digital' },
      { value: '#1', label: 'Internal tooling award' },
    ],
    accent: '#0ea5e9',
  },
  {
    id: 6, number: '07',
    title: 'Eventurox',
    category: 'Full-Stack Product · Live',
    client: 'Personal Project',
    year: '2024',
    role: 'Designer & Developer',
    tools: 'React · Node.js · Figma',
    duration: 'Ongoing',
    url: 'https://www.eventurox.in/',
    tagline: 'A fully live event discovery and booking platform — designed and built end to end.',
    problem: 'Discovering and booking local events was fragmented across Instagram, word of mouth, and outdated listing pages. Independent organisers had no clean, credible channel to reach their audience, and potential attendees had no reliable way to find what was happening nearby — especially for niche communities. The gap was clear, and no one had closed it well.',
    approach: 'I treated this as a real product, not a portfolio piece. Started with user interviews across two sides of the marketplace — event-goers and organisers — to define the minimum viable flows for both. Designed the full product in Figma: IA, user flows, brand identity, and UI system. Then built it end to end — React on the frontend, Node.js on the backend, with a mobile-first responsive layout as the baseline. Shipping decisions were driven by real usage data, not assumptions.',
    outcome: 'Eventurox is live at eventurox.in and actively used. The platform supports event creation, discovery, filtering, and registration. Built solo from zero to production — the clearest evidence I have of owning a product from first principles to final delivery.',
    metrics: [
      { value: '100%', label: 'Designed & built solo' },
      { value: 'Live', label: 'Production deployment' },
      { value: 'End-to-end', label: 'Design + Development' },
    ],
    accent: '#f59e0b',
  },
]

/* ─── Floating Preview (cursor-following stacked cards) ─────────── */

function FloatingPreview({ hoveredProject }) {
  const cursorX = useMotionValue(-500)
  const cursorY = useMotionValue(-500)
  const springX = useSpring(cursorX, { stiffness: 160, damping: 24, mass: 0.6 })
  const springY = useSpring(cursorY, { stiffness: 160, damping: 24, mass: 0.6 })

  useEffect(() => {
    const onMove = (e) => {
      cursorX.set(e.clientX + 32)
      cursorY.set(e.clientY - 100)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [cursorX, cursorY])

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: springX,
        top: springY,
        width: 300,
        height: 200,
        pointerEvents: 'none',
        zIndex: 200,
      }}
    >
      <AnimatePresence mode="wait">
        {hoveredProject && (() => {
          const Mockup = MOCKUP_COMPONENTS[hoveredProject.id]
          return (
            <motion.div
              key={hoveredProject.id}
              initial={{ opacity: 0, scale: 0.88, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: '100%', height: '100%',
                borderRadius: '14px', overflow: 'hidden',
                border: `1px solid ${hoveredProject.accent}33`,
                boxShadow: '0 24px 64px rgba(0,0,0,0.85), 0 4px 16px rgba(0,0,0,0.5)',
                background: '#0f0f11',
                position: 'relative',
              }}
            >
              <Mockup />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '0.6rem 0.85rem',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
              }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.01em' }}>
                  {hoveredProject.title}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.58rem', color: hoveredProject.accent, letterSpacing: '0.06em', marginTop: '1px' }}>
                  {hoveredProject.category}
                </p>
              </div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Work Listing ──────────────────────────────────────────────── */

function ProjectRow({ project, index, onClick, onHover }) {
  const [hovered, setHovered] = useState(false)

  const handleEnter = () => { setHovered(true); onHover(project) }
  const handleLeave = () => { setHovered(false); onHover(null) }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06 + index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        position: 'relative',
        padding: '2.25rem 0',
        cursor: 'pointer',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Accent bar */}
      <motion.div
        animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        initial={{ scaleY: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: '2px', background: project.accent,
          transformOrigin: 'bottom', borderRadius: '0 2px 2px 0',
        }}
      />

      <div style={{ paddingLeft: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.75rem', marginBottom: '0.55rem' }}>
            <span style={{
              fontSize: '0.6rem', letterSpacing: '0.12em',
              fontFamily: "'Inter', sans-serif", fontWeight: 500, flexShrink: 0,
              color: hovered ? project.accent : 'rgba(255,255,255,0.18)',
              transition: 'color 0.3s',
            }}>
              {project.number}
            </span>
            <motion.h2
              animate={{ x: hovered ? 8 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(1.75rem, 3.8vw, 3rem)',
                fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1,
                color: hovered ? '#ffffff' : 'rgba(255,255,255,0.7)',
                transition: 'color 0.3s',
              }}
            >
              {project.title}
            </motion.h2>
          </div>
          <p className="project-row-meta" style={{
            marginLeft: 'calc(1.75rem + 2.25rem)',
            fontSize: '0.75rem', fontFamily: "'Inter', sans-serif", letterSpacing: '0.02em',
            color: hovered ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.25)',
            transition: 'color 0.3s',
          }}>
            {project.category} &nbsp;·&nbsp; {project.client} &nbsp;·&nbsp; {project.year}
          </p>
        </div>

        <motion.div
          animate={{ x: hovered ? 5 : 0, borderColor: hovered ? project.accent : 'rgba(255,255,255,0.1)' }}
          transition={{ duration: 0.35 }}
          style={{
            flexShrink: 0, width: '42px', height: '42px',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke={hovered ? project.accent : 'rgba(255,255,255,0.4)'}
            strokeWidth="2" style={{ transition: 'stroke 0.3s' }}
          >
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}

function WorkListing({ onSelect }) {
  const [hoveredProject, setHoveredProject] = useState(null)

  return (
    <>
      <FloatingPreview hoveredProject={hoveredProject} />

      <motion.div
        key="listing"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -16, transition: { duration: 0.35 } }}
        style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2.5rem) 7rem' }}
      >
        {/* Header */}
        <div className="work-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3.5rem' }}>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.2)', fontFamily: "'Inter', sans-serif",
                fontWeight: 600, marginBottom: '0.75rem',
              }}
            >
              Selected Work
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 'clamp(2.75rem, 6vw, 5rem)',
                color: '#ffffff', lineHeight: 0.95, margin: 0,
              }}
            >
              Case Studies
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                color: 'rgba(255,255,255,0.35)',
                marginTop: '0.4rem', fontWeight: 400,
              }}
            >
              <FlipWords words={["Fintech","AI-led","Mobile","End-to-end"]} color="rgba(255,255,255,0.35)" interval={2800} />
            </motion.p>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            style={{
              fontSize: '0.7rem', color: 'rgba(255,255,255,0.15)',
              fontFamily: "'Inter', sans-serif", letterSpacing: '0.06em',
              paddingBottom: '0.4rem',
            }}
          >
            0{PROJECTS.length} projects
          </motion.span>
        </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />

        {PROJECTS.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={i}
            onClick={() => onSelect(project.id)}
            onHover={setHoveredProject}
          />
        ))}
      </motion.div>
    </>
  )
}

/* ─── Case Study ────────────────────────────────────────────────── */

function Divider() {
  return <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0 2.5rem' }} />
}

function SectionLabel({ text, accent }) {
  return (
    <p style={{
      fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase',
      color: accent, fontWeight: 600, marginBottom: '2rem',
      fontFamily: "'Inter', sans-serif",
    }}>
      {text}
    </p>
  )
}

function NextProjectBanner({ project, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer', padding: '5rem 2.5rem 7rem', maxWidth: '1100px', margin: '0 auto' }}
    >
      <p style={{
        fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.18)', fontWeight: 600, marginBottom: '1.25rem',
        fontFamily: "'Inter', sans-serif",
      }}>
        Next Project
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <motion.h3
          animate={{ x: hovered ? 10 : 0, color: hovered ? '#ffffff' : 'rgba(255,255,255,0.4)' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)',
            fontWeight: 400, letterSpacing: '-0.025em',
          }}
        >
          {project.title}
        </motion.h3>
        <motion.div
          animate={{ x: hovered ? 6 : 0, borderColor: hovered ? project.accent : 'rgba(255,255,255,0.08)' }}
          transition={{ duration: 0.35 }}
          style={{
            flexShrink: 0, width: '48px', height: '48px',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke={hovered ? project.accent : 'rgba(255,255,255,0.3)'}
            strokeWidth="1.75" style={{ transition: 'stroke 0.3s' }}
          >
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </svg>
        </motion.div>
      </div>
    </div>
  )
}

function CaseStudyView({ project, onBack, onNext, nextProject }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [project.id])

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, transition: { duration: 0.3 } }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Back */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 2.5rem 0' }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            color: 'rgba(255,255,255,0.35)', fontFamily: "'Inter', sans-serif",
            fontSize: '0.78rem', letterSpacing: '0.04em', transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M5 12l7 7M5 12l7-7"/>
          </svg>
          All Work
        </button>
      </div>

      {/* Hero */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4.5rem 2.5rem 4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: project.accent, fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            {project.number} / 0{PROJECTS.length}
          </span>
          <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.18)', fontFamily: "'Inter', sans-serif", letterSpacing: '0.06em' }}>
            {project.year}
          </span>
        </div>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          fontWeight: 400, color: '#ffffff',
          letterSpacing: '-0.03em', lineHeight: 0.92, marginBottom: '2.5rem',
        }}>
          {project.title}
        </h1>
        <p style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 'clamp(1.1rem, 2.4vw, 1.65rem)',
          color: 'rgba(255,255,255,0.38)', fontWeight: 400,
          maxWidth: '680px', lineHeight: 1.45, marginBottom: project.url ? '2rem' : 0,
        }}>
          {project.tagline}
        </p>
        {project.url && (
          <a
            href={project.url} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.65rem 1.4rem',
              background: `${project.accent}18`,
              border: `1px solid ${project.accent}55`,
              borderRadius: '6px',
              color: project.accent,
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.78rem', fontWeight: 500,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${project.accent}28`; e.currentTarget.style.borderColor = project.accent }}
            onMouseLeave={e => { e.currentTarget.style.background = `${project.accent}18`; e.currentTarget.style.borderColor = `${project.accent}55` }}
          >
            View Live Site
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        )}
      </div>

      <Divider />

      {/* Overview */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3.5rem 2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2.5rem' }}>
          {[
            { label: 'Role', value: project.role },
            { label: 'Client', value: project.client },
            { label: 'Duration', value: project.duration },
            { label: 'Tools', value: project.tools },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', fontWeight: 600, marginBottom: '0.65rem', fontFamily: "'Inter', sans-serif" }}>{label}</p>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif", lineHeight: 1.55 }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Challenge */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 2.5rem' }}>
        <SectionLabel text="The Challenge" accent={project.accent} />
        <p style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 'clamp(1.35rem, 2.8vw, 2.1rem)',
          color: 'rgba(255,255,255,0.82)', fontWeight: 400,
          lineHeight: 1.5, maxWidth: '820px',
        }}>
          {project.problem}
        </p>
      </div>

      <Divider />

      {/* Approach */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }}>
          <div>
            <SectionLabel text="The Approach" accent={project.accent} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Research', 'Strategy', 'Design', 'Test', 'Deliver'].map((step, i) => (
                <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: i === 0 ? project.accent : 'rgba(255,255,255,0.12)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.75rem', fontFamily: "'Inter', sans-serif", color: i === 0 ? project.accent : 'rgba(255,255,255,0.25)', letterSpacing: '0.04em' }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', fontFamily: "'Inter', sans-serif", lineHeight: 1.9, paddingTop: '0.25rem' }}>
            {project.approach}
          </p>
        </div>
      </div>

      <Divider />

      {/* Outcome */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 2.5rem' }}>
        <SectionLabel text="Outcome" accent={project.accent} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3.5rem' }}>
          {project.metrics.map(({ value, label }) => (
            <div key={label} style={{
              padding: '2.25rem 2rem',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '14px',
              background: 'rgba(255,255,255,0.015)',
            }}>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', color: project.accent, fontWeight: 400, lineHeight: 1, marginBottom: '0.85rem' }}>{value}</p>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}>{label}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.975rem', color: 'rgba(255,255,255,0.45)', fontFamily: "'Inter', sans-serif", lineHeight: 1.9, maxWidth: '640px' }}>
          {project.outcome}
        </p>
      </div>

      <Divider />

      {nextProject && <NextProjectBanner project={nextProject} onClick={onNext} />}
    </motion.div>
  )
}

/* ─── Root ──────────────────────────────────────────────────────── */

export default function Work() {
  const [activeId, setActiveId] = useState(null)

  const active = activeId !== null ? PROJECTS.find(p => p.id === activeId) : null
  const activeIndex = active ? PROJECTS.indexOf(active) : -1
  const next = active ? PROJECTS[(activeIndex + 1) % PROJECTS.length] : null

  const handleSelect = (id) => { window.scrollTo({ top: 0, behavior: 'instant' }); setActiveId(id) }
  const handleBack = () => { window.scrollTo({ top: 0, behavior: 'instant' }); setActiveId(null) }

  return (
    <main style={{ minHeight: '100vh', background: '#0f0f11', paddingTop: '64px' }}>
      <AnimatePresence mode="wait">
        {!active ? (
          <WorkListing key="listing" onSelect={handleSelect} />
        ) : (
          <CaseStudyView
            key={active.id}
            project={active}
            onBack={handleBack}
            onNext={() => handleSelect(next.id)}
            nextProject={next}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
