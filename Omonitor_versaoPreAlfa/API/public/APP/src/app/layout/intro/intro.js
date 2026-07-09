import {virtualDom} from "../../../core/virtualDOM/main/virtualDom.js";
import SideBar from "../../../core/systemComponents/components/sideBar/SideBar.js";
import clickEventButton from "../../../core/systemComponents/components/buttons/clickEventButton.js";
import StandartBox from "../../../core/systemComponents/components/boxes/StandardBox.js";
import VirtualBody from "../../../core/systemComponents/components/boxes/VirtualBody.js";
import GetPath from "../../devTools/services/GetPath.js";
import { isIntroInitialized, setIntroInitialized , resetIntroInitialized } from "./introFunctions/introStatus.js";
import { isAppInstalled } from "../../../core/PWA/src/installRoutine/installApp.js";
export default function intro(navigation){

    if(!isIntroInitialized() &&!isAppInstalled()){
        

        
        let contentMain = new VirtualBody();
        contentMain
            ._addLayoutName("intro")
            .setBackgroundImage(GetPath.getMonitorLogo())
            .setPaddingBottom("")
            .setBackgroundColor("#000000");
        
        virtualDom(contentMain.release());
        
        setTimeout(()=>{
            navigation._setNextLayoutClass("landingPage");
            setIntroInitialized();
        }, 10000)
        
    }else{
         navigation._setNextLayoutClass("landingPage");
    }
}

