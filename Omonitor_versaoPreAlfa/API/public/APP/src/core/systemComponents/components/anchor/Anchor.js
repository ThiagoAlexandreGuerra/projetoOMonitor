import StandardComponent from "../../standardComponent/standardComponent.js"
import getId from "../../componentIdentify/componentId/getId.js";

export default class Anchor extends StandardComponent{

    constructor(href , text , iconPath ){

        super("a");

        this._className.push("Anchor");
        this._classIdentify = "ACH";
        this._id = getId(this._classIdentify);

        this._href = href;
        
        this._updatePropertyConfig({
            id: this._id,
            className: this.getElementClassNames(),
            href: this._href,
            innerHTML: text
        });

        this._updateStyleConfig({
            textDecoration: "none" ,/* Remove o sublinhado */
            color: "inherit"
        })

    }

}