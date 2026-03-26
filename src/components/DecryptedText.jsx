import { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'

const styles = {
  wrapper: { display: 'inline-block', whiteSpace: 'pre-wrap' },
  srOnly: {
    position: 'absolute', width: '1px', height: '1px',
    padding: 0, margin: '-1px', overflow: 'hidden',
    clip: 'rect(0,0,0,0)', border: 0,
  },
}

const DEFAULT_COLORS = [
  '#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff',
  '#ff922b', '#cc5de8', '#20c997', '#f06595',
  '#74c0fc', '#a9e34b',
]

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  colorized = false,
  colors = DEFAULT_COLORS,
  revealedColor,
  onComplete,
  ...props
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)
  const [revealedIndices, setRevealedIndices] = useState(new Set())
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isDecrypted, setIsDecrypted] = useState(false)
  const [charColors, setCharColors] = useState([])
  const containerRef = useRef(null)
  const revealedRef = useRef(new Set())

  const availableChars = useMemo(() => (
    useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter(c => c !== ' ')
      : characters.split('')
  ), [useOriginalCharsOnly, text, characters])

  const randomColor = useCallback(() => colors[Math.floor(Math.random() * colors.length)], [colors])

  const shuffleText = useCallback((originalText, currentRevealed) =>
    originalText.split('').map((char, i) => {
      if (char === ' ') return ' '
      if (currentRevealed.has(i)) return originalText[i]
      return availableChars[Math.floor(Math.random() * availableChars.length)]
    }).join('')
  , [availableChars])

  const randomizeColors = useCallback((revealedSet, len) => {
    if (!colorized) return
    setCharColors(Array.from({ length: len }, (_, i) =>
      revealedSet.has(i) ? (revealedColor || null) : randomColor()
    ))
  }, [colorized, randomColor, revealedColor])

  const triggerDecrypt = useCallback(() => {
    revealedRef.current = new Set()
    setRevealedIndices(new Set())
    setIsDecrypted(false)
    setIsAnimating(true)
  }, [])

  useEffect(() => {
    if (!isAnimating) return
    let currentIteration = 0

    const getNextIndex = revealedSet => {
      const len = text.length
      if (revealDirection === 'end') return len - 1 - revealedSet.size
      if (revealDirection === 'center') {
        const mid = Math.floor(len / 2)
        const offset = Math.floor(revealedSet.size / 2)
        const next = revealedSet.size % 2 === 0 ? mid + offset : mid - offset - 1
        if (next >= 0 && next < len && !revealedSet.has(next)) return next
        for (let i = 0; i < len; i++) if (!revealedSet.has(i)) return i
        return 0
      }
      return revealedSet.size
    }

    const interval = setInterval(() => {
      const prev = revealedRef.current
      if (sequential) {
        if (prev.size < text.length) {
          const next = getNextIndex(prev)
          const newSet = new Set(prev)
          newSet.add(next)
          revealedRef.current = newSet
          setRevealedIndices(newSet)
          setDisplayText(shuffleText(text, newSet))
          randomizeColors(newSet, text.length)
        } else {
          clearInterval(interval)
          setIsAnimating(false)
          setIsDecrypted(true)
          onComplete?.()
        }
      } else {
        setDisplayText(shuffleText(text, prev))
        randomizeColors(prev, text.length)
        currentIteration++
        if (currentIteration >= maxIterations) {
          clearInterval(interval)
          setIsAnimating(false)
          setDisplayText(text)
          setIsDecrypted(true)
          onComplete?.()
        }
      }
    }, speed)

    return () => clearInterval(interval)
  }, [isAnimating, text, speed, maxIterations, sequential, revealDirection, shuffleText, randomizeColors, onComplete])

  useEffect(() => {
    if (animateOn !== 'view') return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          triggerDecrypt()
          setHasAnimated(true)
        }
      })
    }, { threshold: 0.1 })
    const el = containerRef.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [animateOn, hasAnimated, triggerDecrypt])

  useEffect(() => {
    revealedRef.current = new Set()
    setDisplayText(text)
    setIsDecrypted(false)
    setRevealedIndices(new Set())
  }, [text])

  return (
    <motion.span className={parentClassName} ref={containerRef} style={styles.wrapper} {...props}>
      <span style={styles.srOnly}>{text}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, i) => {
          const revealed = revealedIndices.has(i) || (!isAnimating && isDecrypted)
          const color = colorized && !revealed && charColors[i] ? charColors[i] : undefined
          return (
            <span
              key={i}
              className={revealed ? className : encryptedClassName}
              style={color ? { color } : undefined}
            >
              {char}
            </span>
          )
        })}
      </span>
    </motion.span>
  )
}
