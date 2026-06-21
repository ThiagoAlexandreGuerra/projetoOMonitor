import StandardButton from "./StandardButton.js";
import getId from "../../componentIdentify/componentId/getId.js";
import Anchor from "../anchor/Anchor.js";

export default class AnchorButton extends StandardButton{

    constructor(link="" , text , iconPath ){

        super();
        
        this._classIdentify = "ACB";
        this._id = getId(this._classIdentify);
        
        this._className.push("AnchorButton");
        
        this._propertyConfig = {

                className:          this.getElementClassNames(),
                id:                 this._id,
        }

        this._children.push(new Anchor(link , text , iconPath));
    }
}