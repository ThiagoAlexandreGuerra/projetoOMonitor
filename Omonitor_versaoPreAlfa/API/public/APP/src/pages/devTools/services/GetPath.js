const chevronBackwar_24dp_b700ff    = "chevronBackwar_24dp_b700ff.svg";
const chevronForward_24dp_b700ff    = "chevronForward_24dp_b700ff.svg";
const closeFullscreen_24dp          = "closeFullscreen_24dp.svg";
const fullscreen_24dp               = "fullscreen_24dp.svg";
const home_24dp                     = "home_24dp.svg";
const person_24dp                   = "person_24dp.svg";
const accountBalance_24dp_FFFFFF    = "accountBalance_24dp_FFFFFF.svg";
const balance_24dp_FFFFFF           = "balance_24dp_FFFFFF.svg";
const calculate_24dp_FFFFFF         = "calculate_24dp_FFFFFF.svg";
const concierge_24dp_FFFFFF         = "concierge_24dp_FFFFFF.svg";
const desktopWindows_24dp_FFFFFF    = "desktopWindows_24dp_FFFFFF.svg";
const financeMode_24dp_FFFFFF       = "financeMode_24dp_FFFFFF.svg";
const menuBook_24dp_FFFFFF          = "menuBook_24dp_FFFFFF.svg";
const neurology_24dp_FFFFFF         = "neurology_24dp_FFFFFF.svg";
const school_24dp_FFFFFF            = "school_24dp_FFFFFF.svg";
const arrow_back_ios_40dp_F0C800    = "arrow_back_ios_40dp_F0C800.svg";
const arrow_forward_ios_40dp_F0C800 = "arrow_forward_ios_40dp_F0C800.svg";
const drag_indicator_24dp_FFFFFF    = "drag_indicator_24dp_FFFFFF.svg";
const play_arrow_24dp_FFFFFF        = "play_arrow_24dp_FFFFFF.svg" 

const lotusLogo                  = "lotusLogo.png";
const monitorLogo                = "monitorLogo.png";
const mascoteLogo                = "mascoteLogo.png";
const chevronForward_png_A6A6A6  = "chevronForward_png_A6A6A6.png";
const bancoDoBrasilBackground    = "bancoDoBrasilBackground.png";
export default class GetPath {

    constructor() {

        this._pathFolderIcons  = "../../../../../APP/assets/icons/";
        this._pathFolderImages = "../../../../../APP/assets/images/";
        
    }

   async _getPathAsset(nameImage) {

    const folders = [
        this._pathFolderImages,
        this._pathFolderIcons
    ];

    const extensions = [
        "png",
        "jpg",
        "jpeg",
        "svg",
        "webp"
    ];

    for (const folder of folders) {

        for (const ext of extensions) {

            const path = `${folder}${nameImage}.${ext}`;

            try {

                const response = await fetch(path);

                if (response.ok) {
                    return path;
                }

            } catch {}

        }

    }

    throw new Error(
        `Asset "${nameImage}" was not found.`
    );
    }

    getchevronBackwar_24dp_b700ff(){
        return `url(${this._pathFolderIcons + chevronBackwar_24dp_b700ff})`;
    }
    getchevronForward_24dp_b700ff(){
        return `url(${this._pathFolderIcons + chevronForward_24dp_b700ff})`;
    }
    getcloseFullscreen_24dp(){
        return `url(${this._pathFolderIcons + closeFullscreen_24dp})`;
    }
    getfullscreen_24dp(){
        return `url(${this._pathFolderIcons + fullscreen_24dp})`;
    }
    gethome_24dp(){
        return `url(${this._pathFolderIcons + home_24dp})`;
    }
    getperson_24dp(){
        return `url(${this._pathFolderIcons + person_24dp})`;
    }
    getLotusLogo(){
        return `url(${this._pathFolderImages + lotusLogo})`;
    }

    getMonitorLogo(){
        return `url(${this._pathFolderImages + monitorLogo})`;
    }

    getMascoteLogo(){
        return `url(${this._pathFolderImages + mascoteLogo})`
    }
    getaccountBalance_24dp_FFFFFF(){
    return `url(${this._pathFolderIcons + accountBalance_24dp_FFFFFF})`;
    }

    getbalance_24dp_FFFFFF(){
        return `url(${this._pathFolderIcons + balance_24dp_FFFFFF})`;
    }

    getcalculate_24dp_FFFFFF(){
        return `url(${this._pathFolderIcons + calculate_24dp_FFFFFF})`;
    }

    getconcierge_24dp_FFFFFF(){
        return `url(${this._pathFolderIcons + concierge_24dp_FFFFFF})`;
    }

    getdesktopWindows_24dp_FFFFFF(){
        return `url(${this._pathFolderIcons + desktopWindows_24dp_FFFFFF})`;
    }

    getfinanceMode_24dp_FFFFFF(){
        return `url(${this._pathFolderIcons + financeMode_24dp_FFFFFF})`;
    }

    getmenuBook_24dp_FFFFFF(){
        return `url(${this._pathFolderIcons + menuBook_24dp_FFFFFF})`;
    }

    getneurology_24dp_FFFFFF(){
        return `url(${this._pathFolderIcons + neurology_24dp_FFFFFF})`;
    }

    getschool_24dp_FFFFFF(){
        return `url(${this._pathFolderIcons + school_24dp_FFFFFF})`;
    }

    getChevronForward_png_A6A6A6(){
        return `url(${this._pathFolderImages + chevronForward_png_A6A6A6})`;
    }

    getArrow_back_ios_40dp_F0C800(){
        return `url(${this._pathFolderIcons + arrow_back_ios_40dp_F0C800})`;
    }    
    getArrow_forward_ios_40dp_F0C800(){
        return `url(${this._pathFolderIcons + arrow_forward_ios_40dp_F0C800})`; 
    }    

    getDrag_indicator_24dp_FFFFFF(){
        return `url(${this._pathFolderIcons + drag_indicator_24dp_FFFFFF})`;
    }

    getBancoDoBrasilBackground(){
        return `url(${this._pathFolderImages + bancoDoBrasilBackground})`
    }

    getPlay_arrow_24dp_FFFFFF(){
        return `url(${this._pathFolderIcons + play_arrow_24dp_FFFFFF})`
    }
}