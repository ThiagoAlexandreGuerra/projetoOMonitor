import VirtualBody                from "../../../core/systemComponents/components/boxes/VirtualBody.js";
import BoxWithCilldBoxes          from "../../../core/systemComponents/components/boxes/BoxWithChildBoxes.js";
import StandartBox                from "../../../core/systemComponents/components/boxes/StandardBox.js";
import ClickEventButton           from "../../../core/systemComponents/components/buttons/clickEventButton.js";
import Title                      from "../../../core/systemComponents/components/title/Title.js";
import GridLayout                 from "../../../core/systemComponents/components/grid/GridLayout.js";
import { virtualDom }             from "../../../core/virtualDOM/main/virtualDom.js";
import Text                       from "../../../core/systemComponents/components/text/Text.js";
import GetPath                    from "../../devTools/services/GetPath.js";
import createParagraphsFromData   from "../../devTools/services/createParagraphsFromData.js";
import NextToLoginButton          from "../../../core/systemComponents/components/buttons/NextToLoginButton.js";
import AppInstallButton           from "../../../core/PWA/src/installRoutine/AppInstallButton.js";
import Sidebar                    from "../../../core/systemComponents/components/sideBar/SideBar.js";
import ContentContainer           from "../../../core/systemComponents/components/boxes/ContentContainer.js";
import ExternalFonts              from "../../../core/systemComponents/utils/text/externalFonts.js";
import hoverForClasses            from "../landingPage/landingPageFunctions/hoverForClasses.js";
import { fillGridClasses }        from "../landingPage/landingPageObjects/landingPageObjects.js";
import handleFullscreen           from "../../devTools/behaviors/fullscreen.js";
import { LAYOUTS_LIST } from "../../../core/navigation/domElementNavigator/Navigation.js";
import { landingPageBanksInfoText } from "../landingPage/landingPageObjects/landingPageObjects.js";
import landingPage from "../landingPage/landingPage.js";
import StandardCircle from "../../../core/systemComponents/components/circles/StandardCircle.js";
import Canvas from "../../../core/systemComponents/components/canvas/Canvas.js";

export default function profile(navigation){

    const contentMain = new VirtualBody()
    .setBackgroundColor("black")

    const sideBar = new Sidebar()
    
    const homeBotton = new ClickEventButton(navigation.goTo(landingPage))
    .setBackgroundImage(GetPath.gethome_24dp())
    .setBorder("2px solid #910000")

    const contentContainerProfileDisplay = new ContentContainer()
    ._removeStandardPosition()
    .setWidth("1000px")
    .setHeight("400px")
    .setLeft("200px")
    .setTop("50px")
    ._addLayoutName("RED")
    
    const dislplayImageUserProfile = new StandardCircle()
    ._removeStandardPosition()
    .setMargin("0px")
    .setBackgroundColor("black")
    .setPosition("absolute")
    .setWidth("250px")
    .setHeight("250px")
    .setTop("5px")
    .setLeft("20px")
    .setBackgroundPosition("20px 20px")
    .setBackgroundImage(GetPath.getRostoFotoDePerfil())

    let nameUser = "Thiago Alexandre Guerra"
    const displayNameUser = new StandartBox()
    ._removeStandardPosition()
    .setBackgroundColor("inert")
    .setBorder("")
    .setWidth("auto")
    .setHeight("auto")
    .setFontSize("40px")
    .setTop("40px")
    .setLeft("300px")
    .setPosition("absolute")
    .setMargin("0px")
    .setTextContent(nameUser)
    .setFontFamily(new ExternalFonts().SmoochSans())
    .setTextAlignmentCenterLeft()
    

    const displayStarUser = new StandartBox()
    ._removeStandardPosition()
    .setWidth("auto")
    .setHeight("30px")
    .setBorder("")
    .setTop("5px")
    .setLeft("290px")
    .setPosition("absolute")
    .setMargin("0px")
    .setAlignItems("flexStart")
    .setJustifyContent("flexStart")
    .setFlexDirection("row")
    .setGap("10px")
    .setBackgroundColor("inert")

    const userLevel = 90;
    let i =0;

    userLevel<=20?i=1:userLevel<=40?i=2:userLevel<=60?i=3:userLevel<=80?i=4:i=5;

    for(let k = 0; k<i ; k++){
        displayStarUser
        ._addChild(
            new StandartBox()
            ._removeStandardPosition()
            .setWidth("20px")
            .setHeight("20px")
            .setBackgroundSize("30px 30px")
            .setMargin("")
            .setBorder("")
            .setBackgroundColor("inert")
            .setBackgroundImage(GetPath.getStar_rate_24dp_FFFFFF())
        )
    }

    const displayUserStatistics = new StandartBox()
    ._removeStandardPosition()
    .setWidth("650px")
    .setHeight("250px")
    .setBorder("")
    .setPosition("absolute")
    .setRight("20px")
    .setTop("130px")
    .setMargin("")
    .setBackgroundColor("rgba(0,0,0,0.4)")
    
    const graphs = new Canvas()
    
    const displayGrid = new GridLayout(30,4)
    .setWidth("900px")

     const fullScreenButton = new ClickEventButton(handleFullscreen)
                .setBackgroundImage(GetPath.getfullscreen_24dp())
                .setBorder("2px solid #910000")
                .setBackgroundSize("50px 50px")
                .setBottom("20px")
                .setPosition("absolute")

    sideBar
    ._addChild(homeBotton)
    ._addChild(fullScreenButton)

    displayUserStatistics
    ._addChild(graphs)

    contentContainerProfileDisplay
    ._addChild(dislplayImageUserProfile)
    ._addChild(displayNameUser)
    ._addChild(displayStarUser)
    ._addChild(displayUserStatistics)

    contentMain
    ._addChild(sideBar)
    ._addChild(contentContainerProfileDisplay)

    

    contentMain.release();
}