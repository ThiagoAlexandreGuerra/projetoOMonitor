import StandardBox from "../../../../core/systemComponents/components/boxes/StandardBox.js";
import ClickEventButton from "../../../../core/systemComponents/components/buttons/ClickEventButton.js";
import landingPageBanks from "./landingPageBanks.js";
export default  function contentExplanations(navigation){ 
    
        let contentExplanations = new StandardBox()
        ._removeStandardPosition()
        .setBorder("")
        .setClassNameAdd("YELLOW")
        .setBackgroundSize("100% 100%")
        .setTextContent(`Prepare-se para o Banco do Brasil 2027`)
        .setColor("#02008f")
        .setFontSize("80px")
        .setMargin("0px")
        .setWidth("80%")
        .setHeight("100%")
        .setFontWeight("bold")
        .setBackgroundColor("#050505")
        .setBorderBottom("2px solid #ffffff")
        .setTop("150px")
        .setLeft("13%")
        .setTextAlignmentCenter()

             
        let bottonStart = new ClickEventButton(
            ()=>{navigation._setNextLayoutClass("landingPageBanks")}
        )
            .setTextContent("começar agora")
            .setTextAlignmentCenterCenter()
            .setBackgroundColor("#ffffff")
            .setColor("#000000")
            .setWidth("300px")
            .setHeight("50px")
            .setBorderRadius("2px")
            .setBorder("")
            .setFontSize("20px")
            .setMarginTop("100px")
        

        contentExplanations
        ._addChild(bottonStart)


        return contentExplanations;
}        
