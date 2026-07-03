import StandardBox from "../boxes/StandardBox.js";
import Text from "./Text.js";
import AnchorLinkHorizontal from "../anchorlinks/AnchorLinkHorizontal.js";
import getId from "../../componentIdentify/componentId/getId.js";

export default class TextWithAnchors extends StandardBox{

    constructor(anchorType = "AnchorLinkHorizontal" , ...paragraphs){

        super();
        
        this._classNName.push("TWA");
        this._classIdentify = "TextWithAnchors";
        this._id = getId(this._classIdentify);

        this._updatePropertyConfig({
            id: this._id,
            className: this.getElementClassNames()
        });

        this._anchorReferences = [];

        paragraphs.forEach((component)=>{

            let text = component._originalTitle || component._originalSubtitle || component._originalText || component._originalComment;
            this._anchorReferences.push({text:this._normalizeText(text),id: `#${component._id}` });

        })

        this.anchorLinkHorizontal = new AnchorLinkHorizontal(this._anchorReferences);
        this._addChild(this.anchorLinkHorizontal);
        this._removeScrollbarConfig();
        this._text = new Text(paragraphs);
        this._addChild(this._text);

        this._updateStyleConfig({
            width: `${this._text.getWidth()*1.01}px`,
        })
        
        this.saveIdAndText=[{id:"" , text: ""}];

        paragraphs.forEach(element => {
            
        });

    }

    _normalizeText(text) {

        if (typeof text !== "string") {
            throw new TypeError("The parameter must be a string.");
        }

        return text
            .normalize("NFD")                    // separa acentos
            .replace(/[\u0300-\u036f]/g, "")     // remove acentos
            .replace(/[^\w\s]/g, "")             // remove caracteres especiais
            .replace(/\s+/g, " ")                // substitui múltiplos espaços por um
            .trim()                              // remove espaços no início e fim
            .slice(0, 40);                       // retorna os primeiros 40 caracteres
}
}