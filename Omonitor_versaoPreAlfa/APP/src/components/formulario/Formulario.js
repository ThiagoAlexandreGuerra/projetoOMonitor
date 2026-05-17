import CaixaPadrao from "../caixas/CaixaPadrao.js";
import Titulo from "../titulo/Titulo.js";
import Input from "../input/Input.js";

export default class Formulario extends CaixaPadrao {

    constructor(titulo = "Formulario", ...tiposInputs) {

        super(true, 1, false);

        this._inputs = [];

        this._removerConfiguracaoPadraoScrollbar();
        this.atribuirMinHeight              = "450px";
        this.atribuirBackgroundColor        = "transparent";
        
        
        this._tituloForm = new Titulo(titulo);
        
        this._tituloForm.atribuirPosition   = "relative";
        this._tituloForm.atribuirTop        = "-240px";
        this._tituloForm.atribuirLeft       = "-330px";
        
        this.getCaixaFilha.atribuirBackgroundColor  = "transparent";
        this.getCaixaFilha.atribuirBoxShadow        = "none";
        this.getCaixaFilha.atribuirTop              = "100px";
        this.getCaixaFilha.atribuirLeft             = "-10px";
        this.getCaixaFilha.atribuirWidth            = "750px";

        this.elemento.appendChild(
            this._tituloForm.getTituloElemento
        );

        this._addInputCaixa(...tiposInputs);

        this.elemento.classList.add("loginBackgroundColor");
        this.elemento.classList.add("formulario");

    }

    get getData() {

        const dados = {};

        this._inputs.forEach(input => {
            dados[input.getTipoInput] = input.getData;
        });

        return dados;
    }

    get getJSON() {
        return JSON.stringify(this.getData);
    }

    _addInputCaixa(...tiposInputs) {
        tiposInputs.forEach(tipoInput => {
            this._auxAddInputCaixa(tipoInput);
        });
    }

    _auxAddInputCaixa(tipoInput) {

        const input = new Input(tipoInput);

        this._inputs.push(input);

        this._addChild(input.getInputElement);
    }
}