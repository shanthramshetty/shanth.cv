import { motion } from 'framer-motion'

const categories = [
  { name: 'Product Design', items: ['Product Thinking', 'UX Research', 'Wireframing', 'Prototyping', 'User Flows', 'Information Architecture'] },
  { name: 'Design Tools', items: ['Figma', 'Design Systems', 'Interaction Design', 'Component Libraries', 'HTML & CSS', 'Responsive Design'] },
  { name: 'Development', items: ['Flutter', 'Dart', 'Java', 'C#', 'WPF / XAML', 'Node.js', 'PostgreSQL', 'REST APIs'] },
  { name: 'Certifications', items: ['AWS Cloud Practitioner', 'Google UX Design', 'Cloud & DevOps', 'Android & Flutter'] },
]

export default function Skills() {
  return (
    <section
      id="skills"
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
          display: 'block', fontFamily: "'DM Serif Display', serif",
          fontSize: 'clamp(100px, 18vw, 220px)', fontWeight: 400, letterSpacing: '-0.04em',
          color: 'rgba(255,255,255,0.04)', whiteSpace: 'nowrap', userSelect: 'none', lineHeight: 0.85,
        }}>
          SKILLS
        </span>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', padding: '0 3rem', paddingTop: '80px', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '3rem' }}
        >
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '0.75rem', fontFamily: "'Inter', sans-serif" }}>
            #3 / THE TOOLS
          </p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, color: '#ffffff', letterSpacing: '-0.02em' }}>
            What I work with
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2.5rem 2rem' }}>
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: ci * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <p style={{
                fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.28)', marginBottom: '1.25rem', fontFamily: "'Inter', sans-serif",
              }}>
                {cat.name}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {cat.items.map((item) => (
                  <span key={item} style={{
                    fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.5, transition: 'color 0.2s', cursor: 'default',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
