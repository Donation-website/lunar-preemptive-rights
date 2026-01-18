import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const parcelData = Array.from({ length: 180 }).map((_, i) => ({
  id: i + 1,
  theta: Math.random() * Math.PI * 2,
  phi: Math.acos(Math.random() * 2 - 1),
  size: 0.03 + Math.random() * 0.02,
  purchased: Math.random() < 0.3 // random 30% piros
}))

function Parcel({ parcel }) {
  const mesh = useRef()
  const color = parcel.purchased ? 'red' : 'green'
  const radius = 1
  const x = radius * Math.sin(parcel.phi) * Math.cos(parcel.theta)
  const y = radius * Math.cos(parcel.phi)
  const z = radius * Math.sin(parcel.phi) * Math.sin(parcel.theta)

  return (
    <mesh
      ref={mesh}
      position={[x, y, z]}
      scale={[parcel.size, parcel.size, parcel.size]}
    >
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export default function MoonScene() {
  const texture = useMemo(() => new THREE.TextureLoader().load('/moon/moon-map.jpg'), [])

  return (
    <Canvas style={{ height: '100vh', background: 'black' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {parcelData.map(p => <Parcel key={p.id} parcel={p} />)}
      <OrbitControls enableZoom={true} />
    </Canvas>
  )
}
