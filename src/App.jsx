import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './components/Hero'
import AboutPage from './components/About'
import FunPage from './components/Fun'
import ContactPage from './components/Contact'
import Loader from './components/Loader'
import './App.css'

export default function App() {
  const [page, setPage] = useState('about')
  const [loaded, setLoaded] = useState(false)

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
            style={{ background: '#f0eeea', minHeight: '100vh' }}
          >
            <Navbar page={page} setPage={setPage} />
            {page === 'about' && <AboutPage />}
            {page === 'home' && <Home />}
            {page === 'fun' && <FunPage />}
            {page === 'contact' && <ContactPage />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
