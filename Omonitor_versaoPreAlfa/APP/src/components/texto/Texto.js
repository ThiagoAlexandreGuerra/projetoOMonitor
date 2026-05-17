import CaixaBasica from "../caixas/CaixaBasica.js";
import renderizarElementos from "../../javascript/utils/renderizarElementos.js";

export default class Texto extends CaixaBasica {

    constructor(...blocos) {

        super(false);

        this._blocos = blocos;

        
        this._fontSizeTitulo = "28px";
        this._fontWeightTitulo = "600";
        this._colorTitulo = "#ffffff";
        this._marginTopTitulo = "35px";
        this._marginBottomTitulo = "20px";

        
        this._fontSizeParagrafo = "17px";
        this._lineHeightParagrafo = "1.8";
        this._colorParagrafo = "#d8d8d8";
        this._marginBottomParagrafo = "18px";
        this._textAlignParagrafo = "justify";

        
        this._fontFamily = "Arial, sans-serif";

        this._configurarTexto();
        this.renderizarBlocos();
    }


    set atribuirFontSizeTitulo(value) {
        this._fontSizeTitulo = value;
    }

    set atribuirFontWeightTitulo(value) {
        this._fontWeightTitulo = value;
    }

    set atribuirColorTitulo(value) {
        this._colorTitulo = value;
    }

    set atribuirFontSizeParagrafo(value) {
        this._fontSizeParagrafo = value;
    }

    set atribuirLineHeightParagrafo(value) {
        this._lineHeightParagrafo = value;
    }

    set atribuirColorParagrafo(value) {
        this._colorParagrafo = value;
    }

    set atribuirTextAlignParagrafo(value) {
        this._textAlignParagrafo = value;
    }

    set atribuirFontFamily(value) {
        this._fontFamily = value;
    }

    _configurarTexto() {

        this.atribuirBackgroundColor = "transparent";
        this.atribuirBoxShadow = "none";
        this.atribuirWidth = "90%";
        this.atribuirHeight = "auto";
        this.atribuirDisplay = "flex";
        this.atribuirFlexDirection = "column";
        this.atribuirPadding = "25px";
    }

    _criarTitulo(texto) {

        return renderizarElementos(
            "h2",
            {
                fontSize: this._fontSizeTitulo,
                fontWeight: this._fontWeightTitulo,
                color: this._colorTitulo,
                marginTop: this._marginTopTitulo,
                marginBottom: this._marginBottomTitulo,
                fontFamily: this._fontFamily
            },
            {
                innerHTML: texto
            }
        );
    }

    _criarParagrafo(texto) {

        return renderizarElementos(
            "p",
            {
                fontSize: this._fontSizeParagrafo,
                lineHeight: this._lineHeightParagrafo,
                color: this._colorParagrafo,
                marginBottom: this._marginBottomParagrafo,
                textAlign: this._textAlignParagrafo,
                fontFamily: this._fontFamily
            },
            {
                innerHTML: texto
            }
        );
    }

    renderizarBlocos() {

        this._blocos.forEach(bloco => {

            this._addChild(this._criarTitulo(bloco.titulo));

            bloco.paragrafos.forEach(p => {
                this._addChild(this._criarParagrafo(p));
            });
        });
    }
}