import ServeCaminhosProjeto from "../../javascript/services/serveCaminhosProjeto.js";
import CaixaBasica from "../caixas/CaixaBasica.js";

export default class Intro extends CaixaBasica {

    constructor() {

        super();

        this.caminhos = new ServeCaminhosProjeto();

        this.atribuirWidth              = "100%";
        this.atribuirHeight             = "100%";
        this.atribuirZIndex             = "10";
        this.atribuirTextContent        = "Lotus"
        this.atribuirFontSize           = "90px"
        this.atribuirBackgroundColor    = "black";
        this.atribuirPosition           = "fixed";
        
        this.atribuirBackgroundRepeat   = this._backgroundRepeat;
        this.atribuirBackgroundPosition = this._backgroundPosition;
        this.atribuirBackgroundImage    = this.caminhos._serveUrlImage(this.caminhos.IntroLotusImagePng);

        setTimeout(() => this._desaparecer(), 3000);
        
    }
}