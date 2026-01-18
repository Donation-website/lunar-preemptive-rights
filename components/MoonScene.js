// components/MoonScene.js
import React, { Suspense } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export default function MoonScene() {
  const texture = new THREE.TextureLoader().load('/moon/moon-map.jpg')

  return (
    <Canvas style={{ height: '100vh', width: '100vw' }} camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <Suspense fallback={null}>
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial map={texture} />
        </mesh>
      </Suspense>

      <OrbitControls enablePan={false} />
    </Canvas>
  )
}
