import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Hero'
import AboutPage from './components/About'
import FunPage from './components/Fun'
import ContactPage from './components/Contact'
import './App.css'

export default function App() {
  const [page, setPage] = useState('about')

  return (
    <div style={{ background: '#f0eeea', minHeight: '100vh' }}>
      <Navbar page={page} setPage={setPage} />
      {page === 'about' && <AboutPage />}
      {page === 'home' && <Home />}
      {page === 'fun' && <FunPage />}
      {page === 'contact' && <ContactPage />}
    </div>
  )
}
