import HomeModel from "./HomeModel.js";
import HomeView from "./HomeView.js";

export default class HomeController {

    constructor() {
        this.model = new HomeModel();
        this.view  = new HomeView();
    }

    async handleRandom() {
        const numeros = await this.model.buscarNumeros();
    }

    init() {
        
        this.view.criarLayout({

            onRandom:               this.handleRandom.bind(this),
            onFullscreen:           this.model._manipulaFullscreen(),
            onGetName:              this.getName.bind(this),
            onSlide1:               this.model._slideHorizontalV(),
            onToggleVisibilidade:   this.model._toggleVisibilidade(),
            onLimparDom:            this.model._limparDom(),
            onLimparElementosDom:   this.model._limparElementosDom(),
        });
    }

    async getName(){
        const name = await this.model._getMyName();
        console.log(name);
    }

}