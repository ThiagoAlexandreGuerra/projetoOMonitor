import StandardBox          from "./StandardBox.js";
import getId                from "../../componentIdentify/componentId/getId.js";
import rotate               from "../../componentFunctions/animations/rotate.js";
import BoxWithChildBoxes    from "./BoxWithChildBoxes.js";
import StandardCircle       from "../circles/StandardCircle.js";

export default class ContentContainer extends StandardBox{

    constructor(onHeritage=false){
        super(onHeritage);

        this._classNName.push("ContentContainer");
        this._classIdentify = "CCN";
        this._id            = getId(this._classIdentify);
        
        this._updatePropertyConfig({

            className:          this.getElementClassNames(),
            id:                 this._id,
        })

        this._updateStyleConfig({
            width: "900px",
            height: "400px",
            backgroundColor:"#111111",
            top:"100px",
            border:""
        })

        this._initialized = false;

        this._loadingCircle = new StandardCircle()
            ._addChild(
                new StandardCircle()
                    ._addLayoutName("loader")
                    .setBackgroundColor(this.getBackgroundColor())
                    .setWidth("250px")
                    .setHeight("250px")
                    .setBorder("")
                    .setLeft("0px")
                    .setTop("0px")           
                    
            )
            .setCenterCircle()
            .setPadding("")
            .setHeight("300px")
            .setWidth("300px")
            .setMargin("")
            .setBorder("")
            .setBackgroundColor("inert")
            
        }
        
    onLoading(){

        if(!this._initialized){

            this._addChild(this._loadingCircle)
            this._initialized = true;
        }else{

            this._addNow(this._loadingCircle);
        }
        return this;
    }

    offLoading() {

        this._removeChild(this._loadingCircle);
        return this;
    }

     removeVirtualBodyChild(childToRemove){
        this._removeChild(childToRemove)
    }

    removeContentContainerChild(childToRemove){
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
                            removeContentContainerChild: this.removeContentContainerChild.bind(this)
                        });
            
        }

        return this;
    }
}