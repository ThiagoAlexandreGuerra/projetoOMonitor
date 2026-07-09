import handleFullscreen     from "../../app/devTools/behaviors/fullscreen.js";
import slideHorizontalV     from "../../app/devTools/animations/slideHorizontalV.js";
import toggleVisibility     from "../../app/devTools/behaviors/toggleVisibility.js";
import cleanDOM             from "../utils/tools/cleanDOM.js";
import cleanDOMElements     from "../utils/tools/CleanDOMElements.js";


export default class HomeModel {

    _slideHorizontalV(){
        return slideHorizontalV;
    }

    _toggleVisibility(){
        return toggleVisibility;
    }

    _handleFullscreen(){
        return handleFullscreen;
    }

    _cleanDOM(){
        return cleanDOM;
    }

    _cleanDOMElements(){
        return cleanDOMElements;
    }
}