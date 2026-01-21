import dynamic from 'next/dynamic'

const MoonScene = dynamic(
  () => import('../components/MoonScene'),
  { ssr: false }
)

export default function Home() {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <h1 style={{
        position: 'absolute',
        zIndex: 10,
        color: 'white',
        padding: '20px'
      }}>
        🌕 Lunar Pre-Emptive Rights – LIVE
      </h1>

      <MoonScene />
    </div>
  )
}
