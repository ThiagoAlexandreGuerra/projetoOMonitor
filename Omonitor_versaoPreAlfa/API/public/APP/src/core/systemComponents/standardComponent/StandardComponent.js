import createVirtualNode from "../../virtualDOM/createVirtualNode/createVirtualNode.js";
import StyleController from "../styleController/StyleController.js";
import getId from "../componentIdentify/componentId/getId.js";
import {virtualDom} from "../../virtualDOM/main/virtualDom.js";


import getCaller from "../utils/getters/getCaller.js";

export default class StandardComponent extends StyleController{

    constructor(tag = "div" , isAutoDisplay = true) {

        super();

        this._className = [];
        this._className.push("StandartComponent");
        this._classIdentify = "SDC";
        this._id = getId(this._classIdentify);
        
        this._tag = tag;
        this._isAutoDisplay = isAutoDisplay;
        this._children = [];
        this._isChild = false;
        this._function= [];
        this._behaviorFunction = [];
        this._elementCallbacks = [{
            callbackFunction: null,
            eventType:"", 
        }];

        this.heritage = [{
            parentWidth: "",
            parentHeight: "",
            parentBackgroundColor:"",
        }]
        
        this._updatePropertyConfig({
            
                className:          this.getElementClassNames(),
                id:                 this._id,
        });
            
        queueMicrotask(() => {
            this.createStandardComponent();
        });

        this.VALID_EVENTS = new Set([
             "click",
             "dblclick",
             "mousedown",
             "mouseup",
             "mousemove",
             "mouseenter",
             "mouseleave",
             "mouseover",
             "mouseout",
             "contextmenu",
            
             "keydown",
             "keyup",
             "keypress",
            
             "input",
             "change",
             "submit",
             "focus",
             "blur",
            
             "drag",
             "dragstart",
             "dragend",
             "dragenter",
             "dragleave",
             "dragover",
             "drop",
            
             "touchstart",
             "touchmove",
             "touchend",
            
             "wheel",
             "scroll",
            
             "load",
             "resize",
             "error",
            
             "play",
             "pause",
             "ended",
            
             "copy",
             "cut",
             "paste"
        ]);

    }

    _addLayoutName(className){
        this._className.push(className);
        this._updatePropertyConfig({
            className:          this.getElementClassNames(),
        })
        return this;
    }

    getId(){
        return this._id;
    }

    getElementClassNames() {

        let classNameReturn = "";

        for (const className of this._className) {

            classNameReturn += `${className} `;
        }

        return classNameReturn.trim();
    }

    setThisAndChildrenBackgroundColor(value){
        this.setBackgroundColor(value);
        this._children.forEach((component)=>{
            component.setThisAndChildrenBackgroundColor(value);
        })

        return true;
    }

    setStyleInThisAndChildren( style , value){
        let prop = `_${style}`;
        this._set(prop , style , value);
        this._children.forEach((component)=>{
            component.setStyleInThisAndChildren(style , value);
        })
        return this;
    }
    fillHeritage(){
         this.heritage = [{
            parentWidth: this._width,
            parentHeight: this._height,
            parentBackgroundColor: this._backgroundColor,
        }]

    };
//**************************************************************************** */
//**************************************************************************** */
    _heritage(parentHeritage){};                                        /***** */
                                                                        /***** */
    _heritageRoutine(component){          /*importante                  /***** */
        return;                             /*fazer funcionar           /***** */
        this.fillHeritage();                                            /***** */
        try{                                                            /***** */
            component                                                   /***** */
            ._heritage(this.heritage)                                   /***** */
        }catch(e){                                                      /***** */
            return;                                                     /***** */
        }                                                               /***** */
    }                                                                   /***** */
//**************************************************************************** */
//**************************************************************************** */
 
    _isValidChild(child) {

        return (
            typeof child === "object" &&
            child !== null &&
            typeof child._jumpToCreateElemement ===
            "function"
        );
    }

    _addBehaviorFunction(function_){
        
        if(!(typeof function_ === "function")) throw new Error("parameter in _addBehaviorFunction must be a function");

        this._behaviorFunction.push(function(){function_.call(this)});
        return this;
    }

    _addEventListener(event, callback){
       
        if(!(typeof callback === "function")) throw new Error("parameter in _addEventListener must be a function");
        if(!this._isValidEventType(event)) throw new Error("Invalid event in _addEventListener"); 

        this._elementCallbacks.push(
            {
                callbackFunction:callback,
                eventType:event
            }
        );
        return this;
    }

    _isValidEventType(eventType) {

        if (typeof eventType !== "string") {
            return false;
        }

        return this.VALID_EVENTS.has(eventType);
    }

   _addChild(child) {

        if(child === this) throw new Error("Self-referencing child nodes are not allowed.")
        this._heritageRoutine(child);
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

        
            this._children.push(child);
            child._isChilld = true;
            
        }else{

            virtualDom(child.release() , this._id);
        }

        return this;
    }

    _jumpToCreateComponent() {

        if (!this.element) {
            this.createStandardComponent();
        }

        return this.element;
    }

    
    release(){
        return this._jumpToCreateComponent();
    }

    update(){
        this.element = null;
        return this._jumpToCreateComponent();
    }

    createStandardComponent() {

        if (this.element) return;

        const children =
            this._children.map(
                child => child._jumpToCreateComponent()
        );

        
        this.element = createVirtualNode(
            this._tag,
            this._styleConfig,
            this._propertyConfig,
            children,
            this._function,
            this._behaviorFunction,
            this._elementCallbacks,
        );

        this._setElementReference(this.element);
        if(this._isAutoDisplay) this._autoDisplay(this);
    }

    
}