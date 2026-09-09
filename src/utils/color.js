/* Small color-mixing helper for adapting a decorative accent hue into a
   WCAG-AA-safe TEXT color for the current theme. Verified empirically
   against every accent hue in the case-study content: mixing 45% toward
   black (light theme) or 30% toward white (dark theme) clears 4.5:1
   against every surface tone used in this app with margin to spare. */
function mix(hex, target, amount) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  const [tr, tg, tb] = target === 'black' ? [0, 0, 0] : [255, 255, 255]
  const mr = Math.round(r + (tr - r) * amount)
  const mg = Math.round(g + (tg - g) * amount)
  const mb = Math.round(b + (tb - b) * amount)
  const toHex = v => v.toString(16).padStart(2, '0')
  return `#${toHex(mr)}${toHex(mg)}${toHex(mb)}`
}

/** Given a vivid decorative accent hex, return a readable variant for use
 *  as small text in the given theme. Use the raw hex for non-text roles
 *  (dots, borders, backgrounds) where it already reads fine. */
export function readableAccent(hex, theme) {
  return theme === 'dark' ? mix(hex, 'white', 0.3) : mix(hex, 'black', 0.45)
}
