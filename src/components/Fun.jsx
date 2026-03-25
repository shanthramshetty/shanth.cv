import { motion } from 'framer-motion'

export default function Fun() {
  return (
    <main style={{
      minHeight: '100vh', background: '#f0eeea', paddingTop: '68px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ textAlign: 'center' }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "'Caveat', cursive", fontSize: '3.5rem', color: '#111', lineHeight: 1 }}
        >
          Coming soon
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.75rem', fontFamily: "'Inter', sans-serif" }}
        >
          Some fun projects are in the works.
        </motion.p>
      </div>
    </main>
  )
}
