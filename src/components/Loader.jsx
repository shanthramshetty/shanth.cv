import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DecryptedText from './DecryptedText'

const QUOTES = [
  {
    text: 'design is intelligence made visible.',
    author: 'Alina Wheeler',
    role: 'Brand identity designer',
    photo: null,
    initials: 'AW',
  },
  {
    text: 'less, but better.',
    author: 'Dieter Rams',
    role: 'Industrial designer',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Dieter_Rams_2.jpg/120px-Dieter_Rams_2.jpg',
    initials: 'DR',
  },
  {
    text: 'good design is obvious. great design is transparent.',
    author: 'Joe Sparano',
    role: 'Graphic designer',
    photo: null,
    initials: 'JS',
  },
  {
    text: 'design is not just what it looks like. design is how it works.',
    author: 'Steve Jobs',
    role: 'Co-founder, Apple',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/120px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg',
    initials: 'SJ',
  },
]

const LIGHT_COLORS = [
  'rgba(99,102,241,0.18)',
  'rgba(236,72,153,0.18)',
  'rgba(20,184,166,0.18)',
  'rgba(245,158,11,0.16)',
  'rgba(139,92,246,0.18)',
  'rgba(34,197,94,0.14)',
  'rgba(239,68,68,0.16)',
  'rgba(59,130,246,0.18)',
  'rgba(249,115,22,0.16)',
  'rgba(168,85,247,0.18)',
]

function AuthorAvatar({ photo, initials }) {
  const [imgFailed, setImgFailed] = useState(false)

  if (photo && !imgFailed) {
    return (
      <img
        src={photo}
        alt={initials}
        onError={() => setImgFailed(true)}
        style={{
          width: '44px', height: '44px', borderRadius: '50%',
          objectFit: 'cover', objectPosition: 'center top',
          border: '1px solid rgba(255,255,255,0.12)',
          flexShrink: 0,
        }}
      />
    )
  }

  return (
    <div style={{
      width: '44px', height: '44px', borderRadius: '50%',
      background: 'rgba(255,255,255,0.07)',
      border: '1px solid rgba(255,255,255,0.12)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.7rem', fontWeight: 600,
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: '0.04em',
      }}>
        {initials}
      </span>
    </div>
  )
}

export default function Loader({ onDone, onStart }) {
  const [visible, setVisible] = useState(true)
  const [showAuthor, setShowAuthor] = useState(false)
  const [glowColor, setGlowColor] = useState(LIGHT_COLORS[0])
  const [decryptDone, setDecryptDone] = useState(false)
  const colorIdxRef = useRef(0)
  const intervalRef = useRef(null)

  const quote = useRef(QUOTES[Math.floor(Math.random() * QUOTES.length)]).current

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      colorIdxRef.current = (colorIdxRef.current + 1) % LIGHT_COLORS.length
      setGlowColor(LIGHT_COLORS[colorIdxRef.current])
    }, 280)

    const hard = setTimeout(() => setVisible(false), 7000)
    return () => {
      clearInterval(intervalRef.current)
      clearTimeout(hard)
    }
  }, [])

  const handleDecryptDone = () => {
    clearInterval(intervalRef.current)
    setDecryptDone(true)
    setShowAuthor(true)
    setTimeout(() => {
      onStart?.()       // start fading in the page
      setVisible(false) // start fading out the loader simultaneously
    }, 2200)
  }

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: '#0a0a0b',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '2rem',
            overflow: 'hidden',
          }}
        >
          {/* Cycling background glow */}
          <motion.div
            animate={{ background: glowColor, opacity: decryptDone ? 0 : 1 }}
            transition={{
              background: { duration: 0.25, ease: 'easeInOut' },
              opacity: { duration: 1.2, ease: 'easeOut' },
            }}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          />

          {/* Radial mask — concentrates glow to center */}
          <motion.div
            animate={{ opacity: decryptDone ? 0 : 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, #0a0a0b 100%)',
              pointerEvents: 'none', zIndex: 1,
            }}
          />

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              textAlign: 'center', maxWidth: '680px',
              position: 'relative', zIndex: 2,
              marginBottom: '2rem',
            }}
          >
            <DecryptedText
              text={quote.text}
              speed={38}
              sequential
              revealDirection="start"
              animateOn="view"
              onComplete={handleDecryptDone}
              parentClassName="loader-quote"
              className="loader-quote-revealed"
              encryptedClassName="loader-quote-encrypted"
            />
          </motion.div>

          {/* Author card */}
          <AnimatePresence>
            {showAuthor && (
              <motion.div
                initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.9rem',
                  position: 'relative', zIndex: 2,
                }}
              >
                <AuthorAvatar photo={quote.photo} initials={quote.initials} />
                <div style={{ textAlign: 'left' }}>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.82rem', fontWeight: 600,
                    color: 'rgba(255,255,255,0.75)',
                    letterSpacing: '0.01em',
                    marginBottom: '0.15rem',
                  }}>
                    {quote.author}
                  </p>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.68rem', fontWeight: 400,
                    color: 'rgba(255,255,255,0.28)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}>
                    {quote.role}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom progress bar */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '1px', background: 'rgba(255,255,255,0.07)', zIndex: 2,
          }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 6, ease: 'linear' }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                transformOrigin: 'left',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
