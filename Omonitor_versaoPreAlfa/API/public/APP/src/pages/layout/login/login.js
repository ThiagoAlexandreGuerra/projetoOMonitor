import ContentAll           from "../../../core/systemComponents/components/boxes/ContentAll.js";
import BoxWithCilldBoxes    from "../../../core/systemComponents/components/boxes/BoxWithChildBoxes.js";
import StandartBox          from "../../../core/systemComponents/components/boxes/StandardBox.js";
import ClickEventButton     from "../../../core/systemComponents/components/buttons/clickEventButton.js";
import Title                from "../../../core/systemComponents/components/title/Title.js";
import GridLayout           from "../../../core/systemComponents/components/grid/GridLayout.js";
import { virtualDom }       from "../../../core/virtualDOM/main/virtualDom.js";
import Paragraph            from "../../../core/systemComponents/components/paragraph/Paragraph.js";
import Text                 from "../../../core/systemComponents/components/text/Text.js";
import GetPath              from "../../devTools/services/GetPath.js";
import loadStyleSheet       from "../../devTools/services/loadStyleSheet.js";
import Sidebar from "../../../core/systemComponents/components/sideBar/SideBar.js";

export default function login(navigation){

    let contentMain = new ContentAll()
        ._addLayoutName("lLogin")
        .setBackgroundColor("black")
    
    let title = new Title("Console")
        .setColor("white")
        .setLeft("100px")

    let navigationSidebar = new Sidebar()
    
        let bottonPrevius = new ClickEventButton(()=>{navigation._setPreviousLayoutClass("landingPage")})
            .setBackgroundImage(new GetPath().getchevronBackwar_24dp_b700ff())
    navigationSidebar
        ._addChild(bottonPrevius)
    contentMain
        ._addChild(title)
        ._addChild(navigationSidebar)

   virtualDom(contentMain.release())     


  

}