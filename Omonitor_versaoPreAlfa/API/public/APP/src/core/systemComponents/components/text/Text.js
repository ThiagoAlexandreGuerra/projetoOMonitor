import Paragraph from "../paragraph/Paragraph.js";
import StandardBox from "../boxes/StandardBox.js";
import getId from "../../componentIdentify/componentId/getId.js";

export default class Text extends StandardBox{

    constructor(...paragraphs){

        super(true);
        
        this._classNName.push("Text");
        this._classIdentify = "TXT";
        this._id = getId(this._classIdentify);

        this._updatePropertyConfig({
            id: this._id,
            className: this.getElementClassNames()
        });
        
        this._paragraphs = paragraphs;
        this._paragraphsArrey = [];
        this._removeScrollbarConfig();
        
        paragraphs.forEach(component => {
            if(Array.isArray(component)){
                component.forEach(comp => {
        
                    this._paragraphsArrey.push(comp);
                    this._addChild(comp);
                });
            }else{
                
                this._paragraphsArrey.push(component);
                this._addChild(component);
            }
            
        });

        this._updateStyleConfig({
            width: `${this._paragraphsArrey[0].getWidth()*1.005}px`,
            alignItems:"center",
            justifyContent:"center",
            display:"block",
            gap:"0px",
            padding:"0px",
            lineHeight: "normal",
            border:""
        })
        this._alignItems
        this._justifyContent 

        this.configParagraphsText()

    }

    configParagraphsText(){

        this._paragraphsArrey.forEach(component=>{
        
            component
                .setBackgroundColor("inert")
                ._setFontFamily(this._paragraphsArrey[0].getFontFamily())
                .BWCComponents.forEach((comp)=>{
                    comp.setBackgroundColor("inert")
                })
        })
    }
}