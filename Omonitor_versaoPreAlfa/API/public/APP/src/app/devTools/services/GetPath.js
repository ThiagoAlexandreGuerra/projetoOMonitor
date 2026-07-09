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
const play_arrow_24dp_FFFFFF        = "play_arrow_24dp_FFFFFF.svg";
const star_rate_24dp_FFFFFF         = "star_rate_24dp_FFFFFF.svg";

const lotusLogo                 = "lotusLogo.png";
const monitorLogo               = "monitorLogo.png";
const mascoteLogo               = "mascoteLogo.png";
const chevronForward_png_A6A6A6 = "chevronForward_png_A6A6A6.png";
const bancoDoBrasilBackground   = "bancoDoBrasilBackground.png";
const rostoFotoDePerfil         = "rostoFotoDePerfil.jfif"
export default class GetPath {

    static _pathFolderIcons  = "../../../../../APP/assets/icons/";
    static _pathFolderImages = "../../../../../APP/assets/images/";

    static getchevronBackwar_24dp_b700ff() {
        return `url(${this._pathFolderIcons + chevronBackwar_24dp_b700ff})`;
    }

    static getchevronForward_24dp_b700ff() {
        return `url(${this._pathFolderIcons + chevronForward_24dp_b700ff})`;
    }

    static getcloseFullscreen_24dp() {
        return `url(${this._pathFolderIcons + closeFullscreen_24dp})`;
    }

    static getfullscreen_24dp() {
        return `url(${this._pathFolderIcons + fullscreen_24dp})`;
    }

    static gethome_24dp() {
        return `url(${this._pathFolderIcons + home_24dp})`;
    }

    static getperson_24dp() {
        return `url(${this._pathFolderIcons + person_24dp})`;
    }

    static getLotusLogo() {
        return `url(${this._pathFolderImages + lotusLogo})`;
    }

    static getMonitorLogo() {
        return `url(${this._pathFolderImages + monitorLogo})`;
    }

    static getMascoteLogo() {
        return `url(${this._pathFolderImages + mascoteLogo})`;
    }

    static getaccountBalance_24dp_FFFFFF() {
        return `url(${this._pathFolderIcons + accountBalance_24dp_FFFFFF})`;
    }

    static getbalance_24dp_FFFFFF() {
        return `url(${this._pathFolderIcons + balance_24dp_FFFFFF})`;
    }

    static getcalculate_24dp_FFFFFF() {
        return `url(${this._pathFolderIcons + calculate_24dp_FFFFFF})`;
    }

    static getconcierge_24dp_FFFFFF() {
        return `url(${this._pathFolderIcons + concierge_24dp_FFFFFF})`;
    }

    static getdesktopWindows_24dp_FFFFFF() {
        return `url(${this._pathFolderIcons + desktopWindows_24dp_FFFFFF})`;
    }

    static getfinanceMode_24dp_FFFFFF() {
        return `url(${this._pathFolderIcons + financeMode_24dp_FFFFFF})`;
    }

    static getmenuBook_24dp_FFFFFF() {
        return `url(${this._pathFolderIcons + menuBook_24dp_FFFFFF})`;
    }

    static getneurology_24dp_FFFFFF() {
        return `url(${this._pathFolderIcons + neurology_24dp_FFFFFF})`;
    }

    static getschool_24dp_FFFFFF() {
        return `url(${this._pathFolderIcons + school_24dp_FFFFFF})`;
    }

    static getChevronForward_png_A6A6A6() {
        return `url(${this._pathFolderImages + chevronForward_png_A6A6A6})`;
    }

    static getArrow_back_ios_40dp_F0C800() {
        return `url(${this._pathFolderIcons + arrow_back_ios_40dp_F0C800})`;
    }

    static getArrow_forward_ios_40dp_F0C800() {
        return `url(${this._pathFolderIcons + arrow_forward_ios_40dp_F0C800})`;
    }

    static getDrag_indicator_24dp_FFFFFF() {
        return `url(${this._pathFolderIcons + drag_indicator_24dp_FFFFFF})`;
    }

    static getBancoDoBrasilBackground() {
        return `url(${this._pathFolderImages + bancoDoBrasilBackground})`;
    }

    static getPlay_arrow_24dp_FFFFFF() {
        return `url(${this._pathFolderIcons + play_arrow_24dp_FFFFFF})`;
    }

    static getStar_rate_24dp_FFFFFF(){
        return `url(${this._pathFolderIcons + star_rate_24dp_FFFFFF})`
    }

    static getRostoFotoDePerfil(){
        return `url(${this._pathFolderImages + rostoFotoDePerfil})`
    }
}