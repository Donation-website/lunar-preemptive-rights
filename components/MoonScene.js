import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef, useState } from 'react'

const PARCELS = Array.from({ length: 180 }).map((_, i) => ({
  id: `LPR-${String(i + 1).padStart(3, '0')}`,
  price: 180,
  lat: (Math.random() * 180 - 90).toFixed(2),
  lon: (Math.random() * 360 - 180).toFixed(2),
  sold: false
}))

function Parcels({ onSelect }) {
  return PARCELS.map((parcel, i) => {
    const phi = Math.acos(2 * Math.random() - 1)
    const theta = 2 * Math.PI * Math.random()
    const r = 1.02

    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.cos(phi)
    const z = r * Math.sin(phi) * Math.sin(theta)

    return (
      <mesh
        key={parcel.id}
        position={[x, y, z]}
        onClick={(e) => {
          e.stopPropagation()
          if (!parcel.sold) onSelect(parcel)
        }}
      >
        <circleGeometry args={[0.035, 32]} />
        <meshBasicMaterial
          color={parcel.sold ? 'red' : 'lime'}
          wireframe
        />
      </mesh>
    )
  })
}

function Moon({ onSelect }) {
  const moonRef = useRef()

  useFrame(() => {
    moonRef.current.rotation.y += 0.001
  })

  return (
    <group ref={moonRef}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#888" />
      </mesh>

      <Parcels onSelect={onSelect} />
    </group>
  )
}

export default function MoonScene() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      {selected && (
        <div style={{
          position: 'absolute',
          top: '100px',
          right: '40px',
          background: 'rgba(0,0,0,0.85)',
          padding: '20px',
          color: 'white',
          zIndex: 20,
          width: '260px',
          borderRadius: '8px'
        }}>
          <h3>{selected.id}</h3>
          <p>Price: ${selected.price}</p>
          <p>Latitude: {selected.lat}</p>
          <p>Longitude: {selected.lon}</p>

          <button
            style={{
              marginTop: '10px',
              width: '100%',
              padding: '10px',
              cursor: 'pointer'
            }}
            onClick={() => {
              window.location.href = `/checkout?parcel=${selected.id}&price=${selected.price}`
            }}
          >
            Proceed to checkout
          </button>

          <button
            style={{
              marginTop: '8px',
              width: '100%',
              padding: '6px',
              cursor: 'pointer',
              background: 'transparent',
              color: '#aaa',
              border: 'none'
            }}
            onClick={() => setSelected(null)}
          >
            Close
          </button>
        </div>
      )}

      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Moon onSelect={setSelected} />
        <OrbitControls enableZoom />
      </Canvas>
    </>
  )
}
