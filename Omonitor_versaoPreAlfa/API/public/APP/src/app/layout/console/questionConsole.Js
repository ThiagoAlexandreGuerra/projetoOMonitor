import VirtualBody           from "../../../core/systemComponents/components/boxes/VirtualBody.js";
import BoxWithCilldBoxes    from "../../../core/systemComponents/components/boxes/BoxWithChildBoxes.js";
import StandartBox          from "../../../core/systemComponents/components/boxes/StandardBox.js";
import ClickEventButton     from "../../../core/systemComponents/components/buttons/clickEventButton.js";
import Title                from "../../../core/systemComponents/components/title/Title.js";
import GridLayout           from "../../../core/systemComponents/components/grid/GridLayout.js";
import Paragraph            from "../../../core/systemComponents/components/paragraph/Paragraph.js";
import Text                 from "../../../core/systemComponents/components/text/Text.js";
import GetPath              from "../../devTools/services/GetPath.js";
import loadStyleSheet       from "../../devTools/services/loadStyleSheet.js";
import Sidebar              from "../../../core/systemComponents/components/sideBar/SideBar.js";
import apiGet               from "../../devTools/api/apiGet.js";
import Main_ConsoleQuestion from "./handle/main/Main_ConsoleQuestion.js";
import handleFullscreen     from "../../devTools/behaviors/fullscreen.js";
import landingPage          from "../landingPage/landingPage.js";
import hoverForClasses      from "../landingPage/landingPageFunctions/hoverForClasses.js";
import ContentContainer     from "../../../core/systemComponents/components/boxes/ContentContainer.js";
import profile              from "../profile/profile.js";
import componentBoxSelectQuestion from "./components/componentBoxSelectQuestion.js";
import { updateVirtualDom, virtualDom }       from "../../../core/virtualDOM/main/virtualDom.js";


export default function questionConsole(navigation){

    let contentMain = new VirtualBody()
    ._addLayoutName("lQuestionConsole")
    .setScrollTop("0")
    .setBackgroundColor("black")
    const contentContainerSelectQuestion = new ContentContainer()
            .onLoading()
            ._addLayoutName("redGradient")
            .setBackgroundSize("100% 100%")
            .setLeft("725px")
            .setTop("150px")
            .setHeight("auto")
            .setMinHeight("400px")
            .setWidth("1100px")
            .setPadding("0px")
    let catalog;

    apiGet('catalogo')
        .then((response)=>{
            catalog = response;
            
            setTimeout(()=>{

                contentContainerSelectQuestion
                .offLoading()
                ._addNow(componentBoxSelectQuestion(catalog ,  onDisplayConsole))
                
            },2000)
        })
        .catch((error)=>{
            console.error(error)
        })
    let endpointQuestion = new Main_ConsoleQuestion();
   
    let title = new Title("Monitor")
        .setColor("white")
        .setLeft("125px")
        .setFontWeight("bold")
        .setFontFamily("'Segoe UI', Tahoma, Geneva, Verdana, sans-serif")

   
    const fullScreenButton = new ClickEventButton(handleFullscreen)
            .setBackgroundImage(GetPath.getfullscreen_24dp())
            .setBorder("2px solid #910000")
            .setBackgroundSize("50px 50px")
            .setBottom("20px")
            .setPosition("absolute")

    let navigationSidebar = new Sidebar()
        .setBackgroundColor("#0D0D0D")
    
    let bottonPrevius = new ClickEventButton(navigation.goTo(landingPage))
        .setBackgroundImage(GetPath.gethome_24dp())
        .setBackgroundSize("50px 50px")
        .setBorder("2px solid #910000")

    let bottonProfile = new ClickEventButton(navigation.goTo(profile))
        .setBackgroundImage(GetPath.getperson_24dp())
        .setBorder("2px solid #910000")
        .setPosition("absolute")
        .setTop("150px")

    function onDisplayConsole(apiResponse){

            contentContainerSelectQuestion.onLoading()
        setTimeout(()=>{
            contentContainerSelectQuestion.suspend()
            contentContainerSelectQuestion.offLoading()
            console.log("endpointQuestion**********************************")
            endpointQuestion.main(apiResponse)

            let currentQuestions = endpointQuestion.questionsToResolve();
            
            let nextQuestionButton = new ClickEventButton(()=>{

            })
            .setPosition("absolute")
            .setRight("50px")
            .setTop("350px")
            .setHeight("100px")
            .setWidth("50px")
            .setBackgroundImage(GetPath.getArrow_forward_ios_40dp_F0C800())
            .setBackgroundColor("inert")
            .setBorder("")

            let previousQuestionButton = new ClickEventButton(()=>{

            }) 
            .setPosition("absolute")
            .setLeft("160px")
            .setTop("350px")
            .setHeight("100px")
            .setWidth("50px")
            .setBackgroundPosition("10px")
            .setBackgroundImage(GetPath.getArrow_back_ios_40dp_F0C800())
            .setBackgroundColor("inert")
            .setBorder("")

            let displayDifficultyQuestion = new StandartBox()
                ._removeStandardPosition()
                .setWidth("40px")
                .setHeight("8px")
                .setRight("-430px")
                .setTop("3px")
                .setBackgroundColor("#00FF0D")
                .setBorder("")
                .setTransform("skewX(15deg)")
                
            let displayInfoQuestion = new StandartBox()
                ._addChild(displayDifficultyQuestion)
                ._removeScrollbarConfig()
                ._removeStandardPosition()
                .setWidth("950px")
                .setHeight("10px")
                .setBackgroundColor("#0c0c0c")
                .setLeft("250px")    
                .setTop("140px")
                .setBorderLeft("2px solid #910000")
                .setBorderTop("2px solid #910000")
                .setBorderRight("")

            let displayTextConsole = new BoxWithCilldBoxes(1)
                .setStyleInThisAndChildren("height", "auto")
                .setMinHeight("400px")
                .setPadding("10px")
                ._removeStandardPosition()
                .setBackgroundColor("#050505")
                .BWCResizeWidth("950px")
                .setLeft("250px")    
                .setTop("140px")
                .setBorderLeft("2px solid #910000")
                .setBorderRight("")
            
                displayTextConsole.getSon()
                .setTextContent(currentQuestions[0]._questionWording)
                .setBorder("")
                .setBackgroundColor("#070707")

            let displayConsoleQuestoes = new BoxWithCilldBoxes(2)
                ._removeStandardPosition()
                .setBackgroundColor("inert")
                .BWCResizeHeight("630px")
                .BWCResizeWidth("1100px")
                .setLeft("175px")
                .setMarginTop("175px")
                .setBorderLeft("")
                .setBorderRight("2px solid #FFD500")
                .setBorderBottom("2px solid #FFD500")
                .setGap("0px")

                let makeResponse =  new ClickEventButton(()=>{

                })
                .setTextContent("Responder")
                .setBackgroundColor("#303030")
                .setLeft("10px")
                .setPadding("8px")
                .setBorder("2px solid white")
                .setHeight("10px")
                .setBoxShadow(" 0px 4px 10px rgba(0, 0, 0, 0.15)")
                .setPosition("absolute")
                .setBottom("2px")

                const getSolving = new ClickEventButton(()=>{

                })
                .setTextContent("Gabarito")
                .setBackgroundColor("#303030")
                .setLeft("110px")
                .setPadding("8px")
                .setBorder("2px solid white")
                .setHeight("10px")
                .setBoxShadow(" 0px 4px 10px rgba(0, 0, 0, 0.15)")
                .setPosition("absolute")
                .setBottom("2px")

                displayConsoleQuestoes.getSon()
                ._addChild(makeResponse)
                ._addChild(getSolving)
                ._removeScrollbarConfig()
                .setWidth("95%")
                .setHeight("30px")
                .setBorder("")
                .setAlignItems("flexStart")
                .setFlexDirection("row")
   
                displayConsoleQuestoes.getGrandson()
                ._removeScrollbarConfig()
                .setWidth("95%")
                .setHeight("auto")
                .setPadding("5px")
                .setMarginTop("0px")
                .setBackgroundColor("#0A0A0A")
                .setBorder("")
                
                currentQuestions[0]._alternatives.forEach((alternatives)=>{
                
                    const displayAlternativesAndTextAlternatives =  new BoxWithCilldBoxes(2, "horizontal")
                        .setWidth("90%")
                        .BWCResizeHeight("auto")
                        ._removeStandardPosition()
                        .setStyleInThisAndChildren("border" , "")

                        displayAlternativesAndTextAlternatives.getSon()
                        ._addChild(
                            new ClickEventButton()
                                .setTextContent(alternatives.alternative)
                                .setMargin("0px")
                                .setHeight("30px")
                                .setMarginTop("8px")
                                .setBorder("2px solid #FFD500")
                        )
                        ._removeStandardPosition()
                        .setLeft("10px")
                        .setPosition("absolute")
                        .setPadding("0px")
                        .setWidth("auto")
                        
                        
                        displayAlternativesAndTextAlternatives.getGrandson()
                        .setTextContent(alternatives.text)
                        .setMinWidth("80%")
                        .setLeft("20px")
                        .setTextAlignmentLeft()
                        
                        displayConsoleQuestoes.getGrandson()
                            ._addChild(displayAlternativesAndTextAlternatives)
                })    

            contentMain
                ._addChild(previousQuestionButton)
                ._addChild(nextQuestionButton)
                ._addChild(displayInfoQuestion)
                ._addChild(displayTextConsole)
                ._addChild(displayConsoleQuestoes)
                .update()

        },5000)

    }

    navigationSidebar
    ._addChild(bottonPrevius)
    ._addChild(fullScreenButton)
    ._addChild(bottonProfile)

    contentMain
        ._addChild(contentContainerSelectQuestion)
        ._addChild(title)
        ._addChild(navigationSidebar)

    contentMain.release()

   
}