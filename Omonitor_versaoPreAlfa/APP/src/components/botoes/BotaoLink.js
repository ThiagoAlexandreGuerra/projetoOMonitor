import Botao from "./Botao.js";


export default class BotaoLinkParaOutraPagina extends Botao {

    constructor(linkParaOutraPagina) {

        super();

        this._linkParaOutraPagina = linkParaOutraPagina;

        this._linkElement = this.criarElementoHTMLParaLink(this._linkParaOutraPagina);
        this.element.appendChild(this._linkElement);

        this.elemento.classList.add("botaoLinkParaOutraPagina");

    }

    criarElementoHTMLParaLink(link) {
        
        let elementoParaLink = document.createElement("a");

        elementoParaLink.href = link;
        elementoParaLink.textContent = "Ir"; 

        return elementoParaLink;
    }

    set atribuirLinkDesteBotaoPara(link) {
        this._linkParaOutraPagina = link;

        if (this._linkElement) {
            this._linkElement.href = link;
        }
    }
}