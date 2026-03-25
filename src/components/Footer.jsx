export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#000000',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '2rem 3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1100px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.25)', fontFamily: "'Inter', sans-serif" }}>
        © {new Date().getFullYear()} Shanthram Shetty
      </p>
      <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.25)', fontFamily: "'Inter', sans-serif" }}>
        Mangaluru, Karnataka, India
      </p>
    </footer>
  )
}
