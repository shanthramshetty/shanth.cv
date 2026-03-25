import { motion } from 'framer-motion'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
})

export default function Contact() {
  return (
    <main style={{
      minHeight: '100vh', background: '#f0eeea', paddingTop: '68px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '68px 2.5rem 4rem',
    }}>
      <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>

        <motion.h1 {...fade(0.05)} style={{ marginBottom: '1rem', lineHeight: 1 }}>
          <span style={{
            fontFamily: "'Caveat', cursive",
            fontSize: 'clamp(52px, 7vw, 80px)',
            color: '#111', display: 'block', lineHeight: 1,
          }}>
            Say hello,
          </span>
          <span style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
            fontWeight: 700, color: '#111', display: 'block',
            letterSpacing: '-0.02em', lineHeight: 1.15,
          }}>
            let's create something meaningful
          </span>
        </motion.h1>

        <motion.p {...fade(0.2)} style={{
          fontSize: '0.925rem', color: '#888', lineHeight: 1.8,
          marginBottom: '2.5rem', fontFamily: "'Inter', sans-serif",
        }}>
          Open to new opportunities in UX design and product strategy.
          Whether you have a project in mind or just want to connect — reach out.
        </motion.p>

        <motion.div {...fade(0.3)} style={{ marginBottom: '2.5rem' }}>
          <motion.a
            href="mailto:shanthram.shetty98@gmail.com"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-block',
              padding: '0.875rem 2.5rem',
              background: '#111', color: '#fff',
              borderRadius: '100px', textDecoration: 'none',
              fontSize: '0.9rem', fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.02em',
            }}
          >
            Say Hello ↗
          </motion.a>
        </motion.div>

        <motion.div {...fade(0.4)} style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem' }}>
          {[
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shanthram-shetty-6a26a6376', target: '_blank' },
            { label: 'Email', href: 'mailto:shanthram.shetty98@gmail.com' },
          ].map(s => (
            <a key={s.label} href={s.href} target={s.target} rel={s.target ? 'noopener noreferrer' : undefined}
              style={{
                fontSize: '0.875rem', color: '#aaa', textDecoration: 'none',
                letterSpacing: '0.04em', fontFamily: "'Inter', sans-serif",
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = '#111'}
              onMouseLeave={e => e.target.style.color = '#aaa'}
            >
              {s.label}
            </a>
          ))}
        </motion.div>

      </div>

      <motion.div {...fade(0.5)} style={{
        position: 'absolute', bottom: '2rem',
        display: 'flex', justifyContent: 'center', gap: '1rem',
        fontSize: '0.72rem', color: '#ccc', fontFamily: "'Inter', sans-serif",
      }}>
        <span>© {new Date().getFullYear()} Shanthram Shetty</span>
        <span>·</span>
        <span>Mangaluru, Karnataka, India</span>
      </motion.div>
    </main>
  )
}
