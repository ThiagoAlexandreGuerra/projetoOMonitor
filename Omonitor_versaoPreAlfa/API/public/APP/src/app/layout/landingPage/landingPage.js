import VirtualBody                 from "../../../core/systemComponents/components/boxes/VirtualBody.js";
import BoxWithCilldBoxes          from "../../../core/systemComponents/components/boxes/BoxWithChildBoxes.js";
import StandardBox                from "../../../core/systemComponents/components/boxes/StandardBox.js";
import ClickEventButton           from "../../../core/systemComponents/components/buttons/clickEventButton.js";
import Title                      from "../../../core/systemComponents/components/title/Title.js";
import GridLayout                 from "../../../core/systemComponents/components/grid/GridLayout.js";
import { virtualDom }             from "../../../core/virtualDOM/main/virtualDom.js";
import Text                       from "../../../core/systemComponents/components/text/Text.js";
import GetPath                    from "../../devTools/services/GetPath.js";
import hoverForClasses            from "./landingPageFunctions/hoverForClasses.js";
import createParagraphsFromData   from "../../devTools/services/createParagraphsFromData.js";
import NextToLoginButton          from "../../../core/systemComponents/components/buttons/NextToLoginButton.js";
import AppInstallButton           from "../../../core/PWA/src/installRoutine/AppInstallButton.js";

import { fillGridClasses, footerText, txtAboutUs } from "./landingPageObjects/landingPageObjects.js";
import Slide from "../../../core/systemComponents/components/slide/Slide.js";
import landingPageBanks from "./components/landingPageBanks.js";
import { LAYOUTS_LIST } from "../../../core/navigation/domElementNavigator/Navigation.js";
import contentExplanations from "./components/contentExplanations.js";
import Sidebar from "../../../core/systemComponents/components/sideBar/SideBar.js";
import questionConsole from "../console/questionConsole.Js";
import installApp from "../../../core/PWA/src/installRoutine/installApp.js";

export default function landingPage(navigation){

    let contentMain = new VirtualBody() 
        ._addLayoutName("lLandingPage")
        .setBackgroundColor("#000000")
        .setFontFamily("'Segoe UI', Tahoma, Geneva, Verdana, sans-serif")
        .setPaddingBottom("")
        .setBackgroundSize("100%  100%")
    
    let title = new Title("Monitor")
         .setColor("white")
        .setLeft("125px")
        .setFontWeight("bold")
        .setFontFamily("'Segoe UI', Tahoma, Geneva, Verdana, sans-serif")
    
    let contentAboutUS = new StandardBox()
        ._removeStandardPosition()
        .setWidth("90%")
        .setBackgroundColor("rgba(0,0,0,0.5)")
        .setDisplay("flex")
        .setFlexDirection("row")
        .setHeight("900px")
        .setMarginTop("210px")
        .setLeft("10%")

    let textAboutUs = new Text(createParagraphsFromData(txtAboutUs)) 
        .setWidth("800px")
        ._removeStandardPosition()
        .setLeft("40px")
        .setBackgroundColor("inert")   
        .setPosition("absolute")
        .setBorderRight("")

    let contentImageForAboutUs = new StandardBox()
        .setBackgroundImage( GetPath.getschool_24dp_FFFFFF())
        ._removeStandardPosition()
        .setBackgroundSize("50% 50%")
        .setBorder("")
        .setLeft("350px")
        .setBackgroundColor("#0c0c0c")
        .setWidth("600px")
        .setHeight("500px")
    

    let contentFooter = new StandardBox()
        ._removeStandardPosition()
        .setWidth("95%")
        .setHeight("300px")
        .setLeft("7.4%")
        .setBorderTop("2px solid #666666")
        .setBorder("")
        .setMarginBottom("0px")
        .setBottom("0px")
        .setBackgroundColor("#080808")
        .setPadding("0px")

        let contentRightsReserved = new StandardBox()
            .setTextContent("© 2025 O Monitor. Todos os direitos reservados.")
            .setTextAlignmentCenterCenter()
            .setColor("#fafafa")
            .setBottom("0px")
            ._removeStandardPosition()
            .setWidth("100%")
            .setHeight("50px")
            .setBorderTop("2px solid #666666")
            .setMarginBottom("0px")
            .setMarginTop("0px")
            .setBackgroundColor("#080808")

       
    let sidebar = new Sidebar()
    .setBackgroundColor("#0D0D0D")

    let goToConsoleQuestion = new ClickEventButton(
        navigation.goTo(questionConsole)
    )
    .setBackgroundImage(GetPath.getPlay_arrow_24dp_FFFFFF())
    .setBorder("2px solid #910000")
    
    sidebar
        ._addChild(goToConsoleQuestion)
        ._addChild(new AppInstallButton()
                    .setBorder("2px solid #910000")
        )
    contentFooter
    
        ._addChild(contentRightsReserved)

    contentAboutUS
        ._addChild(textAboutUs)
        ._addChild(contentImageForAboutUs)

    contentMain
    
        ._addChild(contentExplanations(navigation))
        ._addChild(new AppInstallButton())
        ._addChild(title)
        ._addChild(contentAboutUS)
        ._addChild(contentFooter)
        ._addChild(sidebar)

    contentMain.release();    

}