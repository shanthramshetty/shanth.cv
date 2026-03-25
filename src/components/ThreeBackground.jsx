import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT = 140
const MAX_DISTANCE = 120
const SPEED = 0.18

export default function ThreeBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    // Scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 2000)
    camera.position.z = 500

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    // Particles
    const positions = []
    const velocities = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions.push(
        (Math.random() - 0.5) * el.clientWidth,
        (Math.random() - 0.5) * el.clientHeight,
        (Math.random() - 0.5) * 200
      )
      velocities.push(
        (Math.random() - 0.5) * SPEED,
        (Math.random() - 0.5) * SPEED,
        0
      )
    }

    const dotGeo = new THREE.BufferGeometry()
    const posArr = new Float32Array(positions)
    dotGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3))
    const dotMat = new THREE.PointsMaterial({ color: 0xffffff, size: 2.2, transparent: true, opacity: 0.55 })
    const dots = new THREE.Points(dotGeo, dotMat)
    scene.add(dots)

    // Lines
    const linePositions = new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6)
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    const lineMat = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08, vertexColors: false })
    )
    scene.add(lineMat)

    // Mouse
    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // Resize
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(el.clientWidth, el.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // Animation
    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)

      const pos = dotGeo.attributes.position.array

      // Move particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 3] += velocities[i * 3]
        pos[i * 3 + 1] += velocities[i * 3 + 1]

        const hw = el.clientWidth / 2
        const hh = el.clientHeight / 2
        if (pos[i * 3] > hw || pos[i * 3] < -hw) velocities[i * 3] *= -1
        if (pos[i * 3 + 1] > hh || pos[i * 3 + 1] < -hh) velocities[i * 3 + 1] *= -1
      }
      dotGeo.attributes.position.needsUpdate = true

      // Update lines
      let lineIdx = 0
      const lp = lineGeo.attributes.position.array
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = pos[i * 3] - pos[j * 3]
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DISTANCE) {
            lp[lineIdx++] = pos[i * 3]
            lp[lineIdx++] = pos[i * 3 + 1]
            lp[lineIdx++] = pos[i * 3 + 2]
            lp[lineIdx++] = pos[j * 3]
            lp[lineIdx++] = pos[j * 3 + 1]
            lp[lineIdx++] = pos[j * 3 + 2]
          } else {
            lp[lineIdx++] = 0; lp[lineIdx++] = 0; lp[lineIdx++] = 0
            lp[lineIdx++] = 0; lp[lineIdx++] = 0; lp[lineIdx++] = 0
          }
        }
      }
      lineGeo.attributes.position.needsUpdate = true
      lineGeo.setDrawRange(0, lineIdx / 3)

      // Subtle camera drift with mouse
      camera.position.x += (mouse.x * 30 - camera.position.x) * 0.03
      camera.position.y += (mouse.y * 20 - camera.position.y) * 0.03
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  )
}
