import getId            from "../../componentIdentify/componentId/getId.js";
import StandartElement  from "../../standardComponent/main/StandardComponent.js";
import getCaller from "../../utils/getters/getCaller.js";
import Navigation from "../../../navigation/domElementNavigator/Navigation.js";
import { LAYOUTS_LIST } from "../../../navigation/domElementNavigator/Navigation.js";
export default class VirtualBody extends StandartElement{

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
            
        }else{
            console.log(LAYOUTS_LIST.get(controllerLayout[0].current))
            LAYOUTS_LIST.get(controllerLayout[0].current);
        }
        console.log(this)


    } 
    
    removeVirtualBodyChild(childToRemove){
        this._removeChild(childToRemove)
    }

    _addChild(child) {

        if(child === this) throw new Error("Self-referencing child nodes are not allowed.")
    
        if(!this._isChild){

            if (
                typeof child !== "object" ||
                child === null
            ) {
            
                throw new Error(
                    "Child must be an object."
                );
            }
            
            if (
                typeof child._jumpToCreateComponent !==
                "function"
            ) {
                throw new Error(
                    "Invalid child object."
                );
            } 
            
            child._parentId = this._id;
            if(child._onHeritage){this._heritageRoutine(child)}
            this._children.push(child);
            child._isChilld = true; 
            Object.assign(child, {
                            removeVirtualBodyChild: this.removeVirtualBodyChild.bind(this)
                        });
            
        }

        return this;
    }

    setScrollTop(value) {
       this._set("_scrollTop" , "scrollTop" , value);
       return this;
    }
}