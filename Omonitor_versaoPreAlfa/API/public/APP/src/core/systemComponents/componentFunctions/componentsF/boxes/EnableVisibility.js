import elementOff from "../../../../utils/behavior/elementOff.js";
import elementOn  from "../../../../utils/behavior/elementOn.js";
import tooggleVisibility from "../../../../utils/behavior/toggleVisibility.js"

export default class EnableVisibility{

    constructor(element){
        this._element = element;
        this._addProperty();
    }

    _addProperty(){
        this._elementOn();
        this._elementOff();
        this._tooggleVisibility();
    }

    _elementOn(){
        elementOn(this._element);
    }

    _elementOff(){
        elementOff(this._element);
    }

    _tooggleVisibility(){
        tooggleVisibility(this._element);
    }
}
