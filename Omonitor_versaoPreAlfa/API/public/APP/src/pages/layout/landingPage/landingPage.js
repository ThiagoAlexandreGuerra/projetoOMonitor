import ContentAll                 from "../../../core/systemComponents/components/boxes/ContentAll.js";
import BoxWithCilldBoxes          from "../../../core/systemComponents/components/boxes/BoxWithChildBoxes.js";
import StandartBox                from "../../../core/systemComponents/components/boxes/StandardBox.js";
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

export default function landingPage(navigation){

    let contentMain = new ContentAll()
        ._addLayoutName("lLandingPage")
        .setBackgroundColor("#000000")
        .setFontFamily("'Segoe UI', Tahoma, Geneva, Verdana, sans-serif")
        .setPaddingBottom("")
    
    let title = new Title("O Monitor")
        .setColor("#fcfcfc")
        .setFontWeight("bold")
        .setLeft("20px")
        
    let contentExplanations = new StandartBox()
        ._removeScrollbarConfig()
        .setBorder("")
        .setClassNameAdd("hero")
        .setClassNameAdd("badge")
        .setTextContent("Prepare-se para o \n Banco do Brasil 2026")
        .setFontSize("80px")
        .setWidth("800px")
        .setFontWeight("bold")
        .setBackgroundColor("inert")
        .setBorderBottom("2px solid #ffffff")
        .setTop("90px")
        .setTextAlignmentCenter()
    
    let auxTextForContentExplanations = new StandartBox()
        ._removeScrollbarConfig()
        .setTextContent(`Mais de 1000 questões de provas anteriores, 
                    filtradas por disciplina, assunto e nível de dificuldade. 
                    Acompanhe seu desempenho e alcance sua aprovação.`)
        .setTextAlignmentCenter()
        .setFontSize("20px")
        .setColor("#666666")
        .setBackgroundColor("inert")
        .setDisplay("block")
        .setTop("110px")
        .setBorder("")
        .setWidth("500px")        
        .setDisplay("flex")
        
    let bottonStart = new ClickEventButton(contentMain.setBackgroundColor_PF("red"))
        .setTextContent("começar agora")
        .setTextAlignmentCenterCenter()
        .setBackgroundColor("#ffffff")
        .setColor("#000000")
        .setWidth("200px")
        .setHeight("50px")
        .setBorderRadius("2px")
        .setBorder("")
        .setMarginTop("30px")
    
    auxTextForContentExplanations
        ._addChild(bottonStart)
        
    let contentClasses = new StandartBox()
        .setWidth("100%")
        .setHeight("auto")
        .setMarginTop("250px")
        .setBackgroundColor("#080808")

    let textForContentClasses  = new BoxWithCilldBoxes(2)
        .setBackgroundColor("inert")
        .setLeft("250px")
        .setPadding("0px")
        .setHeight("auto")
        .setBorder("")

        textForContentClasses.getSon()
        .setBackgroundColor("inert")
        .setTextContent("Matérias Disponíveis")
        .setTextDecoration("underline")
        .setFontWeight("bold")
        .setFontSize("40px")
        .setWidth("auto")
        .setHeight("auto")
        .setBorder("")

        textForContentClasses.getGrandson()
        .setBackgroundColor("inert")
        .setTextContent("Conteúdo completo para sua preparação")
        .setColor("#797979")
        .setWidth("auto")
        .setHeight("auto")
        .setBorder("")

    let gridClasses = new GridLayout(8,5)
        .setWidth("1200px")
        .setLeft("10px")
        .setGap("30px")
        .setBackgroundColor("inert")

            let i = 0;
            gridClasses.gridElements.forEach((component)=>{
                component
                    .setBorder("2px solid #575757")
                    ._addBehaviorFunction(hoverForClasses)
                    .setBackgroundImage(fillGridClasses[i].iconPath)
                    .setBackgroundRepeat("no-repeat")
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
    
    let contentAboutUS = new StandartBox()
        ._removeScrollbarConfig()
        .setWidth("100%")
        .setBackgroundColor("inert")
        .setDisplay("flex")
        .setFlexDirection("row")
        .setHeight("900px")

    let textAboutUs = new Text(createParagraphsFromData(txtAboutUs)) 
        .setWidth("800px")
        ._removeStandardPosition()
        .setLeft("40px")
        .setBackgroundColor("inert")   
        .setPosition("absolute")
        .setBorderRight("")

    let contentImageForAboutUs = new StandartBox()
        .setBackgroundImage(new GetPath().getschool_24dp_FFFFFF())
        ._removeStandardPosition()
        .setBackgroundSize("50% 50%")
        .setBorder("")
        .setLeft("350px")
        .setBackgroundColor("#0f0f0f")
        .setWidth("600px")
        .setHeight("500px")

    let contentFooter = new StandartBox()
        ._removeScrollbarConfig()
        .setWidth("100%")
        .setHeight("300px")
        .setBorderTop("2px solid #666666")
        .setBorder("")
        .setMarginBottom("0px")
        .setBottom("0px")
        .setBackgroundColor("#080808")
        .setPadding("0px")

        let contentRightsReserved = new StandartBox()
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

        let contentFooterExplanations = new BoxWithCilldBoxes(3 , "horizontal")
            ._removeStandardPosition()
            .BWCSizeParentElementComparedToChildElement(0.7)
            .BWCResizeWidth("1300px")
            .BWCResizeHeight("200px")
            .setMarginBottom("0px")
            .setMarginTop("0px")
            .setTop("0px")
            .setBackgroundColor("#080808")
            .setBorder("")
            .setGap("400px")

            let k=0;
            contentFooterExplanations.BWCComponents.forEach((component)=>{
                component
                    .setBackgroundColor("inert")
                    .setBorder("")
                    ._removeScrollbarConfig()
                    ._addChild(new Text(createParagraphsFromData(footerText[k])))
                k++;    
            })
            
            contentFooterExplanations.setThisAndChildrenBackgroundColor("#080808")

    contentFooter
        ._addChild(contentFooterExplanations)
        ._addChild(contentRightsReserved)

    contentAboutUS
        ._addChild(textAboutUs)
        ._addChild(contentImageForAboutUs)

    contentClasses
        ._addChild(textForContentClasses)
        ._addChild(gridClasses)

    contentMain
        ._addChild(new NextToLoginButton(()=>{navigation._setNextLayoutClass("login")}))
        ._addChild(new AppInstallButton())
        ._addChild(title)
        ._addChild(contentExplanations)
        ._addChild(auxTextForContentExplanations)
        ._addChild(contentClasses)
        ._addChild(contentAboutUS)
        ._addChild(contentFooter)

    virtualDom(contentMain.release());    
}