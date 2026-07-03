const chevronBackwar_24dp_b700ff = "chevronBackwar_24dp_b700ff.svg";
const chevronForward_24dp_b700ff = "chevronForward_24dp_b700ff.svg";
const closeFullscreen_24dp       = "closeFullscreen_24dp.svg";
const fullscreen_24dp            = "fullscreen_24dp.svg";
const home_24dp                  = "home_24dp.svg";
const person_24dp                = "person_24dp.svg";

const lotusLogo                  = "lotusLogo.png";
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
        return `url(${this._pathFolderImages + lotusLogo})`
    }
}