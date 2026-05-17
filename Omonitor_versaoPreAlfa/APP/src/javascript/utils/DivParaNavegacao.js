import renderizarElementos from "./renderizarElementos.js";

export default class DivParaNavegacao {

    constructor() {
        this._classList = "iniciar";
        this.renderizarDivParaNavegacao();
    }

    get getClassList() {
        return this._classList;
    }

    _chamarProximaClasseDoLayout(value){

        this.elemento.classList.remove(this._classList);

        this._classList = value;

        this.elemento.classList.add(value);
    }
    
    renderizarDivParaNavegacao() {
        this.elemento = renderizarElementos("div",{},{},true);
        this.elemento.className = this._classList;
    }
}