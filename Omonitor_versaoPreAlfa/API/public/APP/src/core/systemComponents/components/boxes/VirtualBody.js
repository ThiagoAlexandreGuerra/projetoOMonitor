import getId                from "../../componentIdentify/componentId/getId.js";
import StandardComponent    from "../../standardComponent/main/StandardComponent.js";
import getCaller            from "../../../utils/getters/getCaller.js";
import Navigation           from "../../../navigation/domElementNavigator/Navigation.js";
import { virtualDom }       from "../../../virtualDOM/main/virtualDom.js";
import IDB                  from "../../../PWA/data/indexDB/IDB.js";
import responsiveness from "../../responsiveness/responsiveness.js";

export default class VirtualBody extends StandardComponent{

    constructor(){ 
    
        super();

        new Navigation().addNewLayout(this , getCaller().name);
       
        this._classNName.push("VirtualBody");
        this._classIdentify = "VTB";
        this._id = getId(this._classIdentify);
        
        this._updateStyleConfig({
            width : "100vw",
            minHeight: "100vh",
            overflowY: "auto",
            backgroundRepeat: "no-repeat",
            justifyContent:"center",
            alignItems: "center",
            backgroundSize: "100% 100%",
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
       
        //new IDB().addComponent(this);
    } 
    
    release(){
        virtualDom(this._jumpToCreateComponent());
        responsiveness(this);
    }

    removeVirtualBodyChild(childToRemove){
        this._removeChild(childToRemove)
    }

    setScrollTop(value) {
       this._set("_scrollTop" , "scrollTop" , value);
       return this;
    }

    saveLocalStorage(key , data){

    }
    saveSessionStorage(key , data){

    }
    saveCache(key , data){

    }

    
}