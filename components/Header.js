import { useState } from 'react'

export default function Header() {
  const [showAszf, setShowAszf] = useState(false)
  return (
    <>
      <h1>🌕 Lunar Pre-Emptive Rights – LIVE</h1>
      <div className="header-icons">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <img src="/icons/facebook.svg" alt="Facebook"/>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <img src="/icons/instagram.svg" alt="Instagram"/>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <img src="/icons/x.svg" alt="X"/>
        </a>
      </div>
      <div className="aszf" onClick={() => setShowAszf(!showAszf)}>Terms & Conditions</div>
      <div className={`aszf-content ${showAszf ? 'show' : ''}`}>
        <p>This is the speculative pre-emptive lunar rights platform. No ownership is granted under current law.</p>
      </div>
    </>
  )
}
