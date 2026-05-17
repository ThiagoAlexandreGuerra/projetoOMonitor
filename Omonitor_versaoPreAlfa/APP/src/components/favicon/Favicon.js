import ServeCaminhosProjeto from "../../javascript/services/serveCaminhosProjeto.js";

export default class Favicon {

    constructor(
        titulo = "Lotus",
        caminhoFaviconImage = null
    ) {
        this._caminhos = new ServeCaminhosProjeto();

        this._configurarGuia(
            titulo,
            caminhoFaviconImage || this._caminhos.IntroLotusImagePng
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