import Botao from "./Botao.js";

export default class BotaoEventoClick extends Botao {

    constructor(...functions) {

        super();

        this._functions = functions;

        this._functions.forEach(fn => {
            if (typeof fn === "function") {
                this.elemento.addEventListener("click", fn);
            }
        });

        this.elemento.classList.add("botaoEventoClick");

    }

    set atribuirFunction(fn) {

        if (typeof fn !== "function") {
            throw new TypeError("O argumento precisa ser uma função.");
        }

        this._functions.push(fn);
        this.elemento.addEventListener("click", fn);
    }
}