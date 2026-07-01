import BoxWithCilldBoxes    from "../../../../core/systemComponents/components/boxes/BoxWithChildBoxes.js";
import StandartBox          from "../../../../core/systemComponents/components/boxes/StandardBox.js";
import ClickEventButton     from "../../../../core/systemComponents/components/buttons/clickEventButton.js";
import Title                from "../../../../core/systemComponents/components/title/Title.js";
import GetPath              from "../../../devTools/services/GetPath.js";
import apiGet               from "../../../devTools/api/apiGet.js";
import hoverForClasses      from "../../landingPage/landingPageFunctions/hoverForClasses.js";
import PACKAGE              from "../../../../core/systemComponents/components/boxes/PACKGE.js";
import ExternalFonts        from "../../../../core/systemComponents/utils/text/externalFonts.js";
import Slide from "../../../../core/systemComponents/components/slide/Slide.js";

export default function componentBoxSelectQuestion(catalog, onDisplayConsole ){

    const PACK = new PACKAGE()
        .setHeight("580px")
        .setFlexDirection("row")
        .setDisplay("flex")
        .setBorderTop("2px solid red")
        .setBorderRight("2px solid red")
       

    const displayQuestionChoose = new StandartBox()
        ._removeStandardPosition()
        .setBackgroundColor("rgba(0,0,0,0.3)")
        .setWidth("65%")
        .setHeight("80%")
        .setBackgroundSize("100% 100%")   
        .setClipPath(" polygon( 0 0,100% 0,100% 100%,0 100%)")
        .setTop("10px")
        .setRight("20px")
        .setMargin("0px")
        .setBorder("")
        .setPosition("absolute")
    const title1 = new Title("SELECIONAR")
        .setFontFamily(new ExternalFonts().catamaran())
        .setFontWeight("bold")
        .setFontStyle("italic")
        .setColor("white")
        .setLeft("55px")
        .setFontSize("30px")
    const title2 = new Title("QUESTÕES")
        .setFontFamily(new ExternalFonts().catamaran())
        .setFontWeight("bold")
        .setColor("white")
        .setFontStyle("italic")
        .setLeft("150px")
        .setTop("55px")
        .setFontSize("30px")

    const menuBotton = new ClickEventButton()
        .setBackgroundImage(new GetPath().getDrag_indicator_24dp_FFFFFF())
        .setBackgroundSize("40px 40px")
        .setBackgroundColor("inert")
        .setBorder("")
        .setTop("13px")
        .setLeft("4.3px")
        .setPosition("absolute")
        .setHeight("30px")

   
    const yearsInterval = [];

    for(let i = 0 ; i<=26 ; i++){yearsInterval.push(i<10?`200${i}`:`20${i}`);}
    const level = [`difícil` , `fácil` , `médio`]; 
    const catalogIndex = ['ÁREAS','ASSUNTOS','BANCAS','CARGOS','MATÉRIAS','ORGÃOS'];

    const optionsDisplay = new StandartBox()
            ._removeStandardPosition()
            .setTop("130px")
            .setLeft("5px")
            .setPosition("absolute")
            .setHeight("auto")
            .setWidth("300px")
            .setPadding("0px")
            .setJustifyContent("flexStart")
            .setBackgroundColor("inert")
            .setBorder("")

    catalogIndex.forEach(index => {
       optionsDisplay
       ._addChild(
            new ClickEventButton(
                ()=>{showData(catalog[normalizeString(index)])}
            )
            .setWidth("93%")
            .setHeight("40px")
            .setTextContent(index)
            .setMargin("5px")
            .setBorder("1px solid #ffee00")
            .setBorderLeft("")
            .setBorderTop("")
            .setBackgroundColor("inert")
            .setBoxShadow(`
                            4px 4px 8px rgba(0, 0, 0, 0.10),
                            12px 12px 24px rgba(0, 0, 0, 0.15),
                            24px 24px 48px rgba(0, 0, 0, 0.08)`
                        )
            .setFontFamily(new ExternalFonts().FiraSans())
       )
    });
   
    const save = [];
    let initialize = false;
    function showData(data){

        if(initialize){
            displayQuestionChoose._removeChild(save[0])
        }

        const currentChild = new StandartBox();
        save[0]= currentChild;

        currentChild
        ._removeStandardPosition()
        ._addScrollbarConfig()
        .setWidth("600px")
        .setHeight("300px")
        .setJustifyContent("flexStart")
        .setBottom("5px")
        .setPosition("absolute")
        .setBackgroundColor("inert")
        .setBorder("")
        
       
        data.forEach((d)=>{
        currentChild
        ._addChild(
            new ClickEventButton(
                ()=>{
                    showChooseOpitions(d.nome);
                }
            )
            .setTextContent(d.nome)
            .setWidth("90%")
            .setMinHeight("40px")
            .setBorder("")
            .setBackgroundColor("rgba(0,0,0,0.7)")
            .setFontFamily(new ExternalFonts().FacultyGlyphic())
        )
        })
        
        displayQuestionChoose
        ._addNow(currentChild);

        initialize=true;
    }
    
    let getRequestText = []; 

    function showChooseOpitions(nome){

            getRequestText.push(nome);

            const displayChoose = new StandartBox()
                ._removeStandardPosition()
                .setHeight("90px")
                .setWidth("95%")
                .setTop("0px")
                .setPosition("absolute")
                .setBackgroundColor("rgba(0,0,0,0.7)")
                .setBorder("2px solid red")
                .setBorderLeft("")
                .setBorderBottom("")

              console.log(getRequestText.toString())
            getRequestText.forEach((name)=>{
                displayChoose
                    .setTextContent(getRequestText.toString().replaceAll(',' , ' | '));
            })    
            displayQuestionChoose
            ._addNow(displayChoose)
    }

    let BottonStartDisplayConsole = new ClickEventButton(
        ()=>{
            PACK.remove();
            apiGet(`questoes`)
            .then((response)=>{
                
                onDisplayConsole(response);
            })
            .catch((error)=>{
                console.error(error)
            })
        }
    )
    .setWidth("350px")
    .setHeight("50px")
    .setTextContent("INICIAR")
    .setPosition("absolute")
    .setBottom("10px")
    .setLeft("33%")
    .setBorder("2px solid red")
    
    
    PACK
    ._addChild(displayQuestionChoose)
    ._addChild(title1)
    ._addChild(title2)
    ._addChild(menuBotton)
    ._addChild(optionsDisplay)
    ._addChild(BottonStartDisplayConsole)
   
    return PACK;
}

function normalizeString(text) {

    if (typeof text !== "string") {
        throw new TypeError("Expected a string.");
    }

    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}