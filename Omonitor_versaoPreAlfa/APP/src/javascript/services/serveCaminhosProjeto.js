export default class ServeCaminhosProjeto {

    constructor() {

        this._caminhoPastaIcones = "../../assets/icons/";
        this._caminhoPastaImagens = "../../assets/images/";

        this._closeFullscreenIcon =
            this._caminhoPastaIcones +
            "close_fullscreen_24dp_F3F3F3_FILL0_wght400_GRAD0_opsz24.svg";

        this._openFullscreenIcon =
            this._caminhoPastaIcones +
            "fullscreen_24dp_F3F3F3_FILL0_wght400_GRAD0_opsz24.svg";

        this._homeIcon =
            this._caminhoPastaIcones +
            "home_24dp_F3F3F3_FILL0_wght400_GRAD0_opsz24.svg";

        this._perfilIcon =
            this._caminhoPastaIcones +
            "person_24dp_F3F3F3_FILL0_wght400_GRAD0_opsz24.svg";

        this._introImageLotus =
            this._caminhoPastaImagens +
            "lotus.png";
    }

    get closeFullscreenIcon()   { return this._closeFullscreenIcon;}
    get openFullscreenIcon()    { return this._openFullscreenIcon;}
    get homeIcon()              { return this._homeIcon;}
    get perfilIcon()            { return this._perfilIcon;}
    get IntroLotusImagePng()    { return this._introImageLotus;}
    get caminhoPastaIcones()    { return this._caminhoPastaIcones;}
    get caminhoPastaImagens()   { return this._caminhoPastaImagens;}

    _serveUrlImage(caminho) { return `url(${caminho})`;}

    async _proucuraArquivoRetornandoCaminho(nomeImagem) {

        const extensoes = [
            "png",
            "jpg",
            "jpeg",
            "svg",
            "webp"
        ];

        for (const ext of extensoes) {

            const caminho =
                `${this._caminhoPastaImagens}${nomeImagem}.${ext}`;

            try {

                const response = await fetch(caminho);

                if (response.ok) {
                    return caminho;
                }

            } catch {}
        }

        throw new Error(
            `Arquivo "${nomeImagem}" não encontrado`
        );
    }
}