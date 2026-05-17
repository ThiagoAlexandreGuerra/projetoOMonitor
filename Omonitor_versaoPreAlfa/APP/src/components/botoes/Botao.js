import ConfiguracaoPadrao from "../configuracaoPadrao/ConfiguracaoPadrao.js";
import renderizarElementos from "../../javascript/utils/renderizarElementos.js";


export default class Botao extends ConfiguracaoPadrao{

    constructor() {

        super();

        this._width                 = "67px";
        this._height                = "67px";
        this._backgroundColor       = "#242424";
        this._borderRadius          = "8px";
        this._hoverColor            = "#be000085"

        this.rederizarBotao();
        this._passarElementoParaClassePai(this.elemento);
        this._adicionarHover();
        this._removerConfiguracaoPosicaoPadrao();
    
    }

    get getElemento()                {return this.elemento;}

    set atribuirHoverColor(value)    {this._hoverColor=value;}

    _adicionarHover() {
        this.elemento.addEventListener("mouseenter", () => {
            this.elemento.style.transform = "scale(1.05)";
            this.elemento.style.backgroundColor = this._hoverColor;
        });

        this.elemento.addEventListener("mouseleave", () => {
            this.elemento.style.transform = "scale(1)";
            this.elemento.style.backgroundColor = this._backgroundColor;
        });
    }

    rederizarBotao() {

        this.elemento = renderizarElementos(
            "div",
            {
                position:           this._position,
                width:              this._width,
                height:             this._height,
                backgroundColor:    this._backgroundColor,
                marginTop:          this._marginTop,
                borderRadius:       this._borderRadius,
                backgroundImage:    this._backgroundImage,
                backgroundRepeat:   this._backgroundRepeat,
                backgroundPosition: this._backgroundPosition,
                backgroundSize:     this._backgroundSize,
                border:             this._border,
                cursor:             this._cursor,
                bottom:             this._bottom,
                display:            this._display,
                top:                this._top,
            }
        );

        this.elemento.classList.add("botao");

    }

    
}