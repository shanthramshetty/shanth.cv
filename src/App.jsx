import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Work from './components/Work'
import AboutPage from './components/About'
import FunSection from './components/FunSection'
import ContactPage from './components/Contact'
import Loader from './components/Loader'
import './App.css'

/* Background color per page — drives the wrapper bg transition */
const PAGE_BG = {
  home:    '#0f0f11',
  about:   '#f0eeea',
  work:    '#0a0a0a',
  fun:     '#0a0a0a',
  contact: '#f0eeea',
}

function PageWrap({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const [page, setPage] = useState('home')
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
            style={{
              background: PAGE_BG[page] ?? '#fafaf8',
              minHeight: '100vh',
              transition: 'background 0.5s ease',
            }}
          >
            <Navbar page={page} setPage={setPage} />

            <AnimatePresence mode="wait">
              {page === 'home'    && <PageWrap key="home"><Hero setPage={setPage} /></PageWrap>}
              {page === 'about'   && <PageWrap key="about"><AboutPage /></PageWrap>}
              {page === 'work'    && <PageWrap key="work"><Work /></PageWrap>}
              {page === 'fun'     && <PageWrap key="fun"><FunSection /></PageWrap>}
              {page === 'contact' && <PageWrap key="contact"><ContactPage /></PageWrap>}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
