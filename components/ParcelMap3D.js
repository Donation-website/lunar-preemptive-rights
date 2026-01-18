import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useState } from 'react';
import CheckoutModal from './CheckoutModal';

export default function ParcelMap3D() {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  // Példa: 90 hexagon, random pozíció a hold gömb felszínén
  const parcels = Array.from({ length: 90 }, (_, i) => ({
    id: i + 1,
    x: Math.random() * 8 - 4,
    y: Math.random() * 0.5 - 0.25,
    z: Math.random() * 8 - 4,
    radius: 0.2 + Math.random() * 0.3,
    purchased: Math.random() < 0.2, // 20% már lefoglalt
    price: 1000 + Math.floor(Math.random() * 4000), // USD
    holder: null
  }));

  const handleParcelClick = (parcel) => {
    if (parcel.purchased) return; // piros, nem kattintható
    setSelectedParcel(parcel);
    setShowCheckout(true);
  };

  return (
    <div style={{ height: '80vh' }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Stars />
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[5, 64, 64]} />
          <meshStandardMaterial color="gray" />
        </mesh>

        {parcels.map((p) => (
          <mesh
            key={p.id}
            position={[p.x, p.y + 5, p.z]}
            onClick={() => handleParcelClick(p)}
          >
            <cylinderGeometry args={[p.radius, p.radius, 0.05, 6]} />
            <meshStandardMaterial color={p.purchased ? 'red' : 'green'} />
          </mesh>
        ))}

        <OrbitControls enablePan={true} enableZoom={true} />
      </Canvas>

      {showCheckout && (
        <CheckoutModal parcel={selectedParcel} onClose={() => setShowCheckout(false)} />
      )}
    </div>
  );
}
