import StandartButton from "./StandardButton.js";
import getId from "../../componentIdentify/componentId/getId.js";

export default class ClickEventButton extends StandartButton {

    constructor(...functions) {

    super();

    this._classIdentify = "CKB";
    this._id = getId(this._classIdentify);

    functions = functions.flat(Infinity);

    this._function = this._function.concat(
        functions.map(fn => () => fn())
    );

    this._classNName.push("ClickEventButton");

    this._updatePropertyConfig({
        className: this.getElementClassNames(),
        id: this._id,
    });
}

}