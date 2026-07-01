import StandartComponent from "../../standardComponent/main/StandardComponent.js";
import getId from "../../componentIdentify/componentId/getId.js";

export default class Title extends StandartComponent{

    constructor(title = "Lotus"){

        super();

        this._classIdentify = "TTL";
        this._id            = getId(this._classIdentify);
        this._title         = title;
        this._classNName.push("Title");

        this._updateStyleConfig({

            width          : "auto",
            height         : "auto",
            color          : "black",
            left           : "80px",
            top            : "10px",
            position       : "absolute",
            whiteSpace     : "nowrap",
            display        : "block",
            fontSize       : "50px",
            backgroundColor: "transparent",
        })

        this._updatePropertyConfig({
            id          : this._id,
            className   : this.getElementClassNames(),
            textContent : this._title,
        })

    }
}