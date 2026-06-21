import StandartBox from "../boxes/StandardBox.js";
import getId from "../../componentIdentify/componentId/getId.js";

export default class StandartCircle extends StandartBox{

    constructor(){
        super();

        this._className.push("StandartCircle");
        this._classIdentify = "SDC";
        this._id = getId(this._classIdentify);
                
        this._updateStyleConfig({
            borderRadius: "50%"
        })

        this._updatePropertyConfig({
            id: this.id,
            className: this.getElementClassNames()
        })
    }
}