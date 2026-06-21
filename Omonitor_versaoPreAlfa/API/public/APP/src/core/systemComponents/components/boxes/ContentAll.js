import getId            from "../../componentIdentify/componentId/getId.js";
import StandartElement  from "../../StandardComponent/StandardComponent.js";


export default class ContentAll extends StandartElement{

    constructor(){

        super();

        this._className.push("ContentAll");
        this._classIdentify = "CAL";
        this._id = getId(this._classIdentify);

        
        this._updateStyleConfig({
            width : "100vw",
            minHeight: "100vh",
            overflowY: "auto",
            backgroundRepeat: "no-repeat",
            justifyContent:"center",
            alignItems: "center",
            backgroundSize: "800px 800px",
            backgroundPosition    : "center",
            backgroundColor: "#e4e4e4",
            position: "relative",
            paddingBottom: "200px",
            overflowX:"hidden"
        })

        this._updatePropertyConfig({
            id : this._id,
            className : this.getElementClassNames()
        })
        
    }

    setScrollTop(value) {
       this._set("_scrollTop" , "scrollTop" , value);
       return this;
    }
}