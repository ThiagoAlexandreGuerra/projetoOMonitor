import getId from "../componentIdentify/componentId/getId.js";

export const IndetifyLayer = base => class extends base{

     constructor(...args) {

        super(...args);
        this._classNName = [];
        this._id        = "";
        this._tag       = "";
        this._isChild   = null;
        this._parentId  = "";
    }
}