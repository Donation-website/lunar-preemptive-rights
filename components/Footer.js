export default function Footer() {
  return (
    <footer style={{ textAlign: "center", padding: "20px", background: "#111", color: "#fff" }}>
      <div style={{ marginBottom: "10px" }}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>
          <img src="/icons/facebook.svg" alt="FB" width="24"/>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>
          <img src="/icons/instagram.svg" alt="IG" width="24"/>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px" }}>
          <img src="/icons/twitter.svg" alt="X" width="24"/>
        </a>
      </div>
      <div>© 2026 Lunar Pre-Emptive Rights. Conceptual initiative.</div>
    </footer>
  );
}
