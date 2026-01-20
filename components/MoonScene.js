import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useState, useMemo } from 'react'

// Hexagon parcellák adatai
const PARCEL_COUNT = 180
const PARCELS = Array.from({ length: PARCEL_COUNT }, (_, i) => ({
  id: i + 1,
  size: Math.random() * 0.02 + 0.01, // véletlenszerű méret
  price: (Math.random() * 500 + 100).toFixed(2), // ár USD
  status: Math.random() < 0.3 ? 'occupied' : 'available', // 30% foglalt
  position: [
    (Math.random() - 0.5) * 2, // x
    (Math.random() - 0.5) * 2, // y
    (Math.random() - 0.5) * 2  // z
  ]
}))

function Parcel({ parcel, onSelect }) {
  const [hovered, setHovered] = useState(false)

  return (
    <mesh
      position={parcel.position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => parcel.status === 'available' && onSelect(parcel)}
    >
      <cylinderGeometry
        args={[
          parcel.size, // top radius
          parcel.size, // bottom radius
          0.01,        // height
          6            // segments for hexagon
        ]}
      />
      <meshStandardMaterial
        color={
          parcel.status === 'occupied'
            ? 'red'
            : hovered
            ? 'yellow'
            : 'green'
        }
        opacity={0.8}
        transparent
      />
    </mesh>
  )
}

export default function MoonScene() {
  const [selectedParcel, setSelectedParcel] = useState(null)

  const handleSelect = (parcel) => {
    setSelectedParcel(parcel)
    if (parcel.status === 'available') {
      // itt lehet hívni a checkout funkciót
      alert(`Proceed to checkout for parcel #${parcel.id} - $${parcel.price}`)
    }
  }

  // Hold textúra
  const moonTexture = useMemo(() => new THREE.TextureLoader().load('/moon/moon-map.jpg'), [])

  // Hold forgatása
  function Moon() {
    const ref = useFrame(({ clock }) => {
      ref.rotation.y = clock.getElapsedTime() * 0.05
    })

    return (
      <mesh ref={ref}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={moonTexture} />
      </mesh>
    )
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 60 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <Moon />

      {PARCELS.map((p) => (
        <Parcel key={p.id} parcel={p} onSelect={handleSelect} />
      ))}

      <OrbitControls enableZoom={true} enablePan={false} />
    </Canvas>
  )
}
