/*
 [UI and Threejs object]*/
const UI = {}
const Threejs = {}

/*---------------------------------------------------------
 [ public function to use]*/
function isIOSDevice() {
    return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
}


/*---------------------------------------------------------
 [ Threejs Variables ]*/
import { GLTFLoader } from './threeJS/GLTFLoader.js';
import { OrbitControls } from './threeJS/OrbitControls.js';
//import { DRACOLoader } from './threeJS/DRACOLoader.js'


/**  Setup Raycaster
 * */
const raycaster = new THREE.Raycaster()

/**
 * Mouse
 */
let currentIntersect = null
const mouse = new THREE.Vector2()
let floor = null

//使用者點擊
window.addEventListener('click', (event) => {
    mouse.x = event.clientX / window.innerWidth * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight * 2 - 1)
    
    //Cast a ray
    if (!orbit) {
        raycaster.setFromCamera(mouse, Threejs.camera)
        const labels = [label1, label2, label3, label4, label5, label6, floor]
        const intersects = raycaster.intersectObjects(labels)
        
        if (intersects.length) {
            if (intersects[0].object !== floor) {
                clickonWhichLabel(intersects[0])
            }
           
        } else {
            mouse.x = null
            mouse.y = null
        }
    }
})


/** LoadingManager
 * */
const loadingManager = new THREE.LoadingManager(
    () => {
        const loadingImg = $('.loading_img')
        loadingImg.css('display', 'none')
        UI.ClickEnterTag.css('display', 'block')
        
    },
    (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded / itemsTotal
       
    }
)
const canvas = document.querySelector('.webgl')
let antialias = false
isIOSDevice() ? antialias = false : antialias = true
Threejs.renderer = new THREE.WebGLRenderer({
    antialias: antialias, alpha: true, canvas: canvas
});
Threejs.scene = new THREE.Scene();
Threejs.camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
);
Threejs.scene.add(Threejs.camera)
Threejs.renderer.setClearColor(0x000000, 0);

/*  sprite label
 */

let label1 = null
let label2 = null
let label3 = null
let label4 = null
let label5 = null
let label6 = null
function makeSpriteLabel(picUrl, x, y, z) {

    let label = null
    const texture = new THREE.TextureLoader().load(picUrl);
    
    // because our canvas is likely not a power of 2
    // in both dimensions set the filtering appropriately.
    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    const labelMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
    });

    label = new THREE.Sprite(labelMaterial);
    //label 位置
    label.position.x = Threejs.obj.position.x + x;
    label.position.y = Threejs.obj.position.y + y;
    label.position.z = Threejs.obj.position.z + z;

    label.scale.set(0.4, 3.5, 1)
    const labelBaseScale = 0.01;
    Threejs.scene.add(label);

    return label

}

Threejs.controls = new OrbitControls(Threejs.camera, canvas);
Threejs.controls.enableDamping = true

Threejs.loader = new GLTFLoader(loadingManager);
Threejs.light = new THREE.DirectionalLight(0xffffff, 0.6);
Threejs.light.castShadow = true
Threejs.light.shadow.camera.far = 15
Threejs.light.shadow.mapSize.set(1024, 1024)
Threejs.light.shadow.normalBias = 0.05
Threejs.light.position.set(0.25, 3, - 2.25);
Threejs.scene.add(Threejs.light);

let orbit = false

Threejs.controls.addEventListener('start', () => {
    orbit = true 
})
Threejs.controls.addEventListener('end', () => {
    orbit = false
})
/**
 *ambient light
 */
const light = new THREE.AmbientLight(0xffffff, 1);

Threejs.scene.add(light);

/**
 * Update materials
 */
const updateAllMaterials = () => {
    Threejs.scene.traverse((child) => {
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

Threejs.renderer.shadowMap.enabled = true
Threejs.renderer.shadowMap.type = THREE.PCFSoftShadowMap
Threejs.renderer.setSize(window.innerWidth, window.innerHeight);
Threejs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
Threejs.objectUrl = "/models/0419_wei_uncompress_V26.glb"
Threejs.obj = null;//控制3D物件

/*---------------------------------------------------------
 [ Threejs Static ]*/
Threejs.rwdModelPosition = (rwd) => {
    return window.matchMedia(rwd).matches ? (Threejs.camera.fov = 95) : (Threejs.camera.fov = 75);
}

//obj group 
const group = new THREE.Group();

/**
 * gltf loader
 */
Threejs.gltfLoader = (url) => {
    Threejs.loader.load(url, (gltf) => {
        Threejs.obj = gltf.scene
      
        Threejs.obj.rotation.y = Math.PI
        
        Threejs.obj.position.set(0, 0, 0);
        Threejs.obj.scale.set(0.05, 0.05, 0.05)
      
        Threejs.camera.lookAt(Threejs.obj.position)
        
        //update material
        updateAllMaterials()
      
        //model RWD change position
        Threejs.rwdModelPosition("(max-width: 425px)");
        Threejs.camera.updateProjectionMatrix();

       
        label1 = makeSpriteLabel("/models/Mainpage_mark/landmark_banyan_plaza_1.png", 0.8, 2, -2.7)
        label2 = makeSpriteLabel("/models/Mainpage_mark/landmark_crown_hall_1.png", 3, 3, -1.5)
        label3 = makeSpriteLabel("/models/Mainpage_mark/landmark_playhouse_1.png", 2.1, 3, 1.5)
        label4 = makeSpriteLabel("/models/Mainpage_mark/landmark_opera_house_1.png", 0.5, 3, 0)
        label5 = makeSpriteLabel("/models/Mainpage_mark/landmark_recital_house_1.png", -2.8, 3, 1.8)
        label6 = makeSpriteLabel("/models/Mainpage_mark/landmark_concert_hall_1.png", -2, 3, -2)

        //catch floor
        floor = gltf.scene.children.find((child) => child.name === 'floor')
        
        //add to group
        group.add(Threejs.obj)
        group.add(label1, label2, label3, label4, label5, label6)

        Threejs.scene.add(group);
       
        animate()
    });
}

/**
 * Clock
 * */
const clock = new THREE.Clock()
let previousTime = 0
let elapseTime = clock.getElapsedTime()
let deltaTime = elapseTime - previousTime
previousTime = elapseTime

/**
 * Camera zoomin
 * */
Threejs.cameraZoomIn = () => {
    if (Threejs.camera.fov < 20) {
        document.location.assign(document.location.origin + "/home/matterport")
        return
    }
    Threejs.camera.fov -= deltaTime * 30;
    Threejs.camera.updateProjectionMatrix();
}

/**
 * When label onclick
 * */
function changePageAndZoomin(classname) { 
    document.location.assign(document.location.origin + "/home/matterport" + `?place=${classname}&language=${UI.language}`)
}


function clickonWhichLabel(label) {
    switch (label.object) {
        case label1:
            return changePageAndZoomin('.menu_sl_1')
        case label2:
            return changePageAndZoomin('.menu_sl_2')
        case label3:
            return changePageAndZoomin('.menu_sl_3')
        case label4:
            return changePageAndZoomin('.menu_sl_4')
        case label5:
            return changePageAndZoomin('.menu_sl_5')
        case label6:
            return changePageAndZoomin('.menu_sl_6')
    }  
}
let labelOnclick = false
/**
 * animate
 */
function animate() {
    //set Device time
    elapseTime = clock.getElapsedTime()
    deltaTime = elapseTime - previousTime
    previousTime = elapseTime
    
    Threejs.controls.update();

    if (!orbit) {
        group.rotation.y += deltaTime * 0.4;
    }
    if (UI.Enter) {
        Threejs.cameraZoomIn()
    }

    //orbit = false
    Threejs.renderer.render(Threejs.scene, Threejs.camera);
    window.requestAnimationFrame(animate);
}

/**
 * rwd change
 */
Threejs.listenThreejsObjRWD = () => {
    // 監聽螢幕寬高來做簡單 RWD 設定
    $(window).on('resize', () => {
        Threejs.camera.aspect = window.innerWidth / window.innerHeight;
        Threejs.renderer.setSize(window.innerWidth, window.innerHeight);
        Threejs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        Threejs.rwdModelPosition("(max-width: 425px)");
        Threejs.camera.updateProjectionMatrix();
    })

    $(window).on('orientationchange', () => {
        Threejs.camera.aspect = window.innerWidth / window.innerHeight;
        Threejs.renderer.setSize(window.innerWidth, window.innerHeight);
        Threejs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        Threejs.rwdModelPosition("(max-width: 425px)");
        Threejs.camera.updateProjectionMatrix();
    })
}

/**
 * Main
 */
const gltfLoadingMain = () => {
    Threejs.renderer.setSize(window.innerWidth, window.innerHeight);
    Threejs.camera.position.set(0, 4, 15);
    Threejs.gltfLoader(Threejs.objectUrl);//gltf loader

    //animate();//動畫
    Threejs.listenThreejsObjRWD();
}
/*---------------------------------------------------------
 [ Threejs Execute ]*/
gltfLoadingMain();


/*---------------------------------------------------------
 [ UI Variables ]*/
UI.Enter = false
UI.BtnEnter = $('.btnEnter')
UI.Video = $('.video')
UI.VideoMain = $('.videoMain')
UI.Mainpage = $('.Mainpage')
UI.LoadingBar = $('.loading_img')
UI.ModelBackground = $('.modelBackground')
UI.Cursor = $('.cursor')
UI.ClickEnterTag = $('.clickEnterTag')
UI.Skip = $('.skip')
UI.Webgl = $('.webgl')
UI.MutedButton = $('.mutedSound')
UI.Sound = false

//language ui
UI.English = $('.english')
UI.Chinese = $('.chinese')
UI.Japanese = $('.japanese')
UI.language = '.chinese'
//menu ui
UI.Menu_s1_1 = $('.menu_sl_1')
UI.Menu_s1_2 = $('.menu_sl_2')
UI.Menu_s1_3 = $('.menu_sl_3')
UI.Menu_s1_4 = $('.menu_sl_4')
UI.Menu_s1_5 = $('.menu_sl_5')
UI.Menu_s1_6 = $('.menu_sl_6')

//menu rwd btn 
UI.MenuBtn = $('.menu-btn')
UI.LeftMenuMain = $('.left_menu_main')
UI.MenuOpen = false
UI.Earth = $('.earth')
UI.Translate_container = $('.translate_container')
UI.LanguageOpen = false

//download map
UI.Download = $('.download')

/*------------------------------------------------
 [ Orbitcontrol Static]*/

/*------------------------------------------------
 [ Language Menu Download Static]*/
//language click
UI.English.on('click', () => UI.Language_Onclick('.english'))
UI.Chinese.on('click', () => UI.Language_Onclick('.chinese'))
UI.Japanese.on('click', () =>UI.Language_Onclick('.japanese'))
//menu click
UI.Menu_s1_1.on('click', () => UI.Menu_Onclick('.menu_sl_1'))
UI.Menu_s1_2.on('click', () => UI.Menu_Onclick('.menu_sl_2'))
UI.Menu_s1_3.on('click', () => UI.Menu_Onclick('.menu_sl_3'))
UI.Menu_s1_4.on('click', () => UI.Menu_Onclick('.menu_sl_4'))
UI.Menu_s1_5.on('click', () => UI.Menu_Onclick('.menu_sl_5'))
UI.Menu_s1_6.on('click', () => UI.Menu_Onclick('.menu_sl_6'))

UI.English_word = $('.english_word')

//menu btn onclick
UI.MenuBtn.on('click', () => UI.MenuBtn_Onclick())
UI.Earth.on('click', () => UI.Earth_Onclick())


//download map onclick
UI.Download.on('click', (e) => UI.Download_Onclick(e))

/*------------------------------------------------
 [ Donload Map onclick]*/

UI.Download_Onclick = (e) => {
    e.preventDefault();
    var link = document.createElement("a");

    link.href = "/models/Maps/map.zip";
    link.download = "map";
    document.body.appendChild(link)
    link.click();
    document.body.removeChild(link)
}
/*------------------------------------------------
 [ Menu Button onclick]*/
UI.MenuBtn_Onclick = () => {
    if (UI.LanguageOpen) {
        UI.Earth_Onclick()
    }
    if (!UI.MenuOpen) {
        UI.MenuBtn.addClass('open')
        UI.MenuOpen = true
        UI.LeftMenuMain.css('display', 'flex')
        setTimeout(() => UI.LeftMenuMain.css('opacity', '1'), 10)

    } else {
        UI.MenuBtn.removeClass('open')
        UI.MenuOpen = false
        UI.LeftMenuMain.css('opacity', '0')
        setTimeout(() => UI.LeftMenuMain.css('display', 'none'), 500)
    }
}

UI.Earth_Onclick = () => {
    if (UI.MenuOpen) {
        UI.MenuBtn_Onclick()
    }
    if (!UI.LanguageOpen) {
        UI.LanguageOpen = true
        UI.Translate_container.css('display', 'flex')
        setTimeout(() => UI.Translate_container.css('opacity', '1'), 10)
        UI.Earth.css('opacity', '0')
        setTimeout(() => {
            UI.Earth.attr('src', '../../../models/PNG2/ipad_cancel.png')
            UI.Earth.css('opacity', '1')
        }, 300)
        

    } else {
        UI.LanguageOpen = false
        UI.Translate_container.css('opacity', '0')
        setTimeout(() => UI.Translate_container.css('display', 'none'),500)
       
        UI.Earth.css('opacity', '0')
        setTimeout(() => {
            UI.Earth.attr('src', '../../../models/PNG2/earth_1.png')
            UI.Earth.css('opacity', '1')
        }, 300)

    }
}

/*------------------------------------------------
 [ Language and Menu Event]*/
UI.Language_Onclick = (language) => {
    console.log('click')
    //change css 
    UI.language = language
    const languageHtml = $(language)
    const languageArray = $('.language')
    for (let i = 0; i < languageArray.length; i++) {
        $(languageArray[i]).removeClass('selected')
    }
    languageHtml.addClass('selected')
    UI.Menu_Text_Change_By_Language(language)
    if (window.innerWidth <= 425) UI.Earth_Onclick()
}
UI.Menu_Text_Change_By_Language = (language) => {
    let textArr = [
        '榕樹廣場',
        '樹冠大廳',
        '戲劇院',
        '歌劇院',
        '表演廳',
        '音樂廳'
    ]
    if (language === '.japanese') {
        textArr = [
            'ガジュマル広場',
            '樹冠ロビー',
            'プレイハウス',
            'オペラハウス',
            'リサイタルホール',
            'コンサートホール'
        ]
        UI.English_word.css('display', 'none')
    } else if (language === '.english') {
        textArr = [
            'Banyan Plaza',
            'Crown Hall',
            'Playhouse',
            'Opera House',
            'Recital Hall',
            'Concert Hall'
        ]
        UI.English_word.css('display', 'none')
    } else {
        UI.English_word.css('display', 'block')
    }

    for (let i = 1; i < 7; i++) {
        const getMenuText = $(`.menu_text_${i}`)
        getMenuText.text(textArr[i - 1])
    }
}

UI.Menu_Onclick = (classname) => {
    UI.Menu_css(classname)
    UI.TurnPage(classname)
}
UI.Menu_css = (classname) => {
    UI.MenuSelected = classname
    const menuHtml = $(classname)
    const menuArray = $('.word_block')
    
    for (let i = 0; i < menuArray.length; i++) {
        $(menuArray[i]).removeClass('word_block_selected')
    }
    menuHtml.addClass('word_block_selected')
}
UI.TurnPage = (classname) => {
    document.location.assign(document.location.origin + "/home/matterport" + `?place=${classname}&language=${UI.language}`)
}

/*---------------------------------------------------------
 [Enter theater]*/
UI.ClickEnterTag.on('click', () => {
    UI.Enter = true
})
/*---------------------------------------------------------
 [ UI Video Events ]*/
UI.MutedButton.on('click', () => {
    UI.Sound = !UI.Sound
    if (UI.Sound) {
        UI.MutedButton.attr('src', '../../models/Main_PNG/mute_1_V2.png')
        UI.Video.prop('muted', false)

    } else {
        UI.MutedButton.attr('src', '../../models/Main_PNG/mute_2_V2.png')
        UI.Video.prop('muted', true)
    }

})


UI.VideoStart = () => {
    //close webgl
    UI.Webgl.css('display', 'none')
    cancelAnimationFrame(Threejs.myreq)
  
    UI.Skip.on('click', () => {
        UI.Video.prop('muted', true)
        UI.Video.trigger('pause')
        UI.Video.removeAttr('src')
        //UI.Video.css('display', 'none')
        UI.ModelBackground.css('display', 'block')
        UI.VideoMain.css('display', 'none')
        UI.Webgl.css('display', 'block')
        animate()
        //document.location.assign(document.location.origin + "/home/matterport")
    })

    UI.Video.on('ended', () => {
        UI.Video.prop('muted', true)
        UI.Video.trigger('pause')
        UI.Video.removeAttr('src')
        UI.ModelBackground.css('display', 'block')
        UI.VideoMain.css('display', 'none')
        UI.Webgl.css('display', 'block')
        animate()
    })
}

/*--------------------------------------------------------
  [UI Init]*/
UI.ModelPage = () => {
    UI.LoadingBar.css('display', 'block')
    UI.VideoStart()
}


/*---------------------------------------------------------
 [ UI Exucute ]*/
UI.ModelPage();
