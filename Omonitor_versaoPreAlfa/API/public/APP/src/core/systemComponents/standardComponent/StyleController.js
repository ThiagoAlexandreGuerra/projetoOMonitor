import JoinLayers from "./JoinLayers.js";

export default class StyleController extends JoinLayers{
    
    constructor(...args) {
        super(...args)
    }

    getWidthPX()                { return `${this.getWidth()}px`; }
    getHeightPX()               { return `${this.getHeight()}px`; }
    getBackgroundColor()        { return this._backgroundColor; }
    getDisplay()                { return this._display; }
    getPosition()               { return this._position; }
    getLeftPX()                 { return this._left; }
    getRightPX()                { return this._right; }
    getTopPX()                  { return this._top; }
    getTransform()              { return this._transform; }
    getBorderRadius()           { return this._borderRadius; }
    getJustifyContent()         { return this._justifyContent; }
    getAlignItems()             { return this._alignItems; }
    getPadding()                { return this._padding; }
    getBoxShadow()              { return this._boxShadow; }
    getFlexDirection()          { return this._flexDirection; }
    getBorderRight()            { return this._borderRight; }
    getBorderLeft()             { return this._borderLeft; }
    getCursor()                 { return this._cursor; }
    getOverflow()               { return this._overflow; }
    getOverflowX()              { return this._overflowX; }
    getOverflowY()              { return this._overflowY; }
    getWordWrap()               { return this._wordWrap; }
    getTextContent()            { return this._textContent; }
    getInnerHTML()              { return this._innerHTML; } 
    getColor()                  { return this._color; }
    getMarginBottom()           { return this._marginBottom; }
    getFlexWrap()               { return this._flexWrap; }
    getBoxSizing()              { return this._boxSizing; }
    getId()                     { return this._id; }
    getMaxHeight()              { return this._maxHeight; }
    getMaxWidth()               { return this._maxWidth; }
    getMinWidth()               { return this._minWidth; }
    getMinHeight()              { return this._minHeight; }
    getZIndex()                 { return this._zIndex;    }
    getFontSize()               { return this._fontSize;}
    getBackgroundImage()        { return this._backgroundImage; }
    getBackgroundRepeat()       { return this._backgroundRepeat; }
    getBackgroundPosition()     { return this._backgroundPosition; }
    getBackgroundSize()         { return this._backgroundSize; }
    getBorder()                 { return this._border; }
    getBorderTop()              { return this._borderTop; }
    getBorderBottom()           { return this._borderBottom; }
    getBottomPX()               { return this._bottom; }
    getFlexGrow()               { return this._flexGrow; }
    getFlexShrink()             { return this._flexShrink; }
    getFlexBasis()              { return this._flexBasis; }
    getFontFamily()             { return this._fontFamily; }
    getFontWeight()             { return this._fontWeight; }
    getFontStyle()              { return this._fontStyle; }
    getLineHeight()             { return this._lineHeight; }
    getLetterSpacing()          { return this._letterSpacing; }
    getTextAlign()              { return this._textAlign; }
    getTextDecoration()         { return this._textDecoration; }
    getTextTransform()          { return this._textTransform; }
    getMargin()                 { return this._margin; }
    getMarginTop()              { return this._marginTop; }
    getMarginRight()            { return this._marginRight; }
    getMarginLeft()             { return this._marginLeft; }
    getPaddingTop()             { return this._paddingTop; }
    getPaddingRight()           { return this._paddingRight; }
    getPaddingBottom()          { return this._paddingBottom; }
    getPaddingLeft()            { return this._paddingLeft; }
    getOpacity()                { return this._opacity; }
    getOutline()                { return this._outline; }
    getTransition()             { return this._transition; }
    getVisibility()             { return this._visibility; }
    getWhiteSpace()             { return this._whiteSpace; }
    getClassName()              { return this._className; }
    getBackground()             { return this._background;}
    getMask()                   { return this._mask;}
    getHeight(){
        try{
            const height = parseFloat(this._styleConfig.height.replace("px", "") || this._height);
            return height;
        }catch(e){
           console.warn(`the method getHeight for this componet is not able yet, component` [{component:this , error: e}]);
        }
    }
    getWidth(){
        try{
            const width = parseFloat(this._styleConfig.width.replace("px", "") || this._width);
            return width;
        }catch(e){
           console.warn(`the method getWidth for this componet is not able yet, component ${[{component:this , error: e}]}`);
        }
    }
    getTop(){
        const top = parseFloat(this._styleConfig.top.replace("px", ""));
        return top;
    }
    getBottom(){
        const bottom = parseFloat(this._styleConfig.bottom.replace("px", ""));
        return bottom;
    }


    setWidth(value)                { this._set("_width",           "width",            value);return this;}
    setHeight(value)               { this._set("_height",          "height",           value);return this;}
    setBackgroundColor(value)      { this._set("_backgroundColor", "backgroundColor",  value);return this;}
    setDisplay(value)              { this._set("_display",         "display",          value);return this;}
    setPosition(value)             { this._set("_position",        "position",         value);return this;}
    setBorderRadius(value)         { this._set("_borderRadius",    "borderRadius",     value);return this;}
    setJustifyContent(value)       { this._set("_justifyContent",  "justifyContent",   value);return this;}
    setAlignItems(value)           { this._set("_alignItems",      "alignItems",       value);return this;}
    setPadding(value)              { this._set("_padding",         "padding",          value);return this;}
    setBoxShadow(value)            { this._set("_boxShadow",       "boxShadow",        value);return this;}
    setFlexDirection(value)        { this._set("_flexDirection",   "flexDirection",    value);return this;}
    setColor(value)                { this._set("_color",           "color",            value);return this;}
    setOverflow(value)             { this._set("_overflow",        "overflow",         value);return this;}
    setTransform(value)            { this._set("_transform",       "transform",        value);return this;}
    setFlexWrap(value)             { this._set("_flexWrap",        "flexWrap",         value);return this;}
    setBorderRight(value)          { this._set("_borderRight",     "borderRight",      value);return this;}
    setBorderLeft(value)           { this._set("_borderLeft",      "borderLeft",       value);return this;}
    setCursor(value)               { this._set("_cursor",          "cursor",           value);return this;}
    setOverflowX(value)            { this._set("_overflowX",       "overflowX",        value);return this;}
    setOverflowY(value)            { this._set("_overflowY",       "overflowY",        value);return this;}
    setWordWrap(value)             { this._set("_wordWrap",        "wordWrap",         value);return this;}
    setMarginBottom(value)         { this._set("_marginBottom",    "marginBottom",     value);return this;}
    setBoxSizing(value)            { this._set("_boxSizing",       "boxSizing",        value);return this;}
    setBackground(value)           { this._set("_background",      "background",       value);return this;}
    setBackgroundImage(value)      { this._set("_backgroundImage", "backgroundImage",  value);return this;}
    setBackgroundRepeat(value)     { this._set("_backgroundRepeat","backgroundRepeat", value);return this;}
    setBackgroundSize(value)       { this._set("_backgroundSize",  "backgroundSize",   value);return this;}
    setBorder(value)               { this._set("_border",          "border",           value);return this;}
    setCursor(value)               { this._set("_cursor",          "cursor",           value);return this;}
    setMarginTop(value)            { this._set("_marginTop",       "marginTop",        value);return this;}
    setMaxHeight(value)            { this._set("_maxHeight",       "maxHeight",        value);return this;}
    setMaxWidth(value)             { this._set("_maxWidth",        "maxWidth",         value);return this;}
    setMinWidth(value)             { this._set("_minWidth",        "minWidth",         value);return this;}
    setMinHeight(value)            { this._set("_minHeight",       "minHeight",        value);return this;}
    setZIndex(value)               { this._set("_zIndex" ,         "zIndex",           value);return this;}
    setFontSize(value)             { this._set("_fontSize" ,       "fontSize",         value);return this;}
    setBorderTop(value)            { this._set("_borderTop",       "borderTop",        value);return this;}
    setBorderBottom(value)         { this._set("_borderBottom",    "borderBottom",     value);return this;}
    setFlexGrow(value)             { this._set("_flexGrow",        "flexGrow",         value);return this;}
    setFlexShrink(value)           { this._set("_flexShrink",      "flexShrink",       value);return this;}
    setFlexBasis(value)            { this._set("_flexBasis",       "flexBasis",        value);return this;}
    setFontFamily(value)           { this._set("_fontFamily",      "fontFamily",       value);return this;}
    setFontWeight(value)           { this._set("_fontWeight",      "fontWeight",       value);return this;}
    setFontStyle(value)            { this._set("_fontStyle",       "fontStyle",        value);return this;}
    setLineHeight(value)           { this._set("_lineHeight",      "lineHeight",       value);return this;}
    setLetterSpacing(value)        { this._set("_letterSpacing",   "letterSpacing",    value);return this;}
    setTextAlign(value)            { this._set("_textAlign",       "textAlign",        value);return this;}
    setTextDecoration(value)       { this._set("_textDecoration",  "textDecoration",   value);return this;}
    setTextTransform(value)        { this._set("_textTransform",   "textTransform",    value);return this;}
    setMargin(value)               { this._set("_margin",          "margin",           value);return this;}
    setMarginRight(value)          { this._set("_marginRight",     "marginRight",      value);return this;}
    setMarginLeft(value)           { this._set("_marginLeft",      "marginLeft",       value);return this;}
    setPaddingTop(value)           { this._set("_paddingTop",      "paddingTop",       value);return this;}
    setPaddingRight(value)         { this._set("_paddingRight",    "paddingRight",     value);return this;}
    setPaddingBottom(value)        { this._set("_paddingBottom",   "paddingBottom",    value);return this;}
    setPaddingLeft(value)          { this._set("_paddingLeft",     "paddingLeft",      value);return this;}
    setOpacity(value)              { this._set("_opacity",         "opacity",          value);return this;}
    setOutline(value)              { this._set("_outline",         "outline",          value);return this;}
    setTransition(value)           { this._set("_transition",      "transition",       value);return this;}
    setVisibility(value)           { this._set("_visibility",      "visibility",       value);return this;}
    setWhiteSpace(value)           { this._set("_whiteSpace",      "whiteSpace",       value);return this;}
    setLeft(value)                 { this._set("_left",            "left",             value);return this;}
    setRight(value)                { this._set("_right",           "right",            value);return this;}
    setTop(value)                  { this._set("_top",             "top",              value);return this;}
    setBottom(value)               { this._set("_bottom",          "bottom",           value);return this;}
    setGap(value)                  { this._set("_gap",             "gap",              value);return this;}
    setGridColumnStart(value)      { this._set("_gridColumnStart", "gridColumnStart",  value);return this;}
    setMask(value)                 { this._set("_mask" ,            "mask",            value);return this;}
    setClipPath(value)             { this._set("_clipPath",        "clipPath",         value);return this;}
    setBackgroundPosition(value)   { this._set("_backgroundPosition","backgroundPosition", value);return this;}
    setClassNameAdd(value)         { this._setProperty("_className" ,   "className" ,   value , true);return this;}
    setTextContent(value)          { this._setProperty("_textContent" , "textContent" , value);return this;}
    setInnerHTML(value)            { this._setProperty("_innerHTML",    "innerHTML" ,   value);return this;}

    setTextAlignmentLeft()         { this.setTextAlign("left");     this.setAlignItems("flexStart");    this.setJustifyContent("spaceBetween");return this;};   
    setTextAlignmentRight()        { this.setTextAlign("right");    this.setAlignItems("flexEnd");      this.setJustifyContent("spaceBetween");return this;};   
    setTextAlignmentCenter()       { this.setTextAlign("center");   this.setAlignItems("center");       this.setJustifyContent("spaceBetween");return this;};   
    setTextAlignmentJustify()      { this.setTextAlign("justify");  this.setJustifyContent("spaceBetween");return this;};   
    setTextAlignmentCenterCenter() { this.setTextAlign("center");   this.setAlignItems("center");       this.setJustifyContent("center");return this;};
    setTextAlignmentTopLeft()      { this.setTextAlign("left");     this.setAlignItems("flex-start");   this.setJustifyContent("flexStart");return this;}
    setTextAlignmentTopCenter()    { this.setTextAlign("center");   this.setAlignItems("center");       this.setJustifyContent("flexStart");return this;}
    setTextAlignmentTopRight()     { this.setTextAlign("right");    this.setAlignItems("flexEnd");     this.setJustifyContent("flexStart");return this;}
    setTextAlignmentCenterLeft()   { this.setTextAlign("left");     this.setAlignItems("flexStart");   this.setJustifyContent("center");return this;}
    setTextAlignmentCenterRight()  { this.setTextAlign("right");    this.setAlignItems("flexEnd");     this.setJustifyContent("center");return this;}
    setTextAlignmentBottomLeft()   { this.setTextAlign("left");     this.setAlignItems("flexStart");   this.setJustifyContent("flexEnd");return this;}
    setTextAlignmentBottomCenter() { this.setTextAlign("center");   this.setAlignItems("center");       this.setJustifyContent("flexEnd");return this;}
    setTextAlignmentBottomRight()  { this.setTextAlign("right");    this.setAlignItems("flexEnd");     this.setJustifyContent("flexEnd");return this;}
    setTextAlignmentSpaceBetweenLeft()      {this.setTextAlign("left");     this.setAlignItems("flexStart");   this.setJustifyContent("spaceBetween");return this;}
    setTextAlignmentSpaceBetweenCenter()    {this.setTextAlign("center");   this.setAlignItems("center");       this.setJustifyContent("spaceBetween");return this;}
    setTextAlignmentSpaceBetweenRight()     {this.setTextAlign("right");    this.setAlignItems("flexEnd");     this.setJustifyContent("spaceBetween");return this;}


    setWidth_PF(value)              {return  () => { this.setWidth(value)};}
    setHeight_PF(value)             {return  () => { this.setHeight(value)};}
    setHeight_PF(value)             { return () => { this.setHeight(value); }; }
    setBackgroundColor_PF(value)    { return () => { this.setBackgroundColor(value); }; }
    setDisplay_PF(value)            { return () => { this.setDisplay(value); }; }
    setPosition_PF(value)           { return () => { this.setPosition(value); }; }
    setBorderRadius_PF(value)       { return () => { this.setBorderRadius(value); }; }
    setJustifyContent_PF(value)     { return () => { this.setJustifyContent(value); }; }
    setAlignItems_PF(value)         { return () => { this.setAlignItems(value); }; }
    setPadding_PF(value)            { return () => { this.setPadding(value); }; }
    setBoxShadow_PF(value)          { return () => { this.setBoxShadow(value); }; }
    setFlexDirection_PF(value)      { return () => { this.setFlexDirection(value); }; }
    setColor_PF(value)              { return () => { this.setColor(value); }; }
    setOverflow_PF(value)           { return () => { this.setOverflow(value); }; }
    setTransform_PF(value)          { return () => { this.setTransform(value); }; }
    setFlexWrap_PF(value)           { return () => { this.setFlexWrap(value); }; }
    setBorderRight_PF(value)        { return () => { this.setBorderRight(value); }; }
    setBorderLeft_PF(value)         { return () => { this.setBorderLeft(value); }; }
    setCursor_PF(value)             { return () => { this.setCursor(value); }; }
    setOverflowX_PF(value)          { return () => { this.setOverflowX(value); }; }
    setOverflowY_PF(value)          { return () => { this.setOverflowY(value); }; }
    setWordWrap_PF(value)           { return () => { this.setWordWrap(value); }; }
    setMarginBottom_PF(value)       { return () => { this.setMarginBottom(value); }; }
    setBoxSizing_PF(value)          { return () => { this.setBoxSizing(value); }; }
    setBackgroundImage_PF(value)    { return () => { this.setBackgroundImage(value); }; }
    setBackgroundRepeat_PF(value)   { return () => { this.setBackgroundRepeat(value); }; }
    setBackgroundSize_PF(value)     { return () => { this.setBackgroundSize(value); }; }
    setBorder_PF(value)             { return () => { this.setBorder(value); }; }
    setMarginTop_PF(value)          { return () => { this.setMarginTop(value); }; }
    setMaxHeight_PF(value)          { return () => { this.setMaxHeight(value); }; }
    setMaxWidth_PF(value)           { return () => { this.setMaxWidth(value); }; }
    setMinWidth_PF(value)           { return () => { this.setMinWidth(value); }; }
    setMinHeight_PF(value)          { return () => { this.setMinHeight(value); }; }
    setZIndex_PF(value)             { return () => { this.setZIndex(value); }; }
    setFontSize_PF(value)           { return () => { this.setFontSize(value); }; }
    setBorderTop_PF(value)          { return () => { this.setBorderTop(value); }; }
    setBorderBottom_PF(value)       { return () => { this.setBorderBottom(value); }; }
    setFlexGrow_PF(value)           { return () => { this.setFlexGrow(value); }; }
    setFlexShrink_PF(value)         { return () => { this.setFlexShrink(value); }; }
    setFlexBasis_PF(value)          { return () => { this.setFlexBasis(value); }; }
    setFontFamily_PF(value)         { return () => { this.setFontFamily(value); }; }
    setFontWeight_PF(value)         { return () => { this.setFontWeight(value); }; }
    setFontStyle_PF(value)          { return () => { this.setFontStyle(value); }; }
    setLineHeight_PF(value)         { return () => { this.setLineHeight(value); }; }
    setLetterSpacing_PF(value)      { return () => { this.setLetterSpacing(value); }; }
    setTextAlign_PF(value)          { return () => { this.setTextAlign(value); }; }
    setTextDecoration_PF(value)     { return () => { this.setTextDecoration(value); }; }
    setTextTransform_PF(value)      { return () => { this.setTextTransform(value); }; }
    setMargin_PF(value)             { return () => { this.setMargin(value); }; }
    setMarginRight_PF(value)        { return () => { this.setMarginRight(value); }; }
    setMarginLeft_PF(value)         { return () => { this.setMarginLeft(value); }; }
    setPaddingTop_PF(value)         { return () => { this.setPaddingTop(value); }; }
    setPaddingRight_PF(value)       { return () => { this.setPaddingRight(value); }; }
    setPaddingBottom_PF(value)      { return () => { this.setPaddingBottom(value); }; }
    setPaddingLeft_PF(value)        { return () => { this.setPaddingLeft(value); }; }
    setOpacity_PF(value)            { return () => { this.setOpacity(value); }; }
    setOutline_PF(value)            { return () => { this.setOutline(value); }; }
    setTransition_PF(value)         { return () => { this.setTransition(value); }; }
    setVisibility_PF(value)         { return () => { this.setVisibility(value); }; }
    setWhiteSpace_PF(value)         { return () => { this.setWhiteSpace(value); }; }
    setLeft_PF(value)               { return () => { this.setLeft(value); }; }
    setRight_PF(value)              { return () => { this.setRight(value); }; }
    setTop_PF(value)                { return () => { this.setTop(value); }; }
    setBottom_PF(value)             { return () => { this.setBottom(value); }; }
    setBackgroundPosition_PF(value) { return () => { this.setBackgroundPosition(value); }; }

    setTextContent_PF(value)        { return () => { this.setTextContent(value); }; }
    setClassNameAdd_PF(value)       { return () => { this.setClassNameAdd(value); }; }

    setTextAlignmentLeft_PF()         { return () => { this.setTextAlignmentLeft(); }; }
    setTextAlignmentRight_PF()        { return () => { this.setTextAlignmentRight(); }; }
    setTextAlignmentCenter_PF()       { return () => { this.setTextAlignmentCenter(); }; }
    setTextAlignmentJustify_PF()      { return () => { this.setTextAlignmentJustify(); }; }
    setTextAlignmentCenterCenter_PF() { return () => { this.setTextAlignmentCenterCenter(); }; }

}
