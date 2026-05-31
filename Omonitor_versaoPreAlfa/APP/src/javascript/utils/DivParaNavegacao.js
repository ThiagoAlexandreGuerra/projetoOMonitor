import renderizarElementos from "./renderizarElementos.js";

export default class DivParaNavegacao {
    constructor() {
        this._classList = "landing-page";
        this.renderizarDivParaNavegacao();
    }

    getClassList() {
        return this._classList;
    }

    _chamarProximaClasseDoLayout(value) {
        if (this.elemento) {
            this.elemento.classList.remove(this._classList);
            this._classList = value;
            this.elemento.classList.add(value);
        }
    }
    
    renderizarDivParaNavegacao() {
        this.elemento = renderizarElementos("div", {}, {}, true);
        this.elemento.className = this._classList;
    }
}