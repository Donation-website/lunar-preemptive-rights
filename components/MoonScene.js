import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture } from '@react-three/drei'
import { useState, useEffect } from 'react'

export default function MoonScene() {
  const [parcels, setParcels] = useState([])
  const moonTexture = useTexture('/moon/moon-map.jpg')

  useEffect(() => {
    // 180 hexagon parcel, random position
    const temp = []
    for (let i = 0; i < 180; i++) {
      temp.push({
        id: i + 1,
        x: Math.random() * 4 - 2,  // adjust to fit sphere
        y: Math.random() * 4 - 2,
        z: 0,
        status: Math.random() < 0.3 ? 'taken' : 'available',
        size: 0.05 + Math.random() * 0.03,
        price: Math.floor(Math.random() * 100 + 50)
      })
    }
    setParcels(temp)
  }, [])

  const handleParcelClick = (parcel) => {
    if (parcel.status === 'available') {
      alert(`Proceed to checkout for parcel #${parcel.id}`)
      // call API here for checkout
    }
  }

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <Stars />
      <OrbitControls enableZoom={true} />

      {parcels.map(p => (
        <mesh
          key={p.id}
          position={[p.x, p.y, p.z]}
          onClick={() => handleParcelClick(p)}
        >
          <cylinderGeometry args={[p.size, p.size, 0.01, 6]} />
          <meshStandardMaterial color={p.status === 'available' ? 'green' : 'red'} />
        </mesh>
      ))}

      {/* Moon sphere */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={moonTexture} />
      </mesh>
    </Canvas>
  )
}
