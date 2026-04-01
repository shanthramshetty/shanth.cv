import { motion } from 'framer-motion'
import { useState } from 'react'

const projects = [
  {
    number: '01',
    title: 'FluxPay — Fintech SaaS',
    description: 'Finance teams were operating across five disconnected tools to complete a single approval — not because the product lacked data, but because it lacked hierarchy. A week of user shadowing revealed the real problem: no one had a complete picture of where anything stood. Restructured the IA, reduced approval steps from six to two, and built a component system adopted across three product teams. Task completion time dropped 63%, measured across 12 usability sessions post-launch.',
    tags: ['Product Design', 'Figma', 'Design Systems', 'Fintech'],
    type: 'Case Study',
    year: '2025',
  },
  {
    number: '02',
    title: 'PlayConnect — Turf Booking',
    description: 'Sports venue booking in India is still largely phone-based — call ahead, hope the slot is free, pay on arrival. The real problem wasn\'t convenience. It was trust. Designed and built end-to-end in Flutter: real-time slot availability and upfront pricing weren\'t features added at the end — they were the product\'s core promise, designed in from the first flow. Being the designer and developer forced every interaction to earn its complexity.',
    tags: ['Flutter', 'Mobile Design', 'Product Thinking', 'Firebase'],
    type: 'Case Study',
    year: '2025',
  },
  {
    number: '03',
    title: 'AI Analytics Dashboard',
    description: 'When an AI model tells you something is likely to happen, the interface needs to give you a basis to decide whether to act on it. Most AI dashboards ignore this entirely. Redesigned the data hierarchy and introduced confidence indicators — not as visual decoration, but as a product integrity decision. The entry point to the feature was visible; users just couldn\'t interpret what they were looking at. Feature adoption grew 47% in six weeks against a 90-day pre-launch baseline.',
    tags: ['Figma', 'AI Product Design', 'User Flows', 'Accessibility'],
    type: 'Case Study',
    year: '2024',
  },
  {
    number: '04',
    title: 'Enterprise Design System',
    description: 'Design systems fail not because the components are wrong — but because no one agrees on what they\'re for. Five product teams at 7EDGE were building the same UI patterns in parallel, each slightly differently. I led the architecture solo: 200+ components, a full token layer, Storybook parity with engineering, and a contribution process so teams added back rather than forked. Handoff time dropped 50%. The harder outcome: teams started treating the system as shared infrastructure, not a constraint.',
    tags: ['Design Systems', 'Token Architecture', 'Figma', 'Storybook'],
    type: 'System Design',
    year: '2024',
  },
]

function ProjectRow({ project, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '56px 1fr auto',
        gap: '1.5rem',
        padding: '1.5rem 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        alignItems: 'start',
        cursor: 'default',
      }}
    >
      <p style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: '0.8rem',
        color: hovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.18)',
        transition: 'color 0.3s',
        paddingTop: '0.2rem',
        letterSpacing: '0.05em',
      }}>
        {project.number}
      </p>

      <div>
        <h3 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
          fontWeight: 400,
          color: hovered ? '#ffffff' : 'rgba(255,255,255,0.8)',
          marginBottom: '0.4rem',
          transition: 'color 0.3s',
          letterSpacing: '-0.01em',
        }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.82rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.35)', maxWidth: '520px', marginBottom: '0.75rem' }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              padding: '0.15rem 0.65rem', fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.35)', backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)', borderRadius: '100px',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', paddingTop: '0.2rem' }}>
        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{project.type}</span>
        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.18)' }}>{project.year}</span>
        <a href="#" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500, transition: 'opacity 0.2s' }}
          onMouseEnter={e => e.target.style.opacity = '0.4'} onMouseLeave={e => e.target.style.opacity = '1'}>
          View ↗
        </a>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section
      id="projects"
      style={{
        height: '100vh',
        scrollSnapAlign: 'start',
        backgroundColor: '#000000',
        color: '#ffffff',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Ghost title */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, overflow: 'hidden', lineHeight: 1, pointerEvents: 'none' }}>
        <span style={{
          display: 'block',
          fontFamily: "'DM Serif Display', serif",
          fontSize: 'clamp(100px, 18vw, 220px)',
          fontWeight: 400,
          letterSpacing: '-0.04em',
          color: 'rgba(255,255,255,0.04)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          lineHeight: 0.85,
        }}>
          WORK
        </span>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', padding: '0 3rem', paddingTop: '80px', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '2rem' }}
        >
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '0.75rem', fontFamily: "'Inter', sans-serif" }}>
            Selected Work
          </p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Work that shipped.
          </h2>
        </motion.div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {projects.map((p, i) => <ProjectRow key={p.number} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}
