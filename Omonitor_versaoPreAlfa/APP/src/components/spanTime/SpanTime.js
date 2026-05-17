import renderizarElementos from "../../javascript/utils/renderizarElementos.js";

export default class SpanTime {

    constructor() {
        this._time      = "00";
        this._color     = "aliceblue";
        this._width     = "20px";
        this._height    = "20px";

        this.gerarSpamTime();
    }

    set text(value) {this.elemento.textContent = value; }

    gerarSpamTime() {
        
        this.elemento = renderizarElementos(
            "span",
            {
                width:  this._width,
                height: this._height,
                color:  this._color
            },
            {
                textContent: this._time
            }
        )

        this.elemento.classList.add("span");


    }
}