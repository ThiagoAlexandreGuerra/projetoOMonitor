import getId from "../../componentIdentify/componentId/getId.js";
import StandardComponent from "../../standardComponent/main/StandardComponent.js";
import Title from "../title/Title.js";
import TextEditFunction from "../../utils/text/TextEditingFunction.js";
import BoxWithChildBoxes from "../boxes/BoxWithChildBoxes.js";

export default class Paragraph extends BoxWithChildBoxes {

    constructor({
        title = "",
        subtitle = "",
        text = "",
        comment = ""
    } = {}) {

        super(3);

        this._classNName.push("Paragraph");
        this._classIdentify = "PGH";
        this._id = getId(this._classIdentify);

        this._updatePropertyConfig({
            id: this._id,
            className: this.getElementClassNames()
        });

        this._updateStyleConfig({
            margin:"0px",
            display:"flex",
            height:"auto",
            gap: "0px",
            padding:"0px",
            width:"900px",
            border:"",
            boxShadow:"",
            top:"0px",
            position:"relative",
            alignItems:"flexStart"
        })

        if(title)    this._title = new Title( title );    
        if(subtitle) this._subtitle = new Title( subtitle );    

        this._text = text;

        this._originalText = text;
        this._originalTitle = title;
        this._originalSubtitle = subtitle;
        this._originalComment = comment;

        this._isFontFamilyChanged = false;
    
        this._comment = comment.length?comment:undefined;
        this._isFunctionStyle=true;
        this.BWCSizeParentElementComparedToChildElement(1)
        
        this.main();
    }

    main(){

        !this._title    ||  this.confgTitleStyle(this._title,true);
        !this._subtitle ||  this.confgTitleStyle(this._subtitle,false);

        this._comment?                      this.confgBoxes(this.getGreatGrandson())    : this._removeGreatGrandson();
        !this._comment  ||  this.getGreatGrandson().setTextContent(this._comment);

        this._text?                         this.confgBoxes(this.getGrandson())         : this._removeGrandson();
        this.handleText();
        
        (this._title || this._subtitle)?    this.confgBoxes(this.getSon())              : this._removeSon();

        !this._title    ||  this.getSon()._children.push(this._title);
        !this._subtitle ||  this.getSon()._children.push(this._subtitle);

    };

    handleText(){

        this.formatText();
        !this._text     ||  this.getGrandson().setInnerHTML(this._text);
    
    }
    

    confgTitleStyle(component , isTitles){
        component
            .setBackgroundColor(this._propertyConfig.backgroundColor)
            .setWidth(this._propertyConfig.width)
            .setHeight("auto")
            .setTop("0px")
            .setLeft(isTitles?"5px":"35px")
            .setMarginTop(isTitles?"5px":"55px")
            .setColor("#dfdfdf")
            .setFontSize(isTitles?"35px":"25px")
            .setPosition("relative")
            .setDisplay("flex")

    }

    confgBoxes(component){
        component
        .setBackgroundColor(this._propertyConfig.backgroundColor)
        .setWidth(`${this.getWidth()*0.9}px`)
        .setHeight("auto")
        .setBorder("")
        .setFontSize("15px")
        .setBoxShadow("")
        .setTextAlignmentLeft()
        ._removeScrollbarConfig()
        .setBackgroundColor("transparent")
        .setDisplay("block")
        .setPadding("0px")
        .setLeft("0px")
    }

    formatText(){

        if(this._isFunctionStyle) this._text = new TextEditFunction()._applySyntaxHighlighting(!this._isFontFamilyChanged?this._text:this._originalText, this.getFontFamily()); 

    }

    getTitle() {
        return this._title;
    }

    getSubtitle() {
        return this._subtitle;
    }

    getText() {
        return this._text;
    }

    setText(value) {
        this._text = TextEditFunction(value);
        this._isFontFamilyChanged = false;
        this.handleText();
    }

    getComment() {
        return this._comment;
    }

    _setFontFamily(fontFamily){

        this._title?.setFontFamily(fontFamily);
        this._subtitle?.setFontFamily(fontFamily);
        this.getGrandson()?.setFontFamily(fontFamily);
        this.getGreatGrandson()?.setFontFamily(fontFamily);
        this.setFontFamily(fontFamily);

        this._isFontFamilyChanged = true;
        this.handleText();

        return this;
    }

    // ---------- TITLE ----------
    boldTitle()                     { this._title?.setFontWeight("bold"); return this; }
    italicTitle()                   { this._title?.setFontStyle("italic"); return this; }
    underlineTitle()                { this._title?.setTextDecoration("underline"); return this; }
    overlineTitle()                 { this._title?.setTextDecoration("overline"); return this; }
    lineThroughTitle()              { this._title?.setTextDecoration("line-through"); return this; }
    removeTitleTextDecoration()     { this._title?.setTextDecoration("none"); return this; }


    // ---------- SUBTITLE ----------
    boldSubtitle()                  { this._subtitle?.setFontWeight("bold"); return this; }
    italicSubtitle()                { this._subtitle?.setFontStyle("italic"); return this; }
    underlineSubtitle()             { this._subtitle?.setTextDecoration("underline"); return this; }
    overlineSubtitle()              { this._subtitle?.setTextDecoration("overline"); return this; }
    lineThroughSubtitle()           { this._subtitle?.setTextDecoration("line-through"); return this; }
    removeSubtitleTextDecoration()  { this._subtitle?.setTextDecoration("none"); return this; }


    // ---------- TEXT ----------
    boldText()                      { this.getGrandson()?.setFontWeight("bold"); return this; }
    italicText()                    { this.getGrandson()?.setFontStyle("italic"); return this; }
    underlineText()                 { this.getGrandson()?.setTextDecoration("underline"); return this; }
    overlineText()                  { this.getGrandson()?.setTextDecoration("overline"); return this; }
    lineThroughText()               { this.getGrandson()?.setTextDecoration("line-through"); return this; }
    removeTextDecorationText()      { this.getGrandson()?.setTextDecoration("none"); return this; }


    // ---------- COMMENT ----------
    boldComment()                   { this.getGreatGrandson()?.setFontWeight("bold"); return this; }
    italicComment()                 { this.getGreatGrandson()?.setFontStyle("italic"); return this; }
    underlineComment()              { this.getGreatGrandson()?.setTextDecoration("underline"); return this; }
    overlineComment()               { this.getGreatGrandson()?.setTextDecoration("overline"); return this; }
    lineThroughComment()            { this.getGreatGrandson()?.setTextDecoration("line-through"); return this; }
    removeCommentTextDecoration()   { this.getGreatGrandson()?.setTextDecoration("none"); return this; }

    font_arial()         {   return this._setFontFamily("Arial, sans-serif");}
    font_helvetica()     {   return this._setFontFamily("Helvetica, Arial, sans-serif");}
    font_timesNewRoman() {   return this._setFontFamily("'Times New Roman', Times, serif");}
    font_georgia()       {   return this._setFontFamily("Georgia, serif");}
    font_verdana()       {   return this._setFontFamily("Verdana, Geneva, sans-serif");}
    font_tahoma()        {   return this._setFontFamily("Tahoma, Geneva, sans-serif");}
    font_trebuchetMS()   {   return this._setFontFamily("'Trebuchet MS', Helvetica, sans-serif");}
    font_courierNew()    {   return this._setFontFamily("'Courier New', Courier, monospace");}
    font_lucidaSans()    {   return this._setFontFamily("'Lucida Sans Unicode', 'Lucida Grande', sans-serif");}
    font_garamond()      {   return this._setFontFamily("Garamond, serif");}
    font_palatino()      {   return this._setFontFamily("'Palatino Linotype', 'Book Antiqua', Palatino, serif");}
    font_bookman()       {   return this._setFontFamily("'Bookman Old Style', serif");}
    font_impact()        {   return this._setFontFamily("Impact, Charcoal, sans-serif");}
    font_comicSansMS()   {   return this._setFontFamily("'Comic Sans MS', cursive, sans-serif");}
    font_monospace()     {   return this._setFontFamily("monospace");}
    font_serif()         {   return this._setFontFamily("serif");}
    font_sansSerif()     {   return this._setFontFamily("sans-serif");}
    font_cursive()       {   return this._setFontFamily("cursive");}
    font_fantasy()       {   return this._setFontFamily("fantasy");}
    font_roboto()        {   return this._setFontFamily("'Roboto', sans-serif");}
    font_openSans()      {   return this._setFontFamily("'Open Sans', sans-serif");}
    font_montserrat()    {   return this._setFontFamily("'Montserrat', sans-serif");}
    font_poppins()       {   return this._setFontFamily("'Poppins', sans-serif");}
    font_lato()          {   return this._setFontFamily("'Lato', sans-serif");}
    font_inter()         {   return this._setFontFamily("'Inter', sans-serif");}
}