import HomeModel from "./HomeModel.js";
import HomeView from "../../app/interface/HomeView.js";
import PWA from "../PWA/main/PWA.js";
import IDB from "../PWA/data/indexDB/IDB.js";
import openSystemDataBase from "../PWA/data/indexDB/IDBS.js";
import ImageStorage from "../PWA/data/imageStorage/main/imageStorage.js";

export default class HomeController {

    constructor() {
        PWA();
        this.model = new HomeModel();
        this.view  = new HomeView();
    }

    async init() {
        
        this.view.criarLayout({

            onFullscreen:           this.model._handleFullscreen(),
            onSlide1:               this.model._slideHorizontalV(),
            onToggleVisibilidade:   this.model._toggleVisibility(),
            onCleanDOM:             this.model._cleanDOM(),
            onCleanDOMElements:     this.model._cleanDOMElements(),
        });

      //  openSystemDataBase();
        
    }
}