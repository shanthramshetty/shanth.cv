import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { mat4, quat, vec2, vec3 } from 'gl-matrix'

// ─── Photo data ────────────────────────────────────────────────────────────────
// Replace `image` with your actual photo paths, e.g. '/photos/street-01.jpg'
const PHOTOS = [
  { id: 1,  image: 'https://picsum.photos/seed/ss01/900/900', category: 'Street',       title: 'Monsoon Street',    description: 'Caught between two rain showers, the city paused.',        date: 'Aug 2024' },
  { id: 2,  image: 'https://picsum.photos/seed/ss02/900/900', category: 'Nature',        title: 'Western Ghats',     description: 'Mist and silence — nature at its most honest.',            date: 'Jun 2024' },
  { id: 3,  image: 'https://picsum.photos/seed/ss03/900/900', category: 'Portrait',      title: 'Candid Light',      description: 'An unguarded moment, frozen in soft afternoon sun.',       date: 'Mar 2024' },
  { id: 4,  image: 'https://picsum.photos/seed/ss04/900/900', category: 'Street',        title: 'Old City',          description: 'Ancient walls still standing against the new.',            date: 'Jan 2024' },
  { id: 5,  image: 'https://picsum.photos/seed/ss05/900/900', category: 'Landscape',     title: 'Golden Hour',       description: 'The last ten minutes before dark — nothing compares.',     date: 'Nov 2023' },
  { id: 6,  image: 'https://picsum.photos/seed/ss06/900/900', category: 'Portrait',      title: 'Shadow Play',       description: 'Light bends itself into architecture.',                    date: 'Sep 2023' },
  { id: 7,  image: 'https://picsum.photos/seed/ss07/900/900', category: 'Architecture',  title: 'Geometry',          description: 'Cities are just shapes waiting to be noticed.',           date: 'Jul 2023' },
  { id: 8,  image: 'https://picsum.photos/seed/ss08/900/900', category: 'Street',        title: 'Night Walk',        description: 'The streets speak differently after midnight.',            date: 'May 2023' },
  { id: 9,  image: 'https://picsum.photos/seed/ss09/900/900', category: 'Nature',        title: 'After Rain',        description: 'Everything is sharper once the clouds clear.',            date: 'Apr 2023' },
  { id: 10, image: 'https://picsum.photos/seed/ss10/900/900', category: 'Portrait',      title: 'Still',             description: 'Presence, without the need to perform.',                  date: 'Feb 2023' },
  { id: 11, image: 'https://picsum.photos/seed/ss11/900/900', category: 'Architecture',  title: 'Symmetry',          description: 'Human hands built this, but nature corrected it.',        date: 'Dec 2022' },
  { id: 12, image: 'https://picsum.photos/seed/ss12/900/900', category: 'Nature',        title: 'Solitude',          description: 'Distance is not empty — it is full of quiet.',           date: 'Oct 2022' },
]

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`

// ─── WebGL shaders ─────────────────────────────────────────────────────────────
const VERT_SRC = `#version 300 es
uniform mat4 uWorldMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uCameraPosition;
uniform vec4 uRotationAxisVelocity;

in vec3 aModelPosition;
in vec3 aModelNormal;
in vec2 aModelUvs;
in mat4 aInstanceMatrix;

out vec2 vUvs;
out float vAlpha;
flat out int vInstanceId;

#define PI 3.141593

void main() {
  vec4 worldPosition = uWorldMatrix * aInstanceMatrix * vec4(aModelPosition, 1.);
  vec3 centerPos = (uWorldMatrix * aInstanceMatrix * vec4(0., 0., 0., 1.)).xyz;
  float radius = length(centerPos.xyz);

  if (gl_VertexID > 0) {
    vec3 rotationAxis = uRotationAxisVelocity.xyz;
    float rotationVelocity = min(.15, uRotationAxisVelocity.w * 15.);
    vec3 stretchDir = normalize(cross(centerPos, rotationAxis));
    vec3 relativeVertexPos = normalize(worldPosition.xyz - centerPos);
    float strength = dot(stretchDir, relativeVertexPos);
    float invAbsStrength = min(0., abs(strength) - 1.);
    strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.);
    worldPosition.xyz += stretchDir * strength;
  }

  worldPosition.xyz = radius * normalize(worldPosition.xyz);
  gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;
  vAlpha = smoothstep(0.5, 1., normalize(worldPosition.xyz).z) * .9 + .1;
  vUvs = aModelUvs;
  vInstanceId = gl_InstanceID;
}`

const FRAG_SRC = `#version 300 es
precision highp float;
uniform sampler2D uTex;
uniform int uItemCount;
uniform int uAtlasSize;
out vec4 outColor;
in vec2 vUvs;
in float vAlpha;
flat in int vInstanceId;

void main() {
  int itemIndex = vInstanceId % uItemCount;
  int cellsPerRow = uAtlasSize;
  int cellX = itemIndex % cellsPerRow;
  int cellY = itemIndex / cellsPerRow;
  vec2 cellSize = vec2(1.0) / vec2(float(cellsPerRow));
  vec2 cellOffset = vec2(float(cellX), float(cellY)) * cellSize;

  ivec2 texSize = textureSize(uTex, 0);
  float imageAspect = float(texSize.x) / float(texSize.y);
  float scale = max(imageAspect, 1.0 / imageAspect);

  vec2 st = vec2(vUvs.x, 1.0 - vUvs.y);
  st = (st - 0.5) * scale + 0.5;
  st = clamp(st, 0.0, 1.0);
  st = st * cellSize + cellOffset;

  outColor = texture(uTex, st);
  outColor.a *= vAlpha;
}`

// ─── Geometry helpers ──────────────────────────────────────────────────────────
class Face { constructor(a, b, c) { this.a = a; this.b = b; this.c = c } }
class Vertex {
  constructor(x, y, z) {
    this.position = vec3.fromValues(x, y, z)
    this.normal   = vec3.create()
    this.uv       = vec2.create()
  }
}
class Geometry {
  constructor() { this.vertices = []; this.faces = [] }
  addVertex(...args) { for (let i = 0; i < args.length; i += 3) this.vertices.push(new Vertex(args[i], args[i+1], args[i+2])); return this }
  addFace(...args)   { for (let i = 0; i < args.length; i += 3) this.faces.push(new Face(args[i], args[i+1], args[i+2])); return this }
  get lastVertex()   { return this.vertices[this.vertices.length - 1] }
  subdivide(d = 1) {
    const cache = {}; let f = this.faces
    for (let div = 0; div < d; div++) {
      const nf = new Array(f.length * 4)
      f.forEach((face, ndx) => {
        const mAB = this.#mid(face.a, face.b, cache)
        const mBC = this.#mid(face.b, face.c, cache)
        const mCA = this.#mid(face.c, face.a, cache)
        const i = ndx * 4
        nf[i]   = new Face(face.a, mAB, mCA)
        nf[i+1] = new Face(face.b, mBC, mAB)
        nf[i+2] = new Face(face.c, mCA, mBC)
        nf[i+3] = new Face(mAB, mBC, mCA)
      }); f = nf
    }; this.faces = f; return this
  }
  spherize(r = 1) { this.vertices.forEach(v => { vec3.normalize(v.normal, v.position); vec3.scale(v.position, v.normal, r) }); return this }
  #mid(a, b, cache) {
    const key = a < b ? `${b}_${a}` : `${a}_${b}`
    if (cache[key] !== undefined) return cache[key]
    const pa = this.vertices[a].position, pb = this.vertices[b].position
    const ndx = this.vertices.length; cache[key] = ndx
    this.addVertex((pa[0]+pb[0])*.5, (pa[1]+pb[1])*.5, (pa[2]+pb[2])*.5)
    return ndx
  }
  get vertexData() { return new Float32Array(this.vertices.flatMap(v => Array.from(v.position))) }
  get normalData()  { return new Float32Array(this.vertices.flatMap(v => Array.from(v.normal))) }
  get uvData()      { return new Float32Array(this.vertices.flatMap(v => Array.from(v.uv))) }
  get indexData()   { return new Uint16Array(this.faces.flatMap(f => [f.a, f.b, f.c])) }
  get data()        { return { vertices: this.vertexData, indices: this.indexData, normals: this.normalData, uvs: this.uvData } }
}
class IcosahedronGeometry extends Geometry {
  constructor() {
    super(); const t = Math.sqrt(5) * 0.5 + 0.5
    this.addVertex(-1,t,0, 1,t,0, -1,-t,0, 1,-t,0, 0,-1,t, 0,1,t, 0,-1,-t, 0,1,-t, t,0,-1, t,0,1, -t,0,-1, -t,0,1)
        .addFace(0,11,5, 0,5,1, 0,1,7, 0,7,10, 0,10,11, 1,5,9, 5,11,4, 11,10,2, 10,7,6, 7,1,8, 3,9,4, 3,4,2, 3,2,6, 3,6,8, 3,8,9, 4,9,5, 2,4,11, 6,2,10, 8,6,7, 9,8,1)
  }
}
class DiscGeometry extends Geometry {
  constructor(steps = 4, radius = 1) {
    super(); steps = Math.max(4, steps)
    const alpha = (2 * Math.PI) / steps
    this.addVertex(0, 0, 0); this.lastVertex.uv[0] = 0.5; this.lastVertex.uv[1] = 0.5
    for (let i = 0; i < steps; i++) {
      const x = Math.cos(alpha * i), y = Math.sin(alpha * i)
      this.addVertex(radius * x, radius * y, 0)
      this.lastVertex.uv[0] = x * 0.5 + 0.5; this.lastVertex.uv[1] = y * 0.5 + 0.5
      if (i > 0) this.addFace(0, i, i + 1)
    }
    this.addFace(0, steps, 1)
  }
}

// ─── WebGL utils ───────────────────────────────────────────────────────────────
function mkShader(gl, type, src) {
  const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s)
  if (gl.getShaderParameter(s, gl.COMPILE_STATUS)) return s
  console.error(gl.getShaderInfoLog(s)); gl.deleteShader(s); return null
}
function mkProgram(gl, [vert, frag], attribLocs) {
  const p = gl.createProgram()
  ;[gl.VERTEX_SHADER, gl.FRAGMENT_SHADER].forEach((t, i) => { const s = mkShader(gl, t, [vert, frag][i]); if (s) gl.attachShader(p, s) })
  if (attribLocs) for (const k in attribLocs) gl.bindAttribLocation(p, attribLocs[k], k)
  gl.linkProgram(p)
  if (gl.getProgramParameter(p, gl.LINK_STATUS)) return p
  console.error(gl.getProgramInfoLog(p)); gl.deleteProgram(p); return null
}
function mkVAO(gl, pairs, indices) {
  const va = gl.createVertexArray(); gl.bindVertexArray(va)
  for (const [buf, loc, n] of pairs) {
    if (loc === -1) continue
    gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, n, gl.FLOAT, false, 0, 0)
  }
  if (indices) { const ib = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW) }
  gl.bindVertexArray(null); return va
}
function mkBuf(gl, data, usage) {
  const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, data, usage); gl.bindBuffer(gl.ARRAY_BUFFER, null); return b
}
function mkTex(gl, minF, magF, wS, wT) {
  const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wS); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wT)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minF); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magF)
  return t
}
function resizeCanvas(canvas) {
  const dpr = Math.min(2, window.devicePixelRatio)
  const w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr)
  if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; return true }
  return false
}

// ─── Arcball controller ────────────────────────────────────────────────────────
class ArcballControl {
  isPointerDown = false
  orientation   = quat.create()
  pointerRotation = quat.create()
  rotationVelocity = 0
  rotationAxis  = vec3.fromValues(1, 0, 0)
  snapDirection = vec3.fromValues(0, 0, -1)
  snapTargetDirection
  EPSILON       = 0.1
  ID_QUAT       = quat.create()
  _rv           = 0
  _cq           = quat.create()

  constructor(canvas, cb) {
    this.canvas = canvas; this.cb = cb || (() => {})
    this.pp = vec2.create(); this.cp = vec2.create()
    canvas.addEventListener('pointerdown',  e => { vec2.set(this.cp, e.clientX, e.clientY); vec2.copy(this.pp, this.cp); this.isPointerDown = true })
    canvas.addEventListener('pointerup',    () => { this.isPointerDown = false })
    canvas.addEventListener('pointerleave', () => { this.isPointerDown = false })
    canvas.addEventListener('pointermove',  e => { if (this.isPointerDown) vec2.set(this.cp, e.clientX, e.clientY) })
    canvas.style.touchAction = 'none'
  }

  update(dt, tfd = 16) {
    const ts = dt / tfd + 0.00001
    let af = ts, snap = quat.create()
    if (this.isPointerDown) {
      const INT = 0.3 * ts, AMP = 5 / ts
      const mid = vec2.sub(vec2.create(), this.cp, this.pp)
      vec2.scale(mid, mid, INT)
      if (vec2.sqrLen(mid) > this.EPSILON) {
        vec2.add(mid, this.pp, mid)
        const p = this.#proj(mid), q = this.#proj(this.pp)
        const a = vec3.normalize(vec3.create(), p), b = vec3.normalize(vec3.create(), q)
        vec2.copy(this.pp, mid); af *= AMP
        this.#qFromVecs(a, b, this.pointerRotation, af)
      } else {
        quat.slerp(this.pointerRotation, this.pointerRotation, this.ID_QUAT, INT)
      }
    } else {
      quat.slerp(this.pointerRotation, this.pointerRotation, this.ID_QUAT, 0.1 * ts)
      if (this.snapTargetDirection) {
        const a = this.snapTargetDirection, b = this.snapDirection
        const sq = vec3.squaredDistance(a, b)
        af *= 0.2 * Math.max(0.1, 1 - sq * 10)
        this.#qFromVecs(a, b, snap, af)
      }
    }
    const cq = quat.multiply(quat.create(), snap, this.pointerRotation)
    this.orientation = quat.multiply(quat.create(), cq, this.orientation)
    quat.normalize(this.orientation, this.orientation)
    quat.slerp(this._cq, this._cq, cq, 0.8 * ts); quat.normalize(this._cq, this._cq)
    const rad = Math.acos(this._cq[3]) * 2, s = Math.sin(rad / 2)
    let rv = 0
    if (s > 0.000001) {
      rv = rad / (2 * Math.PI)
      this.rotationAxis[0] = this._cq[0] / s; this.rotationAxis[1] = this._cq[1] / s; this.rotationAxis[2] = this._cq[2] / s
    }
    this._rv += (rv - this._rv) * 0.5 * ts; this.rotationVelocity = this._rv / ts
    this.cb(dt)
  }

  #qFromVecs(a, b, out, af = 1) {
    const ax = vec3.cross(vec3.create(), a, b); vec3.normalize(ax, ax)
    const d = Math.max(-1, Math.min(1, vec3.dot(a, b)))
    quat.setAxisAngle(out, ax, Math.acos(d) * af)
  }
  #proj(pos) {
    const r = 2, w = this.canvas.clientWidth, h = this.canvas.clientHeight, s = Math.max(w, h) - 1
    const x = (2 * pos[0] - w - 1) / s, y = (2 * pos[1] - h - 1) / s
    let z = 0; const xySq = x*x + y*y, rSq = r*r
    if (xySq <= rSq / 2) z = Math.sqrt(rSq - xySq); else z = rSq / Math.sqrt(xySq)
    return vec3.fromValues(-x, y, z)
  }
}

// ─── WebGL sphere renderer ─────────────────────────────────────────────────────
class SphereGallery {
  SPHERE_RADIUS = 2; TFD = 1000/60; #t = 0; #dt = 0; #df = 0; #f = 0
  camera = {
    matrix: mat4.create(), near: 0.1, far: 40, fov: Math.PI/4, aspect: 1,
    position: vec3.fromValues(0, 0, 3), up: vec3.fromValues(0, 1, 0),
    matrices: { view: mat4.create(), projection: mat4.create(), inversProjection: mat4.create() }
  }
  smoothRotVel = 0; movementActive = false; destroyed = false

  constructor(canvas, items, onActive, onMove, scale = 1.0) {
    this.canvas = canvas; this.items = items; this.onActive = onActive; this.onMove = onMove
    this.camera.position[2] = 3 * scale; this.scale = scale
    this.#init()
  }

  resize() {
    this.vpSize = vec2.set(this.vpSize || vec2.create(), this.canvas.clientWidth, this.canvas.clientHeight)
    if (resizeCanvas(this.gl.canvas)) this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight)
    this.#updateProj()
  }

  run(t = 0) {
    if (this.destroyed) return
    this.#dt = Math.min(32, t - this.#t); this.#t = t; this.#df = this.#dt / this.TFD; this.#f += this.#df
    this.#animate(this.#dt); this.#render()
    this.raf = requestAnimationFrame(t => this.run(t))
  }

  destroy() { this.destroyed = true; if (this.raf) cancelAnimationFrame(this.raf) }

  #init() {
    const gl = this.gl = this.canvas.getContext('webgl2', { antialias: true, alpha: true })
    if (!gl) throw new Error('WebGL 2 not supported')

    this.prog = mkProgram(gl, [VERT_SRC, FRAG_SRC], { aModelPosition: 0, aModelNormal: 1, aModelUvs: 2, aInstanceMatrix: 3 })
    this.locs = {
      aModelPosition: gl.getAttribLocation(this.prog, 'aModelPosition'),
      aModelUvs:      gl.getAttribLocation(this.prog, 'aModelUvs'),
      aInstanceMatrix:gl.getAttribLocation(this.prog, 'aInstanceMatrix'),
      uWorldMatrix:   gl.getUniformLocation(this.prog, 'uWorldMatrix'),
      uViewMatrix:    gl.getUniformLocation(this.prog, 'uViewMatrix'),
      uProjectionMatrix: gl.getUniformLocation(this.prog, 'uProjectionMatrix'),
      uCameraPosition:gl.getUniformLocation(this.prog, 'uCameraPosition'),
      uRotationAxisVelocity: gl.getUniformLocation(this.prog, 'uRotationAxisVelocity'),
      uTex:           gl.getUniformLocation(this.prog, 'uTex'),
      uFrames:        gl.getUniformLocation(this.prog, 'uFrames'),
      uItemCount:     gl.getUniformLocation(this.prog, 'uItemCount'),
      uAtlasSize:     gl.getUniformLocation(this.prog, 'uAtlasSize'),
    }

    const disc = new DiscGeometry(56, 1); const db = disc.data
    this.discVAO = mkVAO(gl, [
      [mkBuf(gl, db.vertices, gl.STATIC_DRAW), this.locs.aModelPosition, 3],
      [mkBuf(gl, db.uvs,      gl.STATIC_DRAW), this.locs.aModelUvs, 2],
    ], db.indices)
    this.discIndices = db.indices.length

    const ico = new IcosahedronGeometry(); ico.subdivide(1).spherize(this.SPHERE_RADIUS)
    this.instancePos = ico.vertices.map(v => v.position)
    this.instanceCount = ico.vertices.length
    this.#initInstances()
    this.worldMatrix = mat4.create()
    this.#initTexture()
    this.ctrl = new ArcballControl(this.canvas, dt => this.#onCtrl(dt))
    this.#updateCam(); this.#updateProj(); this.resize()
  }

  #initInstances() {
    const gl = this.gl, n = this.instanceCount
    this.inst = { arr: new Float32Array(n * 16), mats: [], buf: gl.createBuffer() }
    for (let i = 0; i < n; i++) {
      const m = new Float32Array(this.inst.arr.buffer, i * 64, 16); m.set(mat4.create()); this.inst.mats.push(m)
    }
    gl.bindVertexArray(this.discVAO); gl.bindBuffer(gl.ARRAY_BUFFER, this.inst.buf)
    gl.bufferData(gl.ARRAY_BUFFER, this.inst.arr.byteLength, gl.DYNAMIC_DRAW)
    for (let j = 0; j < 4; j++) {
      const loc = this.locs.aInstanceMatrix + j; gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, 64, j * 16); gl.vertexAttribDivisor(loc, 1)
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null); gl.bindVertexArray(null)
  }

  #initTexture() {
    const gl = this.gl
    this.tex = mkTex(gl, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE)
    const n = Math.max(1, this.items.length)
    this.atlasSize = Math.ceil(Math.sqrt(n))
    const cv = document.createElement('canvas'), ctx = cv.getContext('2d'), cell = 512
    cv.width = this.atlasSize * cell; cv.height = this.atlasSize * cell
    Promise.all(this.items.map(it => new Promise(res => {
      const img = new Image(); img.crossOrigin = 'anonymous'
      img.onload = () => res(img); img.src = it.image
    }))).then(imgs => {
      imgs.forEach((img, i) => {
        const x = (i % this.atlasSize) * cell, y = Math.floor(i / this.atlasSize) * cell
        ctx.drawImage(img, x, y, cell, cell)
      })
      gl.bindTexture(gl.TEXTURE_2D, this.tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cv)
      gl.generateMipmap(gl.TEXTURE_2D)
    })
  }

  #animate(dt) {
    const gl = this.gl
    this.ctrl.update(dt, this.TFD)
    const scale = 0.25, SI = 0.6
    this.instancePos.forEach((p, ndx) => {
      const wp = vec3.transformQuat(vec3.create(), p, this.ctrl.orientation)
      const s = (Math.abs(wp[2]) / this.SPHERE_RADIUS) * SI + (1 - SI)
      const fs = s * scale, m = mat4.create()
      mat4.multiply(m, m, mat4.fromTranslation(mat4.create(), vec3.negate(vec3.create(), wp)))
      mat4.multiply(m, m, mat4.targetTo(mat4.create(), [0,0,0], wp, [0,1,0]))
      mat4.multiply(m, m, mat4.fromScaling(mat4.create(), [fs, fs, fs]))
      mat4.multiply(m, m, mat4.fromTranslation(mat4.create(), [0, 0, -this.SPHERE_RADIUS]))
      mat4.copy(this.inst.mats[ndx], m)
    })
    gl.bindBuffer(gl.ARRAY_BUFFER, this.inst.buf)
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.inst.arr)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    this.smoothRotVel = this.ctrl.rotationVelocity
  }

  #render() {
    const gl = this.gl
    gl.useProgram(this.prog)
    gl.enable(gl.CULL_FACE); gl.enable(gl.DEPTH_TEST)
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.uniformMatrix4fv(this.locs.uWorldMatrix,     false, this.worldMatrix)
    gl.uniformMatrix4fv(this.locs.uViewMatrix,      false, this.camera.matrices.view)
    gl.uniformMatrix4fv(this.locs.uProjectionMatrix,false, this.camera.matrices.projection)
    gl.uniform3f(this.locs.uCameraPosition, ...this.camera.position)
    gl.uniform4f(this.locs.uRotationAxisVelocity, ...this.ctrl.rotationAxis, this.smoothRotVel * 1.1)
    gl.uniform1i(this.locs.uItemCount, this.items.length)
    gl.uniform1i(this.locs.uAtlasSize, this.atlasSize)
    gl.uniform1f(this.locs.uFrames, this.#f)
    gl.uniform1i(this.locs.uTex, 0)
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.tex)
    gl.bindVertexArray(this.discVAO)
    gl.drawElementsInstanced(gl.TRIANGLES, this.discIndices, gl.UNSIGNED_SHORT, 0, this.instanceCount)
  }

  #updateCam() {
    mat4.targetTo(this.camera.matrix, this.camera.position, [0,0,0], this.camera.up)
    mat4.invert(this.camera.matrices.view, this.camera.matrix)
  }
  #updateProj() {
    const gl = this.gl; this.camera.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
    const h = this.SPHERE_RADIUS * 0.35, d = this.camera.position[2]
    this.camera.fov = this.camera.aspect > 1 ? 2 * Math.atan(h / d) : 2 * Math.atan(h / this.camera.aspect / d)
    mat4.perspective(this.camera.matrices.projection, this.camera.fov, this.camera.aspect, this.camera.near, this.camera.far)
    mat4.invert(this.camera.matrices.inversProjection, this.camera.matrices.projection)
  }
  #onCtrl(dt) {
    const ts = dt / this.TFD + 0.0001
    let damp = 5 / ts, targetZ = 3 * this.scale
    const isMoving = this.ctrl.isPointerDown || Math.abs(this.smoothRotVel) > 0.01
    if (isMoving !== this.movementActive) { this.movementActive = isMoving; this.onMove(isMoving) }
    if (!this.ctrl.isPointerDown) {
      const ni = this.#nearest(); this.onActive(ni % Math.max(1, this.items.length))
      this.ctrl.snapTargetDirection = vec3.normalize(vec3.create(), this.#vertexWorld(ni))
    } else {
      targetZ += this.ctrl.rotationVelocity * 80 + 2.5; damp = 7 / ts
    }
    this.camera.position[2] += (targetZ - this.camera.position[2]) / damp
    this.#updateCam()
  }
  #nearest() {
    const n = this.ctrl.snapDirection
    const inv = quat.conjugate(quat.create(), this.ctrl.orientation)
    const nt = vec3.transformQuat(vec3.create(), n, inv)
    let maxD = -1, idx = 0
    for (let i = 0; i < this.instancePos.length; i++) {
      const d = vec3.dot(nt, this.instancePos[i]); if (d > maxD) { maxD = d; idx = i }
    }
    return idx
  }
  #vertexWorld(i) { return vec3.transformQuat(vec3.create(), this.instancePos[i], this.ctrl.orientation) }
}

// ─── ScrambleText ──────────────────────────────────────────────────────────────
// Splits text into individual <span> chars. On mount: staggered scramble reveal.
// On hover: proximity-based scramble (like ReactBits ScrambledText, no premium GSAP needed).
const SCRAMBLE_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function ScrambleText({ text, style, className, stagger = 30, hoverRadius = 90 }) {
  const ref    = useRef(null)
  const active = useRef(new Set())

  const run = useCallback((span) => {
    const idx  = span.dataset.idx
    const orig = span.dataset.char
    if (active.current.has(idx) || orig === ' ') return
    active.current.add(idx)
    let count = 0
    const max = 4 + Math.floor(Math.random() * 5)
    const id  = setInterval(() => {
      if (count++ < max) {
        span.textContent = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      } else {
        span.textContent = orig
        clearInterval(id)
        active.current.delete(idx)
      }
    }, 48)
  }, [])

  // Auto-play staggered scramble on mount (re-runs when text changes via key)
  useEffect(() => {
    if (!ref.current) return
    active.current.clear()
    const spans   = Array.from(ref.current.querySelectorAll('[data-idx]'))
    const timers  = spans.map((span, i) => setTimeout(() => run(span), Math.min(i * stagger, 600)))
    return () => { timers.forEach(clearTimeout); active.current.clear() }
  }, [text, stagger, run])

  // Hover proximity scramble
  useEffect(() => {
    const el = ref.current; if (!el) return
    const onMove = e => {
      el.querySelectorAll('[data-idx]').forEach(span => {
        const r = span.getBoundingClientRect()
        if (Math.hypot(e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2) < hoverRadius) {
          run(span)
        }
      })
    }
    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [text, hoverRadius, run])

  return (
    <span ref={ref} className={className} style={{ ...style, display: 'block' }}>
      {text.split(' ').map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, ci) => {
            // compute a flat index across the whole string
            const flat = text.split(' ').slice(0, wi).reduce((a, w) => a + w.length + 1, 0) + ci
            return (
              <span key={ci} data-idx={String(flat)} data-char={char} style={{ display: 'inline-block' }}>
                {char}
              </span>
            )
          })}
          {wi < text.split(' ').length - 1 && (
            <span style={{ display: 'inline-block', width: '0.28em' }}> </span>
          )}
        </span>
      ))}
    </span>
  )
}

// ─── Fun page ──────────────────────────────────────────────────────────────────
export default function Fun() {
  const canvasRef   = useRef(null)
  const sphereRef   = useRef(null)
  const [activeIdx, setActiveIdx]   = useState(0)
  const [isMoving,  setIsMoving]    = useState(false)
  const [lightbox,  setLightbox]    = useState(null)
  const touchStartX = useRef(null)

  const activePhoto = PHOTOS[activeIdx]

  // Init / cleanup WebGL sphere
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const sphere = new SphereGallery(canvas, PHOTOS, setActiveIdx, setIsMoving)
    sphere.run()
    sphereRef.current = sphere

    const onResize = () => sphere.resize()
    window.addEventListener('resize', onResize)
    onResize()
    return () => { sphere.destroy(); window.removeEventListener('resize', onResize) }
  }, [])

  // Lightbox keyboard nav
  const closeLB = useCallback(() => setLightbox(null), [])
  const prevLB  = useCallback(() => setLightbox(i => (i - 1 + PHOTOS.length) % PHOTOS.length), [])
  const nextLB  = useCallback(() => setLightbox(i => (i + 1) % PHOTOS.length), [])

  useEffect(() => {
    if (lightbox === null) return
    const fn = e => { if (e.key === 'Escape') closeLB(); if (e.key === 'ArrowLeft') prevLB(); if (e.key === 'ArrowRight') nextLB() }
    window.addEventListener('keydown', fn); return () => window.removeEventListener('keydown', fn)
  }, [lightbox, closeLB, prevLB, nextLB])

  useEffect(() => { document.body.style.overflow = lightbox !== null ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [lightbox])

  const onTouchStart = e => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = e => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) dx < 0 ? nextLB() : prevLB()
    touchStartX.current = null
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        #fun-canvas { cursor: grab; width: 100%; height: 100%; display: block; outline: none; }
        #fun-canvas:active { cursor: grabbing; }
      `}</style>

      {/* Film grain */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', backgroundImage: GRAIN_BG, backgroundRepeat: 'repeat', opacity: 0.04, mixBlendMode: 'screen' }} />

      {/* Full-screen dark stage */}
      <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 64px)', background: '#000', overflow: 'hidden', marginTop: 0 }}>

        {/* WebGL canvas */}
        <canvas id="fun-canvas" ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

        {/* Page label — top left */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ position: 'absolute', top: '2rem', left: '2.5rem', zIndex: 10, pointerEvents: 'none' }}
        >
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
            Fun / Photography
          </span>
        </motion.div>

        {/* Drag hint — top right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ position: 'absolute', top: '2rem', right: '2.5rem', zIndex: 10, pointerEvents: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
            Drag to explore
          </span>
        </motion.div>

        {/* ── LEFT — Category + Title (scrambled) ── */}
        <AnimatePresence mode="wait">
          {!isMoving && (
            <motion.div
              key={`left-${activeIdx}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'absolute', bottom: '3rem', left: '2.5rem', zIndex: 10, pointerEvents: 'auto' }}
            >
              {/* Category tag */}
              <span style={{
                display: 'block', fontFamily: "'Inter', sans-serif",
                fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)', marginBottom: '0.55rem',
              }}>
                {activePhoto.category}
              </span>
              {/* Title — scramble reveal */}
              <ScrambleText
                key={`title-${activeIdx}`}
                text={activePhoto.title}
                stagger={38}
                hoverRadius={100}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  fontWeight: 300, fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.9)',
                  letterSpacing: '0.03em', lineHeight: 1.05,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── RIGHT — Description + Date (scrambled) ── */}
        <AnimatePresence mode="wait">
          {!isMoving && (
            <motion.div
              key={`right-${activeIdx}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute', bottom: '3rem', right: '2.5rem', zIndex: 10,
                pointerEvents: 'auto', textAlign: 'right', maxWidth: '260px',
              }}
            >
              {/* Description — scramble reveal */}
              <ScrambleText
                key={`desc-${activeIdx}`}
                text={activePhoto.description}
                stagger={14}
                hoverRadius={90}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.76rem', lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.015em',
                  marginBottom: '0.6rem',
                  display: 'block', textAlign: 'right',
                }}
              />
              {/* Date */}
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.58rem', letterSpacing: '0.16em',
                color: 'rgba(255,255,255,0.22)',
              }}>
                {activePhoto.date}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Counter — top right below drag hint ── */}
        <div style={{ position: 'absolute', top: '4rem', right: '2.5rem', zIndex: 10, pointerEvents: 'none' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.58rem', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.15)' }}>
            {String(activeIdx + 1).padStart(2, '0')} / {String(PHOTOS.length).padStart(2, '0')}
          </span>
        </div>

        {/* ── View button — centre bottom, appears when settled ── */}
        <AnimatePresence>
          {!isMoving && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 8, transition: { duration: 0.15 } }}
              transition={{ duration: 0.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setLightbox(activeIdx)}
              style={{
                position: 'absolute', bottom: '2.75rem', left: '50%', transform: 'translateX(-50%)',
                zIndex: 10, background: 'none',
                border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px',
                color: 'rgba(255,255,255,0.55)', cursor: 'pointer',
                padding: '0.5rem 1.6rem',
                fontFamily: "'Inter', sans-serif", fontSize: '0.66rem',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                backdropFilter: 'blur(8px)', transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';  e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
            >
              View ↗
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={closeLB}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(4,4,4,0.97)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.75rem', fontSize: '0.66rem', color: 'rgba(255,255,255,0.25)', fontFamily: "'Inter', sans-serif", letterSpacing: '0.14em', userSelect: 'none' }}>
              {lightbox + 1} / {PHOTOS.length}
            </div>
            <button onClick={closeLB} style={{ position: 'absolute', top: '1.25rem', left: '1.75rem', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.38)', fontSize: '0.7rem', fontFamily: "'Inter', sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase' }}>Close</button>

            <AnimatePresence mode="wait">
              <motion.img
                key={lightbox}
                src={PHOTOS[lightbox].image}
                alt={PHOTOS[lightbox].description}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22 }}
                onClick={e => e.stopPropagation()}
                style={{ maxHeight: '84vh', maxWidth: '88vw', objectFit: 'contain', userSelect: 'none' }}
              />
            </AnimatePresence>

            <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.26)', fontFamily: "'Inter', sans-serif", marginBottom: '0.3rem' }}>{PHOTOS[lightbox].title}</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '1rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.06em' }}>{PHOTOS[lightbox].description}</p>
            </div>

            <button onClick={e => { e.stopPropagation(); prevLB() }} aria-label="Previous" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.32)', fontSize: '1.4rem', padding: '0.75rem', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='#fff'} onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.32)'}>←</button>
            <button onClick={e => { e.stopPropagation(); nextLB() }} aria-label="Next"     style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.32)', fontSize: '1.4rem', padding: '0.75rem', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='#fff'} onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.32)'}>→</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
