import ParcelMap3D from '../components/ParcelMap3D';
import Footer from '../components/Footer';
import ASZFModal from '../components/ASZFModal';

export default function Home() {
  return (
    <div>
      <header>
        <h1>Reserve Your Place on the Moon</h1>
        <p>Humanity is returning to the Moon. Secure your speculative pre-emptive position today.</p>
      </header>

      <main>
        <ParcelMap3D />
      </main>

      <ASZFModal />
      <Footer />
    </div>
  );
}
