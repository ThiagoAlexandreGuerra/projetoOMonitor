import ContentAll from "../../../core/systemComponents/components/boxes/ContentAll.js";
import SideBar from "../../../core/systemComponents/components/sideBar/SideBar.js";
import BoxWithCilldBoxes from "../../../core/systemComponents/components/boxes/BoxWithChildBoxes.js";
import StandartBox from "../../../core/systemComponents/components/boxes/StandardBox.js";
import ClickEventButton from "../../../core/systemComponents/components/buttons/clickEventButton.js";
import Title from "../../../core/systemComponents/components/title/Title.js";
import LayoutCoordenator from "../../../core/layoutHandler/LayoutCoordinator/LayoutCoordinator.js";
import ExecutionBlock from "../../../core/layoutHandler/ExecutionBlock/ExecutionBlock.js";
import { virtualDom } from "../../../core/virtualDOM/main/virtualDom.js";
import GridLayout from "../../../core/systemComponents/components/grid/GridLayout.js";
import Animations from "../../devTools/animations/Animations.js";

import GetPath from "../../devTools/services/GetPath.js";
export default function lab(navigation){

    let contentMain = new ContentAll();
    let sideBar = new SideBar();
    
    let next = new ClickEventButton(()=>{navigation._setNextLayoutClass("showroom")})
        .setBackgroundImage(new GetPath().getchevronForward_24dp_b700ff());
        
    let past = new ClickEventButton(()=>{navigation._setNextLayoutClass("explanations")})
        .setBackgroundImage(new GetPath().getchevronBackwar_24dp_b700ff());
        
    let labTitle = new Title("LAB");
    let animation = new Animations();
    
    labTitle.setLeft("120px")

    sideBar
        ._addChild(next)
        ._addChild(past);



        contentMain
            ._addLayoutName("lLab")
            ._addChild(labTitle)
            ._addChild(sideBar);
    
    virtualDom(contentMain.release());
}