import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const letterVariants = {
  initial: {
    rotateX: 90,
    y: 16,
    opacity: 0,
    filter: 'blur(8px)',
  },
  animate: (i) => ({
    rotateX: 0,
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.06,
      duration: 0.55,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  }),
  exit: (i) => ({
    rotateX: -90,
    y: -16,
    opacity: 0,
    filter: 'blur(8px)',
    transition: {
      delay: i * 0.03,
      duration: 0.3,
      ease: 'easeIn',
    },
  }),
}

export default function FlipWords({
  words,
  interval = 2500,
  color = 'inherit',
  style = {},
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % words.length), interval)
    return () => clearInterval(t)
  }, [words, interval])

  const word = words[index]

  return (
    <span style={{ display: 'inline-block', perspective: '1000px', ...style }}>
      <AnimatePresence mode="wait">
        <span
          key={word}
          style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
        >
          {word.split('').map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              custom={i}
              variants={letterVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                display: 'inline-block',
                transformStyle: 'preserve-3d',
                color,
                whiteSpace: char === ' ' ? 'pre' : 'normal',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>
      </AnimatePresence>
    </span>
  )
}
