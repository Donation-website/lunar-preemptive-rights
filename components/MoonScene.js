import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function MoonScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const width = mountRef.current.clientWidth
    const height = mountRef.current.clientHeight

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0, 5)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    mountRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.5

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(5, 5, 5)
    scene.add(light)
    scene.add(new THREE.AmbientLight(0x404040))

    // Texture
    const textureLoader = new THREE.TextureLoader()
    const moonTexture = textureLoader.load('/moon/moon-map.jpg') // fontos: public mappa gyökérből
    const geometry = new THREE.SphereGeometry(1.6, 64, 64)
    const material = new THREE.MeshStandardMaterial({ map: moonTexture })
    const moon = new THREE.Mesh(geometry, material)
    scene.add(moon)

    // Hexagons (random pozíció a hold felszínén)
    const hexGroup = new THREE.Group()
    const hexCount = 180
    const radius = 0.05 // hexagon sugar

    for (let i = 0; i < hexCount; i++) {
      const color = Math.random() < 0.3 ? 0xff0000 : 0x00ff00 // piros = foglalt, zöld = vásárolható
      const hexMaterial = new THREE.MeshBasicMaterial({ color })
      const hexGeometry = new THREE.CircleGeometry(radius, 6)
      const hex = new THREE.Mesh(hexGeometry, hexMaterial)

      // random pozíció a gömb felszínén
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 1.6 + 0.01
      hex.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      )

      // forgatás a felszínhez
      hex.lookAt(0, 0, 0)
      hex.userData = { bought: color === 0xff0000, parcelId: i + 1 }
      hexGroup.add(hex)
    }
    scene.add(hexGroup)

    // Click event
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    function onClick(event) {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(hexGroup.children)
      if (intersects.length > 0) {
        const hex = intersects[0].object
        if (!hex.userData.bought) {
          alert(`Proceed to checkout for parcel #${hex.userData.parcelId}`)
        } else {
          alert(`Parcel #${hex.userData.parcelId} is already bought.`)
        }
      }
    }
    window.addEventListener('click', onClick)

    // Animate
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('click', onClick)
      mountRef.current.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />
}
