import VirtualBody                from "../../../../core/systemComponents/components/boxes/VirtualBody.js";
import BoxWithCilldBoxes          from "../../../../core/systemComponents/components/boxes/BoxWithChildBoxes.js";
import StandartBox                from "../../../../core/systemComponents/components/boxes/StandardBox.js";
import ClickEventButton           from "../../../../core/systemComponents/components/buttons/ClickEventButton.js";
import Title                      from "../../../../core/systemComponents/components/title/Title.js";
import GridLayout                 from "../../../../core/systemComponents/components/grid/GridLayout.js";
import { virtualDom }             from "../../../../core/virtualDOM/main/virtualDom.js";
import Text                       from "../../../../core/systemComponents/components/text/Text.js";
import GetPath                    from "../../../devTools/services/GetPath.js";
import createParagraphsFromData   from "../../../devTools/services/createParagraphsFromData.js";
import NextToLoginButton          from "../../../../core/systemComponents/components/buttons/NextToLoginButton.js";
import AppInstallButton           from "../../../../core/PWA/src/installRoutine/AppInstallButton.js";
import Sidebar                    from "../../../../core/systemComponents/components/sidebar/Sidebar.js";
import ContentContainer           from "../../../../core/systemComponents/components/boxes/ContentContainer.js";
import ExternalFonts              from "../../../../core/systemComponents/utils/text/ExternalFonts.js";
import hoverForClasses            from "../../landingPage/landingPageFunctions/hoverForClasses.js";
import { fillGridClasses }        from "../../landingPage/landingPageObjects/landingPageObjects.js";
import handleFullscreen           from "../../../devTools/behaviors/fullscreen.js";
import { LAYOUTS_LIST } from "../../../../core/navigation/domElementNavigator/Navigation.js";
import { landingPageBanksInfoText } from "../../landingPage/landingPageObjects/landingPageObjects.js";
export default function landingPageBanks(navigation){

    const contentMain = new VirtualBody()
        ._addLayoutName("lLandingPageBanks")
        .setBackground("black")
    
    const contentContainer = new ContentContainer()
        ._addLayoutName("BLUE")
        ._removeStandardPosition()
        .setHeight("auto")
        .setMinHeight("800px")
        .setWidth("1100px")
        .setLeft("170px")
        .setJustifyContent("flexStart")
        .setMarginTop("150px")
        .setZIndex(2)
       

    const contentTop = new StandartBox()    
        ._removeStandardPosition()
        .setWidth("90%")
        .setHeight("90%")
        .setBackgroundColor("rgba(0,0,0,0.5)")
        .setBorder("")
        .setMarginTop("200px")

    const titleForContentTop = new Title("Banco do Brasil 2027")
        .setColor("yellow")
        .setFontSize("90px")
        .setMarginTop("60px")
        .setFontFamily(new ExternalFonts().JosefinSans())
        .setFontWeight("bold")

    const sideBar = new Sidebar()
        .setBackgroundColor("black")
        ._addChild(
            new ClickEventButton(
               ()=>{ navigation._setNextLayoutClass("landingPage")}
            )
            .setBorder("2px solid yellow")
            .setBackgroundImage(new GetPath().gethome_24dp())
        )
        ._addChild(
            new ClickEventButton(()=>{handleFullscreen()})
            .setBorder("2px solid yellow")
            .setBackgroundImage(new GetPath().getfullscreen_24dp())
            .setBottom("20px")
            .setPosition("absolute")
            .setBackgroundSize("50px 50px")
        )
    

        let contentClasses = new StandartBox()
            ._removeStandardPosition()
            .setWidth("100%")
            .setHeight("auto")
            .setBackgroundColor("inert")
            .setBorder("")
            .setMargin("0px")
            .setLeft("-100")
        const titleForcontentClasses =new  Title("Matérias Disponíveis")
        .setColor("white")
        .setPosition("relative")
        .setLeft("0%")
        .setTextDecoration("underline")
        .setFontFamily(new ExternalFonts().JosefinSans())
        

        let gridClasses = new GridLayout(8,4)
            .setWidth("1000px")
            .setLeft("10px")
            .setGap("30px")
            .setBackgroundColor("inert")
    
                let i = 0;
                gridClasses.gridElements.forEach((component)=>{
                    component
                        .setBorder("2px solid #02008f")
                        ._addBehaviorFunction(hoverForClasses)
                        .setBackgroundImage(fillGridClasses[i].iconPath)
                        .setBackgroundRepeat("no-repeat")
                        .setBackgroundColor("rgba(0,0,0,0.7)")
                        .setBackgroundSize("70px 70px")
                        .setBackgroundPosition("50% 20%")
                        .setTextAlignmentCenter()
                        .setFontWeight("bold")
                        .setFontSize("20px")
                        .setTextAlignmentBottomCenter()
                        .setDisplay("flex")
                        .setPadding("0px")
                        ._addEventListener("click" , ()=>(navigation._setNextLayoutClass("console")))
                    
                    let textbox= new BoxWithCilldBoxes(2)
                        .setTop("25px")
                        .setBorder("")
                        .setBackgroundColor("inert")
                        .setWidth("auto")
                        .setHeight("auto")
                        .setPadding("0px")
                        .setGap("0px");
    
                        textbox.getSon()    
                            .setBorder("")
                            .setBackgroundColor("inert")
                            .setTextContent(fillGridClasses[i].text)
                            .setWidth("auto")
                            .setHeight("auto");
    
                        textbox.getGrandson()  
                            .setBorder("")
                            .setBackgroundColor("inert")  
                            .setWidth("auto")
                            .setHeight("auto")
                            .setDisplay("none");
    
                    component
                        ._addChild(textbox)    
                        i++;
    })    

    const showEditalBotton = new ClickEventButton(
        ()=>{buildInfoContent()}
    )
    .setTextContent("INFO")
    .setBackgroundColor("white")
    .setColor("blue")
    .setLeft("40px")
    .setBorder("")
    .setWidth("200px")
    .setHeight("50px")
    .setFontFamily(new ExternalFonts().JosefinSans())
    

    function buildInfoContent(){
        let editalBox = new StandartBox()
        ._removeStandardPosition()
        .setWidth("90%")
        .setBackgroundColor("rgba(0,0,0,0.5)")
        .setTextContent(
            landingPageBanksInfoText["text"]
        )

        contentContainer._addChild(editalBox);
        contentContainer.update();
    }
    contentClasses
    ._addChild(titleForcontentClasses)
    ._addChild(gridClasses)

    contentTop
    ._addChild(contentClasses)

    contentContainer
    ._addChild(contentTop)    
    ._addChild(titleForContentTop)
    ._addChild(showEditalBotton)

    contentMain
    ._addChild(sideBar)
    ._addChild(contentContainer)
    ._addChild(
        new Title("Monitor")
         .setColor("white")
        .setLeft("125px")
        .setFontWeight("bold")
        .setFontFamily("'Segoe UI', Tahoma, Geneva, Verdana, sans-serif")
    )
    contentMain.release()    

}
