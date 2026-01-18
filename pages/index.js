import dynamic from 'next/dynamic'

const MoonScene = dynamic(() => import('../components/MoonScene'), { ssr: false })

export default function Home() {
  return (
    <div>
      <h1>🌕 Lunar Pre-Emptive Rights – LIVE</h1>

      <div className="social-icons">
        <img src="/social/facebook.png" alt="Facebook" />
        <img src="/social/instagram.png" alt="Instagram" />
        <img src="/social/x.png" alt="X" />
      </div>

      <MoonScene />

      <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'white', zIndex: 10 }}>
        <button onClick={() => alert("ASZF lenyíló szöveg: ...")}>ASZF</button>
      </div>

      <div style={{ position: 'absolute', bottom: '20px', right: '20px', color: 'white', zIndex: 10 }}>
        Rövid leírás: Válassz egy parcellát a Holdon, kattints a zöld területre, és a fizetés után email visszaigazolást kapsz.
      </div>
    </div>
  )
}
