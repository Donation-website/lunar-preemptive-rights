import { useState } from 'react'
import dynamic from 'next/dynamic'

const MoonScene = dynamic(() => import('../components/MoonScene'), {
  ssr: false
})

export default function Home() {
  const [selected, setSelected] = useState(null)

  return (
    <div>
      <h1 className="title">🌕 Lunar Pre-Emptive Rights</h1>

      <MoonScene onParcelSelect={setSelected} />

      {selected && (
        <div className="modal">
          <h2>Parcel #{selected.id}</h2>
          <p>Price: ${selected.price}</p>
          <p>
            Coordinates:<br />
            x: {selected.position.x.toFixed(2)}<br />
            y: {selected.position.y.toFixed(2)}<br />
            z: {selected.position.z.toFixed(2)}
          </p>

          <a
            href={`/checkout?parcel=${selected.id}`}
            className="buy"
          >
            Proceed to Checkout
          </a>

          <button onClick={() => setSelected(null)}>Close</button>
        </div>
      )}

      <footer>
        <a href="https://facebook.com" target="_blank">Facebook</a>
        <a href="https://instagram.com" target="_blank">Instagram</a>
        <a href="https://x.com" target="_blank">X</a>
      </footer>
    </div>
  )
}
