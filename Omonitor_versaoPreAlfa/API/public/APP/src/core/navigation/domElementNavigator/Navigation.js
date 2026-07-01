import instantRender from "../../render/renders/instantRenderer.js";
import getCaller from "../../systemComponents/utils/getters/getCaller.js";
import cleanDOMElementsById from "../../utils/tools/cleanDOMElementsById.js";
import inspectFunction from "../../utils/inspect/inspectFunction.js";

export const LAYOUTS_LIST = new Map();

export default class Navigation {

    constructor() {

        LAYOUTS_LIST.set("controller" , [
            {
                last:"",
                current:"",
                historic:[]
            }
        ])
        console.log(getCaller())
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

        console.log("here");
        return()=>{
            console.log(LAYOUTS_LIST)
            console.log("backToLastLayout********************************")

            // console.log(LAYOUTS_LIST.get("controller")[0].current);
            // console.log(LAYOUTS_LIST.get(LAYOUTS_LIST.get("controller")[0].current));
            LAYOUTS_LIST.get(LAYOUTS_LIST.get("controller")[0].current).suspend();
            LAYOUTS_LIST.get(LAYOUTS_LIST.get("controller")[0].last).reactivate();

            let aux = LAYOUTS_LIST.get("controller")[0].current;
            LAYOUTS_LIST.get("controller")[0].current = LAYOUTS_LIST.get("controller")[0].last;
            LAYOUTS_LIST.get("controller")[0].last = aux;
            LAYOUTS_LIST.get("controller")[0].historic.push(LAYOUTS_LIST.get("controller")[0].current)

            console.log(LAYOUTS_LIST);

        }

    }

    goTo(nextLayout){
       console.clear()
       console.log(`inspectFunction(nextLayout):    `);
       console.log(inspectFunction(nextLayout));

       //console.log(nextLayout.toString())
       console.log(getCaller())
       console.log(`LAYOUTS_LIST:   `)
       console.log(LAYOUTS_LIST)

        let value = LAYOUTS_LIST.get("controller")
        value[0].last = getCaller().name

        return  ()=>{

            let currentLayoutName = LAYOUTS_LIST.get("controller")[0].last;
            
            if(LAYOUTS_LIST.has(nextLayout.name)){
        
                LAYOUTS_LIST.get(nextLayout.name).reactivate();

            }else{

                let currentLayoutComponent = LAYOUTS_LIST.get(currentLayoutName)
                console.log(`currentLayoutComponent:    `)
                console.log(currentLayoutComponent)
                currentLayoutComponent.suspend()
            
                nextLayout(this)
            }
        };
    }
}