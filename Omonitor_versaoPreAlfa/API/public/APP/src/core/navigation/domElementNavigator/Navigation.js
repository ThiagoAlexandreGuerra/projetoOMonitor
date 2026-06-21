import instantRender from "../../render/renders/instantRenderer.js";

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
}