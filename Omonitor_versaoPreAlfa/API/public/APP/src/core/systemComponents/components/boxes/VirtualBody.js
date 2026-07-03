import getId                from "../../componentIdentify/componentId/getId.js";
import StandardComponent    from "../../standardComponent/main/StandardComponent.js";
import getCaller            from "../../utils/getters/getCaller.js";
import Navigation           from "../../../navigation/domElementNavigator/Navigation.js";
import { LAYOUTS_LIST }     from "../../../navigation/domElementNavigator/Navigation.js";
import { virtualDom }       from "../../../virtualDOM/main/virtualDom.js";

export default class VirtualBody extends StandardComponent{

    constructor(){
    
        super();
        
        let controllerLayout = LAYOUTS_LIST.get("controller");
        controllerLayout[0].current =  getCaller().name;
        controllerLayout[0].historic.push(controllerLayout[0].current)

        if(!LAYOUTS_LIST.has(getCaller().name)){
            LAYOUTS_LIST.set(getCaller().name, this);
            
            this._classNName.push("VirtualBody");
            this._classIdentify = "VTB";
            this._id = getId(this._classIdentify);
            
            
            this._updateStyleConfig({
                width : "100%",
                minHeight: "100%",
                overflowY: "auto",
                backgroundRepeat: "no-repeat",
                justifyContent:"center",
                alignItems: "center",
                backgroundSize: "100% 100%",
                backgroundPosition    : "center",
                backgroundColor: "#e4e4e4",
                position: "relative",
                paddingBottom: "150px",
                overflowX:"hidden"
            })
            
            this._updatePropertyConfig({
                id : this._id,
                className : this.getElementClassNames()
            })
            
        }else{
           
            LAYOUTS_LIST.get(controllerLayout[0].current);
        }
       
    } 
    
    release(){
        virtualDom(this._jumpToCreateComponent());
    }

    removeVirtualBodyChild(childToRemove){
        this._removeChild(childToRemove)
    }

    setScrollTop(value) {
       this._set("_scrollTop" , "scrollTop" , value);
       return this;
    }
}