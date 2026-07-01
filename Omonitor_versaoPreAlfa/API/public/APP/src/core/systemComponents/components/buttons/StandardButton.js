import StandartComponent from "../../standardComponent/main/StandardComponent.js";
import getId from "../../componentIdentify/componentId/getId.js";
import hover from "../../componentFunctions/componentsF/button/hover.js";

export default class StandartButton extends StandartComponent{

    constructor(){

        super();

        this._classIdentify = "SDT"
        this._id = getId(this._classIdentify);
        this._classNName.push("StandartButton");

        this._behaviorFunction.push(function(){hover.call(this)});
        this._hoverColor            = "#be000085";

        this._updateStyleConfig({
            
            width                 : "67px",
            height                : "67px",
            backgroundColor       : "#000000",
            backgroundRepeat      : "no-repeat",
            backgroundSize        : "60px 60px",
            backgroundPosition    : "center",
            borderRadius          : "8px",
            margin                : "5px",
            cursor                : "pointer",
            border                : "2px solid #b700ff",
            display               : "flex",
            justifyContent        : "center",
            alignItems            : "center"

        
        });

        this._updatePropertyConfig ( {

                className:          this.getElementClassNames(),
                id:                 this._id,
        });

    }

}