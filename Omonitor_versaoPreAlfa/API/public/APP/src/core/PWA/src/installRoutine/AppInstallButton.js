import ClickEventButton from "../../../systemComponents/components/buttons/ClickEventButton.js";
import installApp, {isAppInstalled , canInstallApp} from "./installApp.js";
import getId from "../../../systemComponents/componentIdentify/componentId/getId.js";

export default class AppInstallButton extends  ClickEventButton{

    constructor(){

        super();

        this._classIdentify = "APB";
        this._id = getId(this._classIdentify);
        
        this._classNName.push("AppInstallButton");

        this._swapPropertyConfig ({

                className:          this.getElementClassNames(),
                id:                 this._id,
                textContent:        "Install App",
        });

        this._swapStyleConfig({
            color:              "white",
            width:               "100px",
            height:             "50px",
            border:             "2px solid #ffc400",
            right:              "270px",
            top:                "35px",
            position:           "absolute",
            borderRadius:       "5px",  
            cursor:             "pointer"  
        })

        if(!(isAppInstalled() && canInstallApp())){
            this.setDisplay("none");
        }

        this._function.push(installApp);
        this.setTextAlignmentCenterCenter();
        
    }
}