
import { GLTFLoader } from './threeJS/GLTFLoader.js';
import { OrbitControls } from './threeJS/OrbitControls.js';
import { DRACOLoader } from './threeJS/DRACOLoader.js'

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Base
 */
// Debug


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 1000)
camera.position.set(0, 4, 15);
scene.add(camera)

//Models
//const dracoLoader = new DRACOLoader()
//dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
//gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Update all materials
 */
const updateAllMaterials = () => {
    scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            console.log(child)
            // child.material.envMap = environmentMap
            child.material.envMapIntensity = 5
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true

        }
    })
}

//rwd
const rwdModelPosition = (rwd) => {
    return window.matchMedia(rwd).matches ? (camera.fov = 95) : (camera.fov = 75);
}

//camera zoomin
const cameraZoomIn = () => {
    if (camera.fov < 20) {
        //setTimeout(UI.VideoStart, 2000)
        alert('hhh')
        return
    }
    camera.fov -= 0.5;
    camera.updateProjectionMatrix();
}


let obj = null
gltfLoader.load(
    '/models/0419_wei_uncompress_V26.glb',
    (gltf) => {
        obj = gltf.scene

        //scene.add(gltf.scene.children[0])
        // const children = [...gltf.scene.children]
        // for (const child of children ){
        //     scene.add(child)
        // }
        //mixer = new THREE.AnimationMixer(gltf.scene)
        //const action = mixer.clipAction(gltf.animations[2])
        //action.play()

        //position set 
        //obj.rotation.y = Math.PI
        obj.position.set(0, 0, 0);
        obj.scale.set(0.05, 0.05, 0.05)
        //camera.lookAt(obj.position)

        //update material
        //updateAllMaterials()

        //rwdModelPosition("(max-width: 425px)");
        //camera.updateProjectionMatrix();

       
        scene.add(gltf.scene)

        
    }
)


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
//directionalLight.shadow.camera.left = - 7
//directionalLight.shadow.camera.top = 7
//directionalLight.shadow.camera.right = 7
//directionalLight.shadow.camera.bottom = - 7
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 3, - 2.25)
scene.add(directionalLight)



window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    //phone
    rwdModelPosition("(max-width: 425px)");
    camera.updateProjectionMatrix();
})

//window.addEventListener('orientationchange', () => {
//    // Update sizes
//    sizes.width = window.innerWidth
//    sizes.height = window.innerHeight

//    // Update camera
//    camera.aspect = sizes.width / sizes.height
//    camera.updateProjectionMatrix()

//    // Update renderer
//    renderer.setSize(sizes.width, sizes.height)
//    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//    //phone
//    rwdModelPosition("(max-width: 425px)");
//    camera.updateProjectionMatrix();
//})


// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    antialias: true, alpha: true,canvas: canvas
})

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x000000, 0);
/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {

    if(obj)
        obj.rotation.y += 0.005
    
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()