import StandartComponent from "../../standartComponent/StandartComponent.js";
import getId from "../../componentIdentify/componentId/getId.js";

export default class Span extends StandartComponent{

    constructor(){
        super("span");

        this._classIdentify = "SPA";
        this._id = getId(this._classIdentify);

        this._className.push("Span");

        
        this._addStyleConfig({
            
            color    : "aliceblue",
            width    : "20px",
            height   : "20px",
        })

        this._addPropertyConfig({

            textContent: "00",
            id:          this._id,
        })
    }
}