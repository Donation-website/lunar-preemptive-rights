"use client"

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'

function Moon() {
  const ref = useRef()
  const texture = useLoader(THREE.TextureLoader, '/moon/moon-map.jpg')

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

export default function MoonScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Moon />
      <OrbitControls enableZoom enableRotate />
    </Canvas>
  )
}
