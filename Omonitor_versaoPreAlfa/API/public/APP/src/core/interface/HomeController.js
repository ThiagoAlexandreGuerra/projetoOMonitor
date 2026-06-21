import HomeModel from "./HomeModel.js";
import HomeView from "../../pages/interface/HomeView.js";
import PWA from "../PWA/main/PWA.js";

export default class HomeController {

    constructor() {
        PWA();
        this.model = new HomeModel();
        this.view  = new HomeView();
    }

    init() {
        
        this.view.criarLayout({

            onFullscreen:           this.model._handleFullscreen(),
            onSlide1:               this.model._slideHorizontalV(),
            onToggleVisibilidade:   this.model._toggleVisibility(),
            onCleanDOM:             this.model._cleanDOM(),
            onCleanDOMElements:     this.model._cleanDOMElements(),
        });
        
    }

}