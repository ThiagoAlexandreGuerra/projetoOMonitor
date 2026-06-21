import ContentAll           from "../../../core/systemComponents/components/boxes/ContentAll.js";
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
import { updateVirtualDom, virtualDom }       from "../../../core/virtualDOM/main/virtualDom.js";
import hoverForClasses from "../landingPage/landingPageFunctions/hoverForClasses.js";

export default function questionConsole(navigation){

    let endpointQuestion = new Main_ConsoleQuestion();
    let contentMain = new ContentAll()
        ._addLayoutName("lConsole")
        .setBackgroundColor("black")
        .setScrollTop("0")
    
    let title = new Title("Monitor")
        .setColor("white")
        .setLeft("150px")

    let getQuestionFromApiBotton = new ClickEventButton(() => {
        apiGet('questoes')
            .then((response) => {

                console.log(response);

                response.data.forEach((questao) => {
                    console.log(questao);
                    endpointQuestion.addApiResponse(response);
                });

                onDisplayConsole();
        
            })
            .catch((error) => {
                console.error(error);
            });
        },
        
    )
    .setBackgroundColor("blue");
    
   
    
    let navigationSidebar = new Sidebar()
        .setBackgroundColor("#0D0D0D")
    
    let bottonPrevius = new ClickEventButton(()=>{navigation._setPreviousLayoutClass("landingPage")})
        .setBackgroundImage(new GetPath().gethome_24dp())
        .setBackgroundSize("50px 50px")
        .setBorder("2px solid #910000")

    function onDisplayConsole(){

        
            let currentQuestions = endpointQuestion.questionsToResolve();
            
            let nextQuestionButton = new ClickEventButton(()=>{

            })
            .setPosition("absolute")
            .setRight("50px")
            .setTop("350px")
            .setHeight("100px")
            .setWidth("50px")
            .setBackgroundImage(new GetPath().getArrow_forward_ios_40dp_F0C800())
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
            .setBackgroundImage(new GetPath().getArrow_back_ios_40dp_F0C800())
            .setBackgroundColor("inert")
            .setBorder("")


            console.clear();
            console.log(previousQuestionButton);
            let displayDifficultyQuestion = new StandartBox()
                ._removeStandardPosition()
                .setWidth("40px")
                .setHeight("8px")
                .setRight("-430px")
                .setTop("3px")
                .setBackgroundColor("green")
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
                .setBackgroundColor("#910000")
                .BWCResizeHeight("450px")
                .BWCResizeWidth("1100px")
                .setLeft("175px")
                .setMarginTop("150px")

                let makeResponse =  new ClickEventButton(()=>{

                })
                .setTextContent("Responder")
                .setBackgroundColor("#303030")
                ._addBehaviorFunction(hoverForClasses)

                displayConsoleQuestoes.getSon()
                    ._addChild(makeResponse)
                    .setWidth("95%")
                    .setHeight("40px")
                    .setBorder("")
           
            contentMain
                ._addChild(previousQuestionButton)
                ._addChild(nextQuestionButton)
                ._addChild(displayInfoQuestion)
                ._addChild(displayTextConsole)
                ._addChild(displayConsoleQuestoes)

            updateVirtualDom(contentMain.update())   

    }
    navigationSidebar
        ._addChild(bottonPrevius)
        ._addChild(getQuestionFromApiBotton)
    contentMain
        ._addChild(title)
        ._addChild(navigationSidebar)

   virtualDom(contentMain.release())     

}