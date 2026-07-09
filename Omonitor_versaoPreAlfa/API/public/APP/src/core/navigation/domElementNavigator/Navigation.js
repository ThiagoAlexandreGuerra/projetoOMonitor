import instantRender from "../../render/renders/instantRenderer.js";
import getCaller from "../../utils/getters/getCaller.js";
import cleanDOMElementsById from "../../utils/tools/cleanDOMElementsById.js";
import inspectFunction from "../../utils/inspect/inspectFunction.js";

export const LAYOUTS_LIST = new Map();

LAYOUTS_LIST.set("controller" , [
            {
                last:"",
                current:"",
                historic:[]
            }
        ])

export default class Navigation {

    constructor() {

        
    
        this._currentLayoutClass = "start";
        this.renderNavigationContainer();
        this._startDOMProtection();
    }

    get classList() {
        return [...this.element.classList];
    }

    _startDOMProtection() {

        const observer = new MutationObserver(() => {

            if (!this.element.isConnected) {
                document.body.appendChild(this.element);
            }

        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        this._observer = observer;
    }

    _setPreviousLayoutClass(value){
        this._setNextLayoutClass(value);

    }
    _setNextLayoutClass(value) {

        if (this._currentLayoutClass) {
            this.element.classList.remove(this._currentLayoutClass);
        }

        this._currentLayoutClass = value;
        this.element.classList.add(value);

    }

    addClass(...classes) {
        this.element.classList.add(...classes);
    }

    removeClass(...classes) {
        this.element.classList.remove(...classes);
    }

    toggleClass(className) {
        this.element.classList.toggle(className);
    }

    containsClass(className) {
        return this.element.classList.contains(className);
    }

    checkClassesInDOM(...classes) {
        return classes
        .filter(className => document.querySelector(`.${className}`))
        .join(" ");
    }

    renderNavigationContainer() {
        this.element = instantRender("div",{},{}, true);
        this.element.className = this._currentLayoutClass;
    }

    backToLastLayout(){

        return()=>{
           
            LAYOUTS_LIST.get(LAYOUTS_LIST.get("controller")[0].current).suspend();
            LAYOUTS_LIST.get(LAYOUTS_LIST.get("controller")[0].last).reactivate();

            this.swapCurrentLastLayout(LAYOUTS_LIST.get("controller")[0].last , LAYOUTS_LIST.get("controller")[0].current);
        }

    }

    goTo(nextLayout){
      
        let callerName = getCaller().name;
        let nextLayoutName =  nextLayout.name || inspectFunction(nextLayout).name ;
       
        return  ()=>{
          
            if(LAYOUTS_LIST.has(nextLayoutName)){
                
                LAYOUTS_LIST.get(nextLayoutName).reactivate();

            }else{
                let currentLayoutName =  LAYOUTS_LIST.get("controller")[0].current;
                let currentLayoutComponent = LAYOUTS_LIST.get(currentLayoutName);
                currentLayoutComponent.suspend();
                nextLayout(this)
            }
            this.swapCurrentLastLayout(nextLayoutName , callerName);
        };
    }

    swapCurrentLastLayout(newLayout = "" , callerName){
     
        LAYOUTS_LIST.get("controller")[0].current = newLayout;
        LAYOUTS_LIST.get("controller")[0].last = callerName;
        
        let lastHistoricStorage = LAYOUTS_LIST.get("controller")[0].historic.slice(-1);
        if(newLayout != lastHistoricStorage){
            LAYOUTS_LIST.get("controller")[0].historic.push(newLayout)
        }
    }

    addNewLayout(vitualBody, callerLayoutName){
        
        let controllerLayout = LAYOUTS_LIST.get("controller");
        controllerLayout[0].current =  callerLayoutName;
        controllerLayout[0].historic.push(callerLayoutName)
        LAYOUTS_LIST.set(callerLayoutName, vitualBody);
    }

    getHistoric(){
        return LAYOUTS_LIST.get("controller")[0].historic;
    }
}