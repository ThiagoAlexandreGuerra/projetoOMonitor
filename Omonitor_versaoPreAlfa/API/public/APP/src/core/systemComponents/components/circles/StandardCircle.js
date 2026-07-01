import StandardBox from "../boxes/StandardBox.js";
import getId from "../../componentIdentify/componentId/getId.js";

export default class StandardCircle extends StandardBox{

    constructor(){
        super();

        this._classNName.push("StandartCircle");
        this._classIdentify = "SDC";
        this._id = getId(this._classIdentify);
                
        this._updateStyleConfig({
            borderRadius: "50%"
        })

        this._updatePropertyConfig({
            id: this._id,
            className: this.getElementClassNames()
        })

    }

    setCenterCircle(){
        this.setPosition("absolute")
        this.setLeft("50%")
        this.setTop("50%")
        this.setTransform("translate(-50%, -50%)")

        return this;
    }
}