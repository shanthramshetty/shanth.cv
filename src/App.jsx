import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Work from './components/Work'
import AboutPage from './components/About'
import FunPage from './components/Fun'
import ContactPage from './components/Contact'
import Loader from './components/Loader'
import './App.css'

export default function App() {
  const [page, setPage] = useState('about')
  const [loaded, setLoaded] = useState(false)
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    lenisRef.current = lenis
    let rafId
    const raf = time => { lenis.raf(time); rafId = requestAnimationFrame(raf) }
    rafId = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(rafId); lenis.destroy() }
  }, [])

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [page])

  return (
    <>
      <Loader onStart={() => setLoaded(true)} onDone={() => {}} />

      <AnimatePresence>
        {loaded && (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ background: page === 'fun' ? '#0a0a0a' : '#f0eeea', minHeight: '100vh', transition: 'background 0.5s' }}
          >
            <Navbar page={page} setPage={setPage} />
            {page === 'about' && <AboutPage />}
            {page === 'home' && <Work />}
            {page === 'fun' && <FunPage />}
            {page === 'contact' && <ContactPage />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
