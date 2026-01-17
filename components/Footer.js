export default function Footer() {
  return (
    <footer>
      <p>No ownership is granted under current law (Outer Space Treaty, 1967)</p>
      <div className="socials">
        <img src="/fb.png" alt="Facebook" onClick={() => window.open('https://facebook.com')} />
        <img src="/insta.png" alt="Instagram" onClick={() => window.open('https://instagram.com')} />
        <img src="/x.png" alt="X" onClick={() => window.open('https://x.com')} />
      </div>
      <p>© 2026 Lunar Pre-Emptive Rights – Conceptual Initiative</p>
    </footer>
  )
}
