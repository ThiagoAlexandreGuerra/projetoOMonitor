import getDOMElementById from "../../utils/getters/getDOMElementById.js";
import Size from "./Size.js";

const widthDefault  = 1366 ; //means 1366px.
const heightDefault  = 607 ; //means 607px.
const windowWidth   = window.innerWidth;
const windowHeight  = window.innerHeight;
const ERROR         = 1.1

export default function responsiveness(VirtualBody){

    VirtualBody.getChildren().forEach(child => {
            setNewSizes(child);
    });

}

function setNewSizes(child){

    let tax = 1;
    let newFontSize =1;
    let responsivenessFactors = 1;
    if(windowWidth>550) return;
    child.getWidth()
        .then((resp)=>{

            
            tax = resp/widthDefault;
            child.setWidth(`${tax*windowWidth*ERROR}px`)

            child.getHeight()
            .then((resp2)=>{
                if(windowHeight<800){

                    tax = resp2/heightDefault;
                    child.getComponentHeightResponsivenessFactors().forEach((responsiv)=>{
                        if(responsiv.factor != 1){ responsivenessFactors = responsiv.factor};
                    })
                    
                    child.setHeight(`${tax*windowHeight*responsivenessFactors}px`)
                }
            })
           
            tax = child.getFontSize()/widthDefault;
            newFontSize = tax*windowWidth*ERROR; 
            if(newFontSize){ child.setFontSize(`${newFontSize}px`);}

            if(child._hasChildren){

                child.getChildren().forEach(child => { setNewSizes(child); })
            }
    })
}