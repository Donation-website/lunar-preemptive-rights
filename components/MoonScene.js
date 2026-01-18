import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

export default function MoonScene() {
  const moonTexture = useLoader(TextureLoader, '/moon/moon-map.jpg')
  const [selectedHex, setSelectedHex] = useState(null)

  const hexagons = useRef([])
  const PARCELS = 180

  // generate random hex positions
  const positions = []
  for (let i = 0; i < PARCELS; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI
    const radius = 5
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi) * Math.sin(theta)
    const z = radius * Math.cos(phi)
    positions.push([x, y, z])
  }

  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      {/* Moon sphere */}
      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial map={moonTexture} />
      </mesh>

      {/* Hexagons */}
      {positions.map((pos, i) => (
        <mesh
          key={i}
          position={pos}
          onClick={() => setSelectedHex(i)}
        >
          <cylinderGeometry args={[0.2, 0.2, 0.05, 6]} />
          <meshStandardMaterial color={selectedHex === i ? 'green' : 'red'} />
        </mesh>
      ))}
    </Canvas>
  )
}
