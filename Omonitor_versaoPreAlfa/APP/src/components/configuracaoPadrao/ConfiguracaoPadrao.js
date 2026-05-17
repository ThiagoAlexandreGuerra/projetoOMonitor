import responsividade from "../../javascript/utils/responsividade.js";

export default class ConfiguracaoPadrao {
    
    constructor() {
        
        this.elemento                   = null;
        this._removConfgPadJaChamada    = false;
        
        this._alignItems            = "center";
        this._backgroundColor       = "rgb(255, 0, 0)";
        this._border                = "2px solid black";
        this._borderLeft            = "2px solid white";
        this._borderRadius          = "5px";
        this._borderRight           = "2px solid white";
        this._backgroundImage       = "";
        this._backgroundRepeat      = "no-repeat";
        this._backgroundPosition    = "center";
        this._backgroundSize        = "50px 50px";
        this._boxShadow             = "0px 0px 10px 10px rgba(0,0,0,0.5)";
        this._boxSizing             = "";
        this._bottom                = "";
        this._color                 = "#dadada";
        this._cursor                = "pointer";
        this._display               = "flex";
        this._flexDirection         = "column";
        this._flexWrap              = "";
        this._height                = "400px";
        this._id                    = "";
        this._justifyContent        = "center";
        this._left                  = "50%";
        this._marginBottom          = "20px";
        this._marginTop             = "10px";
        this._maxHeight             = "none";
        this._maxWidth              = "none";
        this._minWidth              = "none";
        this._minHeight             = "none";
        this._overflow              = "scroll";
        this._overflowX             = "hidden";
        this._overflowY             = "";
        this._padding               = "10px";
        this._position              = "absolute";
        this._right                 = "0%";
        this._textContent           = "";
        this._top                   = "50%";
        this._transform             = "translate(-50%, -50%)";
        this._width                 = "400px";
        this._wordWrap              = "break-word";
        this._zIndex                = "";
        this._fontSize              = "";
    }

    get getWidth()              { return this._width; }
    get getHeight()             { return this._height; }
    get getBackgroundColor()    { return this._backgroundColor; }
    get getDisplay()            { return this._display; }
    get getPosition()           { return this._position; }
    get getLeft()               { return this._left; }
    get getRight()              { return this._right; }
    get getTop()                { return this._top; }
    get getTransform()          { return this._transform; }
    get getBorderRadius()       { return this._borderRadius; }
    get getJustifyContent()     { return this._justifyContent; }
    get getAlignItems()         { return this._alignItems; }
    get getPadding()            { return this._padding; }
    get getBoxShadow()          { return this._boxShadow; }
    get getFlexDirection()      { return this._flexDirection; }
    get getBorderRight()        { return this._borderRight; }
    get getBorderLeft()         { return this._borderLeft; }
    get getCursor()             { return this._cursor; }
    get getOverflow()           { return this._overflow; }
    get getOverflowX()          { return this._overflowX; }
    get getOverflowY()          { return this._overflowY; }
    get getWordWrap()           { return this._wordWrap; }
    get getTextContent()        { return this._textContent; }
    get getColor()              { return this._color; }
    get getMarginBottom()       { return this._marginBottom; }
    get getFlexWrap()           { return this._flexWrap; }
    get getBoxSizing()          { return this._boxSizing; }
    get getId()                 { return this._id; }
    get getMaxHeight()          { return this._maxHeight; }
    get getMaxWidth()           { return this._maxWidth; }
    get getMinWidth()           { return this._minWidth; }
    get getMinHeight()          { return this._minHeight; }
    get getZIndex()             { return this._zIndex;    }
    get getFontSize()           { return this._fontSize;}
    get getClassList()          { return this.elemento.className;}

    set atribuirWidth(value)                { this._set("_width",           "width",            value); }
    set atribuirHeight(value)               { this._set("_height",          "height",           value); }
    set atribuirBackgroundColor(value)      { this._set("_backgroundColor", "backgroundColor",  value); }
    set atribuirDisplay(value)              { this._set("_display",         "display",          value); }
    set atribuirPosition(value)             { this._set("_position",        "position",         value); }
    set atribuirBorderRadius(value)         { this._set("_borderRadius",    "borderRadius",     value); }
    set atribuirJustifyContent(value)       { this._set("_justifyContent",  "justifyContent",   value); }
    set atribuirAlignItems(value)           { this._set("_alignItems",      "alignItems",       value); }
    set atribuirPadding(value)              { this._set("_padding",         "padding",          value); }
    set atribuirBoxShadow(value)            { this._set("_boxShadow",       "boxShadow",        value); }
    set atribuirFlexDirection(value)        { this._set("_flexDirection",   "flexDirection",    value); }
    set atribuirColor(value)                { this._set("_color",           "color",            value); }
    set atribuirOverflow(value)             { this._set("_overflow",        "overflow",         value); }
    set atribuirTransform(value)            { this._set("_transform",       "transform",        value); }
    set atribuirFlexWrap(value)             { this._set("_flexWrap",        "flexWrap",         value); }
    set atribuirBorderRight(value)          { this._set("_borderRight",     "borderRight",      value); }
    set atribuirBorderLeft(value)           { this._set("_borderLeft",      "borderLeft",       value); }
    set atribuirCursor(value)               { this._set("_cursor",          "cursor",           value); }
    set atribuirOverflowX(value)            { this._set("_overflowX",       "overflowX",        value); }
    set atribuirOverflowY(value)            { this._set("_overflowY",       "overflowY",        value); }
    set atribuirWordWrap(value)             { this._set("_wordWrap",        "wordWrap",         value); }
    set atribuirMarginBottom(value)         { this._set("_marginBottom",    "marginBottom",     value); }
    set atribuirBoxSizing(value)            { this._set("_boxSizing",       "boxSizing",        value); }
    set atribuirBackgroundImage(value)      { this._set("_backgroundImage", "backgroundImage",  value); }
    set atribuirBackgroundRepeat(value)     { this._set("_backgroundRepeat","backgroundRepeat", value); }
    set atribuirBackgroundSize(value)       { this._set("_backgroundSize",  "backgroundSize",   value); }
    set atribuirBorder(value)               { this._set("_border",          "border",           value); }
    set atribuirCursor(value)               { this._set("_cursor",          "cursor",           value); }
    set atribuirMarginTop(value)            { this._set("_marginTop",       "marginTop",        value); }
    set atribuirMaxHeight(value)            { this._set("_maxHeight",       "maxHeight",        value); }
    set atribuirMaxWidth(value)             { this._set("_maxWidth",        "maxWidth",         value); }
    set atribuirMinWidth(value)             { this._set("_minWidth",        "minWidth",         value); }
    set atribuirMinHeight(value)            { this._set("_minHeight",       "minHeight",        value); }
    set atribuirZIndex(value)               { this._set("_zIndex" ,         "zIndex",           value); }
    set atribuirFontSize(value)             { this._set("_fontSize" ,       "fontSize",         value); }
    set atribuirBackgroundPosition(value)   { this._set("_backgroundPosition","backgroundPosition", value);}
   
    set atribuirLeft(value) {
        if (!this._removConfgPadJaChamada) {
            this._removerConfiguracaoPosicaoPadrao();
        }
        this._set("_left", "left", value);
    }

    set atribuirRight(value) {
        if (!this._removConfgPadJaChamada) {
            this._removerConfiguracaoPosicaoPadrao();
        }
        this._set("_right", "right", value);
    }

    set atribuirTop(value) {
        if (!this._removConfgPadJaChamada) {
            this._removerConfiguracaoPosicaoPadrao();
        }
        this._set("_top", "top", value);
    }

    set atribuirBottom(value) { 
        if (!this._removConfgPadJaChamada) {
            this._removerConfiguracaoPosicaoPadrao();
        }
        this._set("_bottom", "bottom" ,value);
    }

    set atribuirClassList(value){

        this._classList = value;

        if(this.elemento){
            this.elemento.className = value;
        }
    }

    set atribuirTextContent(value) {
        this._textContent = value;

        
        if (this.elemento) {
            this.elemento.textContent = value;
        }
    }

    set atribuirId(value) {
        this._id = value;

        if (this.elemento) {
            this.elemento.id = value;
        }
    }

    _adicionarResponsividade(
            eixoX = true,
            eixoY = true,
            width = true,
            height = true,
            fatorUPEixoX = 1,
            fatorUPEixoY = 1,
            fatorUPWidth = 1,
            fatorUPHeight = 1
        ) {
        responsividade(
            this,
            eixoX,
            eixoY,
            width,
            height,
            fatorUPEixoX,
            fatorUPEixoY,
            fatorUPWidth,
            fatorUPHeight
        );
    }

    _passarElementoParaClassePai(el){
        if(el){
            this.elemento=el;
        }
    }

    _set(prop, styleProp, value) {
        this[prop] = value;
        this._updateStyle(styleProp, value);
    }

    _updateStyle(prop, value) {
        if (this.elemento) {
            this.elemento.style[prop] = value;
        }
    }

    _removerConfiguracaoPosicaoPadrao() {
       
        this._set("_transform",  "transform",   "none"      );
        this._set("_top",        "top",         "0%"        );
        this._set("_left",       "left",        "0%"        );
        this._set("_right",      "right",       "0%"        );
        this._set("_position",   "position",    "relative"  );

        this._removConfgPadJaChamada = true;
    }

    _removerConfiguracaoPadraoScrollbar(nivel = 0){

        this._height            = "auto";
        this._maxHeight         = "none";
        this._overflow          = "visible";
        this._wordWrap          = "break-word";
        this._left              = "50%";
        this._right             = "0%";
        this._top               = "0%";
        this._transform         = "translate( 0%, 0%)";

        if(this.getCaixaFilha){
            this.getCaixaFilha.atribuirPosition="relative";
            this.getCaixaFilha._updateStyle("position" , "relative");
        }  

        this._updateStyle("height",         "auto"              );
        this._updateStyle("maxHeight",      "none"              );
        this._updateStyle("overflow",       "visible"           );
        this._updateStyle("overflowY",      "visible"           );
        this._updateStyle("overflowX",      "visible"           );
        this._updateStyle("overflowWrap",   "break-word"        );
        this._updateStyle("wordBreak",      "break-all"         );
        this._updateStyle("whiteSpace",     "normal"            );
        this._updateStyle("left",           "0%"                );
        this._updateStyle("right",          "0%"                );
        this._updateStyle("top",            "0%"                );
        this._updateStyle("transform",      "translate(0%, 0%)" );

        if(nivel > 0 && this.getCaixaFilha){
            this.getCaixaFilha._removerConfiguracaoPadraoScrollbar(nivel - 1);
        }
    }

}