import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────────
   Animated Skeleton UIs — one per project
───────────────────────────────────────────────────────────────── */

function SkeletonFinovaX() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#0B0F1A', borderRadius: '12px 12px 0 0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Browser chrome */}
      <div style={{ height: '28px', background: '#111520', borderBottom: '1px solid #1e2540', display: 'flex', alignItems: 'center', padding: '0 10px', gap: '5px', flexShrink: 0 }}>
        {['#ef4444','#f59e0b','#22c55e'].map((c, i) => (
          <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: c, opacity: 0.7 }} />
        ))}
        <div style={{ flex: 1, margin: '0 8px', background: '#1a2035', borderRadius: '4px', height: '14px', display: 'flex', alignItems: 'center', padding: '0 7px' }}>
          <div className="skeleton" style={{ width: '90px', height: '5px', opacity: 0.5 }} />
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: '44px', background: '#0d1121', borderRight: '1px solid #1a2035', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', gap: '10px', flexShrink: 0 }}>
          {/* Logo mark */}
          <div style={{ width: '26px', height: '26px', borderRadius: '7px', background: '#2B7FFF', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(255,255,255,0.85)' }} />
          </div>
          {[1, 0.9, 0.35, 0.35, 0.35].map((op, i) => (
            <div key={i} style={{
              width: '28px', height: '28px', borderRadius: '8px',
              background: i === 0 ? '#2B7FFF20' : 'transparent',
              border: i === 0 ? '1px solid #2B7FFF40' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: op,
            }}>
              <div className="skeleton" style={{ width: '14px', height: '14px', borderRadius: '3px' }} />
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden' }}>
          {/* Page header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
            <div className="skeleton" style={{ width: '70px', height: '8px' }} />
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <div style={{ padding: '4px 10px', borderRadius: '6px', background: '#2B7FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '30px', height: '5px', borderRadius: '2px', background: 'rgba(255,255,255,0.7)' }} />
              </div>
              <div className="skeleton" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
            </div>
          </div>

          {/* KPI cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
            {[
              { bg: '#2B7FFF18', border: '#2B7FFF35', accent: '#2B7FFF' },
              { bg: '#00C95018', border: '#00C95035', accent: '#00C950' },
              { bg: '#00B8DB18', border: '#00B8DB35', accent: '#00B8DB' },
            ].map((c, i) => (
              <div key={i} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: '9px', padding: '9px 10px' }}>
                <div className="skeleton" style={{ width: '36px', height: '5px', marginBottom: '5px', opacity: 0.6 }} />
                <div className="skeleton" style={{ width: '48px', height: '13px', marginBottom: '5px' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <div style={{ width: '0', height: '0', borderLeft: '3px solid transparent', borderRight: '3px solid transparent', borderBottom: `4px solid ${c.accent}` }} />
                  <div style={{ width: '22px', height: '4px', borderRadius: '2px', background: c.accent, opacity: 0.7 }} />
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div style={{ flex: 1, background: '#111520', borderRadius: '9px', padding: '10px 12px', border: '1px solid #1a2035', minHeight: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div className="skeleton" style={{ width: '65px', height: '6px' }} />
              <div style={{ display: 'flex', gap: '8px' }}>
                {['#2B7FFF', '#00C950'].map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: c }} />
                    <div className="skeleton" style={{ width: '24px', height: '4px', opacity: 0.5 }} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '52px' }}>
              {[38, 55, 42, 68, 50, 78, 60, 72, 45, 82, 65, 88].map((h, i) => (
                <div key={i} style={{
                  flex: 1,
                  height: `${h}%`,
                  background: i === 11 ? '#2B7FFF' : i % 2 === 0 ? '#2B7FFF25' : '#00C95025',
                  borderRadius: '3px 3px 0 0',
                  transition: 'height 0.3s',
                }} />
              ))}
            </div>
            {/* Area line */}
            <svg width="100%" height="14" viewBox="0 0 200 14" preserveAspectRatio="none" style={{ marginTop: '2px' }}>
              <polyline points="0,12 18,8 36,10 54,5 72,7 90,3 108,6 126,4 144,8 162,2 180,5 200,1"
                fill="none" stroke="#00C950" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
            </svg>
          </div>

          {/* Transactions */}
          <div style={{ background: '#111520', borderRadius: '9px', border: '1px solid #1a2035', overflow: 'hidden', flexShrink: 0 }}>
            <div style={{ padding: '7px 10px', borderBottom: '1px solid #1a2035', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="skeleton" style={{ width: '80px', height: '6px' }} />
              <div className="skeleton" style={{ width: '30px', height: '5px', opacity: 0.4 }} />
            </div>
            {[
              { color: '#2B7FFF', status: '#00C950' },
              { color: '#615FFF', status: '#00B8DB' },
              { color: '#00C950', status: '#00C950' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', borderBottom: i < 2 ? '1px solid #1a203520' : 'none', opacity: 1 - i * 0.2 }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: row.color + '25', border: `1px solid ${row.color}40`, flexShrink: 0 }}>
                  <div className="skeleton" style={{ width: '22px', height: '22px', borderRadius: '50%', opacity: 0 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="skeleton" style={{ width: '60px', height: '6px', marginBottom: '3px' }} />
                  <div className="skeleton" style={{ width: '40px', height: '5px', opacity: 0.4 }} />
                </div>
                <div className="skeleton" style={{ width: '38px', height: '7px' }} />
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: row.status, boxShadow: `0 0 5px ${row.status}80` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SkeletonPlayConnect() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#0a0f1e', borderRadius: '12px 12px 0 0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '14px 16px 10px', background: '#0f1729', borderBottom: '1px solid #1e2d4a' }}>
        <div className="skeleton" style={{ width: '90px', height: '8px', marginBottom: '8px' }} />
        <div style={{ display: 'flex', gap: '6px' }}>
          {['Football','Cricket','Badminton'].map((t, i) => (
            <div key={i} style={{
              padding: '4px 10px', borderRadius: '100px', fontSize: '9px', fontFamily: 'Inter, sans-serif',
              background: i === 0 ? '#3b82f6' : '#1e2d4a',
              color: i === 0 ? '#fff' : '#64748b',
            }}>{t}</div>
          ))}
        </div>
      </div>

      {/* Map placeholder */}
      <div style={{ height: '90px', background: '#0f1a2e', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #1e2d4a' }}>
        {/* Grid lines */}
        {[20,40,60,80].map(x => <div key={x} style={{ position: 'absolute', left: `${x}%`, top: 0, bottom: 0, width: '1px', background: '#1e2d4a40' }} />)}
        {[33,66].map(y => <div key={y} style={{ position: 'absolute', top: `${y}%`, left: 0, right: 0, height: '1px', background: '#1e2d4a40' }} />)}
        {/* Map pins */}
        {[[25,40],[55,60],[70,30]].map(([x,y], i) => (
          <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%` }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50% 50% 50% 0', background: i === 0 ? '#3b82f6' : '#1e2d4a', border: '2px solid #3b82f6', transform: 'rotate(-45deg)' }} />
          </div>
        ))}
      </div>

      {/* Turf cards */}
      <div style={{ flex: 1, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden' }}>
        {[1, 0.7].map((op, i) => (
          <div key={i} style={{ background: '#0f1729', borderRadius: '10px', border: '1px solid #1e2d4a', padding: '10px 12px', display: 'flex', gap: '10px', opacity: op }}>
            <div className="skeleton" style={{ width: '44px', height: '44px', borderRadius: '8px', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div className="skeleton" style={{ width: '80px', height: '8px', marginBottom: '6px' }} />
              <div className="skeleton" style={{ width: '55px', height: '6px', marginBottom: '8px' }} />
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <div className="skeleton" style={{ width: '36px', height: '16px', borderRadius: '4px' }} />
                <div style={{ fontSize: '10px', color: '#22c55e', fontFamily: 'Inter, sans-serif' }}>Available</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#3b82f6', fontFamily: 'Inter, sans-serif' }}>₹800/hr</div>
              <div style={{ background: '#3b82f6', color: '#fff', fontSize: '9px', padding: '3px 8px', borderRadius: '6px', fontFamily: 'Inter, sans-serif' }}>Book</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SkeletonPRDGenerator() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#09090b', borderRadius: '12px 12px 0 0', overflow: 'hidden', display: 'flex' }}>
      {/* Left — doc outline */}
      <div style={{ width: '140px', background: '#111113', borderRight: '1px solid #27272a', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className="skeleton" style={{ width: '60px', height: '7px' }} />
        {[90, 70, 80, 60, 75, 50].map((w, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: i === 1 ? '#a78bfa' : '#3f3f46' }} />
            <div className="skeleton" style={{ width: `${w}%`, height: '6px', opacity: i === 1 ? 1 : 0.5 }} />
          </div>
        ))}
      </div>

      {/* Right — AI chat + doc */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Doc content area */}
        <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden' }}>
          <div className="skeleton" style={{ width: '120px', height: '10px' }} />
          {[100, 85, 90, 70, 95, 60].map((w, i) => (
            <div key={i} className="skeleton" style={{ width: `${w}%`, height: '6px', opacity: 1 - i * 0.1 }} />
          ))}
          <div style={{ height: '6px' }} />
          <div className="skeleton" style={{ width: '80px', height: '9px' }} />
          {[80, 90, 75].map((w, i) => (
            <div key={i} className="skeleton" style={{ width: `${w}%`, height: '6px', opacity: 1 - i * 0.1 }} />
          ))}
        </div>

        {/* AI prompt bar */}
        <div style={{ borderTop: '1px solid #27272a', padding: '10px 12px', background: '#111113' }}>
          <div style={{ background: '#09090b', border: '1px solid #a78bfa50', borderRadius: '8px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'linear-gradient(135deg, #a78bfa, #7c3aed)', flexShrink: 0 }} />
            <div className="skeleton" style={{ flex: 1, height: '7px' }} />
            <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SkeletonAdminPanel() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#0c0c0e', borderRadius: '12px 12px 0 0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Topbar */}
      <div style={{ height: '44px', background: '#131315', borderBottom: '1px solid #1f1f23', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '12px' }}>
        <div className="skeleton" style={{ width: '80px', height: '8px' }} />
        <div style={{ flex: 1 }} />
        <div className="skeleton" style={{ width: '120px', height: '26px', borderRadius: '8px' }} />
        <div className="skeleton" style={{ width: '26px', height: '26px', borderRadius: '8px' }} />
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', padding: '12px 14px 0' }}>
        {['#3b82f6','#8b5cf6','#22c55e','#f59e0b'].map((c, i) => (
          <div key={i} style={{ background: '#131315', border: `1px solid ${c}25`, borderRadius: '10px', padding: '10px' }}>
            <div className="skeleton" style={{ width: '30px', height: '6px', marginBottom: '6px' }} />
            <div className="skeleton" style={{ width: '44px', height: '12px' }} />
            <div style={{ marginTop: '6px', fontSize: '9px', color: c, fontFamily: 'Inter, sans-serif' }}>+12%</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ flex: 1, margin: '10px 14px 12px', background: '#131315', borderRadius: '10px', border: '1px solid #1f1f23', overflow: 'hidden' }}>
        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr 80px 60px 50px', gap: '8px', padding: '8px 12px', borderBottom: '1px solid #1f1f23' }}>
          {['','Name','Role','Status',''].map((h, i) => (
            <div key={i} style={{ fontSize: '9px', color: '#52525b', fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</div>
          ))}
        </div>

        {/* Table rows */}
        {[1, 0.8, 0.6, 0.45].map((op, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr 80px 60px 50px', gap: '8px', padding: '8px 12px', borderBottom: i < 3 ? '1px solid #1a1a1e' : 'none', opacity: op, alignItems: 'center' }}>
            <div className="skeleton" style={{ width: '22px', height: '22px', borderRadius: '50%' }} />
            <div>
              <div className="skeleton" style={{ width: '70px', height: '7px', marginBottom: '4px' }} />
              <div className="skeleton" style={{ width: '50px', height: '6px', opacity: 0.6 }} />
            </div>
            <div className="skeleton" style={{ width: '55px', height: '7px' }} />
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              padding: '2px 8px', borderRadius: '100px',
              background: ['#22c55e20','#f59e0b20','#22c55e20','#ef444420'][i],
              border: `1px solid ${['#22c55e40','#f59e0b40','#22c55e40','#ef444440'][i]}`,
            }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: ['#22c55e','#f59e0b','#22c55e','#ef4444'][i] }} />
              <div style={{ fontSize: '8px', color: ['#22c55e','#f59e0b','#22c55e','#ef4444'][i], fontFamily: 'Inter, sans-serif' }}>
                {['Active','Pending','Active','Inactive'][i]}
              </div>
            </div>
            <div className="skeleton" style={{ width: '22px', height: '22px', borderRadius: '6px' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   Project data
───────────────────────────────────────────────────────────────── */

const SHOWCASE = [
  {
    id: 'finovax',
    number: '01',
    title: 'FinovaX',
    subtitle: 'Fintech SaaS · Web + Mobile',
    description: 'Smarter financial control for modern businesses — dashboard overview, transaction management, payment flows, and analytics hub in one platform.',
    tags: ['SaaS Design', 'Fintech', 'Web + Mobile'],
    metric: { value: '63%', label: 'Task completion time reduced' },
    accent: '#2B7FFF',
    Skeleton: SkeletonFinovaX,
  },
  {
    id: 'playconnect',
    number: '02',
    title: 'PlayConnect',
    subtitle: 'Turf Booking Application',
    description: 'End-to-end mobile app for discovering and booking sports venues — from competitive analysis to a 4.6-star App Store launch.',
    tags: ['Mobile', 'Product Design', 'Consumer'],
    metric: { value: '4.6★', label: 'App Store rating' },
    accent: '#22c55e',
    Skeleton: SkeletonPlayConnect,
  },
  {
    id: 'prd-gen',
    number: '03',
    title: 'PRD Generator',
    subtitle: 'AI Product Tool',
    description: 'An AI-assisted interface that turns rough ideas into structured Product Requirement Documents — cutting PRD drafting time by 80%.',
    tags: ['AI Tool', 'Product', 'B2B'],
    metric: { value: '80%', label: 'Drafting time saved' },
    accent: '#a78bfa',
    Skeleton: SkeletonPRDGenerator,
  },
  {
    id: 'admin',
    number: '04',
    title: 'Admin Panel',
    subtitle: 'User Management System',
    description: 'A scalable admin console for role-based access control, user lifecycle management, and audit trails across enterprise products.',
    tags: ['System Design', 'B2B', 'Enterprise'],
    metric: { value: '200+', label: 'Components shipped' },
    accent: '#f59e0b',
    Skeleton: SkeletonAdminPanel,
  },
]

/* ─────────────────────────────────────────────────────────────────
   Scroll progress bar
───────────────────────────────────────────────────────────────── */

function ScrollTrack({ scrollRef }) {
  const [progress, setProgress] = useState(0)

  const onScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? el.scrollLeft / max : 0)
  }

  return (
    <div style={{ height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
      <motion.div
        style={{ height: '100%', borderRadius: '2px', background: 'rgba(255,255,255,0.35)', transformOrigin: 'left', scaleX: progress }}
        onViewportEnter={() => {
          scrollRef.current?.addEventListener('scroll', onScroll)
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   Project Card
───────────────────────────────────────────────────────────────── */

function ShowcaseCard({ project, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const { Skeleton } = project

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect && onSelect(project)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: '340px',
        height: '480px',
        borderRadius: '18px',
        background: '#111114',
        border: `1px solid ${hovered ? project.accent + '50' : 'rgba(255,255,255,0.07)'}`,
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.3s',
        position: 'relative',
      }}
    >
      {/* Skeleton preview — top 60% */}
      <div style={{ height: '285px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <Skeleton />
        {/* Fade-to-card at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
          background: 'linear-gradient(to top, #111114, transparent)',
          pointerEvents: 'none',
        }} />
        {/* Hover accent glow */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(ellipse at 50% 0%, ${project.accent}15 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Card content — bottom 40% */}
      <div style={{ flex: 1, padding: '1.1rem 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '0.75rem' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.58rem', fontWeight: 600,
                letterSpacing: '0.07em', textTransform: 'uppercase',
                color: project.accent,
                background: project.accent + '14',
                border: `1px solid ${project.accent}28`,
                borderRadius: '100px',
                padding: '0.22rem 0.6rem',
              }}>{tag}</span>
            ))}
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: '1.35rem', fontWeight: 400,
            letterSpacing: '-0.02em', lineHeight: 1.2,
            color: '#fff', marginBottom: '0.35rem',
          }}>
            {project.title}
          </h3>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.68rem', color: 'rgba(255,255,255,0.38)',
            letterSpacing: '0.03em', lineHeight: 1.55,
          }}>
            {project.description}
          </p>
        </div>

        {/* Footer — metric + arrow */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
            <span style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: '1.4rem', fontWeight: 400,
              color: project.accent,
            }}>
              {project.metric.value}
            </span>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.02em',
            }}>
              {project.metric.label}
            </span>
          </div>

          <motion.div
            animate={{ x: hovered ? 3 : 0, borderColor: hovered ? project.accent : 'rgba(255,255,255,0.1)' }}
            transition={{ duration: 0.25 }}
            style={{
              width: '32px', height: '32px', borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke={hovered ? project.accent : 'rgba(255,255,255,0.4)'}
              strokeWidth="2" style={{ transition: 'stroke 0.25s' }}
            >
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Number watermark */}
      <div style={{
        position: 'absolute', top: '12px', left: '14px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.55rem', letterSpacing: '0.14em',
        color: 'rgba(255,255,255,0.15)',
      }}>
        {project.number}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   Work Showcase — main export
───────────────────────────────────────────────────────────────── */

export default function WorkShowcase({ onSelectProject }) {
  const scrollRef = useRef(null)
  const sectionRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const headerY = useTransform(scrollYProgress, [0, 1], ['30px', '-30px'])

  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * 360, behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} style={{
      background: '#080808',
      padding: 'clamp(4rem, 8vw, 7rem) 0 clamp(4rem, 8vw, 6rem)',
      overflow: 'hidden',
    }}>
      {/* ── Header ── */}
      <motion.div style={{ y: headerY, padding: '0 clamp(1.5rem, 5vw, 3.5rem)', marginBottom: '3rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}
        >
          <div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6rem', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
              fontWeight: 600, marginBottom: '0.75rem',
            }}>
              Selected Work
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 300, fontStyle: 'italic',
              color: '#fff', lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}>
              Designing products that<br />think, scale, and feel right.
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)',
              lineHeight: 1.7, marginTop: '0.85rem',
              maxWidth: '480px',
            }}>
              Designing scalable digital products with a focus on usability, clarity, and impact.
            </p>
          </div>

          {/* Nav arrows */}
          <div style={{ display: 'flex', gap: '8px', paddingBottom: '4px' }}>
            {[{ dir: -1, icon: '←', can: canScrollLeft }, { dir: 1, icon: '→', can: canScrollRight }].map(({ dir, icon, can }) => (
              <button key={dir} onClick={() => scroll(dir)} style={{
                width: '40px', height: '40px', borderRadius: '50%',
                border: `1px solid ${can ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)'}`,
                background: 'none', color: can ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)',
                cursor: can ? 'pointer' : 'default',
                fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}>
                {icon}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Horizontal scroll track ── */}
      <div
        ref={scrollRef}
        className="work-scroll"
        onScroll={updateScrollState}
        style={{ padding: '0.5rem clamp(1.5rem, 5vw, 3.5rem) 1.5rem' }}
      >
        {SHOWCASE.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <ShowcaseCard project={project} onSelect={onSelectProject} />
          </motion.div>
        ))}

        {/* End spacer */}
        <div style={{ width: 'clamp(1.5rem, 5vw, 3.5rem)', flexShrink: 0 }} />
      </div>

      {/* ── Scroll progress bar ── */}
      <div style={{ padding: '0 clamp(1.5rem, 5vw, 3.5rem)', marginTop: '0.5rem' }}>
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
          <motion.div
            style={{ height: '100%', borderRadius: '2px', background: 'rgba(255,255,255,0.28)', originX: 0 }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>

        {/* Project count */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em' }}>
            SCROLL TO EXPLORE
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.08em' }}>
            {String(SHOWCASE.length).padStart(2, '0')} PROJECTS
          </span>
        </div>
      </div>
    </section>
  )
}
