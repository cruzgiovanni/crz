import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export function initScene(container: HTMLDivElement, onReady?: () => void): () => void {
  // Scene setup
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xc8c4c0)
  scene.fog = new THREE.FogExp2(0xc8c4c0, 0.06)

  const camera = new THREE.PerspectiveCamera(
    40,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  )
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
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
  )
  envLight1.position.set(0, 5, 0)
  envLight1.rotation.x = Math.PI / 2
  envScene.add(envLight1)
  const envLight2 = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 4),
    new THREE.MeshBasicMaterial({ color: 0xffeedd, side: THREE.DoubleSide })
  )
  envLight2.position.set(5, 3, 0)
  envLight2.rotation.y = -Math.PI / 2
  envScene.add(envLight2)
  const envRT = pmremGenerator.fromScene(envScene)
  scene.environment = envRT.texture

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
    const deskTop = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 0.04, 1.1),
      birchMat
    )
    deskTop.position.set(0, 1.0, 0)
    deskTop.castShadow = true
    deskTop.receiveShadow = true
    deskGroup.add(deskTop)

    // Edge strip
    const edgeStrip = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 0.02, 0.01),
      whiteMat
    )
    edgeStrip.position.set(0, 1.0, 0.555)
    deskGroup.add(edgeStrip)

    // A-frame legs
    function createAFrameLeg(xSign: number) {
      const legGroup = new THREE.Group()
      const bar1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 1.02, 0.04),
        whiteMat
      )
      bar1.position.set(xSign * 0.22, 0.5, 0.35)
      bar1.rotation.z = xSign * 0.08
      bar1.castShadow = true
      legGroup.add(bar1)
      const bar2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 1.02, 0.04),
        whiteMat
      )
      bar2.position.set(xSign * 0.22, 0.5, -0.35)
      bar2.rotation.z = xSign * 0.08
      bar2.castShadow = true
      legGroup.add(bar2)
      const cross = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, 0.03, 0.66),
        whiteMat
      )
      cross.position.set(xSign * 0.22, 0.45, 0)
      legGroup.add(cross)
      const foot = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, 0.03, 0.76),
        whiteMat
      )
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

    // Cable management shelf
    const shelfMat = new THREE.MeshStandardMaterial({
      color: 0xddd8cc,
      roughness: 0.5,
      metalness: 0.0,
    })
    const cableShelf = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.02, 0.25),
      shelfMat
    )
    cableShelf.position.set(-0.6, 0.85, -0.3)
    deskGroup.add(cableShelf)

    // CRT Monitor
    const monitorGroup = new THREE.Group()
    monitorGroup.position.set(0.1, 1.02, -0.15)

    const crtMat = new THREE.MeshStandardMaterial({
      color: 0xf0ece5,
      roughness: 0.35,
      metalness: 0.05,
      envMapIntensity: 0.5,
    })
    const monBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.03, 0.35),
      crtMat
    )
    monBase.castShadow = true
    monitorGroup.add(monBase)

    const monStand = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.07, 0.18),
      crtMat
    )
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

    const crtBack = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      crtMat
    )
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
    const bzW = 0.56, bzH = 0.46, bzR = 0.03
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
    const concreteMat = new THREE.MeshStandardMaterial({ color: 0xb0b0a8, roughness: 0.9, metalness: 0.0, envMapIntensity: 0.2 })
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
      const leaf = new THREE.Mesh(
        new THREE.SphereGeometry(0.018, 8, 6),
        i % 2 === 0 ? succMat : succMat2
      )
      leaf.position.set(Math.cos(angle) * 0.025, 0.085, Math.sin(angle) * 0.025)
      leaf.scale.set(1, 0.6, 1.2)
      plantGroup.add(leaf)
    }
    const centerLeaf = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 6), succMat2)
    centerLeaf.position.set(0, 0.095, 0)
    plantGroup.add(centerLeaf)
    deskGroup.add(plantGroup)

    // Coffee cup
    const cupMat = new THREE.MeshStandardMaterial({ color: 0xfaf8f5, roughness: 0.4, metalness: 0.02, envMapIntensity: 0.5 })
    const cupBody = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.03, 0.08, 16), cupMat)
    cupBody.position.set(0.65, 1.06, 0.15)
    cupBody.castShadow = true
    deskGroup.add(cupBody)
    const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x3a2010, roughness: 0.3, metalness: 0.0, envMapIntensity: 0.2 })
    const coffee = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.005, 16), coffeeMat)
    coffee.position.set(0.65, 1.098, 0.15)
    deskGroup.add(coffee)

    // Notebook
    const notebookMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.55, metalness: 0.0, envMapIntensity: 0.3 })
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
      new THREE.MeshStandardMaterial({ color: 0x3a3a2a })
    )
    pencilTip.position.set(-0.25, 1.035, 0.32)
    pencilTip.rotation.z = Math.PI / 2
    pencilTip.rotation.y = 0.3
    deskGroup.add(pencilTip)

    // Chair
    const chairMat = new THREE.MeshStandardMaterial({ color: 0xf0ece5, roughness: 0.45, metalness: 0.0, envMapIntensity: 0.4 })
    const chairShape = new THREE.Shape()
    const chW = 0.5, chH = 0.5, chR = 0.06
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
        if (
          child.geometry.type === 'PlaneGeometry' &&
          wp.y > 1.0 &&
          wp.y < 2.0 &&
          wp.z < 0.5
        ) {
          screenMesh = child
        }
      }
    })
  }
  findScreenMesh()

  if (!screenMesh) {
    deskScene.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.geometry &&
        child.geometry.type === 'PlaneGeometry'
      ) {
        if (!screenMesh) screenMesh = child
      }
    })
  }

  // ============================
  // Editor scene (rendered to CRT texture)
  // ============================
  const editorScene = new THREE.Scene()
  editorScene.background = new THREE.Color(0x1a1a2e)

  const editorCam = new THREE.PerspectiveCamera(45, 1.26, 0.1, 100)
  editorCam.position.set(4, 3, 4)
  editorCam.lookAt(0, 0, 0)

  const editorRT = new THREE.WebGLRenderTarget(512, 406, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
  })

  // Grid + axis
  editorScene.add(new THREE.GridHelper(10, 20, 0x2a2a44, 0x222238))

  function makeAxisLine(mat: THREE.LineBasicMaterial, from: [number, number, number], to: [number, number, number]) {
    const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...from), new THREE.Vector3(...to)])
    return new THREE.Line(g, mat)
  }
  editorScene.add(makeAxisLine(new THREE.LineBasicMaterial({ color: 0xcc4444 }), [-5, 0.01, 0], [5, 0.01, 0]))
  editorScene.add(makeAxisLine(new THREE.LineBasicMaterial({ color: 0x4466cc }), [0, 0.01, -5], [0, 0.01, 5]))

  // Editor lights
  editorScene.add(new THREE.AmbientLight(0x8888aa, 0.6))
  const edDir = new THREE.DirectionalLight(0xffffff, 1.2)
  edDir.position.set(3, 5, 4)
  editorScene.add(edDir)
  const edFill = new THREE.DirectionalLight(0x6688cc, 0.4)
  edFill.position.set(-3, 2, -2)
  editorScene.add(edFill)

  // Editor objects
  const edCubeMat = new THREE.MeshStandardMaterial({ color: 0xd4d0f8, roughness: 0.35, metalness: 0.1 })
  const edCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), edCubeMat)
  edCube.position.set(0, 0.5, 0)
  editorScene.add(edCube)
  edCube.add(new THREE.LineSegments(
    new THREE.EdgesGeometry(edCube.geometry),
    new THREE.LineBasicMaterial({ color: 0x8888cc, transparent: true, opacity: 0.35 })
  ))

  const edTorus = new THREE.Mesh(
    new THREE.TorusGeometry(0.6, 0.22, 16, 32),
    new THREE.MeshStandardMaterial({ color: 0xf8b4b4, roughness: 0.3, metalness: 0.1 })
  )
  edTorus.position.set(-2.2, 0.8, -0.5)
  edTorus.rotation.x = Math.PI / 4
  editorScene.add(edTorus)
  edTorus.add(new THREE.LineSegments(
    new THREE.EdgesGeometry(edTorus.geometry),
    new THREE.LineBasicMaterial({ color: 0xcc7777, transparent: true, opacity: 0.25 })
  ))

  const edSphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 24, 16),
    new THREE.MeshStandardMaterial({ color: 0xb4f0d4, roughness: 0.3, metalness: 0.1 })
  )
  edSphere.position.set(2, 0.55, -1)
  editorScene.add(edSphere)
  edSphere.add(new THREE.LineSegments(
    new THREE.EdgesGeometry(edSphere.geometry),
    new THREE.LineBasicMaterial({ color: 0x66aa88, transparent: true, opacity: 0.25 })
  ))

  // Gizmo
  const gizmoGroup = new THREE.Group()
  editorScene.add(gizmoGroup)

  function createArrow(color: number, dir: string) {
    const group = new THREE.Group()
    const mat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.4, roughness: 0.3 })
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.8, 8), mat)
    shaft.position.y = 0.4
    group.add(shaft)
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.2, 12), mat.clone())
    cone.position.y = 0.9
    group.add(cone)
    const hitbox = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 2.2, 8),
      new THREE.MeshBasicMaterial({ visible: false })
    )
    hitbox.position.y = 0.5
    hitbox.userData.axis = dir
    group.add(hitbox)
    group.userData.axis = dir
    return group
  }

  const xArrow = createArrow(0xff4444, 'x')
  xArrow.rotation.z = -Math.PI / 2
  gizmoGroup.add(xArrow)
  const yArrow = createArrow(0x44ff44, 'y')
  gizmoGroup.add(yArrow)
  const zArrow = createArrow(0x4488ff, 'z')
  zArrow.rotation.x = Math.PI / 2
  gizmoGroup.add(zArrow)
  gizmoGroup.add(new THREE.Mesh(
    new THREE.SphereGeometry(0.06, 12, 8),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.3 })
  ))

  function updateGizmoPos() {
    gizmoGroup.position.copy(edCube.position)
  }
  updateGizmoPos()

  // Editor camera
  let edCamAngleH = Math.PI / 4
  let edCamAngleV = 0.5
  let edCamDist = 7

  function updateEditorCamera() {
    editorCam.position.set(
      Math.sin(edCamAngleH) * Math.cos(edCamAngleV) * edCamDist,
      Math.sin(edCamAngleV) * edCamDist + 1,
      Math.cos(edCamAngleH) * Math.cos(edCamAngleV) * edCamDist
    )
    editorCam.lookAt(0, 0.5, 0)
  }
  updateEditorCamera()

  // ============================
  // Canvas-based UI overlay
  // ============================
  const compositeCanvas = document.createElement('canvas')
  compositeCanvas.width = 1024
  compositeCanvas.height = 812
  const compCtx = compositeCanvas.getContext('2d')!
  const compositeTexture = new THREE.CanvasTexture(compositeCanvas)
  compositeTexture.minFilter = THREE.LinearFilter
  compositeTexture.magFilter = THREE.LinearFilter

  const UI = { leftW: 140, rightW: 220, topH: 36, bottomH: 32, w: 1024, h: 812 }

  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.quadraticCurveTo(x + w, y, x + w, y + r)
    ctx.lineTo(x + w, y + h - r)
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    ctx.lineTo(x + r, y + h)
    ctx.quadraticCurveTo(x, y + h, x, y + h - r)
    ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y)
    ctx.closePath()
  }

  function drawDivider(ctx: CanvasRenderingContext2D, x: number, y: number, w: number) {
    ctx.strokeStyle = 'rgba(255,255,255,0.04)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + w, y)
    ctx.stroke()
  }

  const canvasFont = 'system-ui, sans-serif'

  function drawEditorUI() {
    const ctx = compCtx
    const W = UI.w
    const H = UI.h

    ctx.clearRect(0, 0, W, H)

    const panelBg = 'rgba(20,20,34,0.88)'
    const panelBorder = 'rgba(255,255,255,0.06)'
    const panelR = 10
    const panelGap = 8

    // Left panel
    const lpX = panelGap
    const lpY = panelGap
    const lpW = 134
    const lpH = H - panelGap * 2

    ctx.save()
    ctx.fillStyle = panelBg
    ctx.strokeStyle = panelBorder
    ctx.lineWidth = 1
    roundRect(ctx, lpX, lpY, lpW, lpH, panelR)
    ctx.fill()
    ctx.stroke()
    ctx.restore()

    ctx.fillStyle = '#999'
    ctx.font = `500 10px ${canvasFont}`
    ctx.fillText('Untitled', lpX + 12, lpY + 20)
    ctx.fillStyle = '#555'
    ctx.fillText('\u00B7\u00B7\u00B7', lpX + lpW - 22, lpY + 20)

    const tabY = lpY + 30
    ctx.fillStyle = 'rgba(80,100,255,0.15)'
    roundRect(ctx, lpX + 8, tabY, 55, 20, 5)
    ctx.fill()
    ctx.fillStyle = '#ccc'
    ctx.font = `500 9px ${canvasFont}`
    ctx.fillText('Objects', lpX + 16, tabY + 14)
    ctx.fillStyle = '#555'
    ctx.fillText('Assets', lpX + 72, tabY + 14)

    drawDivider(ctx, lpX + 8, tabY + 26, lpW - 16)

    ctx.fillStyle = '#555'
    ctx.font = `500 8px ${canvasFont}`
    ctx.fillText('Scenes', lpX + 12, tabY + 40)
    ctx.fillStyle = '#444'
    ctx.fillText('+', lpX + lpW - 20, tabY + 40)

    ctx.fillStyle = '#555'
    ctx.font = `10px ${canvasFont}`
    ctx.fillText('\u2713', lpX + 12, tabY + 56)
    ctx.fillStyle = '#999'
    ctx.fillText('Scene 1', lpX + 24, tabY + 56)

    ctx.fillStyle = 'rgba(255,255,255,0.04)'
    roundRect(ctx, lpX + 8, tabY + 64, lpW - 16, 20, 5)
    ctx.fill()
    ctx.fillStyle = '#444'
    ctx.font = `9px ${canvasFont}`
    ctx.fillText('Search', lpX + 14, tabY + 78)

    const objects = [
      { name: 'Cube', icon: '\u2B21', color: '#88aaff', selected: true },
      { name: 'Torus', icon: '\u25CE', color: '#cc7777', selected: false },
      { name: 'Sphere', icon: '\u25CB', color: '#66aa88', selected: false },
      { name: 'Dir. Light', icon: '\u2600', color: '#bbbb66', selected: false },
    ]
    objects.forEach((obj, i) => {
      const oy = tabY + 92 + i * 22
      if (obj.selected) {
        ctx.fillStyle = 'rgba(80,120,255,0.18)'
        roundRect(ctx, lpX + 6, oy - 2, lpW - 12, 20, 4)
        ctx.fill()
      }
      ctx.fillStyle = obj.color
      ctx.font = `10px ${canvasFont}`
      ctx.fillText(obj.icon, lpX + 14, oy + 12)
      ctx.fillStyle = obj.selected ? '#ddd' : '#666'
      ctx.fillText(obj.name, lpX + 28, oy + 12)
    })

    const blY = lpY + lpH - 70
    drawDivider(ctx, lpX + 8, blY, lpW - 16)
    const bottomItems = ['Templates', 'Import', 'Help & Feedback']
    bottomItems.forEach((item, i) => {
      ctx.fillStyle = '#444'
      ctx.font = `9px ${canvasFont}`
      ctx.fillText(item, lpX + 12, blY + 18 + i * 18)
    })

    // Top toolbar
    const tools = ['\u2196', '\u270B', '\u25A1', '\u25CB', 'T', '\u2B21', '\uD83D\uDCAC']
    const tbW = tools.length * 28 + 80
    const tbH = 32
    const tbX = (W - tbW) / 2
    const tbY2 = panelGap

    ctx.fillStyle = panelBg
    ctx.strokeStyle = panelBorder
    ctx.lineWidth = 1
    roundRect(ctx, tbX, tbY2, tbW, tbH, 8)
    ctx.fill()
    ctx.stroke()

    tools.forEach((t, i) => {
      ctx.fillStyle = '#777'
      ctx.font = `13px ${canvasFont}`
      ctx.fillText(t, tbX + 10 + i * 28, tbY2 + 22)
    })

    const sepX2 = tbX + tools.length * 28 + 8
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'
    ctx.beginPath()
    ctx.moveTo(sepX2, tbY2 + 6)
    ctx.lineTo(sepX2, tbY2 + tbH - 6)
    ctx.stroke()

    ctx.fillStyle = 'rgba(80,100,255,0.25)'
    roundRect(ctx, sepX2 + 6, tbY2 + 4, 24, 24, 5)
    ctx.fill()
    ctx.fillStyle = '#7b8aff'
    ctx.font = `13px ${canvasFont}`
    ctx.fillText('\u2726', sepX2 + 11, tbY2 + 22)
    ctx.fillStyle = '#666'
    ctx.fillText('\u2699', sepX2 + 36, tbY2 + 22)

    ctx.fillStyle = '#52d486'
    roundRect(ctx, tbX + tbW - 30, tbY2 + 5, 22, 22, 5)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = `12px ${canvasFont}`
    ctx.fillText('\u25B6', tbX + tbW - 25, tbY2 + 21)

    // Right panel
    const rpW = 210
    const rpX = W - rpW - panelGap
    const rpY = panelGap
    const rpH = H - panelGap * 2

    ctx.fillStyle = panelBg
    ctx.strokeStyle = panelBorder
    ctx.lineWidth = 1
    roundRect(ctx, rpX, rpY, rpW, rpH, panelR)
    ctx.fill()
    ctx.stroke()

    const rx = rpX + 12

    ctx.fillStyle = '#52d486'
    ctx.beginPath()
    ctx.arc(rx + 8, rpY + 18, 9, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = `600 8px ${canvasFont}`
    ctx.fillText('C', rx + 5, rpY + 21)

    ctx.fillStyle = '#666'
    ctx.font = `8px ${canvasFont}`
    ctx.fillText('100% \u25BE', rx + 24, rpY + 21)

    ctx.fillStyle = 'rgba(255,255,255,0.06)'
    roundRect(ctx, rx + 110, rpY + 9, 38, 18, 4)
    ctx.fill()
    ctx.fillStyle = '#aaa'
    ctx.font = `9px ${canvasFont}`
    ctx.fillText('Share', rx + 115, rpY + 22)

    ctx.fillStyle = 'rgba(255,255,255,0.06)'
    roundRect(ctx, rx + 152, rpY + 9, 38, 18, 4)
    ctx.fill()
    ctx.fillStyle = '#aaa'
    ctx.fillText('Export', rx + 155, rpY + 22)

    drawDivider(ctx, rx - 4, rpY + 34, rpW - 16)

    ctx.fillStyle = '#555'
    ctx.font = `9px ${canvasFont}`
    ctx.fillText('Viewport', rx, rpY + 48)
    ctx.fillStyle = '#888'
    ctx.fillText('Personal Camera', rx + 56, rpY + 48)

    drawDivider(ctx, rx - 4, rpY + 56, rpW - 16)

    ctx.fillStyle = '#999'
    ctx.font = `600 10px ${canvasFont}`
    ctx.fillText('Transform', rx, rpY + 72)

    const tY = rpY + 82
    const fieldW = rpW - 24

    function drawTransformRow(label: string, values: { label: string; val: string; col?: string }[], yPos: number) {
      ctx.fillStyle = '#555'
      ctx.font = `9px ${canvasFont}`
      ctx.fillText(label, rx, yPos + 12)
      const startX = rx + 48
      const cellW = (fieldW - 48) / 3 - 2
      values.forEach((v, i) => {
        const bx = startX + i * (cellW + 2)
        ctx.fillStyle = 'rgba(255,255,255,0.04)'
        roundRect(ctx, bx, yPos + 2, cellW, 16, 3)
        ctx.fill()
        ctx.fillStyle = v.col || '#666'
        ctx.font = `8px ${canvasFont}`
        ctx.fillText(v.label, bx + 3, yPos + 13)
        ctx.fillStyle = '#aaa'
        ctx.fillText(v.val, bx + 12, yPos + 13)
      })
    }

    drawTransformRow('Position', [
      { label: 'X', val: edCube.position.x.toFixed(1), col: '#ff6666' },
      { label: 'Y', val: (edCube.position.y - 0.5).toFixed(1), col: '#66ff66' },
      { label: 'Z', val: edCube.position.z.toFixed(1), col: '#6688ff' },
    ], tY)
    drawTransformRow('Scale', [
      { label: 'X', val: '1.0', col: '#ff6666' },
      { label: 'Y', val: '1.0', col: '#66ff66' },
      { label: 'Z', val: '1.0', col: '#6688ff' },
    ], tY + 20)
    drawTransformRow('Rotation', [
      { label: 'X', val: '0\u00B0', col: '#ff6666' },
      { label: 'Y', val: '0\u00B0', col: '#66ff66' },
      { label: 'Z', val: '0\u00B0', col: '#6688ff' },
    ], tY + 40)

    drawDivider(ctx, rx - 4, tY + 60, rpW - 16)

    const secY = tY + 68
    ctx.fillStyle = '#999'
    ctx.font = `600 10px ${canvasFont}`
    ctx.fillText('States', rx, secY)
    ctx.fillStyle = '#444'
    ctx.fillText('+', rx + rpW - 32, secY)
    drawDivider(ctx, rx - 4, secY + 8, rpW - 16)
    ctx.fillStyle = '#999'
    ctx.fillText('Events', rx, secY + 22)
    ctx.fillStyle = '#444'
    ctx.fillText('+', rx + rpW - 32, secY + 22)
    drawDivider(ctx, rx - 4, secY + 30, rpW - 16)

    const shapeY = secY + 40
    ctx.fillStyle = '#999'
    ctx.font = `600 10px ${canvasFont}`
    ctx.fillText('Shape', rx, shapeY)
    drawTransformRow('Size', [{ label: 'X', val: '100' }, { label: 'Y', val: '100' }, { label: 'Z', val: '100' }], shapeY + 8)
    drawTransformRow('Sides', [{ label: 'X', val: '1' }, { label: 'Y', val: '1' }, { label: 'Z', val: '1' }], shapeY + 28)

    ctx.fillStyle = '#555'
    ctx.font = `9px ${canvasFont}`
    ctx.fillText('Corner', rx, shapeY + 60)
    ctx.fillStyle = 'rgba(255,255,255,0.04)'
    roundRect(ctx, rx + 48, shapeY + 50, 40, 16, 3)
    ctx.fill()
    ctx.fillStyle = '#aaa'
    ctx.font = `8px ${canvasFont}`
    ctx.fillText('8', rx + 62, shapeY + 62)

    drawDivider(ctx, rx - 4, shapeY + 72, rpW - 16)

    const matY = shapeY + 82
    ctx.fillStyle = '#999'
    ctx.font = `600 10px ${canvasFont}`
    ctx.fillText('Material', rx, matY)
    ctx.fillStyle = '#444'
    ctx.fillText('+', rx + rpW - 32, matY)

    ctx.fillStyle = '#555'
    ctx.font = `9px ${canvasFont}`
    ctx.fillText('Color', rx, matY + 20)
    ctx.fillStyle = '#d4d0f8'
    ctx.beginPath()
    ctx.arc(rx + 54, matY + 16, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#aaa'
    ctx.font = `8px ${canvasFont}`
    ctx.fillText('#D4D0F8', rx + 64, matY + 19)

    ctx.fillStyle = '#555'
    ctx.font = `9px ${canvasFont}`
    ctx.fillText('Rough.', rx, matY + 38)
    ctx.fillStyle = 'rgba(255,255,255,0.04)'
    roundRect(ctx, rx + 48, matY + 28, 60, 14, 3)
    ctx.fill()
    ctx.fillStyle = 'rgba(100,140,255,0.4)'
    roundRect(ctx, rx + 48, matY + 28, 21, 14, 3)
    ctx.fill()
    ctx.fillStyle = '#aaa'
    ctx.font = `8px ${canvasFont}`
    ctx.fillText('0.35', rx + 112, matY + 39)

    ctx.fillStyle = '#555'
    ctx.font = `9px ${canvasFont}`
    ctx.fillText('Metal.', rx, matY + 54)
    ctx.fillStyle = 'rgba(255,255,255,0.04)'
    roundRect(ctx, rx + 48, matY + 44, 60, 14, 3)
    ctx.fill()
    ctx.fillStyle = 'rgba(100,140,255,0.4)'
    roundRect(ctx, rx + 48, matY + 44, 6, 14, 3)
    ctx.fill()
    ctx.fillStyle = '#aaa'
    ctx.font = `8px ${canvasFont}`
    ctx.fillText('0.10', rx + 112, matY + 55)

    drawDivider(ctx, rx - 4, matY + 62, rpW - 16)

    const visY = matY + 72
    ctx.fillStyle = '#999'
    ctx.font = `600 10px ${canvasFont}`
    ctx.fillText('Visibility', rx, visY)

    ctx.fillStyle = '#555'
    ctx.font = `9px ${canvasFont}`
    ctx.fillText('Wire', rx, visY + 18)
    ctx.fillStyle = 'rgba(255,255,255,0.06)'
    roundRect(ctx, rx + 48, visY + 8, 24, 14, 7)
    ctx.fill()
    ctx.fillStyle = '#555'
    ctx.beginPath()
    ctx.arc(rx + 56, visY + 15, 5, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#555'
    ctx.font = `9px ${canvasFont}`
    ctx.fillText('Shadow', rx, visY + 36)
    ctx.fillStyle = 'rgba(255,255,255,0.06)'
    roundRect(ctx, rx + 48, visY + 26, 24, 14, 7)
    ctx.fill()
    ctx.fillStyle = '#52d486'
    ctx.beginPath()
    ctx.arc(rx + 64, visY + 33, 5, 0, Math.PI * 2)
    ctx.fill()

    // Bottom bar
    const bbW = 180
    const bbH = 28
    const bbX = (W - bbW) / 2
    const bbY = H - panelGap - bbH

    ctx.fillStyle = panelBg
    ctx.strokeStyle = panelBorder
    ctx.lineWidth = 1
    roundRect(ctx, bbX, bbY, bbW, bbH, 8)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = '#ff4444'
    ctx.beginPath(); ctx.arc(bbX + bbW / 2 - 12, bbY - 12, 4, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = '#44ff44'
    ctx.beginPath(); ctx.arc(bbX + bbW / 2, bbY - 12, 4, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = '#4488ff'
    ctx.beginPath(); ctx.arc(bbX + bbW / 2 + 12, bbY - 12, 4, 0, Math.PI * 2); ctx.fill()

    ctx.fillStyle = 'rgba(255,255,255,0.04)'
    roundRect(ctx, bbX + 6, bbY + 5, bbW / 2 - 8, 18, 6)
    ctx.fill()
    ctx.fillStyle = '#666'
    ctx.font = `8px ${canvasFont}`
    ctx.textAlign = 'center'
    ctx.fillText('Orthographic', bbX + bbW / 4, bbY + 18)

    ctx.fillStyle = 'rgba(255,255,255,0.08)'
    roundRect(ctx, bbX + bbW / 2 + 2, bbY + 5, bbW / 2 - 8, 18, 6)
    ctx.fill()
    ctx.fillStyle = '#ccc'
    ctx.fillText('Perspective', bbX + (bbW * 3) / 4, bbY + 18)
    ctx.textAlign = 'left'

    compositeTexture.needsUpdate = true
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
    direction: 'in' | 'out'
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
  // Screen material - GPU compositing (no CPU readback)
  // ============================
  const screenShaderMat = new THREE.ShaderMaterial({
    uniforms: {
      tEditor: { value: editorRT.texture },
      tUI: { value: compositeTexture },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tEditor;
      uniform sampler2D tUI;
      varying vec2 vUv;
      void main() {
        vec4 editor = texture2D(tEditor, vUv);
        vec4 ui = texture2D(tUI, vUv);
        vec3 color = mix(editor.rgb, ui.rgb, ui.a);
        gl_FragColor = vec4(color * 1.2, 1.0);
      }
    `,
  })

  // ============================
  // Interaction helpers
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

  function getScreenUV(e: MouseEvent) {
    const rect = renderer.domElement.getBoundingClientRect()
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    if (!screenMesh) return null
    const intersects = raycaster.intersectObject(screenMesh)
    if (intersects.length > 0) return intersects[0].uv
    return null
  }

  function uvToPixel(uv: THREE.Vector2) {
    return { x: uv.x * 1024, y: (1 - uv.y) * 812 }
  }

  function isInViewport(px: { x: number; y: number }) {
    return px.x > UI.leftW && px.x < UI.w - UI.rightW && px.y > UI.topH && px.y < UI.h - UI.bottomH
  }

  function editorRaycast(px: { x: number; y: number }) {
    const vpLeft = UI.leftW
    const vpTop = UI.topH
    const vpW = UI.w - UI.leftW - UI.rightW
    const vpH = UI.h - UI.topH - UI.bottomH
    const nx = ((px.x - vpLeft) / vpW) * 2 - 1
    const ny = -((px.y - vpTop) / vpH) * 2 + 1
    const edRaycaster = new THREE.Raycaster()
    edRaycaster.setFromCamera(new THREE.Vector2(nx, ny), editorCam)
    return edRaycaster
  }

  function checkGizmoHit(px: { x: number; y: number }) {
    const rc = editorRaycast(px)
    const hitboxes: THREE.Mesh[] = []
    gizmoGroup.traverse((child) => {
      if (child instanceof THREE.Mesh && child.userData.axis) hitboxes.push(child)
    })
    const hits = rc.intersectObjects(hitboxes)
    if (hits.length > 0) return hits[0].object.userData.axis as string
    return null
  }

  // ============================
  // Mouse interaction state
  // ============================
  let isDraggingGizmo = false
  let dragAxis: string | null = null
  let dragStartMouse = { x: 0, y: 0 }
  const dragStartObjPos = new THREE.Vector3()
  let isEditorOrbiting = false
  let editorOrbitStart = { x: 0, y: 0 }
  let mouseDownTime = 0
  let mouseDownPos = { x: 0, y: 0 }

  const onMouseDown = (e: MouseEvent) => {
    mouseDownTime = performance.now()
    mouseDownPos = { x: e.clientX, y: e.clientY }

    if (isZoomed && !isAnimating) {
      const uv = getScreenUV(e)
      if (uv) {
        const px = uvToPixel(uv)
        if (isInViewport(px)) {
          const axis = checkGizmoHit(px)
          if (axis) {
            isDraggingGizmo = true
            dragAxis = axis
            dragStartMouse = { x: e.clientX, y: e.clientY }
            dragStartObjPos.copy(edCube.position)
            e.preventDefault()
            return
          }
          isEditorOrbiting = true
          editorOrbitStart = { x: e.clientX, y: e.clientY }
          e.preventDefault()
          return
        }
      }
    }
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!isZoomed) return

    if (isDraggingGizmo) {
      const dx = (e.clientX - dragStartMouse.x) * 0.008
      const dy = -(e.clientY - dragStartMouse.y) * 0.008
      const camRight = new THREE.Vector3()
      camRight.setFromMatrixColumn(editorCam.matrixWorld, 0)

      if (dragAxis === 'x') {
        edCube.position.x = dragStartObjPos.x + dx * (camRight.x >= 0 ? 1 : -1)
      } else if (dragAxis === 'y') {
        edCube.position.y = dragStartObjPos.y + dy
      } else if (dragAxis === 'z') {
        edCube.position.z = dragStartObjPos.z + dx * (camRight.z >= 0 ? 1 : -1)
      }
      updateGizmoPos()
      return
    }

    if (isEditorOrbiting) {
      const dx = (e.clientX - editorOrbitStart.x) * 0.005
      const dy = (e.clientY - editorOrbitStart.y) * 0.005
      edCamAngleH -= dx
      edCamAngleV = Math.max(-0.2, Math.min(1.2, edCamAngleV + dy))
      editorOrbitStart = { x: e.clientX, y: e.clientY }
      updateEditorCamera()
      return
    }
  }

  const onMouseUp = (e: MouseEvent) => {
    const wasOrbiting = isEditorOrbiting
    const wasDragging = isDraggingGizmo
    isDraggingGizmo = false
    dragAxis = null
    isEditorOrbiting = false

    const elapsed = performance.now() - mouseDownTime
    const dist = Math.hypot(e.clientX - mouseDownPos.x, e.clientY - mouseDownPos.y)
    const isClick = elapsed < 300 && dist < 8

    if (!isClick) return
    if (wasOrbiting || wasDragging) return

    const rect = renderer.domElement.getBoundingClientRect()
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    raycaster.setFromCamera(mouse, camera)

    if (isZoomed && !isAnimating) {
      const screenHits = screenMesh ? raycaster.intersectObject(screenMesh) : []
      if (screenHits.length === 0) {
        startCameraAnimation(camera.position, originalCamPos, controls.target, originalCamTarget, 'out')
      }
      return
    }

    if (!isZoomed && !isAnimating) {
      const monitorMeshes = getMonitorMeshes()
      const intersects = raycaster.intersectObjects(monitorMeshes, true)
      if (intersects.length > 0 && screenMesh) {
        originalCamPos.copy(camera.position)
        originalCamTarget.copy(controls.target)
        const screenWorldPos = new THREE.Vector3()
        screenMesh.getWorldPosition(screenWorldPos)
        const zoomTargetPos = new THREE.Vector3(screenWorldPos.x, screenWorldPos.y + 0.01, screenWorldPos.z + 0.025)
        startCameraAnimation(camera.position, zoomTargetPos, controls.target, screenWorldPos, 'in')
      }
    }
  }

  const onWheel = (e: WheelEvent) => {
    if (isZoomed && !isAnimating) {
      const uv = getScreenUV(e as unknown as MouseEvent)
      if (uv) {
        const px = uvToPixel(uv)
        if (isInViewport(px)) {
          edCamDist = Math.max(2, Math.min(15, edCamDist + e.deltaY * 0.005))
          updateEditorCamera()
          e.preventDefault()
          e.stopPropagation()
        }
      }
    }
  }

  renderer.domElement.addEventListener('mousedown', onMouseDown)
  renderer.domElement.addEventListener('mousemove', onMouseMove)
  renderer.domElement.addEventListener('mouseup', onMouseUp)
  renderer.domElement.addEventListener('wheel', onWheel, { passive: false })

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

    // Render editor scene to texture
    renderer.setRenderTarget(editorRT)
    renderer.render(editorScene, editorCam)
    renderer.setRenderTarget(null)

    // Draw UI overlay (transparent background, composited on GPU)
    drawEditorUI()

    // Apply shader material to CRT screen
    if (screenMesh && screenMesh.material !== screenShaderMat) {
      screenMesh.material = screenShaderMat
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

    renderer.domElement.removeEventListener('mousedown', onMouseDown)
    renderer.domElement.removeEventListener('mousemove', onMouseMove)
    renderer.domElement.removeEventListener('mouseup', onMouseUp)
    renderer.domElement.removeEventListener('wheel', onWheel)

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
    disposeScene(editorScene)

    editorRT.dispose()
    compositeTexture.dispose()
    screenShaderMat.dispose()
    envRT.texture.dispose()
    pmremGenerator.dispose()
    controls.dispose()

    renderer.dispose()
    if (renderer.domElement.parentNode === container) {
      container.removeChild(renderer.domElement)
    }
  }
}
