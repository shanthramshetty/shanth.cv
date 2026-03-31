import { useRef, useState } from 'react'

export default function TiltedCard({
  children,
  maxTilt      = 15,
  scale        = 1.04,
  glareOpacity = 0.18,
  className    = '',
  style        = {},
}) {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState('')
  const [glare, setGlare]         = useState({ x: 50, y: 50, opacity: 0 })

  function handleMouseMove(e) {
    const card = cardRef.current
    if (!card) return
    const { left, top, width, height } = card.getBoundingClientRect()
    const x = (e.clientX - left) / width   // 0 → 1
    const y = (e.clientY - top)  / height  // 0 → 1
    const rotX = (0.5 - y) * maxTilt * 2
    const rotY = (x - 0.5) * maxTilt * 2
    setTransform(
      `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${scale},${scale},${scale})`
    )
    setGlare({ x: x * 100, y: y * 100, opacity: glareOpacity })
  }

  function handleMouseLeave() {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)')
    setGlare(g => ({ ...g, opacity: 0 }))
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform,
        transition: transform.includes('scale3d(1,1,1)')
          ? 'transform 0.6s cubic-bezier(0.22,1,0.36,1)'
          : 'transform 0.08s linear',
        willChange: 'transform',
        cursor: 'default',
        ...style,
      }}
    >
      {children}

      {/* Glare overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 60%)`,
          transition: 'opacity 0.3s ease',
          zIndex: 10,
        }}
      />
    </div>
  )
}
