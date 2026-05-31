import ConfiguracaoPadrao from "../configuracaoPadrao/ConfiguracaoPadrao.js";
import renderizarElementos from "../../javascript/utils/renderizarElementos.js";


export default class BarraLateral extends ConfiguracaoPadrao {

    constructor(orientacao, mapComBotoes , addBoby=true) {

        super();

        this._addBody           =addBoby;

        this._width             = "80px";
        this._height            = "100vh";
        this._backgroundColor   = "#131212";
        this._display           = "flex";
        this._position          = "fixed";
        this._left              = "0px";
        this._right             = "0px";
        this._top               = "0px";
        this._borderRadius      = "5px";
        this._justifyContent    = "flex-start";
        this._alignItems        = "center";
        this._padding           = "10px";
        this._boxShadow         = "0px 0px 10px 10px rgba(0,0,0,0.5)";
        this._flexDirection     = "column";
        this._borderRight       = "2px solid white";
        this._borderLeft        = "2px solid white"; 
        

        this._orientacao = (orientacao || "left").toLowerCase();
        this._mapComBotoes = mapComBotoes || new Map();

        this.renderizarBarraLateral();
        this._passarElementoParaClassePai(this.elemento);
    }

    get getOrientacao()         { return this._orientacao; }
    get getMapComBotoes()       { return this._mapComBotoes; }


    set atribuirOrientacao(value) {
        const val = (value || "").toLowerCase();
        if (val !== "left" && val !== "right") {
            console.warn("Orientação inválida. Use 'left' ou 'right'");
            return;
        }

        this._orientacao = val;

        if (this.elemento) {
            this.elemento.style.left = "";
            this.elemento.style.right = "";

            if (val === "left") {
                this.elemento.style.left = this._left;
            } else {
                this.elemento.style.right = this._right;
            }
        }
    }

    set atribuirMapComBotoes(value) {
        if (!(value instanceof Map)) {
            console.warn("mapComBotoes deve ser um Map");
            return;
        }

        this._mapComBotoes = value;
        this._adicionaBotoesABarraLateral();
    }

   
    _adicionaBotoesABarraLateral() {

        if (!this.elemento) return;

        for (let botao of this._mapComBotoes.values()) {
          if (botao && botao.getElemento) {
                this.elemento.appendChild(botao.getElemento);

            } else {
                console.warn("Botão inválido ignorado:", botao);
            }
        }
    }

    renderizarBarraLateral() {

        this.elemento = renderizarElementos(
            "div",
            {
                width:              this._width,
                height:             this._height,
                backgroundColor:    this._backgroundColor,
                display:            this._display,
                position:           this._position,
                top:                this._top,
                borderRadius:       this._borderRadius,
                justifyContent:     this._justifyContent,
                alignItems:         this._alignItems,
                padding:            this._padding,
                boxShadow:          this._boxShadow,
                flexDirection:      this._flexDirection,
                borderRight:        this._orientacao=="left"?this._borderRight:"" ,
                borderLeft:         this._orientacao=="right"?this._borderLeft:""
            
            },
            {},
            this._addBody
        )

        this.atribuirOrientacao = this._orientacao; 

        this._adicionaBotoesABarraLateral();
        this.elemento.classList.add("barraLateral");
        document.body.appendChild(this.elemento);
    }
}