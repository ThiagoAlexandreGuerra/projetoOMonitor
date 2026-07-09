import StandardComponent    from "../../standardComponent/main/StandardComponent.js";
import getId                from "../../componentIdentify/componentId/getId.js";

export default class Sidebar extends StandardComponent{

    constructor(orientation = "left"){

        super(); 

        this._classIdentify = "SIB"
        this._id = getId(this._classIdentify);

        this._classNName.push("SideBar");

        this._orientation = orientation == "left"? true:false;

        this._updateStyleConfig({

            width           : "80px",
            height          : "100vh",
            backgroundColor : "#131212",
            display         : "flex",
            position        : "fixed",
            top             : "0px",
            borderRadius    : "5px",
            justifyContent  : "flex-start",
            alignItems      : "center",
            padding         : "10px",
            boxShadow       : "0px 0px 10px 10px rgba(0,0,0,0.5)",
            flexDirection   : "column",
            
        })

        if(orientation){

            this._updateStyleConfig({
                borderRight     : "2px solid white",
                left            : "0px",
            })

        }else{
   
            this._updateStyleConfig({
                borderLeft      : "2px solid white", 
                right           : "0px"
            })
        }

        this._updatePropertyConfig({

            className       : this.getElementClassNames(), 
            id              : this._id
        })
    }
}