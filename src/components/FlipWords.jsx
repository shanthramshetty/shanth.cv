import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * FlipWords — cycles through an array of words with a 3D rotateX flip.
 *
 * Props:
 *   words      — string[]  words to cycle through
 *   interval   — number    ms between flips (default 2500)
 *   color      — string    text color of the animated word
 *   style      — object    extra inline styles applied to the wrapper span
 */
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

  return (
    /* perspective wrapper — required for 3D depth */
    <span style={{ display: 'inline-block', perspective: '600px', perspectiveOrigin: '50% 50%', ...style }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ rotateX: 90, opacity: 0, y: 8 }}
          animate={{ rotateX: 0,  opacity: 1, y: 0 }}
          exit={{    rotateX: -70, opacity: 0, y: -6 }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            display: 'inline-block',
            transformOrigin: '50% 100%',
            color,
            willChange: 'transform, opacity',
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
