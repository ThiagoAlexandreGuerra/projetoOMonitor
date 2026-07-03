import getId from "../../componentIdentify/componentId/getId.js";
import StandartComponent from "../../standardComponent/main/StandardComponent.js";

export default class StandardBox extends StandartComponent{

    constructor(onHeritage=false){

        super();

        this._onHeritage    = onHeritage;
        this._classNName.push("StandartBox");
        this._classIdentify = "SDB";
        this._id            = getId(this._classIdentify);

        this._updateStyleConfig({

            alignItems            : "center",
            backgroundColor       : "rgb(34, 34, 34)",
            borderLeft            : "2px solid white",
            borderRadius          : "5px",
            borderRight           : "2px solid white",
            backgroundRepeat      : "no-repeat",
            backgroundPosition    : "center",
            backgroundSize        : "100% 100%",
            color                 : "#dadada",
            display               : "flex",
            flexDirection         : "column",
            justifyContent        : "center",
            marginBottom          : "20px",
            marginTop             : "10px",
            overflowY             : "hidden",
            overflowX             : "hidden",
            padding               : "10px",
            position              : "relative",
            left                  : "50%",
            top                   : "50%",
            transform             : "translate(-50%, -0%)",
            width                 : "400px",
            height                : "400px",
            wordWrap              : "break-word",
        })

        this._updatePropertyConfig({

            className:          this.getElementClassNames(),
            id:                 this._id,
        })
        
    }

    _heritage(parentHeritage){
        
        parentHeritage?.parentWidth == "auto"   || this.setWidth(parentHeritage?.parentWidth);
        parentHeritage?.parentHeight == "auto"  || this.setHeight(parentHeritage?.parentHeight);
        this.setZIndex(parentHeritage?.parentZIndex);   
        this.setBackgroundColor(parentHeritage?.parentBackgroundColor);
    }

    _removeScrollbarConfig(){
    
        this._updateStyleConfig({
            height      : "auto",
            overflow    : "",
            overflowY   : "hidden",

        })

        return this;
    }

    _addScrollbarConfig(){
        this._updateStyleConfig({
            height      : this.getHeightPX() != "auto"? this.getHeightPX(): "300px",
            overflowY   : "scroll"
        })

        return this;
    }

    _removeStandardPosition(){

        this._updateStyleConfig({

            left         : "",
            top          : "",
            transform    : "",

        })

        return this;
    }

    _removeStandardStyles(){
        this._swapStyleConfig({})
        return this;
    }

}