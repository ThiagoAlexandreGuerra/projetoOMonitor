import StandardComponent from "../../standardComponent/main/StandardComponent.js";
import getId from "../../componentIdentify/componentId/getId.js";
import PACKAGE from "../boxes/PACKGE.js";

export default class Slide extends StandardComponent{

    constructor(onHeritage){
        super(onHeritage)

        this._onHeritage    = onHeritage;
        this._classNName.push("Slide");
        this._classIdentify = "SLD";
        this._id            = getId(this._classIdentify);

        this._updatePropertyConfig({

            className:          this.getElementClassNames(),
            id:                 this._id,
        })

        this._updateStyleConfig({

            height:"500px",
            width:"1100px",
            backgroundColor:"inert",
            display: "flex",          
            flexDirection: "row",
            flexDirection:"row",
            alignItems:"flexStart",
            justifyContent:"flexStart",
            overflow:"hidden",
            position:"relative",
            top:"120px",
            left:"120px"
        })
                
    }

    move(){

        let length = this._children.length;
        const childrenCopy = this._children;
        this._children = [];

        let i = 0;
        let distance=0;
        childrenCopy.forEach((comp) => {
           
            this._addChild(
                new PACKAGE()
                ._addChild(comp)
                .setWidth(this.getWidthPX())
                .setHeight(this.getHeightPX())
                .setBackgroundColor("black")
                .setPosition("absolute")
                .setLeft(i==0?"0px": `${distance}px`)
                .setBoxSizing("borderBox")
            ) 
            distance = distance+this.getWidth();
            
        });

        let k = 0;
        let dist = this.getWidth();

        setInterval(()=>{
             
            let child=this.getChild(k!=length?k++:0);
            
            if(k==length){
                k=0;
                
            }

                child
                .setLeft(`-${this.getWidth()}px`)
                .setTransition("1s ease")
                .update()
            
                requestAnimationFrame(() => {
                    child
                    .setLeft(`0px`)
                    .update()

                    this._aux(child);
                });
            
        },4000)

        
        return this;
    }

    _aux(child){

        setTimeout(()=>{

            child
            .setLeft(`${this.getWidth()}px`)
            .update()
        },3999);
    }
}