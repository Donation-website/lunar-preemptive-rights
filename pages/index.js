import dynamic from 'next/dynamic'
import Head from 'next/head'

const MoonScene = dynamic(() => import('../components/MoonScene'), {
  ssr: false
})

export default function Home() {
  return (
    <>
      <Head>
        <title>Lunar Pre-Emptive Rights</title>
        <meta
          name="description"
          content="Secure a speculative, documented pre-emptive position on the Moon. Interactive lunar parcels, certification, and future-facing concept."
        />
        <meta
          name="keywords"
          content="Moon land, lunar parcels, space law, future property, Moon ownership, lunar rights, speculative assets"
        />
      </Head>

      <main>
        <header className="header">
          <h1>🌕 Lunar Pre-Emptive Rights</h1>
          <p>
            Humanity is returning to the Moon. Laws will follow.
            <br />
            Secure a documented, speculative pre-emptive position today.
          </p>
        </header>

        <MoonScene />

        <section className="info">
          <h2>How it works</h2>
          <p>
            Select an available lunar parcel on the interactive Moon.
            By acquiring a pre-emptive right, you receive a timestamped
            digital certificate documenting your position.
          </p>
          <p>
            <strong>No ownership is granted today.</strong><br />
            This initiative anticipates potential future international
            legal frameworks beyond the Outer Space Treaty (1967).
          </p>
        </section>

        <details className="terms">
          <summary>Terms & Legal Notice</summary>
          <p>
            This service does not grant property rights.
            The certificate is symbolic and speculative.
            No guarantees are made regarding future legal recognition.
          </p>
        </details>

        <footer className="footer">
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
          <p>© 2026 Lunar Pre-Emptive Rights · Conceptual Initiative</p>
        </footer>
      </main>
    </>
  )
}
