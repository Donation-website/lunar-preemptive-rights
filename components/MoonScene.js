// components/MoonScene.js
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function MoonScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 3

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    // Moon texture
    const textureLoader = new THREE.TextureLoader()
    const moonTexture = textureLoader.load('/moon/moon-map.jpg') // innen töltjük
    const geometry = new THREE.SphereGeometry(1, 64, 64)
    const material = new THREE.MeshStandardMaterial({ map: moonTexture })
    const moon = new THREE.Mesh(geometry, material)
    scene.add(moon)

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableZoom = true

    // Animation
    const animate = function () {
      requestAnimationFrame(animate)
      moon.rotation.y += 0.001
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight)
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      mount.removeChild(renderer.domElement)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
}
