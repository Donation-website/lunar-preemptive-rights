import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshStandardMaterial } from '@react-three/drei';

export default function MoonScene() {
  return (
    <Canvas style={{ height: '100vh', width: '100vw' }} camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <Suspense fallback={null}>
        <Sphere args={[1, 64, 64]}>
          <MeshStandardMaterial map={new THREE.TextureLoader().load('/moon/moon-map.jpg')} />
        </Sphere>
      </Suspense>

      <OrbitControls />
    </Canvas>
  )
}
