import Titulo from "../../components/titulo/Titulo.js";
import Relogio from "../../components/relogio/Relogio.js";
import Formulario from "../../components/formulario/Formulario.js";
import Intro from "../../components/intro/intro.js";
import Favicon from "../../components/favicon/Favicon.js";
import barraLateralEsquerda from "./layouts/barraLateralEsquerda/barraLateralEsquerda.js";
import barraLateralDireita from "./layouts/barraLateralDireita/barraLateralDireita.js";
import showroom from "./layouts/showroom/showroom.js";
import displayQuestoes from "./layouts/displayQuestoes/displayQuestoes.js";
import formulario from "./layouts/formulario/formulario.js";
import exemploCaixaBasica from "./layouts/exemploCaixaBasica/exemploCaixaBasica.js";
import CoordenadorLayout from "../../javascript/utils/CoordenadorLayout.js";
import BlocoExecucao from "../../javascript/utils/BlocosExecucao.js";
import DivParaNavegacao from "../../javascript/utils/DivParaNavegacao.js";


export default class HomeView {

    constructor() {
        this._navegacao = new DivParaNavegacao();
    }

    criarLayout(eventos) {

        
    //EXEMPLO FAVICON*****************************************************************************
    //*******************************************************************************************/
 
       const favicon = new Favicon("Lotus");

    //EXEMPLO INTRO*******************************************************************************
    //*******************************************************************************************/

        const intro = new Intro();

    //EXEMPLO TITULO VIEW*************************************************************************
    //*******************************************************************************************/
    
        const titulo = new Titulo("O Monitor - Pré Alpha");

    //EXEMPLO TITULO RELOJO***********************************************************************
    //*******************************************************************************************/
        
        const relogio = new Relogio();
        
        const blocoShowroom = new BlocoExecucao({

            existe: ["iniciar"],

            onEnter: [
                () => showroom(eventos, this._navegacao)
            ],

            onExit: [
                () => {eventos.onLimparElementosDom("showroom");}
            ]
        });

       const blocoMain = new BlocoExecucao({

            existe: ["chamaBlocoMain"],

            onEnter: [
                () => barraLateralDireita   (eventos , this._navegacao),
                () => barraLateralEsquerda  (eventos , this._navegacao),
                () => displayQuestoes       (eventos),
                () => formulario            (eventos),
                () => exemploCaixaBasica    (eventos),
            ],

            onExit: [
                () => removerMain()
            ]
        });

        new CoordenadorLayout(
            blocoShowroom,
            blocoMain
        );
    }


    

}