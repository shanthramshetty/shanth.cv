import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function TrueFocus({
  sentence     = 'True Focus',
  manualMode   = false,
  blurAmount   = 5,
  borderColor  = '#6366f1',
  glowColor    = 'rgba(99,102,241,0.35)',
  animDuration = 0.4,
  pauseBetween = 1.2,
  fontSize     = 'clamp(1.4rem, 2.8vw, 2rem)',
  fontFamily   = "'DM Serif Display', serif",
  color        = '#ffffff',
}) {
  const words        = sentence.split(' ')
  const [activeIdx,  setActiveIdx] = useState(0)
  const [hoverIdx,   setHoverIdx]  = useState(null)
  const [focusRect,  setFocusRect] = useState(null)
  const wordRefs     = useRef([])
  const containerRef = useRef(null)

  const focusedIdx = manualMode ? (hoverIdx ?? 0) : activeIdx

  /* Auto-cycle */
  useEffect(() => {
    if (manualMode) return
    const id = setInterval(
      () => setActiveIdx(i => (i + 1) % words.length),
      (animDuration + pauseBetween) * 1000
    )
    return () => clearInterval(id)
  }, [manualMode, words.length, animDuration, pauseBetween])

  /* Measure focused word → bracket position */
  const updateRect = useCallback(() => {
    const el  = wordRefs.current[focusedIdx]
    const box = containerRef.current
    if (!el || !box) return
    const eR = el.getBoundingClientRect()
    const bR = box.getBoundingClientRect()
    setFocusRect({
      left:   eR.left - bR.left - 8,
      top:    eR.top  - bR.top  - 6,
      width:  eR.width  + 16,
      height: eR.height + 12,
    })
  }, [focusedIdx])

  useEffect(() => { updateRect() }, [updateRect])
  useEffect(() => {
    window.addEventListener('resize', updateRect)
    return () => window.removeEventListener('resize', updateRect)
  }, [updateRect])

  /* Spring config — bracket glides smoothly between words */
  const spring = { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }

  return (
    <span
      ref={containerRef}
      style={{
        position:   'relative',
        display:    'inline-flex',
        flexWrap:   'wrap',
        gap:        '0.3em',
        alignItems: 'center',
      }}
    >
      {words.map((word, i) => {
        const focused = i === focusedIdx
        return (
          <span
            key={i}
            ref={el => (wordRefs.current[i] = el)}
            onMouseEnter={() => manualMode && setHoverIdx(i)}
            onMouseLeave={() => manualMode && setHoverIdx(null)}
            style={{
              display:    'inline-block',
              fontFamily,
              fontSize,
              color,
              fontWeight: 400,
              lineHeight: 1.15,
              filter:  focused ? 'blur(0px)' : `blur(${blurAmount}px)`,
              opacity: focused ? 1 : 0.28,
              /* Smooth, slightly springy easing on the words themselves */
              transition: `filter ${animDuration * 0.9}s cubic-bezier(0.25,0.46,0.45,0.94),
                           opacity ${animDuration * 0.9}s cubic-bezier(0.25,0.46,0.45,0.94)`,
            }}
          >
            {word}
          </span>
        )
      })}

      {/* Single persistent bracket — springs to the focused word */}
      {focusRect && (
        <motion.span
          /* No key change — this element stays mounted and animates position */
          animate={{
            left:   focusRect.left,
            top:    focusRect.top,
            width:  focusRect.width,
            height: focusRect.height,
            opacity: 1,
          }}
          initial={{ opacity: 0 }}
          transition={spring}
          style={{
            position:      'absolute',
            pointerEvents: 'none',
            borderRadius:  '4px',
            boxShadow:     `0 0 14px 3px ${glowColor}`,
          }}
        >
          <span style={{
            position: 'absolute', top: 0, left: 0,
            width: '10px', height: '10px',
            borderTop:  `2px solid ${borderColor}`,
            borderLeft: `2px solid ${borderColor}`,
          }} />
          <span style={{
            position: 'absolute', top: 0, right: 0,
            width: '10px', height: '10px',
            borderTop:   `2px solid ${borderColor}`,
            borderRight: `2px solid ${borderColor}`,
          }} />
          <span style={{
            position: 'absolute', bottom: 0, left: 0,
            width: '10px', height: '10px',
            borderBottom: `2px solid ${borderColor}`,
            borderLeft:   `2px solid ${borderColor}`,
          }} />
          <span style={{
            position: 'absolute', bottom: 0, right: 0,
            width: '10px', height: '10px',
            borderBottom: `2px solid ${borderColor}`,
            borderRight:  `2px solid ${borderColor}`,
          }} />
        </motion.span>
      )}
    </span>
  )
}
