import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

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

function MockupPlayConnect() {
  return (
    <svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect width="360" height="200" fill="#071a09"/>
      {/* Phone 1 — Discovery */}
      <rect x="18" y="8" width="96" height="184" rx="16" fill="#0f280f"/>
      <rect x="24" y="20" width="84" height="160" rx="10" fill="#081208"/>
      <rect x="30" y="28" width="72" height="13" rx="6" fill="#122112"/>
      <rect x="36" y="32" width="34" height="5" rx="2" fill="#4ade80" opacity="0.45"/>
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x="30" y={50+i*38} width="72" height="32" rx="7" fill="#122112"/>
          <rect x="30" y={50+i*38} width="72" height="15" rx="7" fill={i===0?"#14532d":"#0f2010"} opacity="0.85"/>
          <rect x="36" y={69+i*38} width="34" height="4" rx="2" fill="white" opacity="0.45"/>
          <rect x="74" y={67+i*38} width="22" height="9" rx="4" fill="#22c55e" opacity={i===0?0.95:0.35}/>
        </g>
      ))}
      {/* Phone 2 — Slot Selection */}
      <rect x="132" y="8" width="96" height="184" rx="16" fill="#0f280f"/>
      <rect x="138" y="20" width="84" height="160" rx="10" fill="#081208"/>
      <rect x="138" y="20" width="84" height="42" rx="10" fill="#14532d"/>
      <rect x="144" y="28" width="52" height="7" rx="3" fill="white" opacity="0.72"/>
      <rect x="144" y="40" width="36" height="5" rx="2" fill="#4ade80" opacity="0.55"/>
      {[[0,1],[0,1],[0,1]].map((_, row) =>
        [0,1].map((col) => {
          const taken = (row===0&&col===1)||(row===2&&col===0)
          return <rect key={`${row}${col}`} x={144+col*34} y={72+row*18} width="28" height="12" rx="5"
            fill={taken?"#1a3020":row===1&&col===0?"#22c55e":"#122112"} opacity={taken?0.5:1}/>
        })
      )}
      <rect x="144" y="136" width="72" height="18" rx="9" fill="#22c55e"/>
      <rect x="162" y="141" width="36" height="5" rx="2" fill="#071a09" opacity="0.65"/>
      {/* Phone 3 — Confirmation */}
      <rect x="246" y="8" width="96" height="184" rx="16" fill="#0f280f"/>
      <rect x="252" y="20" width="84" height="160" rx="10" fill="#081208"/>
      <circle cx="294" cy="68" r="20" fill="#22c55e" opacity="0.12"/>
      <circle cx="294" cy="68" r="12" fill="#22c55e" opacity="0.9"/>
      <polyline points="287,68 292,73 301,62" fill="none" stroke="#071a09" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="262" y="98" width="64" height="6" rx="3" fill="white" opacity="0.5"/>
      <rect x="266" y="110" width="56" height="5" rx="2" fill="#4ade80" opacity="0.4"/>
      <rect x="266" y="122" width="48" height="4" rx="2" fill="white" opacity="0.2"/>
      <rect x="266" y="132" width="40" height="4" rx="2" fill="white" opacity="0.18"/>
      <rect x="262" y="152" width="64" height="16" rx="8" fill="#122112" stroke="#22c55e" strokeWidth="1"/>
      <rect x="276" y="157" width="36" height="4" rx="2" fill="#4ade80" opacity="0.6"/>
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

const MOCKUP_COMPONENTS = [MockupFintech, MockupPlayConnect, MockupAIDashboard, MockupDesignSystem, MockupEcommerce, MockupFlutterApp, MockupEventurox]

/* ─── Project Data ──────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: 0, number: '01',
    title: 'FluxPay',
    category: 'Product Design · Fintech',
    client: '7EDGE',
    year: '2025',
    role: 'Lead Product Designer',
    tools: 'Figma · FigJam · Notion',
    duration: '4 months',
    hideFields: ['Role', 'Client'],
    tagline: 'Rebuilding how finance teams see, decide, and act. At enterprise scale.',
    problem: 'Finance teams, operations leads, and administrators at mid-market companies were stitching together three to five disconnected tools to do work that should be fluid: an ERP for records, a separate approval system, spreadsheets for reconciliation, and email for exceptions. Over 40% of working time was lost to navigation and manual cross-referencing, core tasks required six or more steps, and nobody had a unified view of where anything stood. The product had all the data. It just couldn\'t communicate it. The core problem wasn\'t missing features. It was missing clarity, hierarchy, and trust.',
    approach: 'The first week was deliberately screen-free. I ran user shadowing sessions with finance managers, operations leads, and administrators to observe real workflows, not the documented ones, which bore little resemblance to how work actually happened. From those sessions I built a current-state service blueprint mapping every step, handoff, and failure point across the full transaction lifecycle. The blueprint made the dysfunction legible in a way verbal descriptions couldn\'t. I rebuilt the IA around role-based task frequency rather than system modules, restructured the payment and approval flow from six steps to two, and established a component system early, before any high-fidelity screens, so consistency was built in by default. High-stakes actions (bulk approvals, transaction voids) were designed with two-step confirmation, inline validation, and plain-language error states to reduce both errors and anxiety. Every trade-off between ideal design and engineering constraints was documented and resolved in weekly cross-functional critique sessions.',
    outcome: 'FluxPay shipped to internal teams and early enterprise clients with zero critical usability issues in the first month of deployment, a direct result of the validation and confirmation architecture. Task completion time dropped by 63%. Satisfaction scores climbed from 2.9 to 4.8 out of 5. The design system became the shared foundation across three product teams. Finance teams stopped navigating around the product and started relying on it. The difference between a tool people tolerate and one they trust.',
    metrics: [
      { value: '63%', label: 'Task completion time reduced' },
      { value: '4.8', label: 'Satisfaction score (up from 2.9)' },
      { value: '3', label: 'Product teams on one design system' },
    ],
    accent: '#3b82f6',
  },
  {
    id: 1, number: '02',
    title: 'PlayConnect',
    category: 'Mobile App · Flutter',
    client: 'Personal Project',
    year: '2025',
    role: 'Designer & Developer',
    tools: 'Flutter · Figma · Firebase',
    duration: '5 months',
    tagline: 'Designed and built end-to-end. A turf booking platform that eliminates the friction between finding a sports venue and walking onto the pitch.',
    problem: 'Sports and recreational infrastructure is abundant, but booking it is broken. Players looking for turf time face a fragmented reality: venues share availability via WhatsApp groups, manually updated social posts, or not at all. There is no reliable way to know whether a slot is free, what it costs, or whether a booking is confirmed until someone picks up a phone. For turf owners, the problem exists in reverse: no visibility into real-time occupancy, no structured payment flow, and high no-show rates because there is no formal confirmation system. The booking experience was not just inconvenient. It was fundamentally untrustworthy.',
    approach: 'Before designing a single screen, I mapped the full booking lifecycle from both sides of the platform, from player intent to turf owner confirmation, through interviews with players and venue owners. The central finding: the problem was not the number of steps, it was the uncertainty embedded in each one. Players did not know if a slot was genuinely available, what the confirmed price would be, or whether their booking was real. The design solution focused on eliminating ambiguity at every touchpoint: real-time availability states, inline pricing that never changed at checkout, and immediate booking confirmations with clear next steps. Flutter was selected to deliver native-quality performance on iOS and Android from a single codebase, ensuring design decisions were never constrained by platform fragmentation.',
    outcome: 'PlayConnect shipped as a fully functional cross-platform mobile application. The real-time availability system eliminated the primary source of booking abandonment. The guided booking flow, from discovery through confirmation in five steps, reduced the cognitive load that caused drop-off in comparable booking experiences. As a solo end-to-end project, PlayConnect is the clearest demonstration of my ability to own a product from first-principle research through shipped Flutter code, bridging design thinking and engineering execution without losing quality on either side.',
    metrics: [
      { value: '5 steps', label: 'Discovery to confirmed booking' },
      { value: 'Flutter', label: 'Cross-platform — iOS & Android, single codebase' },
      { value: '100%', label: 'Designed & developed solo, end-to-end' },
    ],
    accent: '#22c55e',
  },
  {
    id: 2, number: '03',
    title: 'AI Analytics Dashboard',
    category: 'Product Design · AI',
    client: '7EDGE',
    year: '2025',
    role: 'Product Designer',
    tools: 'Figma · Maze · Miro',
    duration: '3 months',
    tagline: 'Making AI outputs legible, trustworthy, and actionable.',
    problem: 'Users of the AI analytics product were overwhelmed by dense, unexplained data outputs with no narrative structure or progressive disclosure. Trust in the system was critically low. Users couldn\'t understand why the AI made certain recommendations, so they ignored them entirely. The product had strong ML infrastructure but a broken human layer.',
    approach: 'Rather than jumping to visual redesign, I started by mapping the specific moments where trust collapsed, using Maze unmoderated tests and async interview recordings. The core insight: users needed to understand confidence, not just conclusions. I introduced a tiered confidence indicator system, contextual tooltips tied to model decisions, and a layered disclosure model that let power users drill down without overwhelming casual users. Data visualisation was rebuilt with narrative hierarchy as the primary goal, not data density.',
    outcome: 'Feature adoption increased by 47% within six weeks of launch. Support tickets related to AI confusion dropped by 38%. Users reported a 2× improvement in perceived understanding of AI recommendations, turning a trust problem into a product differentiator.',
    metrics: [
      { value: '+47%', label: 'Feature adoption increase' },
      { value: '−38%', label: 'Support ticket reduction' },
      { value: '2×', label: 'Improvement in AI trust & comprehension' },
    ],
    accent: '#8b5cf6',
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
    problem: 'Five product teams were designing and shipping in silos, with inconsistent UI patterns, duplicated effort, and no shared vocabulary between design and engineering. Users who moved across products encountered jarring inconsistencies, and designers were spending a significant portion of each sprint rebuilding components that already existed elsewhere.',
    approach: 'I ran a comprehensive UI audit across all five products to inventory what existed, what overlapped, and what contradicted. From there I defined a full token architecture, covering colour, typography, spacing, elevation, and motion, as the foundation before touching any components. Built a living Figma library of 200+ components with explicit usage guidelines, then mirrored the system in Storybook so engineering had a single documented reference. Adoption was rolled out product-by-product with embedded support to prevent the "we\'ll migrate later" trap.',
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
    problem: 'The client\'s e-commerce store had a 78% cart abandonment rate, significantly above the category average. Hotjar session recordings pointed to the same two moments: the address step and the payment stage. Users were hitting cognitive overload and bailing, not because they didn\'t want to buy, but because the product was failing them at the moment of highest intent.',
    approach: 'I began with a full heuristic evaluation and reviewed 120+ hours of session recordings to map exactly where attention fragmented. The diagnosis: too many fields on a single screen, no sense of progress, missing trust signals at the highest-anxiety touchpoints. I redesigned checkout as a linear, single-focus journey, one task per screen, with progress indicators, smart autofill, real-time inline validation, and trust signals placed precisely at the moments users hesitated. Each screen was tested with Maze before finalising.',
    outcome: 'Cart abandonment dropped from 78% to 41%. Revenue per session increased by 29%. Average time-to-checkout reduced by 35%, turning the highest-friction part of the product into a genuine competitive advantage.',
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
    problem: 'NeST\'s field operations team relied on spreadsheets and WhatsApp to coordinate daily tasks. Information was scattered across channels, critical updates were missed with no accountability mechanism, and supervisors had no real-time visibility into field status. The team needed a real product, not a form repackaged as an app.',
    approach: 'Before opening Figma, I spent two weeks embedded with the field team, riding along on daily routes, observing handoff moments, and documenting the exact information flows that happened informally. I identified three core jobs-to-be-done and designed a minimal, task-first interface around them. Offline-first support was treated as a non-negotiable from day one given field connectivity. I collaborated directly with the Flutter developers throughout, designing within component feasibility constraints rather than handing off aspirational specs they couldn\'t build.',
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
    tagline: 'A fully live event discovery and booking platform, designed and built end to end.',
    problem: 'Discovering and booking local events was fragmented across Instagram, word of mouth, and outdated listing pages. Independent organisers had no clean, credible channel to reach their audience, and potential attendees had no reliable way to find what was happening nearby, especially for niche communities. The gap was clear, and no one had closed it well.',
    approach: 'I treated this as a real product, not a portfolio piece. Started with user interviews across two sides of the marketplace, event-goers and organisers, to define the minimum viable flows for both. Designed the full product in Figma: IA, user flows, brand identity, and UI system. Then built it end to end. React on the frontend, Node.js on the backend, with a mobile-first responsive layout as the baseline. Shipping decisions were driven by real usage data, not assumptions.',
    outcome: 'Eventurox is live at eventurox.in and actively used. The platform supports event creation, discovery, filtering, and registration. Built solo from zero to production, the clearest evidence I have of owning a product from first principles to final delivery.',
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
              Solving complex product problems across fintech and mobile.
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
          ].filter(({ label }) => !(project.hideFields || []).includes(label)).map(({ label, value }) => (
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

/* ─── FluxPay Premium Case Study ────────────────────────────────── */

function FluxPayCaseStudy({ project, onBack, nextProject, onNext }) {
  const [nextHovered, setNextHovered] = useState(false)
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  const WRAP = { maxWidth: '1040px', margin: '0 auto', padding: '0 3.2rem' }
  const SEC_DARK = { background: '#fafafa', borderBottom: '1px solid #dddddd', padding: '6rem 0' }
  const SEC_LIGHT = { background: '#ffffff', borderBottom: '1px solid #dddddd', padding: '6rem 0' }
  const H2 = { fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', fontWeight: 400, color: '#1a1a1a', letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: '1.1rem' }
  const BODY = { fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', color: '#555555', lineHeight: 1.9, marginBottom: '1.4rem' }
  const LABEL = { fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#3b82f6', fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: '1rem' }
  const CENTER = { maxWidth: '660px', margin: '0 auto', textAlign: 'center' }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      style={{ background: '#ffffff', minHeight: '100vh', paddingTop: '64px' }}
    >

      {/* ── Back nav ── */}
      <div style={{ background: '#fafafa', borderBottom: '1px solid #dddddd', padding: '0.9rem 3.2rem' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: '#999', fontSize: '0.8rem', fontFamily: "'Inter', sans-serif", letterSpacing: '0.03em', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'} onMouseLeave={e => e.currentTarget.style.color = '#999'}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M5 12l7 7M5 12l7-7"/></svg>
            All Work
          </button>
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid #dddddd', padding: '6rem 0 0' }}>
        <div style={WRAP}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '4.5rem', alignItems: 'center' }}>
            <div>
              <p style={LABEL}>{project.number} / 07 · {project.category}</p>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(3.8rem, 8vw, 6.2rem)', fontWeight: 400, color: '#1a1a1a', letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: '1rem' }}>
                {project.title}
              </h1>
              <p style={{ fontSize: '0.9rem', color: '#aaa', fontFamily: "'Inter', sans-serif", marginBottom: '2rem', letterSpacing: '0.01em' }}>
                {project.year} · {project.duration}
              </p>
              <p style={{ ...BODY, textAlign: 'left', maxWidth: '420px', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
                {project.tagline}
              </p>
              <div style={{ display: 'flex', gap: '2.5rem' }}>
                {[{ label: 'Duration', value: project.duration }, { label: 'Tools', value: project.tools }].map(({ label, value }) => (
                  <div key={label}>
                    <p style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#ccc', fontWeight: 600, marginBottom: '0.3rem', fontFamily: "'Inter', sans-serif" }}>{label}</p>
                    <p style={{ fontSize: '0.85rem', color: '#333', fontFamily: "'Inter', sans-serif" }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #e8e8e8', boxShadow: '0 24px 72px rgba(0,0,0,0.08)' }}>
              <MockupFintech />
            </div>
          </div>
        </div>
        {/* Full-width mockup strip */}
        <div style={{ marginTop: '5rem', background: '#f5f5f3', borderTop: '1px solid #e8e8e8', padding: '3rem 3.2rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', overflowX: 'auto' }}>
          {[MockupFintech, MockupAIDashboard, MockupDesignSystem].map((Comp, i) => (
            <div key={i} style={{ width: '340px', flexShrink: 0, borderRadius: '10px', overflow: 'hidden', border: '1px solid #e0e0e0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <Comp />
            </div>
          ))}
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section style={SEC_DARK}>
        <div style={WRAP}>
          <div style={CENTER}>
            <p style={LABEL}>The Problem</p>
            <h2 style={H2}>Fragmented systems, high stakes, zero clarity</h2>
            <p style={BODY}>Finance teams at mid-market companies typically operate across three to five disconnected tools: an ERP for records, a separate approval system, spreadsheets for reconciliation, and email for exceptions. Critical information lives everywhere, approval bottlenecks go undetected until they become emergencies, and nobody has a reliable view of where anything stands.</p>
            <p style={{ ...BODY, marginBottom: 0 }}>The product had all the data. It just couldn't communicate it. The problem wasn't missing features. It was missing <strong style={{ color: '#1a1a1a', fontWeight: 600 }}>clarity, hierarchy, and trust</strong>.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginTop: '3.5rem' }}>
            {[
              { value: '40%+', desc: 'of working time lost to cross-system navigation and manual reconciliation' },
              { value: '6+ steps', desc: 'required to complete a single payment request or approval action' },
              { value: 'No single view', desc: 'of transaction status, pending approvals, or financial position' },
            ].map(({ value, desc }) => (
              <div key={value} style={{ background: '#ffffff', border: '1px solid #e8e8e8', borderRadius: '10px', padding: '2rem 1.75rem' }}>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2.2rem', color: '#3b82f6', marginBottom: '0.75rem', lineHeight: 1 }}>{value}</p>
                <p style={{ fontSize: '0.875rem', color: '#888', lineHeight: 1.65, fontFamily: "'Inter', sans-serif", margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USERS & INSIGHTS ── */}
      <section style={SEC_LIGHT}>
        <div style={WRAP}>
          <div style={CENTER}>
            <p style={LABEL}>Users & Insights</p>
            <h2 style={H2}>Three roles, one broken workflow</h2>
            <p style={{ ...BODY, marginBottom: '3.5rem' }}>Research ran across three distinct roles through stakeholder interviews, user shadowing, and task analysis. Each had different goals and different failure points, but all were being failed by the same root cause: not a lack of data, but a lack of structured hierarchy that made the right data surfaceable at the right moment.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {[
              { role: 'Finance Managers', goal: 'Real-time visibility into cash flow, pending approvals, and flagged transactions.', pain: 'Spent more time finding information than acting on it.', color: '#3b82f6' },
              { role: 'Operations Leads', goal: 'Submit, track, and escalate requests without chasing email threads.', pain: 'The approval process was a black box. Requests disappeared with no status update.', color: '#8b5cf6' },
              { role: 'Administrators', goal: 'Configure workflows, manage permissions, and generate compliance reports.', pain: 'Every configuration change required IT involvement. No recovery path for mistakes.', color: '#0ea5e9' },
            ].map(({ role, goal, pain, color }) => (
              <div key={role} style={{ background: '#fafafa', border: '1px solid #e8e8e8', borderRadius: '10px', padding: '2rem 1.75rem' }}>
                <p style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color, fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: '0.65rem' }}>{role}</p>
                <p style={{ fontSize: '0.875rem', color: '#333', lineHeight: 1.75, fontFamily: "'Inter', sans-serif", marginBottom: '1.1rem' }}><strong style={{ fontWeight: 600 }}>Goal —</strong> {goal}</p>
                <p style={{ fontSize: '0.875rem', color: '#888', lineHeight: 1.75, fontFamily: "'Inter', sans-serif", margin: 0 }}><strong style={{ color: '#666', fontWeight: 600 }}>Pain —</strong> {pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE APPROACH ── */}
      <section style={SEC_DARK}>
        <div style={WRAP}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '4.5rem' }}>
            {[MockupFintech, MockupDesignSystem].map((Comp, i) => (
              <div key={i} style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #e0e0e0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}><Comp /></div>
            ))}
          </div>
          <div style={CENTER}>
            <p style={LABEL}>The Approach</p>
            <h2 style={H2}>Problem before pixels</h2>
            <p style={BODY}>The first week was deliberately screen-free. I ran shadowing sessions with each user group to observe real workflows, not the documented ones, which bore little resemblance to how work actually happened. From those sessions I built a current-state service blueprint mapping every step, handoff, and failure point across the full transaction lifecycle.</p>
            <p style={{ ...BODY, marginBottom: '3.5rem' }}>The IA was rebuilt around role-based task frequency rather than system modules. The design process ran in parallel with engineering. Weekly critique sessions pressure-tested trade-offs between ideal UX and technical constraints. A component system was built before any high-fidelity screens, so consistency was structural rather than enforced after the fact.</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '0' }}>
            {['User Shadowing', 'Service Blueprint', 'IA Rebuild', 'Component System', 'Prototype & Test', 'Ship'].map((step, i, arr) => (
              <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', padding: '0 0.75rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === 0 ? '#3b82f6' : '#d5d5d5', margin: '0 auto 0.5rem' }} />
                  <p style={{ fontSize: '0.68rem', color: i === 0 ? '#3b82f6' : '#aaa', fontFamily: "'Inter', sans-serif", letterSpacing: '0.04em', whiteSpace: 'nowrap', margin: 0 }}>{step}</p>
                </div>
                {i < arr.length - 1 && <div style={{ width: '2rem', height: '1px', background: '#ddd', flexShrink: 0, marginBottom: '1.1rem' }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKFLOW SIMPLIFICATION ── */}
      <section style={SEC_LIGHT}>
        <div style={WRAP}>
          <div style={CENTER}>
            <p style={LABEL}>Workflow Simplification</p>
            <h2 style={H2}>From six steps to two</h2>
            <p style={BODY}>The most impactful change was restructuring the payment request and approval flow. In the original system, submitting a request required navigating three separate screens, manually cross-referencing a budget code in a separate module, and awaiting email confirmation before an approver could even begin their process.</p>
            <p style={{ ...BODY, marginBottom: '3.5rem' }}>The redesigned flow consolidates everything into a single progressive form. Budget data surfaces inline, smart validation catches errors before submission, and the approval interface presents all necessary context at the point of decision. The guiding principle: <em style={{ color: '#1a1a1a', fontStyle: 'italic' }}>reduce the distance between intent and action</em>.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div style={{ background: '#fff5f5', border: '1px solid #fecdd3', borderRadius: '10px', padding: '2rem 1.75rem' }}>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#e11d48', fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: '1.25rem' }}>Before</p>
              {['Navigate to the correct module', 'Locate the right form', 'Open budget tool in a separate tab', 'Cross-reference and fill manually', 'Submit, await email confirmation', 'Approver re-logs in separately to action'].map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.7rem' }}>
                  <div style={{ minWidth: '20px', height: '20px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>
                    <span style={{ fontSize: '0.58rem', color: '#e11d48', fontWeight: 700 }}>{i + 1}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#666', fontFamily: "'Inter', sans-serif", lineHeight: 1.55, margin: 0 }}>{s}</p>
                </div>
              ))}
              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #fecdd3' }}>
                <p style={{ fontSize: '0.85rem', color: '#e11d48', fontWeight: 600, fontFamily: "'Inter', sans-serif", margin: 0 }}>6+ steps · High cognitive load</p>
              </div>
            </div>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '2rem 1.75rem' }}>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#16a34a', fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: '1.25rem' }}>After</p>
              {['Open progressive form, budget data surfaces inline', 'Review summary & confirm'].map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.7rem' }}>
                  <div style={{ minWidth: '20px', height: '20px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>
                    <span style={{ fontSize: '0.58rem', color: '#16a34a', fontWeight: 700 }}>{i + 1}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#333', fontFamily: "'Inter', sans-serif", lineHeight: 1.55, margin: 0 }}>{s}</p>
                </div>
              ))}
              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #bbf7d0' }}>
                <p style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: 600, fontFamily: "'Inter', sans-serif", margin: 0 }}>2 steps · Intent → action</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY DESIGN DECISIONS ── */}
      <section style={SEC_DARK}>
        <div style={WRAP}>
          <div style={CENTER}>
            <p style={LABEL}>Design Decisions</p>
            <h2 style={H2}>What we built and why</h2>
            <p style={{ ...BODY, marginBottom: '3.5rem' }}>Every major decision in FluxPay involved a real trade-off between what was ideal for users and what was feasible within the constraints of timeline, technology, and business scope. Three decisions were most consequential.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {[
              { title: 'Dashboard Architecture', body: 'Designed as a role-aware command centre. The most time-sensitive items (pending approvals, flagged transactions, budget alerts) surface first. Every widget is actionable, not decorative.', tradeoff: 'Scoped to 3 pre-set role views for v1. Fully dynamic personalisation deferred to phase 2, with architecture designed to support it.' },
              { title: 'Navigation Model', body: 'Persistent left-rail replaced a top-nav/breadcrumb hybrid with no clear hierarchy. Finance tools are used in extended sessions, so persistent nav reduces reorientation cost across a long working day.', tradeoff: 'Mobile collapses to a drawer pattern. Optimised explicitly for the approval flow on mobile, not full feature parity.' },
              { title: 'Data Presentation', body: 'Strict hierarchy: primary metrics in large high-contrast type, supporting context in secondary weight. Tables show only the most task-relevant columns by default.', tradeoff: 'Power users wanted more data visible by default. Saved views were introduced, with individual column configurations persisted per user, rather than increasing default density.' },
            ].map(({ title, body, tradeoff }) => (
              <div key={title} style={{ background: '#ffffff', border: '1px solid #e8e8e8', borderRadius: '10px', padding: '2rem 1.75rem' }}>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.25rem', color: '#1a1a1a', marginBottom: '0.85rem', lineHeight: 1.2 }}>{title}</p>
                <p style={{ fontSize: '0.875rem', color: '#555', lineHeight: 1.75, fontFamily: "'Inter', sans-serif", marginBottom: '1.25rem' }}>{body}</p>
                <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                  <p style={{ fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#f59e0b', fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: '0.45rem' }}>Trade-off</p>
                  <p style={{ fontSize: '0.82rem', color: '#999', lineHeight: 1.65, fontFamily: "'Inter', sans-serif", margin: 0 }}>{tradeoff}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST & CLARITY ── */}
      <section style={SEC_LIGHT}>
        <div style={WRAP}>
          <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e8e8e8', boxShadow: '0 8px 40px rgba(0,0,0,0.05)', marginBottom: '4.5rem' }}>
            <MockupEcommerce />
          </div>
          <div style={CENTER}>
            <p style={LABEL}>Trust & Clarity</p>
            <h2 style={H2}>Designing for confidence, not just completion</h2>
            <p style={{ ...BODY, marginBottom: '3.5rem' }}>In a financial product, the cost of a mistake isn't inconvenience — it can mean a missed payment, a compliance breach, or a budget overrun. Every high-stakes interaction was designed with this as the operating constraint.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { title: 'Confirmation Patterns', body: 'Destructive and irreversible actions use a two-step confirmation model with explicit consequence labelling. Users see exactly what will happen before committing — no surprises.' },
              { title: 'Inline Validation', body: 'Forms validate in real time at the field level as soon as focus moves — not on submission. Errors are caught when the context to fix them is still fresh.' },
              { title: 'Error Prevention First', body: 'Budget codes are selectable from a pre-validated list, not free-text. Date ranges auto-constrain to valid periods. The system prevents errors rather than asking users to recover from them.' },
              { title: 'Summary Checkpoints', body: 'For bulk actions and large transactions, a plain-language summary screen acts as a final checkpoint before execution — with an explicit undo window for reversible actions.' },
            ].map(({ title, body }) => (
              <div key={title} style={{ background: '#fafafa', border: '1px solid #e8e8e8', borderRadius: '10px', padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.7rem' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6', flexShrink: 0 }} />
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1a1a1a', fontFamily: "'Inter', sans-serif", margin: 0 }}>{title}</p>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#777', lineHeight: 1.75, fontFamily: "'Inter', sans-serif", margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACT & OUTCOMES ── */}
      <section style={SEC_DARK}>
        <div style={WRAP}>
          <div style={CENTER}>
            <p style={LABEL}>Impact & Outcomes</p>
            <h2 style={H2}>What shipped, and what it delivered</h2>
            <p style={{ ...BODY, marginBottom: '3.5rem' }}>FluxPay shipped to internal teams and early enterprise clients. Zero critical usability issues in the first month of deployment, a direct result of the validation and confirmation architecture built into every high-stakes flow.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '3.5rem' }}>
            {project.metrics.map(({ value, label }) => (
              <div key={label} style={{ background: '#ffffff', border: '1px solid #e8e8e8', borderRadius: '12px', padding: '2.5rem 2rem', textAlign: 'center' }}>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.6rem, 5vw, 3.4rem)', color: '#3b82f6', fontWeight: 400, lineHeight: 1, marginBottom: '0.8rem' }}>{value}</p>
                <p style={{ fontSize: '0.82rem', color: '#aaa', fontFamily: "'Inter', sans-serif", lineHeight: 1.55, margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
          <div style={{ ...CENTER }}>
            <p style={{ ...BODY, marginBottom: 0 }}>{project.outcome}</p>
          </div>
        </div>
      </section>

      {/* ── KEY LEARNINGS ── */}
      <section style={SEC_LIGHT}>
        <div style={WRAP}>
          <div style={CENTER}>
            <p style={LABEL}>Key Learnings</p>
            <h2 style={H2}>What this project taught me</h2>
            <p style={{ ...BODY, marginBottom: '3.5rem' }}>Four ideas that shaped how I think about designing for complex systems — applicable well beyond this project.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
            {[
              { title: 'Complexity isn\'t the enemy', body: 'Unexplained complexity is. Finance teams don\'t need simpler data. They need better-structured data. The designer\'s job here is not to remove information, but to make it navigable.' },
              { title: 'Trust is a design output', body: 'Every micro-decision, from confirmation copy to error messages and feedback states, contributes to whether users trust the system enough to depend on it. Trust is accumulated across thousands of consistent small decisions.' },
              { title: 'Constraints produce better design', body: 'Technical and timeline limitations forced prioritisation that resulted in a more focused, coherent product. Real constraints are the closest proxy to the conditions under which great products are actually built.' },
              { title: 'Design systems are product decisions', body: 'Building the component system before high-fidelity work began meant every screen was consistent by default. The engineering handoff had near-zero ambiguity, which compounds directly into shipping velocity.' },
            ].map(({ title, body }, i) => (
              <div key={title} style={{ padding: '2.25rem', borderBottom: i < 2 ? '1px solid #eee' : 'none', borderRight: i % 2 === 0 ? '1px solid #eee' : 'none' }}>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.2rem', color: '#1a1a1a', marginBottom: '0.65rem', lineHeight: 1.25 }}>{title}</p>
                <p style={{ fontSize: '0.9rem', color: '#777', lineHeight: 1.8, fontFamily: "'Inter', sans-serif", margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEXT PROJECT ── */}
      {nextProject && (
        <section style={{ background: '#fafafa', borderTop: '1px solid #dddddd', padding: '5rem 0 6rem' }}>
          <div style={WRAP}>
            <div style={{ position: 'relative', height: '1px', background: '#dddddd', marginBottom: '3.5rem' }}>
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', background: '#fafafa', padding: '0 1.5rem' }}>
                <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#bbb', fontFamily: "'Inter', sans-serif", fontWeight: 600, whiteSpace: 'nowrap', margin: 0 }}>More case studies</p>
              </div>
            </div>
            <div onClick={onNext} onMouseEnter={() => setNextHovered(true)} onMouseLeave={() => setNextHovered(false)}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', padding: '1.5rem 0' }}>
              <div>
                <p style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#ccc', fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: '0.5rem' }}>Next Project</p>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, letterSpacing: '-0.025em', color: nextHovered ? '#1a1a1a' : '#bbb', transition: 'color 0.3s', margin: 0 }}>{nextProject.title}</h3>
              </div>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: `1px solid ${nextHovered ? '#1a1a1a' : '#ddd'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'border-color 0.3s' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={nextHovered ? '#1a1a1a' : '#ccc'} strokeWidth="1.75" style={{ transition: 'stroke 0.3s' }}>
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </div>
            </div>
          </div>
        </section>
      )}

    </motion.div>
  )
}

/* ─── PlayConnect Premium Case Study ────────────────────────────── */

function PlayConnectCaseStudy({ project, onBack, nextProject, onNext }) {
  const [nextHovered, setNextHovered] = useState(false)
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  const WRAP = { maxWidth: '1040px', margin: '0 auto', padding: '0 3.2rem' }
  const SEC_DARK = { background: '#fafafa', borderBottom: '1px solid #dddddd', padding: '6rem 0' }
  const SEC_LIGHT = { background: '#ffffff', borderBottom: '1px solid #dddddd', padding: '6rem 0' }
  const H2 = { fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', fontWeight: 400, color: '#1a1a1a', letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: '1.1rem' }
  const BODY = { fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', color: '#555555', lineHeight: 1.9, marginBottom: '1.4rem' }
  const LABEL = { fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#22c55e', fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: '1rem' }
  const CENTER = { maxWidth: '660px', margin: '0 auto', textAlign: 'center' }
  const accent = '#22c55e'

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      style={{ background: '#ffffff', minHeight: '100vh', paddingTop: '64px' }}
    >

      {/* ── Back nav ── */}
      <div style={{ background: '#fafafa', borderBottom: '1px solid #dddddd', padding: '0.9rem 3.2rem' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: '#999', fontSize: '0.8rem', fontFamily: "'Inter', sans-serif", letterSpacing: '0.03em', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'} onMouseLeave={e => e.currentTarget.style.color = '#999'}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M5 12l7 7M5 12l7-7"/></svg>
            All Work
          </button>
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid #dddddd', padding: '6rem 0 0' }}>
        <div style={WRAP}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '4.5rem', alignItems: 'center' }}>
            <div>
              <p style={LABEL}>{project.number} / 07 · {project.category}</p>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(3.8rem, 8vw, 6.2rem)', fontWeight: 400, color: '#1a1a1a', letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: '1rem' }}>
                {project.title}
              </h1>
              <p style={{ fontSize: '0.9rem', color: '#aaa', fontFamily: "'Inter', sans-serif", marginBottom: '2rem', letterSpacing: '0.01em' }}>
                {project.year} · {project.duration}
              </p>
              <p style={{ ...BODY, textAlign: 'left', maxWidth: '420px', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
                {project.tagline}
              </p>
              <div style={{ display: 'flex', gap: '2.5rem' }}>
                {[{ label: 'Duration', value: project.duration }, { label: 'Tools', value: project.tools }].map(({ label, value }) => (
                  <div key={label}>
                    <p style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#ccc', fontWeight: 600, marginBottom: '0.3rem', fontFamily: "'Inter', sans-serif" }}>{label}</p>
                    <p style={{ fontSize: '0.85rem', color: '#333', fontFamily: "'Inter', sans-serif" }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #e8e8e8', boxShadow: '0 24px 72px rgba(0,0,0,0.08)' }}>
              <MockupPlayConnect />
            </div>
          </div>
        </div>
        {/* Full-width mockup strip */}
        <div style={{ marginTop: '5rem', background: '#f5f5f3', borderTop: '1px solid #e8e8e8', padding: '3rem 3.2rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', overflowX: 'auto' }}>
          {[MockupPlayConnect, MockupFlutterApp, MockupMobileApp].map((Comp, i) => (
            <div key={i} style={{ width: '340px', flexShrink: 0, borderRadius: '10px', overflow: 'hidden', border: '1px solid #e0e0e0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <Comp />
            </div>
          ))}
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section style={SEC_DARK}>
        <div style={WRAP}>
          <div style={CENTER}>
            <p style={LABEL}>The Problem</p>
            <h2 style={H2}>Booking a turf should not require a phone call</h2>
            <p style={BODY}>Sports and recreational infrastructure is abundant, but booking it is broken. Players looking for turf time face a fragmented reality: venues share availability via WhatsApp groups, manually updated social posts, or not at all. There is no reliable way to know whether a slot is free, what it costs, or whether a booking is confirmed.</p>
            <p style={{ ...BODY, marginBottom: 0 }}>For turf owners, the problem exists in reverse: no visibility into real-time occupancy, no structured payment flow, and high no-show rates because there is no formal confirmation system. The booking experience is not just inconvenient. It is <strong style={{ color: '#1a1a1a', fontWeight: 600 }}>fundamentally untrustworthy</strong>.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginTop: '3.5rem' }}>
            {[
              { value: 'No real-time', desc: 'Availability was shared via WhatsApp or phone calls — no live slot visibility for players at any point in the flow' },
              { value: 'High drop-off', desc: 'Confusing multi-step booking flows and unclear pricing caused players to abandon before completing a reservation' },
              { value: 'Zero trust', desc: 'No digital confirmation system meant players could not verify that their booking was real or guaranteed' },
            ].map(({ value, desc }) => (
              <div key={value} style={{ background: '#ffffff', border: '1px solid #e8e8e8', borderRadius: '10px', padding: '2rem 1.75rem' }}>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.75rem', color: accent, marginBottom: '0.75rem', lineHeight: 1.2 }}>{value}</p>
                <p style={{ fontSize: '0.875rem', color: '#888', lineHeight: 1.65, fontFamily: "'Inter', sans-serif", margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USERS & PAIN POINTS ── */}
      <section style={SEC_LIGHT}>
        <div style={WRAP}>
          <div style={CENTER}>
            <p style={LABEL}>Users & Pain Points</p>
            <h2 style={H2}>Two sides of the same broken system</h2>
            <p style={{ ...BODY, marginBottom: '3.5rem' }}>Research surfaced two distinct user groups with mirrored problems. Players could not find or trust available slots. Turf owners could not communicate availability or confirm bookings reliably. Every pain point traced back to the same root: the absence of a single shared, real-time truth about slot availability.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            {[
              {
                role: 'Players', color: accent,
                goals: ['Find available slots nearby without calling ahead', 'Know the exact price before committing to a booking', 'Receive a confirmation they can trust and reference on the day'],
                pains: ['Availability shared via WhatsApp — always potentially outdated', 'Too many steps and too much uncertainty to complete a booking', 'No confirmation receipt — never certain the booking was real'],
              },
              {
                role: 'Turf Owners', color: '#0ea5e9',
                goals: ['Eliminate phone-call bookings and manual scheduling overhead', 'Reduce no-shows through structured, upfront confirmations', 'View daily occupancy and revenue at a glance'],
                pains: ['Manual booking tracking led to double-bookings and lost revenue', 'No way to enforce prepayment or communicate cancellation policy', 'Could not push real-time availability updates to potential players'],
              },
            ].map(({ role, color, goals, pains }) => (
              <div key={role} style={{ background: '#fafafa', border: '1px solid #e8e8e8', borderRadius: '10px', padding: '2rem 1.75rem' }}>
                <p style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color, fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: '1.25rem' }}>{role}</p>
                <div style={{ marginBottom: '1.25rem' }}>
                  <p style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: '0.6rem' }}>Goals</p>
                  {goals.map(g => (
                    <div key={g} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.45rem' }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: color, flexShrink: 0, marginTop: '0.6rem' }} />
                      <p style={{ fontSize: '0.875rem', color: '#333', lineHeight: 1.65, fontFamily: "'Inter', sans-serif", margin: 0 }}>{g}</p>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid #eee', paddingTop: '1.25rem' }}>
                  <p style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: '0.6rem' }}>Pain Points</p>
                  {pains.map(p => (
                    <div key={p} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.45rem' }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#e11d48', flexShrink: 0, marginTop: '0.6rem' }} />
                      <p style={{ fontSize: '0.875rem', color: '#888', lineHeight: 1.65, fontFamily: "'Inter', sans-serif", margin: 0 }}>{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE APPROACH ── */}
      <section style={SEC_DARK}>
        <div style={WRAP}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '4.5rem' }}>
            {[MockupPlayConnect, MockupFlutterApp].map((Comp, i) => (
              <div key={i} style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #e0e0e0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}><Comp /></div>
            ))}
          </div>
          <div style={CENTER}>
            <p style={LABEL}>The Approach</p>
            <h2 style={H2}>Remove uncertainty before reducing steps</h2>
            <p style={BODY}>Before designing a single screen, I mapped the full booking lifecycle from both sides, from player intent to turf owner confirmation, through user interviews. The finding was consistent: the problem was not the number of steps, it was the uncertainty embedded in each one. Players did not know if a slot was genuinely available, what the confirmed price would be, or whether their booking was real.</p>
            <p style={{ ...BODY, marginBottom: '3.5rem' }}>The design focused on eliminating ambiguity at every touchpoint. Flutter was selected to deliver native-quality performance on both iOS and Android from a single codebase, so design decisions were never constrained by platform fragmentation.</p>
          </div>
          {/* User flow */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 0 }}>
            {['Discovery', 'Turf Detail', 'Slot Selection', 'Booking & Payment', 'Confirmation'].map((step, i, arr) => (
              <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', padding: '0 0.75rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === 0 ? accent : '#d5d5d5', margin: '0 auto 0.5rem' }} />
                  <p style={{ fontSize: '0.68rem', color: i === 0 ? accent : '#aaa', fontFamily: "'Inter', sans-serif", letterSpacing: '0.04em', whiteSpace: 'nowrap', margin: 0 }}>{step}</p>
                </div>
                {i < arr.length - 1 && <div style={{ width: '2rem', height: '1px', background: '#ddd', flexShrink: 0, marginBottom: '1.1rem' }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY PRODUCT DECISIONS ── */}
      <section style={SEC_LIGHT}>
        <div style={WRAP}>
          <div style={CENTER}>
            <p style={LABEL}>Key Product Decisions</p>
            <h2 style={H2}>What we built and why it mattered</h2>
            <p style={{ ...BODY, marginBottom: '3.5rem' }}>Every significant design decision in PlayConnect was driven by a specific user pain point and a deliberate trade-off. Four decisions were most consequential to the product's success.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
            {[
              { title: 'Real-Time Slot Visibility', body: 'Slots update live. Booked slots appear greyed out and non-interactive immediately after a booking completes. Players never navigate through a flow only to find their chosen slot is unavailable at the point of payment.', why: 'Eliminated the primary cause of booking abandonment: discovering unavailability after intent and effort had already been invested.' },
              { title: 'Simplified Booking Flow', body: 'The full booking journey, from discovery to confirmation, completes in five steps with a single, focused screen per decision. No account required to browse; payment is the only friction gate.', why: 'Reduced cognitive load by scoping each screen to one decision, eliminating the paralysis of too many simultaneous choices.' },
              { title: 'Mobile-First, Flutter-Built', body: 'Designed and built with mobile as the primary context. Flutter\'s single codebase ensured pixel-level design consistency across iOS and Android without duplicating any design or engineering decisions.', why: 'Players book on mobile, in the field, often with one hand. The UI was optimised for thumb reach, glanceability, and fast recovery from errors.' },
              { title: 'Transparent, Fixed Pricing', body: 'Slot prices are displayed on the discovery screen and never change during checkout. No hidden fees, no price reveal at payment. The number the player sees at the start is the number they pay.', why: 'Trust collapses when prices change between screens. Transparent pricing removed the final reason for checkout abandonment.' },
            ].map(({ title, body, why }) => (
              <div key={title} style={{ background: '#fafafa', border: '1px solid #e8e8e8', borderRadius: '10px', padding: '2rem 1.75rem' }}>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.25rem', color: '#1a1a1a', marginBottom: '0.85rem', lineHeight: 1.2 }}>{title}</p>
                <p style={{ fontSize: '0.875rem', color: '#555', lineHeight: 1.75, fontFamily: "'Inter', sans-serif", marginBottom: '1.25rem' }}>{body}</p>
                <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                  <p style={{ fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: accent, fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: '0.45rem' }}>Why</p>
                  <p style={{ fontSize: '0.82rem', color: '#999', lineHeight: 1.65, fontFamily: "'Inter', sans-serif", margin: 0 }}>{why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UI BREAKDOWN ── */}
      <section style={SEC_DARK}>
        <div style={WRAP}>
          <div style={CENTER}>
            <p style={LABEL}>UI Breakdown</p>
            <h2 style={H2}>Five screens, one seamless journey</h2>
            <p style={{ ...BODY, marginBottom: '3.5rem' }}>Each screen in the booking flow has a single job. The design avoids multi-purpose screens that force users to context-switch mid-task. Clarity of purpose at every step is the core design constraint — no screen asks a user to do more than one thing.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
            {[
              { screen: 'Home / Discovery', purpose: 'Search venues by sport, location, or date. Glanceable cards with live slot status and upfront pricing.', impact: 'Players know what\'s available and what it costs before tapping into any detail.' },
              { screen: 'Turf Detail', purpose: 'Full venue profile: amenities, photos, real-time availability grid, and per-slot pricing with no hidden extras.', impact: 'All information needed to decide — no surprises downstream in the flow.' },
              { screen: 'Slot Selection', purpose: 'Visual time-slot grid. Booked slots greyed out and non-tappable. Price shown inline per slot, before selection confirms anything.', impact: 'Removes the core uncertainty — players see exactly what\'s free and what it costs before committing.' },
              { screen: 'Booking & Payment', purpose: 'Single-screen checkout. Player details pre-filled from profile. One payment action completes the booking.', impact: 'Minimum viable friction — no form fatigue, no multi-step checkout, no second-guessing.' },
              { screen: 'Confirmation', purpose: 'Immediate booking confirmation with reference number, venue details, slot time, directions link, and add-to-calendar action.', impact: 'Closes the trust loop — players have verifiable proof of booking before leaving the app.' },
            ].map(({ screen, purpose, impact }) => (
              <div key={screen} style={{ background: '#ffffff', border: '1px solid #e8e8e8', borderRadius: '10px', padding: '1.5rem 1.25rem' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: accent, marginBottom: '0.75rem' }} />
                <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1a1a1a', fontFamily: "'Inter', sans-serif", marginBottom: '0.6rem', lineHeight: 1.3 }}>{screen}</p>
                <p style={{ fontSize: '0.78rem', color: '#777', lineHeight: 1.65, fontFamily: "'Inter', sans-serif", marginBottom: '0.75rem' }}>{purpose}</p>
                <p style={{ fontSize: '0.72rem', color: accent, lineHeight: 1.55, fontFamily: "'Inter', sans-serif", margin: 0, fontStyle: 'italic' }}>{impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDGE CASES & SYSTEM STATES ── */}
      <section style={SEC_LIGHT}>
        <div style={WRAP}>
          <div style={CENTER}>
            <p style={LABEL}>Edge Cases & System States</p>
            <h2 style={H2}>Designing for what goes wrong</h2>
            <p style={{ ...BODY, marginBottom: '3.5rem' }}>Real-world product quality is measured in edge cases. A booking platform without graceful failure handling creates distrust at exactly the moments users need it most, right when something unexpected happens between intent and confirmation.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { state: 'No Availability', handling: 'Turf detail screens show a clear "No slots available for this date" state with a date-change prompt, never a blank slot grid with no explanation of why it\'s empty.' },
              { state: 'Slot Already Booked', handling: 'If a slot is claimed by another user during selection, the slot updates in real time with a toast notification explaining the conflict and surfacing the nearest alternative.' },
              { state: 'Payment Failure', handling: 'Clear, plain-language error state with the specific reason for failure, a retry path, and an alternative payment method prompt — no dead end, no generic "something went wrong".' },
              { state: 'Network Loss', handling: 'Booking progress is preserved locally. A persistent banner indicates offline state. Confirmation only sends once connectivity is restored — no silent failures, no data loss.' },
              { state: 'Booking Cancellation', handling: 'Cancellation policy is shown at the slot selection stage — before payment. Refund timeline is communicated immediately on cancellation. No support ticket required.' },
            ].map(({ state, handling }) => (
              <div key={state} style={{ background: '#fafafa', border: '1px solid #e8e8e8', borderRadius: '10px', padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.7rem' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b', flexShrink: 0 }} />
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1a1a1a', fontFamily: "'Inter', sans-serif", margin: 0 }}>{state}</p>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#777', lineHeight: 1.75, fontFamily: "'Inter', sans-serif", margin: 0 }}>{handling}</p>
              </div>
            ))}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.4rem', color: '#14532d', marginBottom: '0.5rem', lineHeight: 1.25 }}>Every failure has a recovery path.</p>
              <p style={{ fontSize: '0.875rem', color: '#555', lineHeight: 1.75, fontFamily: "'Inter', sans-serif", margin: 0 }}>No dead ends. No silent errors. No broken states that require a support call to resolve.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST & EXPERIENCE ── */}
      <section style={SEC_DARK}>
        <div style={WRAP}>
          <div style={CENTER}>
            <p style={LABEL}>Trust & Experience</p>
            <h2 style={H2}>Designing for confidence, not just completion</h2>
            <p style={{ ...BODY, marginBottom: '3.5rem' }}>A booking product lives or dies on trust. Every interaction pattern in PlayConnect was designed to reduce anxiety, not just friction. Friction you understand is survivable. Uncertainty is not.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { title: 'Immediate Confirmations', body: 'Booking confirmation appears within seconds of payment, with a reference number, venue name, slot time, and directions link. Players have everything they need before closing the app.' },
              { title: 'Transparent Pricing', body: 'Slot prices are shown at discovery, repeated on the detail screen, and confirmed at checkout. The number never changes. No fees revealed at the last step.' },
              { title: 'Consistent System Feedback', body: 'Every action — slot selection, form completion, payment submission — receives immediate visual feedback. Loading states are never empty; they communicate exactly what\'s happening.' },
              { title: 'Clear Cancellation Rules', body: 'Cancellation policy is surfaced at slot selection, before payment. Users understand the terms before they commit — removing the need to dispute after the fact.' },
            ].map(({ title, body }) => (
              <div key={title} style={{ background: '#ffffff', border: '1px solid #e8e8e8', borderRadius: '10px', padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.7rem' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: accent, flexShrink: 0 }} />
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1a1a1a', fontFamily: "'Inter', sans-serif", margin: 0 }}>{title}</p>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#777', lineHeight: 1.75, fontFamily: "'Inter', sans-serif", margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEVELOPMENT — FLUTTER ── */}
      <section style={SEC_LIGHT}>
        <div style={WRAP}>
          <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e8e8e8', boxShadow: '0 8px 40px rgba(0,0,0,0.05)', marginBottom: '4.5rem' }}>
            <MockupPlayConnect />
          </div>
          <div style={CENTER}>
            <p style={LABEL}>Development</p>
            <h2 style={H2}>Designed and built end-to-end in Flutter</h2>
            <p style={BODY}>PlayConnect is not a design handoff. It is a shipped product. I handled every layer: user research, information architecture, UI design in Figma, and full cross-platform development in Flutter. The app runs natively on iOS and Android from a single codebase.</p>
            <p style={{ ...BODY, marginBottom: '3.5rem' }}>Building the product I designed eliminated the gap between design intent and engineering reality. Real-time slot updates, optimistic UI patterns, and smooth transitions were decisions made with full awareness of both what was ideal and what was implementable, not specs handed off to a separate team.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {[
              { title: 'Flutter', desc: 'Cross-platform framework delivering native-quality UI on iOS and Android from a single codebase — with consistent design fidelity across both platforms.' },
              { title: 'Firebase', desc: 'Real-time database for live slot availability. Firestore listeners update the slot grid without requiring a manual refresh or polling loop.' },
              { title: 'Figma → Flutter', desc: 'Components designed in Figma were implemented directly as Flutter widgets with matching constraints — zero translation loss between design intent and shipped UI.' },
            ].map(({ title, desc }) => (
              <div key={title} style={{ background: '#fafafa', border: '1px solid #e8e8e8', borderRadius: '10px', padding: '2rem 1.75rem' }}>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.3rem', color: '#1a1a1a', marginBottom: '0.65rem' }}>{title}</p>
                <p style={{ fontSize: '0.875rem', color: '#777', lineHeight: 1.75, fontFamily: "'Inter', sans-serif", margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACT & OUTCOMES ── */}
      <section style={SEC_DARK}>
        <div style={WRAP}>
          <div style={CENTER}>
            <p style={LABEL}>Impact & Outcomes</p>
            <h2 style={H2}>From broken process to seamless flow</h2>
            <p style={{ ...BODY, marginBottom: '3.5rem' }}>PlayConnect shipped as a fully functional cross-platform mobile application. The real-time availability system eliminated the primary source of booking abandonment. The guided booking flow — discovery through confirmation in five steps — reduced the cognitive load that caused drop-off in comparable booking experiences.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '3.5rem' }}>
            {project.metrics.map(({ value, label }) => (
              <div key={label} style={{ background: '#ffffff', border: '1px solid #e8e8e8', borderRadius: '12px', padding: '2.5rem 2rem', textAlign: 'center' }}>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.6rem, 5vw, 3.4rem)', color: accent, fontWeight: 400, lineHeight: 1, marginBottom: '0.8rem' }}>{value}</p>
                <p style={{ fontSize: '0.82rem', color: '#aaa', fontFamily: "'Inter', sans-serif", lineHeight: 1.55, margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
          <div style={CENTER}>
            <p style={{ ...BODY, marginBottom: 0 }}>{project.outcome}</p>
          </div>
        </div>
      </section>

      {/* ── KEY LEARNINGS ── */}
      <section style={SEC_LIGHT}>
        <div style={WRAP}>
          <div style={CENTER}>
            <p style={LABEL}>Key Learnings</p>
            <h2 style={H2}>What this project taught me</h2>
            <p style={{ ...BODY, marginBottom: '3.5rem' }}>Four ideas from PlayConnect that changed how I approach product design — especially for real-time systems and mobile-first experiences where design and development are inseparable.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
            {[
              { title: 'Real-time systems need design for latency', body: 'When slot availability updates live, there are moments of uncertainty between a user\'s action and the system\'s response. Designing for those micro-moments, optimistic UI, loading states, conflict resolution, is what separates a product that feels fast from one that feels broken.' },
              { title: 'Complexity hides in flows, not screens', body: 'The individual screens in PlayConnect are simple. The complexity is in the transitions: how state is preserved across steps, how conflicts are communicated, how recovery works without forcing a full restart. Designing flows, not just screens, is the real work.' },
              { title: 'Design + development is a force multiplier', body: 'Building what I designed eliminated weeks of ambiguity that typically live in handoff. Decisions about animations, state handling, and edge cases were made once, with full context of both what was ideal and what was implementable.' },
              { title: 'Trust is the product', body: 'In a booking product, the design\'s primary job is to make users confident enough to commit. Every layout decision, every confirmation message, every error state either builds or erodes that confidence. The visible UI is the smallest part of what creates trust.' },
            ].map(({ title, body }, i) => (
              <div key={title} style={{ padding: '2.25rem', borderBottom: i < 2 ? '1px solid #eee' : 'none', borderRight: i % 2 === 0 ? '1px solid #eee' : 'none' }}>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.2rem', color: '#1a1a1a', marginBottom: '0.65rem', lineHeight: 1.25 }}>{title}</p>
                <p style={{ fontSize: '0.9rem', color: '#777', lineHeight: 1.8, fontFamily: "'Inter', sans-serif", margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEXT PROJECT ── */}
      {nextProject && (
        <section style={{ background: '#fafafa', borderTop: '1px solid #dddddd', padding: '5rem 0 6rem' }}>
          <div style={WRAP}>
            <div style={{ position: 'relative', height: '1px', background: '#dddddd', marginBottom: '3.5rem' }}>
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', background: '#fafafa', padding: '0 1.5rem' }}>
                <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#bbb', fontFamily: "'Inter', sans-serif", fontWeight: 600, whiteSpace: 'nowrap', margin: 0 }}>More case studies</p>
              </div>
            </div>
            <div onClick={onNext} onMouseEnter={() => setNextHovered(true)} onMouseLeave={() => setNextHovered(false)}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', padding: '1.5rem 0' }}>
              <div>
                <p style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#ccc', fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: '0.5rem' }}>Next Project</p>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, letterSpacing: '-0.025em', color: nextHovered ? '#1a1a1a' : '#bbb', transition: 'color 0.3s', margin: 0 }}>{nextProject.title}</h3>
              </div>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: `1px solid ${nextHovered ? '#1a1a1a' : '#ddd'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'border-color 0.3s' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={nextHovered ? '#1a1a1a' : '#ccc'} strokeWidth="1.75" style={{ transition: 'stroke 0.3s' }}>
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </div>
            </div>
          </div>
        </section>
      )}

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
    <AnimatePresence mode="wait">
      {!active ? (
        <main key="listing" style={{ minHeight: '100vh', background: '#0f0f11', paddingTop: '64px' }}>
          <WorkListing onSelect={handleSelect} />
        </main>
      ) : active.id === 0 ? (
        <FluxPayCaseStudy
          key="fluxpay"
          project={active}
          onBack={handleBack}
          nextProject={next}
          onNext={() => handleSelect(next.id)}
        />
      ) : active.id === 1 ? (
        <PlayConnectCaseStudy
          key="playconnect"
          project={active}
          onBack={handleBack}
          nextProject={next}
          onNext={() => handleSelect(next.id)}
        />
      ) : (
        <main key={active.id} style={{ minHeight: '100vh', background: '#0f0f11', paddingTop: '64px' }}>
          <CaseStudyView
            project={active}
            onBack={handleBack}
            onNext={() => handleSelect(next.id)}
            nextProject={next}
          />
        </main>
      )}
    </AnimatePresence>
  )
}
