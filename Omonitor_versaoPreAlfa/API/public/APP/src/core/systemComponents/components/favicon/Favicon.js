import GetPath from "../../../../app/devTools/services/GetPath.js";
export default class Favicon {

    constructor(
        title = "Lotus",
        caminhoFaviconImage = null
    ) {
        this._paths = GetPath.getMonitorLogo();

        this._configurarGuia(
            title,
            caminhoFaviconImage || this._paths
                                        .replace("url" , "" )
                                        .replace(")" , "" )
                                        .replace("(" , "" )
        );
    }

    _configurarGuia(titulo, caminhoFaviconImage) {

        document.title = titulo;

        let favicon =
            document.querySelector("link[rel='icon']");

        if (!favicon) {
            favicon = document.createElement("link");
            favicon.rel = "icon";
            document.head.appendChild(favicon);
        }

        favicon.href = caminhoFaviconImage;

        
    }
}