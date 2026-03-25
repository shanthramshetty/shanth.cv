import { motion } from 'framer-motion'
import { useState } from 'react'

const projects = [
  {
    number: '01',
    title: 'Fintech SaaS Platform',
    description: 'End-to-end UX for a fintech platform at 7EDGE — research, IA, wireframing, and high-fidelity prototypes for complex transaction-based dashboards.',
    tags: ['Figma', 'UX Research', 'Prototyping', 'Design Systems'],
    type: 'Case Study',
    year: '2024',
  },
  {
    number: '02',
    title: 'AI-Driven SaaS Dashboard',
    description: 'Redesigned IA and user flows for an AI-driven SaaS product. Focused on accessibility, responsiveness, and cross-platform consistency.',
    tags: ['Figma', 'Interaction Design', 'User Flows', 'Accessibility'],
    type: 'Case Study',
    year: '2024',
  },
  {
    number: '03',
    title: 'Mobile App UI/UX — Freelance',
    description: 'Branding and UI/UX for mobile apps across LinkedIn and Upwork clients. Logos, marketing assets, and user interfaces aligned with business goals.',
    tags: ['Mobile Design', 'Branding', 'Figma', 'User Research'],
    type: 'Freelance',
    year: '2023',
  },
  {
    number: '04',
    title: 'Design System Components',
    description: 'Built and maintained a reusable design system at 7EDGE for visual consistency and dev efficiency across product modules and teams.',
    tags: ['Design Systems', 'Component Library', 'Figma', 'Tokens'],
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
            Projects
          </h2>
        </motion.div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {projects.map((p, i) => <ProjectRow key={p.number} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}
