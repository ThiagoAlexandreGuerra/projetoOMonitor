import ConfiguracaoPadrao from "../configuracaoPadrao/ConfiguracaoPadrao.js";
import desaparecer from "../../javascript/behaviors/desaparecer.js";
import aparecer from "../../javascript/behaviors/aparecer.js";
import toggleVisibilidade from "../../javascript/behaviors/toggleVisibilidade.js";
import gerarIdElemento from "../../javascript/utils/geraIdElemento.js";
import renderizarElementos from "../../javascript/utils/renderizarElementos.js";

export default class CaixaBasica extends ConfiguracaoPadrao {

    constructor(objMovel = false) {

        super();

        this._objMovel = objMovel;
        this.isDragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this._id = gerarIdElemento("001", null, "00");

        this.atribuirPosition = "relative";
        this.atribuirTop = "0";
        this.atribuirLeft = "0";
        this.atribuirTransform = "none";

        this.renderizarCaixaBasica();

        if (this._objMovel) {
            this._ativarMovimentacao();
        }
    }

    get getElemento() {
        return this.elemento;
    }

    get getId() {
        return this._id;
    }

    
    _ativarMovimentacao() {

        this.elemento.addEventListener(
            "mousedown",
            (e) => this._mouseDownEvent(e)
        );

        document.addEventListener(
            "mousemove",
            (e) => this._mouseMoveEvent(e)
        );

        document.addEventListener(
            "mouseup",
            () => this._mouseUpEvent()
        );
    }
    
    _mouseDownEvent(e) {

        this.isDragging = true;

        this.offsetX =
            e.clientX - this.elemento.offsetLeft;

        this.offsetY =
            e.clientY - this.elemento.offsetTop;

        this.elemento.style.transform = "none";
    }

    _mouseMoveEvent(e) {

        if (!this.isDragging) return;

        this.elemento.style.left =
            `${e.clientX - this.offsetX}px`;

        this.elemento.style.top =
            `${e.clientY - this.offsetY}px`;
    }

    _mouseUpEvent() {
        this.isDragging = false;
    }

    _mouseMoveEventParaWindow(e) {

        const positionX = e.clientX;
        const positionY = e.clientY;

        const rotate =
            Math.atan2(positionY, positionX) *
            180 / Math.PI;

    }

    _on(event, callback) {

        this.elemento.addEventListener(
            event,
            callback
        );

        return this;
    }

    _aparecer() {
        aparecer(this.elemento);
    }

    _desaparecer() {
        desaparecer(this.elemento);
    }

    _toggleVisibilidade() {
        toggleVisibilidade(this.elemento);
    }

    _addChild(child) {

        if (!child) {
            throw new Error(
                "Elemento filho inválido."
            );
        }

        this.elemento.appendChild(child);
    }

    renderizarCaixaBasica() {

        this.elemento = renderizarElementos(
            "div",
            {
                width: this._width,
                height: this._height,
                backgroundColor: this._backgroundColor,
                display: this._display,
                position: this._position,
                top: this._top,
                borderRadius: this._borderRadius,
                justifyContent: this._justifyContent,
                alignItems: this._alignItems,
                padding: this._padding,
                boxShadow: this._boxShadow,
                flexDirection: this._flexDirection,
                left: this._left,
                right: this._right,
                transform: this._transform,
                cursor: this._cursor,
                wordWrap: this._wordWrap,
                overflow: this._overflow,
                overflowX: this._overflowX,
                overflowY: this._overflowY,
                color: this._color,
                marginBottom: this._marginBottom,
                flexWrap: this._flexWrap,
                boxSizing: this._boxSizing
            },
            {},
            true
        );

        this.elemento.classList.add(
            "caixa-scroll"
        );
        this.elemento.classList.add("caixaBasica");

    }
}