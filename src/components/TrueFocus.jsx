import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

/*
  TrueFocus — depth-of-field word cycling animation.
  Props:
    sentence      — string of space-separated words
    manualMode    — if true, hover controls focus instead of auto
    blurAmount    — px blur on unfocused words (default 5)
    borderColor   — CSS color for the focus brackets
    glowColor     — CSS rgba for the glow behind brackets
    animDuration  — seconds per transition (default 0.4)
    pauseBetween  — seconds to hold each word (default 1.2)
*/
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
  const [activeIdx,  setActiveIdx]  = useState(0)
  const [hoverIdx,   setHoverIdx]   = useState(null)
  const [focusRect,  setFocusRect]  = useState(null)
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

  /* Measure focused word → position brackets */
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

  return (
    <span
      ref={containerRef}
      style={{
        position: 'relative',
        display:  'inline-flex',
        flexWrap: 'wrap',
        gap:      '0.3em',
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
              filter:     focused ? 'blur(0px)' : `blur(${blurAmount}px)`,
              opacity:    focused ? 1 : 0.3,
              transition: `filter ${animDuration}s ease, opacity ${animDuration}s ease`,
            }}
          >
            {word}
          </span>
        )
      })}

      {/* Animated focus bracket */}
      {focusRect && (
        <motion.span
          key={`bracket-${focusedIdx}`}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{    opacity: 0 }}
          transition={{ duration: animDuration, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position:      'absolute',
            pointerEvents: 'none',
            left:          focusRect.left,
            top:           focusRect.top,
            width:         focusRect.width,
            height:        focusRect.height,
            borderRadius:  '4px',
            boxShadow:     `0 0 14px 3px ${glowColor}`,
          }}
        >
          {/* Top-left corner */}
          <span style={{
            position: 'absolute', top: 0, left: 0,
            width: '10px', height: '10px',
            borderTop:  `2px solid ${borderColor}`,
            borderLeft: `2px solid ${borderColor}`,
          }} />
          {/* Top-right corner */}
          <span style={{
            position: 'absolute', top: 0, right: 0,
            width: '10px', height: '10px',
            borderTop:   `2px solid ${borderColor}`,
            borderRight: `2px solid ${borderColor}`,
          }} />
          {/* Bottom-left corner */}
          <span style={{
            position: 'absolute', bottom: 0, left: 0,
            width: '10px', height: '10px',
            borderBottom: `2px solid ${borderColor}`,
            borderLeft:   `2px solid ${borderColor}`,
          }} />
          {/* Bottom-right corner */}
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
