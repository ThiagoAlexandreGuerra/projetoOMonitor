import createVirtualNode from "../../../virtualDOM/createVirtualNode/createVirtualNode.js";
import StyleController from "../StyleController.js";
import getId from "../../componentIdentify/componentId/getId.js";
import {virtualDom} from "../../../virtualDOM/main/virtualDom.js";
import JoinLayers from "../JoinLayers.js";
import JoinStylesGetersAndSetersToAssembly from "../JoinStylesGetersAndSetersToAssembly.js";
import getCaller from "../../utils/getters/getCaller.js";
import { VALID_EVENTS } from "../isValid/lists.js";
import isComponentInDom from "../../../render/renderCheck/isComponentInDom.js";

export default class StandardComponent extends JoinStylesGetersAndSetersToAssembly{

    constructor(tag = "div" , isAutoDisplay = true) {

        super();

        this._classNName.push("StandartComponent");
        this._classIdentify = "SDC";
        this._id = getId(this._classIdentify);
        
        this._tag = tag;
        this._isAutoDisplay = isAutoDisplay;

        this._updatePropertyConfig({
            
                className:          this.getElementClassNames(),
                id:                 this._id,
        });
            
        queueMicrotask(() => {
            this.createStandardComponent();
        });
    }

    _addLayoutName(className){
        this._classNName.push(className);
        this._updatePropertyConfig({
            className:          this.getElementClassNames(),
        })
        return this;
    }

    getChild(index){
        if(index>this._children.length){return null;}

        return this?._children[index];
    }

    getId(){
        return this._id;
    }

    getChildrenId() {
        return {
            parentId: this._id,
            child: this._children.map(child => child.getChildrenId())
        };
    }

    getElementClassNames() {

        let classNameReturn = "";

        for (const className of this._classNName) {

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

    setBehaviourFunctions(...functions_){
        functions_.forEach((func)=>{
            if(typeof func == "function"){
                this._behaviorFunction.push(function(){func.call(this)});
            }
        })
        return this;
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
            parentZIndex: this._zindex,
        }]
    };

    _heritage(parentHeritage){};                                       
                                                                        
    _heritageRoutine(component){                       

        this.fillHeritage();           
        try{                           
            component                  
            ._heritage(this.heritage)  
        }catch(e){                     
            return;                    
        }
    }                                  

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

        return VALID_EVENTS.has(eventType);
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
            Object.assign(child ,{
                    removeMeOfParentChildrenList: this._removeChild.bind(this),
                    parentUpdate: this.update.bind(this)
                } 
            )
            
            
        }

        return this;
    }

    _addNow(child){
        
        this._addChild(child);
        this.update();
        return this;
    }

    _removeChild(childToRemove) {

        if (!childToRemove) {
            return;
        }
       
        this._children = this._children.filter(
            child => child !== childToRemove
        );

        this.update();
        
        return this;
    }

    _addChildren(children = []) {

        children.forEach(child => {

            this._addChild(child);

        });

        return this;
    }

    _jumpToCreateComponent() {

        if (!this.element) {
            this.createStandardComponent();
        }

        return this.element;
    }

    update(){
        this.element = null;
        virtualDom(this._jumpToCreateComponent());

        return this;
    }

    suspend(){

        this._isSuspend = true;
       
        if(this.element) virtualDom(this._jumpToCreateComponent(), this._isSuspend );

        return this;
    }

    remove(){

        try{
            this.removeMeOfParentChildrenList(this);
        }catch(e){
            console.error(e);
        }
        
        virtualDom(this._jumpToCreateComponent(), true)
        this.clean()
       
        return this;
    }

    clean() {

        for (const chave of Object.keys(this)) {
        
            delete this[chave];
        }
    }

    reactivate(){
        
        this._isSuspend = false;

        try{
            this.parentUpdate()
        }catch{
            this.update()
        }  
        
        return this;
    }

    reactivatePF(){
        return ()=>{this.reactivate.call(this)};
    }

    toggleVisibility(){

        return()=>{
           
            if(isComponentInDom(this)){

                this.suspend();
            }else{
                try{
                    this.reactivate();
                }catch(e){
                    console.warn(e);
                }
            }
        }
    }
    createStandardComponent() {

        if (this.element) return;
    
        const children = this._children
                .filter(child => !child._isSuspend)
                .map(child => child._jumpToCreateComponent());

        this.element = createVirtualNode(
            this._tag,
            this._styleConfig,
            this._propertyConfig,
            children,
            this._function,
            this._behaviorFunction,
            this._elementCallbacks,
            this._parentId,
        );
       
        this._setElementReference(this.element);
        if(this._isAutoDisplay) this._autoDisplay(this);
    }
    
}