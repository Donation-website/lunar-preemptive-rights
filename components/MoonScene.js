import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";

function Moon() {
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.y += 0.0008;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial color="#bfbfbf" roughness={1} />
    </mesh>
  );
}

export default function MoonScene() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <Stars radius={100} depth={50} count={5000} factor={4} fade />
      <Moon />
      <OrbitControls enableZoom />
    </Canvas>
  );
}
