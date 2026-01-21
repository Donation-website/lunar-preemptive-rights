import { useState } from 'react'
import dynamic from 'next/dynamic'

const MoonScene = dynamic(() => import('../components/MoonScene'), {
  ssr: false
})

export default function Home() {
  const [showTerms, setShowTerms] = useState(false)

  return (
    <>
      <div className="ui">
        <h1>🌕 Lunar Pre-Emptive Rights</h1>
        <div className="subtitle">
          Humanity is returning to the Moon. Laws will follow.  
          Secure a documented, speculative pre-emptive position linked to lunar coordinates.
        </div>
      </div>

      <MoonScene />

      <div className="terms">
        <button onClick={() => setShowTerms(!showTerms)}>
          {showTerms ? 'Hide Terms & Conditions' : 'Show Terms & Conditions'}
        </button>
        {showTerms && (
          <div className="terms-content">
            This is a speculative, symbolic reservation service.  
            No legal ownership is granted under current international law  
            (Outer Space Treaty, 1967).
          </div>
        )}
      </div>

      <div className="social">
        <a href="https://facebook.com" target="_blank">
          <img src="/icons/fb.png" />
        </a>
        <a href="https://instagram.com" target="_blank">
          <img src="/icons/insta.png" />
        </a>
        <a href="https://x.com" target="_blank">
          <img src="/icons/x.png" />
        </a>
      </div>

      <div className="footer">
        © 2026 Lunar Pre-Emptive Rights
      </div>
    </>
  )
}
