
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
/*---------------------------------------------------------
 [ Member Variables ]*/
MatterportPage.Menu_Selected = '.menu_sl_3'
MatterportPage.MenuOpen = false
MatterportPage.LanguageOpen = false
MatterportPage.Language = '.chinese'

MatterportPage.Language_Onclick = (language) => {
    MatterportPage.Language = language
    const languageHtml = $(language)
    const languageArray = $('.language')
    for (let i = 0; i < languageArray.length; i++) {
        $(languageArray[i]).removeClass('selected')
    }
    languageHtml.addClass('selected')

    console.log(language)

    MatterportPage.Menu_Text_Change_By_Language(MatterportPage.Language)
    if (MatterportPage.Language  === '.japanese') {
        MatterportPage.RWD_Event()
        MatterportPage.Home.attr('src', '../../../models/JP_PNG/home_selected_JP.png')
        const pngurl_footer_pressed = MatterportPage.Menu_Onclick.ChangepPNG.Footer_pressed(MatterportPage.Menu_Selected)
        MatterportPage.Footer_pressed.attr('src', pngurl_footer_pressed)
       
    } else { 
        MatterportPage.RWD_Event()
        MatterportPage.Home.attr('src', '../../../models/PNG2/home_selected.png')
        const pngurl_footer_pressed = MatterportPage.Menu_Onclick.ChangepPNG.Footer_pressed(MatterportPage.Menu_Selected)
        MatterportPage.Footer_pressed.attr('src', pngurl_footer_pressed)
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
            'バンヤン広場',
            '樹冠ロビー',
            ' 演劇院',
            'オペラハウス',
            '公演場',
            'コンサートホール'
        ]
    }
    for (let i = 1; i < 7; i++) {
        const getMenuText = $(`.menu_text_${i}`)
        getMenuText.text(textArr[i-1])
    }
}
MatterportPage.Menu_Onclick = (classname) => {
    MatterportPage.Menu_Onclick.ChangeMatterport(classname)
    if (classname === MatterportPage.Menu_Selected) return
    MatterportPage.Menu_Onclick.ChangeSelectedItemCss(classname)
    MatterportPage.Menu_Onclick.ChangepPNG()
}
MatterportPage.Menu_Onclick.ChangeSelectedItemCss = (classname) => {
    const selected = $(classname)
    const cancel = $(MatterportPage.Menu_Selected)
    selected.addClass('word_block_selected')
    cancel.removeClass('word_block_selected')
    MatterportPage.Menu_Selected = classname
}
MatterportPage.Menu_Onclick.ChangepPNG = () => {
    let homeImgSrc = ''
    if (MatterportPage.Menu_Selected === '.menu_sl_3') {
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
    MatterportPage.Footer.attr('src', pngurl_footer)
    MatterportPage.Footer_pressed.attr('src', pngurl_footer_pressed)
    MatterportPage.Home.attr('src', homeImgSrc)
}

MatterportPage.Menu_Onclick.ChangepPNG.Footer_url = (name) => {
    const editionType = MatterportPage.Menu_Onclick.ChangepPNG.Footer_url.rwd()
    
    if (name === '.menu_sl_1') {
        return `../../../models/PNG2/footer_banyanplaza_${editionType}.png`
    } else if (name === '.menu_sl_2') {
        return `../../../models/PNG2/footer_crownhall_${editionType}.png`
    } else if (name === '.menu_sl_3') {
        return `../../../models/PNG2/footer_playhouse_${editionType}.png`
    } else if (name === '.menu_sl_4') {
        return `../../../models/PNG2/footer_operahouse_${editionType}.png`
    } else if (name === '.menu_sl_5') {
        return `../../../models/PNG2/footer_recitalhouse_${editionType}.png`
    } else if (name === '.menu_sl_6') {
        return `../../../models/PNG2/footer_concerthall_${editionType}.png`
    } 
}

MatterportPage.Menu_Onclick.ChangepPNG.Footer_url.rwd = () => {
    if (window.innerWidth > 1024)  return '1'
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
    if (classname === '.menu_sl_1') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=VhtJ21WcAKk&play=1')
    else if (classname === '.menu_sl_2') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=CbFEsTmp337&play=1')
    else if (classname === '.menu_sl_3') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=Dg2MUHqNeEs&play=1')
    else if (classname === '.menu_sl_4') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=1pQwADvabW6&play=1')
    else if (classname === '.menu_sl_5') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=tJdfEo7GtVJ&play=1')
    else if (classname === '.menu_sl_6') MatterportPage.Matterport.attr('src', 'https://my.matterport.com/show/?m=DXBazm7rYpV&play=1')
}

/*---------------------------------------------------------
 [ Static ]*/
MatterportPage.Init = () => {
    MatterportPage.OnUIEvents()
    MatterportPage.OnRWDchange()
}

MatterportPage.OnUIEvents = () => {
    MatterportPage.Home.on('click', MatterportPage.Home_Event)
    MatterportPage.MenuBtn.on('click', MatterportPage.MenuBtn_Event)
    MatterportPage.Earth.on('click', MatterportPage.Earth_Event)
}
MatterportPage.OnRWDchange = () => {
    MatterportPage.RWD_Event()
    $(window).on('resize', MatterportPage.RWD_Event)
}
/*---------------------------------------------------------
 [ UI Events ]*/
MatterportPage.Home_Event = () => {
    MatterportPage.Menu_Onclick('.menu_sl_3')
}

MatterportPage.MenuBtn_Event = () => {
    if (MatterportPage.LanguageOpen) {
        MatterportPage.Earth_Event.OpenCloseLanguageMenu()
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
        MatterportPage.Earth.attr('src', '../../../models/PNG2/earth_1.png')
    }
}

MatterportPage.RWD_Event = () => {
    if (window.innerWidth <= 1366 && window.innerWidth >= 768) {
        if (window.matchMedia("(orientation: landscape)").matches) {
            MatterportPage.Change_Logo_By_Language('ipad')
            MatterportPage.Footer.attr('src', '../../../models/PNG2/footer_playhouse_1.png')
            MatterportPage.Box_shadow.attr('src', '../../../models/PNG2/ipad-box_shadow.png')
            return
        }  
    }

    if (window.innerWidth > 1024) {
        MatterportPage.Change_Logo_By_Language('desktop')
        MatterportPage.Footer.attr('src', '../../../models/PNG2/footer_playhouse_1.png')
        MatterportPage.Box_shadow.attr('src', '../../../models/PNG2/box_shadow.png')
       
    }
    if (window.innerWidth <= 1024 && window.innerWidth > 425) {
        MatterportPage.Change_Logo_By_Language('ipad')
        MatterportPage.Footer.attr('src', '../../../models/PNG2/footer_playhouse_ipad.png')
        MatterportPage.Box_shadow.attr('src','../../../models/PNG2/ipad-box_shadow.png')
    }
    if (window.innerWidth <= 425) {
        MatterportPage.Change_Logo_By_Language('iphone')
        MatterportPage.Footer.attr('src', '../../../models/PNG2/footer_playhouse_iphone.png')
        MatterportPage.Box_shadow.attr('src', '../../../models/PNG2/iphone-box_shadow.png')
    }
}

MatterportPage.Change_Logo_By_Language = (rwd) => {
    console.log(rwd)
    //desktop ipad iphone
    let rwdUrl 
    if (rwd === 'desktop') {
        rwdUrl = '1'
    } else if (rwd === 'ipad') {
        rwdUrl = '2'
    } else {
        rwdUrl = '3'
    }

    let languageUrl
    if (MatterportPage.Language === '.japanese') {
        languageUrl = 'JP_PNG'
    } else {
        languageUrl = 'PNG2'
    }
    console.log(`../../../models/${languageUrl}/logo_${rwdUrl}.png`)
    MatterportPage.Logo.attr('src', `../../../models/${languageUrl}/logo_${rwdUrl}.png`)
}
/*---------------------------------------------------------
 [ Exucute ]*/
MatterportPage.Init()