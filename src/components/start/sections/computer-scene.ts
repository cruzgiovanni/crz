import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export function initScene(container: HTMLDivElement, onReady?: () => void): () => void {
  // Scene setup
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xc8c4c0)
  scene.fog = new THREE.FogExp2(0xc8c4c0, 0.06)

  const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100)
  camera.position.set(5, 4, 6)
  camera.lookAt(0, 0.5, 0)

  const isMobile = container.clientWidth < 768
  const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true })
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
  renderer.shadowMap.enabled = !isMobile
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.1
  renderer.outputColorSpace = THREE.SRGBColorSpace
  container.appendChild(renderer.domElement)

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xfaf0e6, 0.2)
  scene.add(ambientLight)

  const hemiLight = new THREE.HemisphereLight(0xc8d8e8, 0x504030, 0.5)
  scene.add(hemiLight)

  // Environment map for PBR reflections
  const pmremGenerator = new THREE.PMREMGenerator(renderer)
  pmremGenerator.compileEquirectangularShader()

  const envScene = new THREE.Scene()
  envScene.background = new THREE.Color(0xc8c4c0)
  const envLight1 = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }),
  )
  envLight1.position.set(0, 5, 0)
  envLight1.rotation.x = Math.PI / 2
  envScene.add(envLight1)
  const envLight2 = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 4),
    new THREE.MeshBasicMaterial({ color: 0xffeedd, side: THREE.DoubleSide }),
  )
  envLight2.position.set(5, 3, 0)
  envLight2.rotation.y = -Math.PI / 2
  envScene.add(envLight2)
  const envRT = pmremGenerator.fromScene(envScene)
  scene.environment = envRT.texture

  // Dispose env scene (only needed for PMREM generation)
  envLight1.geometry.dispose()
  ;(envLight1.material as THREE.Material).dispose()
  envLight2.geometry.dispose()
  ;(envLight2.material as THREE.Material).dispose()

  const dirLight = new THREE.DirectionalLight(0xfff5e0, 2.8)
  dirLight.position.set(5, 8, 4)
  dirLight.castShadow = true
  dirLight.shadow.mapSize.width = 1024
  dirLight.shadow.mapSize.height = 1024
  dirLight.shadow.camera.near = 0.5
  dirLight.shadow.camera.far = 25
  dirLight.shadow.camera.left = -8
  dirLight.shadow.camera.right = 8
  dirLight.shadow.camera.top = 8
  dirLight.shadow.camera.bottom = -8
  dirLight.shadow.bias = -0.001
  scene.add(dirLight)

  const fillLight = new THREE.DirectionalLight(0xb0c4de, 0.35)
  fillLight.position.set(-3, 4, -2)
  scene.add(fillLight)

  const rimLight = new THREE.DirectionalLight(0xffeedd, 0.5)
  rimLight.position.set(-2, 3, 5)
  scene.add(rimLight)

  const backLight = new THREE.DirectionalLight(0xdde8ff, 0.15)
  backLight.position.set(0, 2, -5)
  scene.add(backLight)

  const areaLight = new THREE.PointLight(0xfff8f0, 0.6, 8)
  areaLight.position.set(0, 3, 1)
  scene.add(areaLight)

  // Floor
  const floorGeom = new THREE.PlaneGeometry(30, 30)
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0xb8b0a0,
    roughness: 0.8,
    metalness: 0.0,
    envMapIntensity: 0.2,
  })
  const floor = new THREE.Mesh(floorGeom, floorMat)
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  scene.add(floor)

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.target.set(0, 0.8, 0)
  controls.minDistance = 3
  controls.maxDistance = 15
  controls.maxPolarAngle = Math.PI / 2.1
  controls.update()

  // ============================
  // Build desk scene
  // ============================
  function createDeskScene() {
    const deskGroup = new THREE.Group()

    const birchMat = new THREE.MeshStandardMaterial({
      color: 0xe8d8b8,
      roughness: 0.45,
      metalness: 0.0,
      envMapIntensity: 0.5,
    })
    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xf0f0f0,
      roughness: 0.3,
      metalness: 0.2,
      envMapIntensity: 0.6,
    })

    // Desk top
    const deskTop = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.04, 1.1), birchMat)
    deskTop.position.set(0, 1.0, 0)
    deskTop.castShadow = true
    deskTop.receiveShadow = true
    deskGroup.add(deskTop)

    // Edge strip
    const edgeStrip = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.02, 0.01), whiteMat)
    edgeStrip.position.set(0, 1.0, 0.555)
    deskGroup.add(edgeStrip)

    // A-frame legs
    function createAFrameLeg(xSign: number) {
      const legGroup = new THREE.Group()
      const bar1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.02, 0.04), whiteMat)
      bar1.position.set(xSign * 0.22, 0.5, 0.35)
      bar1.rotation.z = xSign * 0.08
      bar1.castShadow = true
      legGroup.add(bar1)
      const bar2 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.02, 0.04), whiteMat)
      bar2.position.set(xSign * 0.22, 0.5, -0.35)
      bar2.rotation.z = xSign * 0.08
      bar2.castShadow = true
      legGroup.add(bar2)
      const cross = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.66), whiteMat)
      cross.position.set(xSign * 0.22, 0.45, 0)
      legGroup.add(cross)
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.76), whiteMat)
      foot.position.set(xSign * 0.27, 0.015, 0)
      legGroup.add(foot)
      return legGroup
    }
    const leftLegs = createAFrameLeg(-1)
    leftLegs.position.x = -1.05
    deskGroup.add(leftLegs)
    const rightLegs = createAFrameLeg(1)
    rightLegs.position.x = 1.05
    deskGroup.add(rightLegs)

    // CRT Monitor
    const monitorGroup = new THREE.Group()
    monitorGroup.position.set(0.1, 1.02, -0.15)

    const crtMat = new THREE.MeshStandardMaterial({
      color: 0xf0ece5,
      roughness: 0.35,
      metalness: 0.05,
      envMapIntensity: 0.5,
    })
    const monBase = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.03, 0.35), crtMat)
    monBase.castShadow = true
    monitorGroup.add(monBase)

    const monStand = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.07, 0.18), crtMat)
    monStand.position.set(0, 0.05, 0)
    monStand.castShadow = true
    monitorGroup.add(monStand)

    // CRT body with rounded corners
    const crtBodyShape = new THREE.Shape()
    const crtW = 0.6,
      crtH2 = 0.5,
      crtR = 0.04
    crtBodyShape.moveTo(-crtW / 2 + crtR, -crtH2 / 2)
    crtBodyShape.lineTo(crtW / 2 - crtR, -crtH2 / 2)
    crtBodyShape.quadraticCurveTo(crtW / 2, -crtH2 / 2, crtW / 2, -crtH2 / 2 + crtR)
    crtBodyShape.lineTo(crtW / 2, crtH2 / 2 - crtR)
    crtBodyShape.quadraticCurveTo(crtW / 2, crtH2 / 2, crtW / 2 - crtR, crtH2 / 2)
    crtBodyShape.lineTo(-crtW / 2 + crtR, crtH2 / 2)
    crtBodyShape.quadraticCurveTo(-crtW / 2, crtH2 / 2, -crtW / 2, crtH2 / 2 - crtR)
    crtBodyShape.lineTo(-crtW / 2, -crtH2 / 2 + crtR)
    crtBodyShape.quadraticCurveTo(-crtW / 2, -crtH2 / 2, -crtW / 2 + crtR, -crtH2 / 2)

    const crtBodyGeom = new THREE.ExtrudeGeometry(crtBodyShape, {
      depth: 0.45,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3,
    })
    crtBodyGeom.center()
    const crtBody = new THREE.Mesh(crtBodyGeom, crtMat)
    crtBody.position.set(0, 0.36, -0.02)
    crtBody.rotation.x = Math.PI / 2
    crtBody.castShadow = true
    monitorGroup.add(crtBody)

    const crtBack = new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), crtMat)
    crtBack.rotation.x = Math.PI / 2
    crtBack.position.set(0, 0.36, -0.2)
    crtBack.scale.set(1, 1, 0.8)
    crtBack.castShadow = true
    monitorGroup.add(crtBack)

    // Screen
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x7a9bb5,
      roughness: 0.15,
      metalness: 0.05,
      emissive: 0x2a4a5a,
      emissiveIntensity: 0.35,
      envMapIntensity: 0.3,
    })
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.48, 0.38), screenMat)
    screen.position.set(0, 0.36, 0.255)
    monitorGroup.add(screen)

    // Bezel
    const bezelShape = new THREE.Shape()
    const bzW = 0.56,
      bzH = 0.46,
      bzR = 0.03
    bezelShape.moveTo(-bzW / 2 + bzR, -bzH / 2)
    bezelShape.lineTo(bzW / 2 - bzR, -bzH / 2)
    bezelShape.quadraticCurveTo(bzW / 2, -bzH / 2, bzW / 2, -bzH / 2 + bzR)
    bezelShape.lineTo(bzW / 2, bzH / 2 - bzR)
    bezelShape.quadraticCurveTo(bzW / 2, bzH / 2, bzW / 2 - bzR, bzH / 2)
    bezelShape.lineTo(-bzW / 2 + bzR, bzH / 2)
    bezelShape.quadraticCurveTo(-bzW / 2, bzH / 2, -bzW / 2, bzH / 2 - bzR)
    bezelShape.lineTo(-bzW / 2, -bzH / 2 + bzR)
    bezelShape.quadraticCurveTo(-bzW / 2, -bzH / 2, -bzW / 2 + bzR, -bzH / 2)
    const bezelGeom = new THREE.ExtrudeGeometry(bezelShape, {
      depth: 0.02,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.005,
      bevelSegments: 2,
    })
    bezelGeom.center()
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0xe5e0d8,
      roughness: 0.35,
      metalness: 0.05,
      envMapIntensity: 0.4,
    })
    const bezelFrame = new THREE.Mesh(bezelGeom, bezelMat)
    bezelFrame.position.set(0, 0.36, 0.14)
    monitorGroup.add(bezelFrame)

    // Power LED
    const ledMat = new THREE.MeshStandardMaterial({
      color: 0x44ff44,
      emissive: 0x44ff44,
      emissiveIntensity: 0.8,
    })
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.008, 8, 8), ledMat)
    led.position.set(0.22, 0.15, 0.23)
    monitorGroup.add(led)

    deskGroup.add(monitorGroup)

    // Keyboard
    const kbMat = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.3,
      metalness: 0.3,
      envMapIntensity: 0.6,
    })
    const keyboard = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.012, 0.13), kbMat)
    keyboard.position.set(0.1, 1.028, 0.25)
    keyboard.castShadow = true
    deskGroup.add(keyboard)

    const keyMat = new THREE.MeshStandardMaterial({
      color: 0x3a3a3a,
      roughness: 0.4,
      metalness: 0.15,
      envMapIntensity: 0.4,
    })
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 13; col++) {
        const key = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.005, 0.022), keyMat)
        key.position.set(0.1 - 0.17 + col * 0.028, 1.038, 0.25 - 0.04 + row * 0.028)
        deskGroup.add(key)
      }
    }

    // Mouse
    const mouseMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.2,
      metalness: 0.25,
      envMapIntensity: 0.7,
    })
    const mouseBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.025, 0.04, 8, 12), mouseMat)
    mouseBody.position.set(0.5, 1.04, 0.25)
    mouseBody.rotation.x = Math.PI / 2
    mouseBody.castShadow = true
    deskGroup.add(mouseBody)

    // Succulent plant
    const plantGroup = new THREE.Group()
    plantGroup.position.set(0.85, 1.02, -0.3)
    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0xb0b0a8,
      roughness: 0.9,
      metalness: 0.0,
      envMapIntensity: 0.2,
    })
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.07, 8), concreteMat)
    pot.position.y = 0.035
    pot.castShadow = true
    plantGroup.add(pot)
    const soilMat = new THREE.MeshStandardMaterial({ color: 0x3d2b1f, roughness: 0.9 })
    const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.01, 8), soilMat)
    soil.position.y = 0.07
    plantGroup.add(soil)
    const succMat = new THREE.MeshStandardMaterial({ color: 0x6aaa6a, roughness: 0.5 })
    const succMat2 = new THREE.MeshStandardMaterial({ color: 0x88cc88, roughness: 0.5 })
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 6), i % 2 === 0 ? succMat : succMat2)
      leaf.position.set(Math.cos(angle) * 0.025, 0.085, Math.sin(angle) * 0.025)
      leaf.scale.set(1, 0.6, 1.2)
      plantGroup.add(leaf)
    }
    const centerLeaf = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 6), succMat2)
    centerLeaf.position.set(0, 0.095, 0)
    plantGroup.add(centerLeaf)
    deskGroup.add(plantGroup)

    // Coffee cup
    const cupMat = new THREE.MeshStandardMaterial({
      color: 0xfaf8f5,
      roughness: 0.4,
      metalness: 0.02,
      envMapIntensity: 0.5,
    })
    const cupBody = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.03, 0.08, 16), cupMat)
    cupBody.position.set(0.65, 1.06, 0.15)
    cupBody.castShadow = true
    deskGroup.add(cupBody)
    const coffeeMat = new THREE.MeshStandardMaterial({
      color: 0x3a2010,
      roughness: 0.3,
      metalness: 0.0,
      envMapIntensity: 0.2,
    })
    const coffee = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.005, 16), coffeeMat)
    coffee.position.set(0.65, 1.098, 0.15)
    deskGroup.add(coffee)

    // Notebook
    const notebookMat = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.55,
      metalness: 0.0,
      envMapIntensity: 0.3,
    })
    const notebook = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.01, 0.24), notebookMat)
    notebook.position.set(-0.45, 1.027, 0.25)
    notebook.rotation.y = 0.1
    notebook.castShadow = true
    deskGroup.add(notebook)
    const bandMat = new THREE.MeshStandardMaterial({ color: 0xcc4444, roughness: 0.5 })
    const band = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.012, 0.24), bandMat)
    band.position.set(-0.39, 1.033, 0.25)
    band.rotation.y = 0.1
    deskGroup.add(band)

    // Pencil
    const pencilMat = new THREE.MeshStandardMaterial({ color: 0xf0d060, roughness: 0.5 })
    const pencil = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.2, 6), pencilMat)
    pencil.position.set(-0.35, 1.035, 0.35)
    pencil.rotation.z = Math.PI / 2
    pencil.rotation.y = 0.3
    deskGroup.add(pencil)
    const pencilTip = new THREE.Mesh(
      new THREE.ConeGeometry(0.005, 0.015, 6),
      new THREE.MeshStandardMaterial({ color: 0x3a3a2a }),
    )
    pencilTip.position.set(-0.25, 1.035, 0.32)
    pencilTip.rotation.z = Math.PI / 2
    pencilTip.rotation.y = 0.3
    deskGroup.add(pencilTip)

    // Chair
    const chairMat = new THREE.MeshStandardMaterial({
      color: 0xf0ece5,
      roughness: 0.45,
      metalness: 0.0,
      envMapIntensity: 0.4,
    })
    const chairShape = new THREE.Shape()
    const chW = 0.5,
      chH = 0.5,
      chR = 0.06
    chairShape.moveTo(-chW / 2 + chR, -chH / 2)
    chairShape.lineTo(chW / 2 - chR, -chH / 2)
    chairShape.quadraticCurveTo(chW / 2, -chH / 2, chW / 2, -chH / 2 + chR)
    chairShape.lineTo(chW / 2, chH / 2 - chR)
    chairShape.quadraticCurveTo(chW / 2, chH / 2, chW / 2 - chR, chH / 2)
    chairShape.lineTo(-chW / 2 + chR, chH / 2)
    chairShape.quadraticCurveTo(-chW / 2, chH / 2, -chW / 2, chH / 2 - chR)
    chairShape.lineTo(-chW / 2, -chH / 2 + chR)
    chairShape.quadraticCurveTo(-chW / 2, -chH / 2, -chW / 2 + chR, -chH / 2)
    const chairGeom = new THREE.ExtrudeGeometry(chairShape, {
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.06,
      bevelSegments: 6,
    })
    chairGeom.center()
    const chair = new THREE.Mesh(chairGeom, chairMat)
    chair.position.set(0.1, 0.25, 1.0)
    chair.rotation.x = Math.PI / 2
    chair.castShadow = true
    chair.receiveShadow = true
    deskGroup.add(chair)

    deskGroup.position.set(0, 0, 0)
    scene.add(deskGroup)
    return deskGroup
  }

  const deskScene = createDeskScene()

  // ============================
  // Find screen mesh
  // ============================
  let screenMesh: THREE.Mesh | null = null

  function findScreenMesh() {
    deskScene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        const wp = new THREE.Vector3()
        child.getWorldPosition(wp)
        if (child.geometry.type === 'PlaneGeometry' && wp.y > 1.0 && wp.y < 2.0 && wp.z < 0.5) {
          screenMesh = child
        }
      }
    })
  }
  findScreenMesh()

  if (!screenMesh) {
    deskScene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry && child.geometry.type === 'PlaneGeometry') {
        if (!screenMesh) screenMesh = child
      }
    })
  }

  // ============================
  // Crucifix on desk
  // ============================
  let crucifixGroup: THREE.Group | null = null
  const gltfLoader = new GLTFLoader()
  gltfLoader.load('/crucifix.glb', (gltf) => {
    const crucifix = gltf.scene

    const box = new THREE.Box3().setFromObject(crucifix)
    const size = new THREE.Vector3()
    box.getSize(size)
    const center = new THREE.Vector3()
    box.getCenter(center)

    const desiredHeight = 0.25
    const scaleFactor = desiredHeight / size.y
    crucifix.scale.setScalar(scaleFactor)

    crucifix.position.set(-center.x * scaleFactor, -box.min.y * scaleFactor, -center.z * scaleFactor)

    crucifixGroup = new THREE.Group()
    crucifixGroup.add(crucifix)

    // White base
    const baseMat = new THREE.MeshStandardMaterial({ color: 0xf0f0f0, roughness: 0.35, metalness: 0.05 })
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.02, 16), baseMat)
    base.position.y = 0.01
    base.castShadow = true
    base.receiveShadow = true
    crucifixGroup.add(base)

    crucifixGroup.position.set(-0.55, 1.02, -0.3)
    crucifixGroup.rotation.y = -Math.PI / 2

    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x6b3a2a,
      roughness: 0.75,
      metalness: 0.0,
      envMapIntensity: 0.3,
    })
    crucifix.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = woodMat
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    scene.add(crucifixGroup)
  })

  // ============================
  // Video texture for CRT screen
  // ============================
  const video = document.createElement('video')
  video.src = '/ascii-animation.mp4'
  video.crossOrigin = 'anonymous'
  video.loop = true
  video.muted = true
  video.playsInline = true
  video.autoplay = true
  video.play().catch(() => {})

  const videoTexture = new THREE.VideoTexture(video)
  videoTexture.minFilter = THREE.LinearFilter
  videoTexture.magFilter = THREE.LinearFilter
  videoTexture.colorSpace = THREE.SRGBColorSpace

  const screenVideoMat = new THREE.MeshBasicMaterial({
    map: videoTexture,
    toneMapped: false,
  })

  if (screenMesh) {
    ;(screenMesh as THREE.Mesh).material = screenVideoMat
  }

  // ============================
  // Zoom state
  // ============================
  const originalCamPos = new THREE.Vector3()
  const originalCamTarget = new THREE.Vector3()
  let isZoomed = false
  let isAnimating = false

  const animStartPos = new THREE.Vector3()
  const animEndPos = new THREE.Vector3()
  const animStartTarget = new THREE.Vector3()
  const animEndTarget = new THREE.Vector3()
  let animProgress = 0
  const animDuration = 0.8
  let animDirection: 'in' | 'out' = 'in'
  let animStartFOV = 40
  let animEndFOV = 40

  function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  function startCameraAnimation(
    fromPos: THREE.Vector3,
    toPos: THREE.Vector3,
    fromTarget: THREE.Vector3,
    toTarget: THREE.Vector3,
    direction: 'in' | 'out',
  ) {
    animStartPos.copy(fromPos)
    animEndPos.copy(toPos)
    animStartTarget.copy(fromTarget)
    animEndTarget.copy(toTarget)
    animProgress = 0
    animDirection = direction
    isAnimating = true
    controls.enabled = false
    animStartFOV = camera.fov
    animEndFOV = direction === 'in' ? 11 : 40
  }

  // ============================
  // Interaction
  // ============================
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  function getMonitorMeshes() {
    const meshes: THREE.Mesh[] = []
    deskScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child === screenMesh) meshes.push(child)
        const wp = new THREE.Vector3()
        child.getWorldPosition(wp)
        if (wp.y > 1.0 && wp.y < 2.0 && wp.z < 0.3 && wp.z > -0.5) {
          meshes.push(child)
        }
      }
    })
    return meshes
  }

  // Tooltip
  const tooltip = document.createElement('div')
  tooltip.textContent = 'Click'
  Object.assign(tooltip.style, {
    position: 'absolute',
    pointerEvents: 'none',
    background: 'rgba(0,0,0,0.75)',
    color: '#C4C4C4',
    fontFamily: 'var(--font-geist-sans, system-ui, sans-serif)',
    fontSize: '12px',
    fontWeight: '500',
    letterSpacing: '-0.01em',
    padding: '5px 10px',
    borderRadius: '0',
    opacity: '0',
    transition: 'opacity 0.2s ease',
    whiteSpace: 'nowrap',
    zIndex: '30',
    transform: 'translate(-50%, -130%)',
  })
  container.appendChild(tooltip)

  let isHoveringMonitor = false

  const onMouseMove = (e: MouseEvent) => {
    if (isZoomed || isAnimating) {
      if (isHoveringMonitor) {
        tooltip.style.opacity = '0'
        renderer.domElement.style.cursor = ''
        isHoveringMonitor = false
      }
      return
    }

    const rect = renderer.domElement.getBoundingClientRect()
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    raycaster.setFromCamera(mouse, camera)

    const monitorMeshes = getMonitorMeshes()
    const intersects = raycaster.intersectObjects(monitorMeshes, true)

    if (intersects.length > 0) {
      if (!isHoveringMonitor) {
        isHoveringMonitor = true
        tooltip.style.opacity = '1'
        renderer.domElement.style.cursor = 'pointer'
      }
      tooltip.style.left = `${e.clientX - rect.left}px`
      tooltip.style.top = `${e.clientY - rect.top}px`
    } else if (isHoveringMonitor) {
      isHoveringMonitor = false
      tooltip.style.opacity = '0'
      renderer.domElement.style.cursor = ''
    }
  }

  // Click to zoom in / zoom out
  let mouseDownTime = 0
  let mouseDownPos = { x: 0, y: 0 }

  const onMouseDown = (e: MouseEvent) => {
    mouseDownTime = performance.now()
    mouseDownPos = { x: e.clientX, y: e.clientY }
  }

  const onMouseUp = (e: MouseEvent) => {
    if (isAnimating) return

    const elapsed = performance.now() - mouseDownTime
    const dist = Math.hypot(e.clientX - mouseDownPos.x, e.clientY - mouseDownPos.y)
    if (elapsed > 300 || dist > 8) return

    const rect = renderer.domElement.getBoundingClientRect()
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    raycaster.setFromCamera(mouse, camera)

    if (isZoomed) {
      const screenHits = screenMesh ? raycaster.intersectObject(screenMesh) : []
      if (screenHits.length === 0) {
        startCameraAnimation(camera.position, originalCamPos, controls.target, originalCamTarget, 'out')
      }
      return
    }

    const monitorMeshes = getMonitorMeshes()
    const intersects = raycaster.intersectObjects(monitorMeshes, true)
    if (intersects.length > 0 && screenMesh) {
      tooltip.style.opacity = '0'
      originalCamPos.copy(camera.position)
      originalCamTarget.copy(controls.target)
      const screenWorldPos = new THREE.Vector3()
      screenMesh.getWorldPosition(screenWorldPos)
      const zoomTargetPos = new THREE.Vector3(screenWorldPos.x, screenWorldPos.y + 0.01, screenWorldPos.z + 0.025)
      startCameraAnimation(camera.position, zoomTargetPos, controls.target, screenWorldPos, 'in')
    }
  }

  renderer.domElement.addEventListener('mousemove', onMouseMove)
  renderer.domElement.addEventListener('mousedown', onMouseDown)
  renderer.domElement.addEventListener('mouseup', onMouseUp)

  // ============================
  // Animation loop
  // ============================
  let animFrameId: number
  const clock = new THREE.Clock()
  let firstFrame = true

  function animate() {
    animFrameId = requestAnimationFrame(animate)
    const dt = clock.getDelta()

    // Camera animation
    if (isAnimating) {
      animProgress += dt / animDuration
      if (animProgress >= 1) {
        animProgress = 1
        isAnimating = false
        if (animDirection === 'in') {
          isZoomed = true
          controls.enabled = false
        } else {
          isZoomed = false
          controls.enabled = true
        }
      }
      const t = easeInOutCubic(Math.min(animProgress, 1))
      camera.position.lerpVectors(animStartPos, animEndPos, t)
      controls.target.lerpVectors(animStartTarget, animEndTarget, t)
      camera.fov = animStartFOV + (animEndFOV - animStartFOV) * t
      camera.updateProjectionMatrix()
      camera.lookAt(controls.target)
      controls.update()
    }

    if (!isZoomed && !isAnimating) {
      controls.update()
    }

    renderer.render(scene, camera)

    if (firstFrame) {
      firstFrame = false
      onReady?.()
    }
  }
  animate()

  // ============================
  // Resize handling
  // ============================
  const resizeObserver = new ResizeObserver(() => {
    const w = container.clientWidth
    const h = container.clientHeight
    if (w === 0 || h === 0) return
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  })
  resizeObserver.observe(container)

  // ============================
  // Cleanup
  // ============================
  return () => {
    cancelAnimationFrame(animFrameId)
    resizeObserver.disconnect()

    renderer.domElement.removeEventListener('mousemove', onMouseMove)
    renderer.domElement.removeEventListener('mousedown', onMouseDown)
    renderer.domElement.removeEventListener('mouseup', onMouseUp)
    tooltip.remove()

    video.pause()
    video.src = ''
    video.load()
    videoTexture.dispose()
    screenVideoMat.dispose()

    function disposeScene(s: THREE.Scene | THREE.Group) {
      s.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose())
          } else {
            obj.material.dispose()
          }
        }
      })
    }
    disposeScene(scene)
    if (crucifixGroup) disposeScene(crucifixGroup)
    envRT.texture.dispose()
    pmremGenerator.dispose()
    controls.dispose()

    renderer.dispose()
    if (renderer.domElement.parentNode === container) {
      container.removeChild(renderer.domElement)
    }
  }
}
