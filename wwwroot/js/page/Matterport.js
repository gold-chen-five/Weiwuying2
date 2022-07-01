const MatterportPage = {}
/*---------------------------------------------------------
 [ UI Variables ]*/
MatterportPage.Matterport = $('.matterport')
MatterportPage.Home = $('.matterport_home')
MatterportPage.Footer = $('.footer')
MatterportPage.Footer_pressed = $('.footer_pressed')
MatterportPage.Logo = $('.logo')
MatterportPage.MenuBtn = $('.menu-btn')
MatterportPage.Box_shadow = $('.box_shadow')
MatterportPage.Ipad_menu_1 = $('.ipad_menu_1')
MatterportPage.RightMenu = $('.matterport_right_menu')
MatterportPage.Earth = $('.earth')
MatterportPage.Translate_container = $('.translate_container')
MatterportPage.Language_menu = $('.language_menu')
MatterportPage.MenuWord = $('.chinese_word')
MatterportPage.English_word = $('.english_word')

//概述
MatterportPage.Overview = $('.overview')
MatterportPage.Overview_container = $('.overview_container')
MatterportPage.Overview_text = $('.overviewText')
MatterportPage.Cancel = $('.overview_cancel')

//language and menu
MatterportPage.English = $('.english')
MatterportPage.Chinese = $('.chinese')
MatterportPage.Japanese = $('.japanese')
MatterportPage.Menu_s1_1 = $('.menu_sl_1')
MatterportPage.Menu_s1_2 = $('.menu_sl_2')
MatterportPage.Menu_s1_3 = $('.menu_sl_3')
MatterportPage.Menu_s1_4 = $('.menu_sl_4')
MatterportPage.Menu_s1_5 = $('.menu_sl_5')
MatterportPage.Menu_s1_6 = $('.menu_sl_6')


//導覽影片
MatterportPage.TourBtn = $('.tourBtn')
MatterportPage.TourText = $('.tour_text')
MatterportPage.TourCancel = $('.tour_cancel')
MatterportPage.Tour = document.querySelector('.tour')


/*---------------------------------------------------------
 [初始變數]*/
MatterportPage.Overview_click = false
MatterportPage.Menu_Selected = '.menu_sl_1'
MatterportPage.MenuOpen = false
MatterportPage.LanguageOpen = false
MatterportPage.Language = '.chinese'


/*---------------------------------------------------------
 [button click]*/

MatterportPage.English.on('click', () => MatterportPage.Language_Onclick('.english',false))
MatterportPage.Chinese.on('click', () => MatterportPage.Language_Onclick('.chinese',false))
MatterportPage.Japanese.on('click', () => MatterportPage.Language_Onclick('.japanese',false))
MatterportPage.Menu_s1_1.on('click',() => MatterportPage.Menu_Onclick('.menu_sl_1',false))
MatterportPage.Menu_s1_2.on('click', () => MatterportPage.Menu_Onclick('.menu_sl_2',false))
MatterportPage.Menu_s1_3.on('click', () => MatterportPage.Menu_Onclick('.menu_sl_3',false))
MatterportPage.Menu_s1_4.on('click', () => MatterportPage.Menu_Onclick('.menu_sl_4',false))
MatterportPage.Menu_s1_5.on('click', () => MatterportPage.Menu_Onclick('.menu_sl_5',false))
MatterportPage.Menu_s1_6.on('click', () => MatterportPage.Menu_Onclick('.menu_sl_6',false))

/*---------------------------------------------------------
 [overview click]*/
MatterportPage.Overview.on('click', () => {
    MatterportPage.Overview_click = true
    MatterportPage.Overview_container.css('display', 'block')
})
MatterportPage.Cancel.on('click', () => {
    MatterportPage.Overview_click = false
    MatterportPage.Overview_container.css('display', 'none')
})

/*---------------------------------------------------------
 [tour button click]*/
MatterportPage.TourBtn.on('click', () => MatterportPage.TourBtn_Onclick())
MatterportPage.TourOpen = false

/*---------------------------------------------------------
 [tour button Variables]*/
MatterportPage.TourBtn_Onclick = () => {
    let videosrc = ''
    switch (MatterportPage.Menu_Selected) {
        case '.menu_sl_1':
            videosrc = 'banyan_plaza' 
            break
        case '.menu_sl_2':
            videosrc = 'crown_hall'
            break
        case '.menu_sl_3':
            videosrc = 'playhouse'
            break
        case '.menu_sl_4':
            videosrc = 'opera_house'
            break
        case '.menu_sl_5':
            videosrc = 'recital_hall'
            break
        case '.menu_sl_6':
            videosrc = 'concert_hall'
            break
    }
    MatterportPage.Tour.setAttribute('src', `../../../models/Video/${videosrc}.mp4`)

    if (!MatterportPage.TourOpen) {
        MatterportPage.TourText.css('display','none')
        MatterportPage.TourCancel.css('display', 'block')
        MatterportPage.Tour.style.display = 'block'
        MatterportPage.Tour.play()
    } else {
        MatterportPage.TourText.css('display','block')
        MatterportPage.TourCancel.css('display', 'none')
        MatterportPage.Tour.pause();
        MatterportPage.Tour.currentTime = 0;
        MatterportPage.Tour.style.display = 'none'
    }
    MatterportPage.TourOpen = !MatterportPage.TourOpen
}

/*---------------------------------------------------------
 [ Overview Variables ]*/
MatterportPage.Overview_container_context = (language) => {
    //overview_flag = false
    const languageFix = language.replace('.', '')
    const menuFix = MatterportPage.Menu_Selected.replace('.','')
    const overviewText = {
        chinese: {
            menu_sl_1: '建築師以榕樹的形象轉化成為富有穿透感、呼吸節奏的榕樹廣場，線條流動的牆面跟天花板，透過採光天窗仰望天際，就像置身在榕樹林下。 <br/> <br/> 使用滑鼠在畫面上移動，即可探索場域。點選「◎」圖示可瀏覽設施相關說明。',
            menu_sl_2: '樹冠大廳地點位於三樓，就如同行走在"榕樹"的樹梢上一樣，大廳貫穿整個場館，自由流動的空間使民眾能漫步優遊於其中。  <br/> <br/> 使用滑鼠在畫面上移動，即可探索場域。點選「◎」圖示可瀏覽設施相關說明。',
            menu_sl_3: '衛武營戲劇院共三層樓、可容納 1209 席，主要作為各種戲劇、舞蹈表演的演出空間，擁有鏡框式以及突出式兩種舞台型式。  <br/> <br/> 使用滑鼠在畫面上移動，即可探索場域。點選「◎」圖示可瀏覽設施相關說明。',
            menu_sl_4: '衛武營歌劇院是四廳院中最大的廳院，共四層樓、可容納 2236 席，主要作為歌劇、大型戲劇、舞蹈及跨領域等表演型式的大型舞台。  <br/> <br/> 使用滑鼠在畫面上移動，即可探索場域。點選「◎」圖示可瀏覽設施相關說明。',
            menu_sl_5: '衛武營表演廳共兩層樓、可容納 434 席。主要作為室內樂、獨奏及其他小型表演類型使用。  <br/> <br/> 使用滑鼠在畫面上移動，即可探索場域。點選「◎」圖示可瀏覽設施相關說明。',
            menu_sl_6: '衛武營音樂廳是臺灣第一座葡萄園式的音樂廳，共三層樓、可容納 1981 席，適合大型音樂節目(如交響樂團)的演出。  <br/> <br/> 使用滑鼠在畫面上移動，即可探索場域。點選「◎」圖示可瀏覽設施相關說明。'
        },
        english: {
            menu_sl_1: 'Designed by the architect to resemble banyan trees, the Banyan Plaza conveys a flowing sense of breath. Walking under the continuous walls and undulating ceiling, guests can feel a sensation of being under banyan trees by looking up at the skylights.',
            menu_sl_2: 'Crown Hall is located at third floor,  walking through it is like walking on the top of the Bayan tree.The lobby runs through the entire venue, and the free- flowing space allows the public to take a stroll in it.',
            menu_sl_3: 'Weiwuying’s PlayHouse spans three levels and has a capacity of 1,209 seats.It is mainly used for various drama and dance performances.The stage can be configured into proscenium or thrust stage',
            menu_sl_4: 'Weiwuying’s opera house is the largest house of Weiwuying four venues, with four floors and a capacity of 2, 236 seats.The Opera House is a large- scale stage mainly used for operas, major drama productions,dances, and interdisciplinary performances',
            menu_sl_5: 'Weiwuying’s Recital Hall contains two level and has a capacity of 434 seats.It is mainly for chamber music, solo recitals, or other smaller performances.',
            menu_sl_6: 'Weiwuying’s concert hall spans three floors and has a capacity of 1,981,is the first vineyard style concert hall in Taiwan.It is mainly for large musicperformances(such as symphony orchestra).'
        },
        japanese: {
            menu_sl_1: '建築家はガジュマルのイメージを貫通感と呼吸リズムのあるガジュマル広場に変貌し、壁面と天井の流れるようなラインは採光天窓を通じて空を見上げ、まるでガジュマルの下にいるように感じられます。',
            menu_sl_2: '樹冠ロビー3階にあって、まるで「ガジュマル」の上を歩いているように建てられて、ロビーが会場全体を通り抜け、人々がこの自由な空間でゆっくり散歩が楽しめます。',
            menu_sl_3: '衛武營のプレイハウスは3階建てで、1209席を収容可能です。主に様々な演劇やダンスのパフォーマンススペースとして使用されます。プロセニアムとスラスト二種類のステージがあります。',
            menu_sl_4: '衛武營のオペラハウスは4つのホールの中で最も大きいホールです。4階建てで、2236席収容可能です。主にオペラや大規模演劇、舞踊、さらにジャンルを超えたコラボなどの大舞台として使用されます。',
            menu_sl_5: '衛武營のリサイタルホールは2階建てで、434席を収容可能です。主に室内楽、独奏、その他の小規模のイベントに適しています。',
            menu_sl_6: '衛武營のコンサートホールは台湾初のヴィンヤード型ホールです。3階建てで、1981席収容可能です。大規模な音楽パフォーマンス（交響楽団など）に適しています。'
        }
    }
    MatterportPage.Overview_text.html(overviewText[languageFix][menuFix] )
    
    MatterportPage.Overview_click = true
    MatterportPage.Overview_container.css('display', 'block')
}

/*---------------------------------------------------------
 [ Language Variables ]*/
MatterportPage.Language_Onclick = (language,init) => {
    MatterportPage.Overview_container_context(language)
    MatterportPage.Language = language
    MatterportPage.Menu_Onclick.ChangeMatterport(MatterportPage.Menu_Selected)
    
    const languageHtml = $(language)
    const languageArray = $('.language')
    for (let i = 0; i < languageArray.length; i++) {
        $(languageArray[i]).removeClass('selected')
    }
    languageHtml.addClass('selected')

    MatterportPage.Menu_Text_Change_By_Language(MatterportPage.Language)
    if (MatterportPage.Language  === '.japanese') {
        //MatterportPage.RWD_Event()
        if (MatterportPage.Menu_Selected === '.menu_sl_1') {
            MatterportPage.Home.attr('src', '../../../models/JP_PNG/home_selected_JP.png')
        }
        const pngurl_footer_pressed = MatterportPage.Menu_Onclick.ChangepPNG.Footer_pressed(MatterportPage.Menu_Selected)
        MatterportPage.Footer_pressed.attr('src', pngurl_footer_pressed)
       
    } else { 
        //MatterportPage.RWD_Event()
        if (MatterportPage.Menu_Selected === '.menu_sl_1') {
            MatterportPage.Home.attr('src', '../../../models/PNG2/home_selected.png')
        }
        const pngurl_footer_pressed = MatterportPage.Menu_Onclick.ChangepPNG.Footer_pressed(MatterportPage.Menu_Selected)
        MatterportPage.Footer_pressed.attr('src', pngurl_footer_pressed)
    }

    if (window.innerWidth <= 1399) {
        if (!init) {
            MatterportPage.Earth_Event.OpenCloseLanguageMenu()
        }      
    } 
}

MatterportPage.Menu_Text_Change_By_Language = (language) => {
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
        MatterportPage.English_word.css('display', 'none')
    } else if (language === '.english') {
        textArr = [
            'Banyan Plaza',
            'Crown Hall',
            'Playhouse',
            'Opera House',
            'Recital Hall',
            'Concert Hall'
        ]
        MatterportPage.English_word.css('display', 'none')
    } else {
        MatterportPage.English_word.css('display', 'block')
    }

    for (let i = 1; i < 7; i++) {
        const getMenuText = $(`.menu_text_${i}`)
        getMenuText.text(textArr[i-1])
    }
}

/*---------------------------------------------------------
 [ Menu Variables ]*/
MatterportPage.Menu_Onclick = (classname,init) => {
    MatterportPage.Menu_Onclick.ChangeMatterport(classname)
    if (window.innerWidth <= 1399) {
        if (!init) {
            MatterportPage.MenuBtn_Event.OpenCloseMenu()
        }
    }
    if (classname === MatterportPage.Menu_Selected) return
    
    MatterportPage.Menu_Onclick.ChangeSelectedItemCss(classname)
    MatterportPage.Menu_Onclick.ChangepPNG(init)
    MatterportPage.Overview_container_context(MatterportPage.Language)
    //MatterportPage.Operate_Event(MatterportPage.Language)
}

MatterportPage.Menu_Onclick.ChangeSelectedItemCss = (classname) => {
    const selected = $(classname)
    const cancel = $(MatterportPage.Menu_Selected)
    selected.addClass('word_block_selected')
    cancel.removeClass('word_block_selected')
    MatterportPage.Menu_Selected = classname
}
MatterportPage.Menu_Onclick.ChangepPNG = (init) => {
    let homeImgSrc = ''
    
    if (MatterportPage.Menu_Selected === '.menu_sl_1') {
        homeImgSrc = '../../../models/PNG2/home_selected.png'
        if (MatterportPage.Language === '.japanese') {
            homeImgSrc = '../../../models/JP_PNG/home_selected_JP.png'
        } else {
            homeImgSrc = '../../../models/PNG2/home_selected.png'
        }
        
        MatterportPage.Home.removeClass('normal')
    } else {
        homeImgSrc = '../../../models/PNG2/home_normal.png'
        MatterportPage.Home.addClass('normal')
    }
    const pngurl_footer = MatterportPage.Menu_Onclick.ChangepPNG.Footer_url(MatterportPage.Menu_Selected)
    const pngurl_footer_pressed = MatterportPage.Menu_Onclick.ChangepPNG.Footer_pressed(MatterportPage.Menu_Selected)

    if (init) {
        window.onload = () => {
            MatterportPage.Footer.attr('src', pngurl_footer)
        }
    } else {
        MatterportPage.Footer.attr('src', pngurl_footer)
    }
    
    
    MatterportPage.Footer_pressed.attr('src', pngurl_footer_pressed)
    MatterportPage.Home.attr('src', homeImgSrc)
}

MatterportPage.Menu_Onclick.ChangepPNG.Footer_url = (name) => {
    const editionType = MatterportPage.Menu_Onclick.ChangepPNG.Footer_url.rwd()
    
    if (name === '.menu_sl_1') {
        return `../../../models/PNG2/footer_banyanplaza_${editionType}.svg`
    } else if (name === '.menu_sl_2') {
        return `../../../models/PNG2/footer_crownhall_${editionType}.svg`
    } else if (name === '.menu_sl_3') {
        return `../../../models/PNG2/footer_playhouse_${editionType}.svg`
    } else if (name === '.menu_sl_4') {
        return `../../../models/PNG2/footer_operahouse_${editionType}.svg`
    } else if (name === '.menu_sl_5') {
        return `../../../models/PNG2/footer_recitalhouse_${editionType}.svg`
    } else if (name === '.menu_sl_6') {
        return `../../../models/PNG2/footer_concerthall_${editionType}.svg`
    } 
}

MatterportPage.Menu_Onclick.ChangepPNG.Footer_url.rwd = () => {
    if (window.innerWidth < 1440 && window.innerWidth >= 768) {
        if (window.matchMedia("(orientation: landscape)").matches) {
            return 'ipad'
        }
    }
    if (window.innerWidth >= 1440)  return '1'
    if (window.innerWidth <= 1024 && window.innerWidth > 425)  return 'ipad'
    if (window.innerWidth <= 425) return 'iphone'

}


MatterportPage.Menu_Onclick.ChangepPNG.Footer_pressed = (name) => {
    let folder = 'PNG2'
    let language = ''
    if (MatterportPage.Language === '.japanese') {
        folder = 'JP_PNG'
        language = '_JP'
    }
    if (name === '.menu_sl_1') return `../../../models/${folder}/footer_banyanplaza_pressed${language}.png`
    else if (name === '.menu_sl_2') return `../../../models/${folder}/footer_crownhall_pressed${language}.png`
    else if (name === '.menu_sl_3') return `../../../models/${folder}/footer_playhouse_pressed${language}.png`
    else if (name === '.menu_sl_4') return `../../../models/${folder}/footer_operahouse_pressed${language}.png`
    else if (name === '.menu_sl_5') return `../../../models/${folder}/footer_recitalhall_pressed${language}.png`
    else if (name === '.menu_sl_6') return `../../../models/${folder}/footer_concerthall_pressed${language}.png`
}

MatterportPage.Menu_Onclick.ChangeMatterport = (classname) => {
    if (MatterportPage.Language === '.chinese') {
        if (classname === '.menu_sl_1') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=SBMPyh4xqVY&play=1&lang=zh-TW&help=1')
        else if (classname === '.menu_sl_2') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=FpMZ1JX2XKw&play=1&lang=zh-TW&help=1')
        else if (classname === '.menu_sl_3') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=Dg2MUHqNeEs&play=1&lang=zh-TW&help=1')
        else if (classname === '.menu_sl_4') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=wi345cqVkBQ&play=1&lang=zh-TW&help=1')
        else if (classname === '.menu_sl_5') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=tJdfEo7GtVJ&play=1&lang=zh-TW&help=1')
        else if (classname === '.menu_sl_6') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=go35MocEKuq&play=1&lang=zh-TW&help=1')
    } else if (MatterportPage.Language === '.english') {
        if (classname === '.menu_sl_1') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=wiAQdK8Lg9H&play=1&lang=en&help=1')
        else if (classname === '.menu_sl_2') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=RqAYnXYyFnw&play=1&lang=en&help=1')
        else if (classname === '.menu_sl_3') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=EGZTFRm1ntn&play=1&lang=en&help=1')
        else if (classname === '.menu_sl_4') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=qY8zSR5tXcc&play=1&lang=en&help=1')
        else if (classname === '.menu_sl_5') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=g8DGLZ4ZW8J&play=1&lang=en&help=1')
        else if (classname === '.menu_sl_6') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=TqcCFuUm8rX&play=1&lang=en&help=1')
    } else if (MatterportPage.Language === '.japanese') {
        if (classname === '.menu_sl_1') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=CmYPNekQKUd&play=1&lang=ja&help=1')
        else if (classname === '.menu_sl_2') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=W1F5Rurr5Gx&play=1&lang=ja&help=1')
        else if (classname === '.menu_sl_3') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=Yqo9BVDCppP&play=1&lang=ja&help=1')
        else if (classname === '.menu_sl_4') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=VawoiYrESNp&play=1&lang=ja&help=1')
        else if (classname === '.menu_sl_5') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=XKiM23KqDgR&play=1&lang=ja&help=1')
        else if (classname === '.menu_sl_6') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=zWtRWj7B2Ss&play=1&lang=ja&help=1')
    }
}

/*---------------------------------------------------------
 [ Init ]*/
MatterportPage.Init = () => {
    MatterportPage.ChangePlaceByParameters()
    MatterportPage.Overview_container_context(MatterportPage.Language)
    MatterportPage.OnUIEvents()
    MatterportPage.OnRWDchange()
}
/*---------------------------------------------------------
 [ Static ]*/

MatterportPage.ChangePlaceByParameters = () => {
    const url = window.location.search
    if (url === '') return
    
    const parameter = url.replace('?', '')
    const keyValue = parameter.split('&')
    const query = {}
    keyValue.forEach((item, key) => {
        const itemArr = item.split('=')
        query[itemArr[0]] = itemArr[1]
    })
    if (query.place === undefined || query.language === undefined) return
  
    MatterportPage.Menu_Onclick(query.place, true)
    MatterportPage.Language_Onclick(query.language, true)
    
}

MatterportPage.OnUIEvents = () => {
    MatterportPage.Home.on('click', MatterportPage.Home_Event)
    MatterportPage.MenuBtn.on('click', MatterportPage.MenuBtn_Event)
    MatterportPage.Earth.on('click', MatterportPage.Earth_Event)
    //MatterportPage.OperateCancel.on('click', MatterportPage.OperateCancel_Event)
}
MatterportPage.OnRWDchange = () => {
    MatterportPage.RWD_Event()
    $(window).on('resize', MatterportPage.RWD_Event)
}

MatterportPage.Logo.on('click', () => {
    document.location.assign(document.location.origin)
})
/*---------------------------------------------------------
 [ UI Home Events ]*/
MatterportPage.Home_Event = () => {
    MatterportPage.Menu_Onclick('.menu_sl_1')
}

/*---------------------------------------------------------
 [ UI Menu Events ]*/
MatterportPage.MenuBtn_Event = () => {
    if (MatterportPage.LanguageOpen) {
        MatterportPage.Earth_Event.OpenCloseLanguageMenu() //如果close 就會 open ，open 就會close
        setTimeout(MatterportPage.MenuBtn_Event.OpenCloseMenu, 500)
        return
    }
    MatterportPage.MenuBtn_Event.OpenCloseMenu()
   
}

MatterportPage.MenuBtn_Event.OpenCloseMenu = () => {
    if (!MatterportPage.MenuOpen) {
        MatterportPage.MenuBtn.addClass('open')
        MatterportPage.MenuOpen = true
        MatterportPage.Ipad_menu_1.addClass('menuclick')
        MatterportPage.RightMenu.css('height', '500px')

    } else {
        MatterportPage.MenuBtn.removeClass('open')
        MatterportPage.MenuOpen = false
        MatterportPage.Ipad_menu_1.removeClass('menuclick')
        MatterportPage.RightMenu.css('height', '50px')
    }
}
/*---------------------------------------------------------
 [ UI Language Events ]*/
MatterportPage.Earth_Event = () => {
    if (MatterportPage.MenuOpen) {
        MatterportPage.MenuBtn_Event.OpenCloseMenu()
        setTimeout(MatterportPage.Earth_Event.OpenCloseLanguageMenu, 500)
        return
    }
    MatterportPage.Earth_Event.OpenCloseLanguageMenu()
}

MatterportPage.Earth_Event.OpenCloseLanguageMenu = () => {
    if (!MatterportPage.LanguageOpen) {
        MatterportPage.LanguageOpen = true
        MatterportPage.Translate_container.css('height', '270px')
        MatterportPage.Language_menu.addClass('language_menuclick')
        MatterportPage.Earth.css('opacity', '0')
        setTimeout(() => {
            MatterportPage.Earth.attr('src', '../../../models/PNG2/ipad_cancel.png')
            MatterportPage.Earth.css('opacity', '1')
        }, 300)
        
    } else {
        MatterportPage.LanguageOpen = false
        MatterportPage.Translate_container.css('height', '100px')
        MatterportPage.Language_menu.removeClass('language_menuclick')
        MatterportPage.Earth.attr('src', '../../../models/PNG2/earth_1.svg')
    }
}

/*---------------------------------------------------------
 [ UI OperateCancel Events ]*/
//MatterportPage.OperateCancel_Event = () => {
//    MatterportPage.Operate.css('display','none')
//}

/*---------------------------------------------------------
 [ UI RWD Events ]*/
MatterportPage.RWD_Event = () => {

    const footer_url = MatterportPage.Menu_Onclick.ChangepPNG.Footer_url(MatterportPage.Menu_Selected)
    MatterportPage.Footer.attr('src', footer_url)
    if (window.innerWidth <= 1399 && window.innerWidth >= 768) {
        if (window.matchMedia("(orientation: landscape)").matches) {
            MatterportPage.Box_shadow.attr('src', '../../../models/PNG2/ipad-box_shadow.png')
            return
        }  
    }

    if (window.innerWidth > 1399) {
        MatterportPage.Box_shadow.attr('src', '../../../models/PNG2/box_shadow.png')
       
    }
    if (window.innerWidth <= 1024 && window.innerWidth > 425) {
        MatterportPage.Box_shadow.attr('src','../../../models/PNG2/ipad-box_shadow.png')
    }
    if (window.innerWidth <= 425) {
        MatterportPage.Box_shadow.attr('src', '../../../models/PNG2/iphone-box_shadow.png')
    }
}

MatterportPage.Change_Logo_By_Language = (rwd) => {
    //desktop ipad iphone
    let rwdUrl 
    if (rwd === 'desktop') {
        rwdUrl = '1'
    } else if (rwd === 'ipad') {
        rwdUrl = '2'
    } else {
        rwdUrl = '3'
    }

    let languageUrl = 'PNG2'
    //console.log(`../../../models/${languageUrl}/logo_${rwdUrl}.png`)
    MatterportPage.Logo.attr('src', `../../../models/${languageUrl}/logo_${rwdUrl}.png`)
}

/*---------------------------------------------------------
 [ Exucute ]*/
MatterportPage.Init()