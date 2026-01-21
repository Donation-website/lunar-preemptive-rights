import dynamic from 'next/dynamic'
import Head from 'next/head'

const MoonScene = dynamic(() => import('../components/MoonScene'), { ssr: false })

export default function Home() {
  return (
    <>
      <Head>
        <title>Lunar Pre-Emptive Rights</title>
      </Head>

      <header style={{
        position: 'absolute',
        top: 20,
        width: '100%',
        textAlign: 'center',
        color: 'white',
        zIndex: 10
      }}>
        🌕 Lunar Pre-Emptive Rights
      </header>

      <MoonScene />

      <div className="social-icons">
        <a href="https://facebook.com" target="_blank">FB</a>
        <a href="https://instagram.com" target="_blank">IG</a>
        <a href="https://twitter.com" target="_blank">X</a>
      </div>
    </>
  )
}
