/*---------------------------------------------------------
 [ UI Variables ]*/
const UI = {}
UI.Enter = false
UI.BtnEnter = $('.btnEnter')

/*---------------------------------------------------------
 [ Threejs Variables ]*/
import { GLTFLoader } from './threeJS/GLTFLoader.js';
import { OrbitControls } from './threeJS/OrbitControls.js';
import { DRACOLoader } from './threeJS/DRACOLoader.js'
/** LoadingManager
 * */
const loadingManager = new THREE.LoadingManager(
    () => {
        //gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0 })
        const loadingImg = $('.loading_img')
        loadingImg.css('display','none')
        
    },
    (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded / itemsTotal
        //console.log(progressRatio)
    }
)

const Threejs = {}
const canvas = document.querySelector('.webgl')
Threejs.renderer = new THREE.WebGLRenderer({
    antialias: true, alpha: true, canvas: canvas
});
Threejs.scene = new THREE.Scene();
Threejs.camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
);
Threejs.renderer.setClearColor(0x000000, 0);


Threejs.controls = new OrbitControls(Threejs.camera, canvas);
Threejs.controls.enableDamping = true
// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./threeJS/draco')

Threejs.loader = new GLTFLoader(loadingManager);
Threejs.loader.setDRACOLoader(dracoLoader)



Threejs.light = new THREE.DirectionalLight(0xffffff, 5);
Threejs.light.castShadow = true
Threejs.light.shadow.camera.far = 15
Threejs.light.shadow.mapSize.set(1024, 1024)
Threejs.light.shadow.normalBias = 0.05
Threejs.light.position.set(0.25, 3, - 2.25);
//Threejs.light.intensity =  5
Threejs.scene.add(Threejs.light);

/**
 * Environment map 
 * */
const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMap = cubeTextureLoader.load([
    '/models/textures/environmentMaps/1/px.jpg',
    '/models/textures/environmentMaps/1/nx.jpg',
    '/models/textures/environmentMaps/1/py.jpg',
    '/models/textures/environmentMaps/1/ny.jpg',
    '/models/textures/environmentMaps/1/pz.jpg',
    '/models/textures/environmentMaps/1/nz.jpg'
])
environmentMap.encoding = THREE.sRGBEncoding
Threejs.scene.environment = environmentMap
//Threejs.scene.background = environmentMap
/**
 * Update all materials
 */
const updateAllMaterials = () => {
    Threejs.scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            console.log(child)
            // child.material.envMap = environmentMap
            child.material.envMapIntensity = 10
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
            
        }
    })
}

/**
 * Overlay
 */
//const overlayGeometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1)
//const overlayMaterial = new THREE.ShaderMaterial({
//    transparent: true,
//    uniforms: {
//        uAlpha: { value: 1 }
//    },
//    vertexShader: `
//        void main(){
//            gl_Position = vec4(position, 1.0);
//        }
//    `,
//    fragmentShader: `
//        uniform float uAlpha;
//        void main(){
//            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
//        }
//    `
//})

//const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
//Threejs.scene.add(overlay)

Threejs.renderer.physicallyCorrectLights = true
Threejs.renderer.outputEncoding = THREE.sRGBEncoding
//Threejs.renderer.toneMapping = THREE.ReinhardToneMapping
Threejs.renderer.toneMapping = THREE.CineonToneMapping
Threejs.renderer.toneMappingExposure = 2.3;
Threejs.renderer.shadowMap.enabled = true
Threejs.renderer.shadowMap.type = THREE.PCFSoftShadowMap
Threejs.lieutenantHeadUrl = "/models/0316_wei_V24.glb";//3D圖的位置
Threejs.obj = null;//控制3D物件

/*---------------------------------------------------------
 [ Threejs Static ]*/
Threejs.rwdModelPosition = (rwd) => {
    return window.matchMedia(rwd).matches ? (Threejs.obj.position.set(0, 0, 0)) : (Threejs.obj.position.set(4, 0, 0));
}

//glass shader material 
const calizStella_mat = new THREE.MeshPhysicalMaterial({
    metalness: .9,
    roughness: .05,
    envMapIntensity: 0.9,
    clearcoat: 1,
    transparent: true,
    transmission: .75,
    opacity: .5,
    reflectivity: 0.2,
    refractionRatio: 0.985,
    ior: 0.9,
    side: THREE.BackSide,
})


Threejs.gltfLoader = (url) => {
    Threejs.loader.load(url, (gltf) => {
        Threejs.obj = gltf.scene;
        
        Threejs.scene.add(gltf.scene);
        gltf.scene.rotation.y = Math.PI 
        Threejs.obj.position.set(0, 0, 0);
        Threejs.obj.scale.set(0.05, 0.05, 0.05)

        Threejs.camera.lookAt(Threejs.obj.position)

        //Threejs.camera.lookAt(Threejs.obj.position)
        const glassShader = gltf.scene.children.find((child) => child.name === 'glass')
        glassShader.material = calizStella_mat

        //update material
        updateAllMaterials()

       
        
      
        //model RWD change position
        // Threejs.rwdModelPosition("(max-width: 425px)");
    });
}

Threejs.endLoadOnce = true
Threejs.endLoading = () => {
    console.log('finish');
}

Threejs.cameraZoomIn = () => {
    if (Threejs.camera.fov < 20) {
        setTimeout(() => {
            document.location.href = 'home/matterport'
        }, 1000);
        return
    }
    Threejs.camera.fov -= 0.5;
    Threejs.camera.updateProjectionMatrix();
    
}

Threejs.animate = () => {
    
    Threejs.controls.update();
    if (Threejs.obj !== null)
        Threejs.obj.rotation.y += 0.005;
    if (Threejs.obj && UI.Enter) {
        Threejs.cameraZoomIn()
    }

    Threejs.renderer.render(Threejs.scene, Threejs.camera);
    requestAnimationFrame(Threejs.animate);
   
}

Threejs.listenThreejsObjRWD = () => {
    // 監聽螢幕寬高來做簡單 RWD 設定
    $(window).on('resize', () => {
        Threejs.camera.aspect = window.innerWidth / window.innerHeight;
        Threejs.camera.updateProjectionMatrix();
        Threejs.renderer.setSize(window.innerWidth, window.innerHeight);
    })
}

Threejs.gltfLoadingMain = () => {
    Threejs.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(Threejs.renderer.domElement);
    //Threejs.scene.background = new THREE.Color("rgb(247,245,235)");//主頁背景顏色
    
    Threejs.camera.position.set(0, 4, 15);
    Threejs.gltfLoader(Threejs.lieutenantHeadUrl);//gltf loader
    Threejs.animate();//動畫
    Threejs.listenThreejsObjRWD();
}
/*---------------------------------------------------------
 [ Threejs Execute ]*/
Threejs.gltfLoadingMain();


/*---------------------------------------------------------
 [ UI Static ]*/

UI.BtnEnter.on('click', () => {
    UI.Enter = true
})

/*---------------------------------------------------------
 [ UI Events ]*/
UI.VideoSkip = () => {
}
UI.VideoEnd = () => {
}

/*---------------------------------------------------------
 [ UI Exucute ]*/