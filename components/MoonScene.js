import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useMemo } from 'react'

function Moon() {
  const ref = useRef()

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.001
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        map={new THREE.TextureLoader().load('/moon/moon-map.jpg')}
      />
    </mesh>
  )
}

function Parcels() {
  const parcels = useMemo(() => {
    return Array.from({ length: 180 }).map(() => {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.01

      return new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      )
    })
  }, [])

  return parcels.map((pos, i) => (
    <mesh key={i} position={pos}>
      <circleGeometry args={[0.05, 32]} />
      <meshBasicMaterial
        color="lime"
        transparent
        opacity={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  ))
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
      <Parcels />
      <OrbitControls enableZoom enableRotate />
    </Canvas>
  )
}
