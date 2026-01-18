import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Home() {
  const mountRef = useRef(null);
  const [parcel, setParcel] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const texture = new THREE.TextureLoader().load(
      'https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004826/moon_8k_color_brim16.jpg'
    );

    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const moon = new THREE.Mesh(geometry, material);
    scene.add(moon);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5,5,5);
    scene.add(light);

    function animate() {
      requestAnimationFrame(animate);
      moon.rotation.y += 0.001;
      renderer.render(scene, camera);
    }
    animate();

    return () => mountRef.current.removeChild(renderer.domElement);
  }, []);

  async function buy() {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, parcel })
    });
    const data = await res.json();
    window.location = data.url;
  }

  return (
    <>
      <div ref={mountRef}></div>

      <div className="overlay">
        <h1>Lunar Pre-Emptive Rights</h1>
        <p>
          Secure a documented speculative position tied to lunar coordinates.
          No ownership is granted under current international law.
        </p>

        <select onChange={e=>setParcel(e.target.value)}>
          <option>Select parcel</option>
          {Array.from({length:180},(_,i)=>(
            <option key={i} value={i+1}>Parcel #{i+1}</option>
          ))}
        </select>

        <br /><br />

        <input
          placeholder="Your email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />

        <br /><br />

        <button onClick={buy} disabled={!parcel || !email}>
          Acquire Pre-Emptive Right
        </button>

        <details>
          <summary>Terms</summary>
          <p>
            This is a speculative registration. No property rights are granted.
            Subject to future international legal frameworks.
          </p>
        </details>

        <p>© 2026</p>
      </div>
    </>
  );
}
