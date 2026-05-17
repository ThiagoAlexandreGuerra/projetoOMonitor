import renderizarElementos from "../../javascript/utils/renderizarElementos.js";

export default class Titulo {

    constructor(titulo = "", seAddBody = true) {

        this._seAddBody     = seAddBody;
        this._titulo        = titulo;
        this._width         = "30vh";
        this._height        = "20vh";
        this._color         = "aliceblue";
        this._left          = "10%";
        this._top           = "3%";
        this._position      = "fixed";
        this._whiteSpace    = "nowrap";
        this._display       = "block";
        this._fontSize      = "30px";

        this.renderizarTitulo();
    }

    get getTitulo()         { return this._titulo; }
    get getWidth()          { return this._width; }
    get getHeight()         { return this._height; }
    get getColor()          { return this._color; }
    get getLeft()           { return this._left; }
    get getTop()            { return this._top; }
    get getPosition()       { return this._position; }
    get getWhiteSpace()     { return this._whiteSpace; }
    get getDisplay()        { return this._display; }
    get getSeAddBody()      { return this._seAddBody; }
    get getFontSize()       { return this._fontSize;}
    get getTituloElemento() { return this.elemento; }

    set atribuirTitulo(value)       {
        this._titulo = value;

        if (this.elemento) {
            this.elemento.textContent = value;
        }
    }

    set atribuirWhiteSpace(value)   { this._set("_whiteSpace", "whiteSpace", value); }
    set atribuirWidth(value)        { this._set("_width", "width", value); }
    set atribuirHeight(value)       { this._set("_height", "height", value); }
    set atribuirColor(value)        { this._set("_color", "color", value); }
    set atribuirLeft(value)         { this._set("_left", "left", value); }
    set atribuirTop(value)          { this._set("_top", "top", value); }
    set atribuirPosition(value)     { this._set("_position", "position", value); }
    set atribuirDisplay(value)      { this._set("_display", "display", value); }
    set atribuirFontSize(value)     { this._set("_fontSize", "fontSize", value); }
    set atribuirSeAddBody(value)    { this._seAddBody = value; }

    _set(prop, styleProp, value) {
        this[prop] = value;
        this._updateStyle(styleProp, value);
    }

    _updateStyle(prop, value) {
        if (this.elemento) {
            this.elemento.style[prop] = value;
        }
    }

    _addTituloNovoElemento() {

        if (this.elemento.parentNode) {
            this.elemento.parentNode.removeChild(this.elemento);
        }

        this.atribuirPosition = "relative";

        return this.elemento;
    }

    renderizarTitulo() {
        this.elemento = renderizarElementos(
            "h1",
            {
                width:      this._width,
                height:     this._height,
                position:   this._position,
                top:        this._top,
                left:       this._left,
                color:      this._color,
                whiteSpace: this._whiteSpace,
                display:    this._display,
                fontSize:   this._fontSize,
            },
            {
                textContent: this._titulo
            },
            this._seAddBody
        );

        this.elemento.classList.add("titulo");

    }
}