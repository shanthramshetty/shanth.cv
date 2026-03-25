import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function createDotTexture() {
  const s = 64
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0,    'rgba(255,255,255,1)')
  g.addColorStop(0.35, 'rgba(255,255,255,0.85)')
  g.addColorStop(0.7,  'rgba(255,255,255,0.3)')
  g.addColorStop(1,    'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  return new THREE.CanvasTexture(c)
}

function fibSphere(n, r) {
  const out = new Float32Array(n * 3)
  const phi = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y  = 1 - (i / (n - 1)) * 2
    const rr = Math.sqrt(Math.max(0, 1 - y * y))
    const t  = phi * i
    out[i * 3]     = r * rr * Math.cos(t)
    out[i * 3 + 1] = r * y
    out[i * 3 + 2] = r * rr * Math.sin(t)
  }
  return out
}

const ss  = (e0, e1, x) => { const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t) }
const mix = (a, b, t) => a + (b - a) * t

const N      = 4000
const RADIUS = 1.75
const CAM_Z  = 5

export default function ParticleGlobe() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let W = window.innerWidth
    let H = window.innerHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 200)
    camera.position.z = CAM_Z

    const getVis = () => {
      const halfH = Math.tan((50 / 2) * (Math.PI / 180)) * CAM_Z
      return { halfH, halfW: halfH * (W / H) }
    }

    // Globe center: right column (~75% of screen width)
    const getGlobeCenter = () => {
      const { halfW } = getVis()
      const ndcX = 0.75 * 2 - 1   // 0.5 in NDC
      return { x: ndcX * halfW, y: 0 }
    }

    const localPos   = fibSphere(N, RADIUS)
    const phases     = new Float32Array(N)
    const burstAmt   = new Float32Array(N)
    const scatterPos = new Float32Array(N * 3)
    const delays     = new Float32Array(N)

    const rebuildScatter = () => {
      const { halfW, halfH } = getVis()
      for (let i = 0; i < N; i++) {
        phases[i]           = Math.random() * Math.PI * 2
        burstAmt[i]         = 0.8 + Math.random() * 2.2
        delays[i]           = Math.random() * 0.25
        scatterPos[i * 3]   = (Math.random() - 0.5) * halfW * 2
        scatterPos[i * 3+1] = (Math.random() - 0.5) * halfH * 2
        scatterPos[i * 3+2] = (Math.random() - 0.5) * 2.0 - 0.5
      }
    }
    rebuildScatter()

    const positions = new Float32Array(N * 3)
    const colArr    = new Float32Array(N * 3)
    // Mix of bright white and warm cream particles for variation
    for (let i = 0; i < N; i++) {
      const v = 0.55 + Math.random() * 0.45
      colArr[i * 3]   = v
      colArr[i * 3+1] = v * 0.97
      colArr[i * 3+2] = v * 0.92
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(colArr, 3))

    const mat = new THREE.PointsMaterial({
      map:             createDotTexture(),
      size:            0.034,
      vertexColors:    true,
      transparent:     true,
      opacity:         0.88,
      depthWrite:      false,
      blending:        THREE.AdditiveBlending,
      sizeAttenuation: true,
    })

    const pts = new THREE.Points(geo, mat)
    scene.add(pts)

    const posAttr = geo.attributes.position

    let mxRaw = 0, myRaw = 0, mxE = 0, myE = 0
    const onMouse = (e) => {
      mxRaw = (e.clientX / W - 0.5) * 2
      myRaw = (e.clientY / H - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    let scrollY = 0
    const onScroll = () => { scrollY = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })

    const clock = new THREE.Clock()
    let animId

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      mxE += (mxRaw - mxE) * 0.04
      myE += (myRaw - myE) * 0.04

      const scrollT  = Math.min(scrollY / H, 1)
      const driftAmt = Math.max(0, (scrollY / H) - 0.85)

      // Globe rotation fades as scatter begins
      const rotInfl = 1 - ss(0, 0.35, scrollT)
      const rotY    = (t * 0.13 + mxE * 0.45) * rotInfl
      const rotX    = myE * 0.28 * rotInfl

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX)

      const gc = getGlobeCenter()
      const { halfH } = getVis()
      const driftWorld = driftAmt * halfH * 1.4

      for (let i = 0; i < N; i++) {
        let lx = localPos[i * 3]
        let ly = localPos[i * 3+1]
        let lz = localPos[i * 3+2]

        // Apply globe rotation
        const rx1 =  lx * cosY + lz * sinY
        const rz1 = -lx * sinY + lz * cosY
        lx = rx1

        const ry2 =  ly * cosX - rz1 * sinX
        const rz2 =  ly * sinX + rz1 * cosX
        ly = ry2
        lz = rz2

        // Breathing (fades as particles scatter)
        const len     = Math.sqrt(lx*lx + ly*ly + lz*lz) || 1
        const breathe = Math.sin(t * 0.55 + phases[i]) * 0.018 * (1 - scrollT)

        const gx = gc.x + lx + (lx / len) * breathe
        const gy =         ly + (ly / len) * breathe
        const gz =         lz + (lz / len) * breathe

        // Per-particle scatter progress (staggered)
        const d  = delays[i]
        const pt = ss(d, d + 0.65, scrollT)

        // Z burst: flies toward camera then settles
        const burstPeak = Math.sin(Math.min(pt / 0.45, 1) * Math.PI * 0.5)
        const burstZ    = burstAmt[i] * burstPeak * (1 - ss(0.4, 1, pt))

        posAttr.array[i * 3]   = mix(gx, scatterPos[i * 3],   pt)
        posAttr.array[i * 3+1] = mix(gy, scatterPos[i * 3+1] - driftWorld, pt)
        posAttr.array[i * 3+2] = mix(gz, scatterPos[i * 3+2], pt) + burstZ
      }
      posAttr.needsUpdate = true

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      camera.aspect = W / H
      camera.updateProjectionMatrix()
      renderer.setSize(W, H)
      rebuildScatter()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      geo.dispose(); mat.dispose(); renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,          // above dark backdrop (z:0), below content (z:2)
        pointerEvents: 'none',
      }}
    />
  )
}
