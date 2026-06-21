import ClickEventButton from "./clickEventButton.js";
import StandardBox from "../boxes/StandardBox.js";
import GetPath from "../../../../pages/devTools/services/GetPath.js";
import StandartCircle from "../circles/StandardCircle.js";

export default class NextToLoginButton extends StandardBox{

    constructor(...functions){
        super();

        this._removeScrollbarConfig();
        this._removeStandardPosition();

        this.nextToLoginButton = new ClickEventButton(functions)
            .setTextContent("Login")
            .setBackgroundColor("inert")
            .setWidth("170px")
            .setHeight("50px")
            .setBorder("2px solid #c00000")
            
            
        this.imageBox = new StandartCircle()
            ._removeScrollbarConfig()
            ._removeStandardPosition()
            .setWidth("40px")
            .setHeight("40px")
            .setRight("0px")
            .setPosition("relative")
            .setBackgroundImage(new GetPath().getperson_24dp())
            .setBackgroundSize("30px 30px")
            .setBorder("")

        this._addChild(this.nextToLoginButton);
        this._addChild(this.imageBox);

        this._updateStyleConfig({
            width: "220px",
            height:"40px",
            position:"absolute",
            right:"20px",
            top:"20px",
            flexDirection: "row",
            backgroundColor:"inert",
            border:"",
            gap:"15px"
        })
    }
}