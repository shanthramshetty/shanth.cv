/* Illustrated designer character — SVG */
export default function DesignerCharacter() {
  return (
    <svg
      viewBox="0 0 320 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
    >
      <defs>
        {/* Skin gradient */}
        <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFCBA4" />
          <stop offset="100%" stopColor="#F5A97F" />
        </linearGradient>
        {/* Shirt gradient */}
        <linearGradient id="shirt" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        {/* Hair */}
        <linearGradient id="hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#16213e" />
        </linearGradient>
        {/* Laptop lid */}
        <linearGradient id="laptopLid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        {/* Laptop screen */}
        <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        {/* Chair */}
        <linearGradient id="chair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        {/* Pants */}
        <linearGradient id="pants" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        {/* Shadow under character */}
        <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.18)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        {/* Drop shadow filter */}
        <filter id="bodyDrop" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="rgba(0,0,0,0.22)" />
        </filter>
        <filter id="softDrop" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.15)" />
        </filter>
      </defs>

      {/* ── Ground shadow ── */}
      <ellipse cx="160" cy="410" rx="90" ry="12" fill="url(#shadow)" />

      {/* ── Chair base / legs ── */}
      {/* Center pole */}
      <rect x="154" y="320" width="12" height="55" rx="6" fill="url(#chair)" />
      {/* Star base arms */}
      <ellipse cx="160" cy="375" rx="52" ry="10" fill="#1e293b" />
      <circle cx="108" cy="380" r="7" fill="#0f172a" />
      <circle cx="212" cy="380" r="7" fill="#0f172a" />
      <circle cx="135" cy="385" r="7" fill="#0f172a" />
      <circle cx="185" cy="385" r="7" fill="#0f172a" />
      <circle cx="160" cy="387" r="7" fill="#0f172a" />

      {/* ── Chair seat ── */}
      <rect x="112" y="300" width="96" height="26" rx="13" fill="url(#chair)" filter="url(#softDrop)" />

      {/* ── Chair back ── */}
      <rect x="126" y="242" width="68" height="65" rx="10" fill="#293548" filter="url(#softDrop)" />
      {/* back highlight */}
      <rect x="132" y="248" width="56" height="10" rx="5" fill="rgba(255,255,255,0.07)" />

      {/* ── Legs / pants ── */}
      <g filter="url(#softDrop)">
        {/* left leg */}
        <path d="M138 310 Q134 330 130 348 Q126 360 122 368" stroke="url(#pants)" strokeWidth="18" strokeLinecap="round" fill="none" />
        {/* right leg */}
        <path d="M182 310 Q186 330 190 348 Q194 360 198 368" stroke="url(#pants)" strokeWidth="18" strokeLinecap="round" fill="none" />
        {/* shoes */}
        <ellipse cx="118" cy="370" rx="14" ry="8" fill="#0f172a" />
        <ellipse cx="202" cy="370" rx="14" ry="8" fill="#0f172a" />
      </g>

      {/* ── Body / shirt ── */}
      <g filter="url(#bodyDrop)">
        <path
          d="M124 248 Q110 260 108 285 Q106 305 112 318 L208 318 Q214 305 212 285 Q210 260 196 248 Z"
          fill="url(#shirt)"
        />
        {/* shirt collar V */}
        <path d="M148 252 L160 272 L172 252" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* shirt pocket */}
        <rect x="166" y="268" width="18" height="14" rx="3" fill="rgba(255,255,255,0.1)" />
        <line x1="174" y1="268" x2="174" y2="262" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* ── Arms ── */}
      <g filter="url(#softDrop)">
        {/* left arm — resting on desk */}
        <path d="M116 262 Q96 275 88 295 Q82 310 90 318" stroke="url(#shirt)" strokeWidth="20" strokeLinecap="round" fill="none" />
        {/* left hand */}
        <ellipse cx="92" cy="320" rx="12" ry="10" fill="url(#skin)" />

        {/* right arm — raised, holding stylus */}
        <path d="M204 262 Q222 270 228 290 Q232 305 226 316" stroke="url(#shirt)" strokeWidth="20" strokeLinecap="round" fill="none" />
        {/* right hand */}
        <ellipse cx="224" cy="318" rx="12" ry="10" fill="url(#skin)" />
        {/* stylus in right hand */}
        <rect x="230" y="296" width="5" height="28" rx="2.5" fill="#e2e8f0" transform="rotate(-20 232 310)" />
        <polygon points="232,296 234,290 236,296" fill="#6366f1" transform="rotate(-20 232 310)" />
      </g>

      {/* ── Neck ── */}
      <rect x="152" y="228" width="16" height="26" rx="8" fill="url(#skin)" />

      {/* ── Head ── */}
      <g filter="url(#softDrop)">
        <ellipse cx="160" cy="205" rx="46" ry="50" fill="url(#skin)" />
      </g>

      {/* ── Hair ── */}
      <g filter="url(#softDrop)">
        {/* top hair mass */}
        <path
          d="M116 195 Q118 148 160 142 Q202 148 204 195 Q198 168 160 164 Q122 168 116 195Z"
          fill="url(#hair)"
        />
        {/* side wisps */}
        <path d="M116 195 Q112 210 114 222 Q108 212 110 198Z" fill="url(#hair)" />
        <path d="M204 195 Q208 210 206 222 Q212 212 210 198Z" fill="url(#hair)" />
        {/* top tuft */}
        <path d="M148 148 Q158 132 172 148 Q164 138 160 142 Q156 138 148 148Z" fill="url(#hair)" />
      </g>

      {/* ── Ears ── */}
      <ellipse cx="114" cy="205" rx="8" ry="11" fill="url(#skin)" />
      <ellipse cx="206" cy="205" rx="8" ry="11" fill="url(#skin)" />
      {/* ear detail */}
      <path d="M116 200 Q115 205 116 210" stroke="#e8956a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M204 200 Q205 205 204 210" stroke="#e8956a" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* ── Eyes ── */}
      {/* eye whites */}
      <ellipse cx="145" cy="205" rx="13" ry="14" fill="white" />
      <ellipse cx="175" cy="205" rx="13" ry="14" fill="white" />
      {/* iris */}
      <circle cx="146" cy="206" r="8" fill="#2d3748" />
      <circle cx="176" cy="206" r="8" fill="#2d3748" />
      {/* pupil */}
      <circle cx="147" cy="207" r="4.5" fill="#0f172a" />
      <circle cx="177" cy="207" r="4.5" fill="#0f172a" />
      {/* eye shine */}
      <circle cx="149" cy="204" r="2" fill="white" />
      <circle cx="179" cy="204" r="2" fill="white" />
      <circle cx="150" cy="208" r="1" fill="rgba(255,255,255,0.5)" />
      <circle cx="180" cy="208" r="1" fill="rgba(255,255,255,0.5)" />
      {/* eyelashes/brows */}
      <path d="M133 193 Q145 188 158 192" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M162 192 Q175 188 188 193" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* ── Nose ── */}
      <path d="M157 212 Q160 220 163 212" stroke="#d4845a" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* ── Mouth — slight smile ── */}
      <path d="M150 224 Q160 232 170 224" stroke="#c07050" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M150 224 Q148 226 150 227" stroke="#c07050" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M170 224 Q172 226 170 227" stroke="#c07050" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* ── Blush cheeks ── */}
      <ellipse cx="130" cy="218" rx="10" ry="6" fill="rgba(255,140,100,0.22)" />
      <ellipse cx="190" cy="218" rx="10" ry="6" fill="rgba(255,140,100,0.22)" />

      {/* ── Laptop / desk (floating tablet feel) ── */}
      <g filter="url(#softDrop)">
        {/* desk surface */}
        <rect x="72" y="315" width="176" height="12" rx="6" fill="#cbd5e1" />
        {/* laptop base */}
        <rect x="98" y="295" width="124" height="22" rx="5" fill="#e2e8f0" />
        {/* keyboard hint */}
        {[105,118,131,144,157,170,183,196,209].map((x,i) => (
          <rect key={i} x={x} y="300" width="9" height="5" rx="2" fill="rgba(0,0,0,0.12)" />
        ))}
        {/* trackpad */}
        <rect x="145" y="307" width="30" height="7" rx="3" fill="rgba(0,0,0,0.09)" />
      </g>

      {/* ── Floating design elements ── */}
      {/* Figma-style color swatches floating top-right */}
      <g style={{ animation: 'floatA 3.5s ease-in-out infinite' }}>
        <circle cx="272" cy="148" r="14" fill="#F24E1E" filter="url(#softDrop)" />
        <circle cx="272" cy="178" r="14" fill="#FF7262" filter="url(#softDrop)" />
        <circle cx="272" cy="208" r="14" fill="#1ABCFE" filter="url(#softDrop)" />
        <circle cx="272" cy="238" r="14" fill="#0ACF83" filter="url(#softDrop)" />
        <circle cx="272" cy="120" r="14" fill="#A259FF" filter="url(#softDrop)" />
      </g>

      {/* Small star sparkles */}
      <g style={{ animation: 'floatB 4s ease-in-out infinite' }}>
        <path d="M56 160 L58 154 L60 160 L66 162 L60 164 L58 170 L56 164 L50 162Z" fill="#fbbf24" opacity="0.85" />
        <path d="M44 200 L45.5 196 L47 200 L51 201.5 L47 203 L45.5 207 L44 203 L40 201.5Z" fill="#a78bfa" opacity="0.8" />
      </g>

      {/* Floating pencil icon top-left */}
      <g style={{ animation: 'floatC 5s ease-in-out infinite' }} opacity="0.75">
        <rect x="42" y="145" width="8" height="30" rx="4" fill="#6366f1" transform="rotate(-30 46 160)" />
        <polygon points="39,170 43,178 47,170" fill="#fbbf24" transform="rotate(-30 43 174)" />
      </g>

      {/* CSS keyframe animations injected inline */}
      <style>{`
        @keyframes floatA {
          0%,100%{ transform: translateY(0px) }
          50%    { transform: translateY(-8px) }
        }
        @keyframes floatB {
          0%,100%{ transform: translateY(0px) rotate(0deg) }
          50%    { transform: translateY(-12px) rotate(15deg) }
        }
        @keyframes floatC {
          0%,100%{ transform: translateY(0px) rotate(0deg) }
          50%    { transform: translateY(-10px) rotate(-10deg) }
        }
      `}</style>
    </svg>
  )
}
