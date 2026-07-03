import StandardComponent from "../../standardComponent/main/StandardComponent.js";
import getId from "../../componentIdentify/componentId/getId.js";
export default class PACKAGE extends StandardComponent{

    constructor(){
        super();

        this._classNName.push("PACKAGE");
        this._classIdentify = "PKG";
        this._id            = getId(this._classIdentify);
        
        this._updatePropertyConfig({

            className:          this.getElementClassNames(),
            id:                 this._id,
        })

         this._swapStyleConfig({
            width: "100%",
            height:"100%",
            position:"absulute",
            backgroundColor:"inert",
            padding:"0px",
            margin:"0px",

         })
    }
}