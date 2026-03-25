import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const N = 120

export default function HeroBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement
    const W = parent.offsetWidth
    const H = parent.offsetHeight

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
    camera.position.z = 20

    // Build particle field
    const basePos = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      basePos[i * 3]     = (Math.random() - 0.5) * 44
      basePos[i * 3 + 1] = (Math.random() - 0.5) * 32
      basePos[i * 3 + 2] = (Math.random() - 0.5) * 18
    }

    const geometry = new THREE.BufferGeometry()
    const posAttr = new THREE.BufferAttribute(basePos.slice(), 3)
    geometry.setAttribute('position', posAttr)

    const material = new THREE.PointsMaterial({
      color: 0xc4bfb8,
      size: 0.14,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Mouse parallax
    let mouseX = 0
    let mouseY = 0
    let camTargetX = 0
    let camTargetY = 0

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    const onResize = () => {
      const w = parent.offsetWidth
      const h = parent.offsetHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    let rafId
    let time = 0
    const pos = posAttr.array

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      time += 0.008

      // Sine-wave drift on Y
      for (let i = 0; i < N; i++) {
        pos[i * 3 + 1] = basePos[i * 3 + 1] + Math.sin(time + i * 0.7) * 0.28
      }
      posAttr.needsUpdate = true

      // Camera: slow orbit + mouse parallax (lerp)
      camTargetX += (mouseX - camTargetX) * 0.04
      camTargetY += (mouseY - camTargetY) * 0.04
      camera.position.x = Math.sin(time * 0.1) * 2 + camTargetX * 1.8
      camera.position.y = camTargetY * 1.2
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
