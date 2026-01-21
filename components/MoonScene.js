"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function MoonScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // LIGHT
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // MOON TEXTURE
    const textureLoader = new THREE.TextureLoader();
    const moonTexture = textureLoader.load("/moon/moon-map.jpg");

    // MOON
    const moonGeometry = new THREE.SphereGeometry(1, 64, 64);
    const moonMaterial = new THREE.MeshStandardMaterial({
      map: moonTexture,
    });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    scene.add(moon);

    // PARCEL GROUP (ROTATES WITH MOON)
    const parcelGroup = new THREE.Group();
    moon.add(parcelGroup);

    const parcelCount = 60;
    const parcels = [];

    for (let i = 0; i < parcelCount; i++) {
      const geometry = new THREE.RingGeometry(0.03, 0.05, 32);
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        side: THREE.DoubleSide,
      });

      const ring = new THREE.Mesh(geometry, material);

      // RANDOM POSITION ON SPHERE
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();

      ring.position.set(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta)
      );

      ring.lookAt(0, 0, 0);
      ring.userData = { clickable: true };

      parcelGroup.add(ring);
      parcels.push(ring);
    }

    // RAYCASTER
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(parcels);

      if (intersects.length > 0) {
        alert("Parcel selected → checkout coming next");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    // RESIZE
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ANIMATE
    const animate = () => {
      requestAnimationFrame(animate);
      moon.rotation.y += 0.0015;
      renderer.render(scene, camera);
    };
    animate();

    // CLEANUP
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      mountRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    />
  );
}
