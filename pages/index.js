import { useState } from 'react';
import Head from 'next/head';
import HexMap from '../components/HexMap';
import LegalDropdown from '../components/LegalDropdown';

export default function Home() {
  const [selectedParcel, setSelectedParcel] = useState(null);

  return (
    <>
      <Head>
        <title>Lunar Pre-Emptive Rights</title>
        <meta name="description" content="Reserve your speculative lunar parcel today. Humanity is returning to the Moon." />
      </Head>
      <main>
        <h1>Reserve Your Place on the Moon</h1>
        <p>
          Humanity is returning to the Moon. Legal frameworks will evolve.
          This platform allows individuals to secure a documented, speculative pre-emptive position tied to specific lunar coordinates.
        </p>
        <HexMap selectedParcel={selectedParcel} setSelectedParcel={setSelectedParcel} />
        <LegalDropdown />
      </main>
    </>
  );
}
