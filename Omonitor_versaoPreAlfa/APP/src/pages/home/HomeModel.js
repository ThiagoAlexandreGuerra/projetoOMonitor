import pedirSequenciaDeNumerosAleatotios from "../../../src/javascript/api/pedirSequenciaDeNumerosAleatorios.js";
import getMyName from "../../javascript/api/getMyName.js";
import manipulaFullscreen from "../../../src/javascript/behaviors/fullscreen.js";
import slideHorizontalV from "../../javascript/animations/slideHorizontalV.js";
import toggleVisibilidade from "../../javascript/behaviors/toggleVisibilidade.js";
import limparDOM from "../../javascript/utils/limparDom.js";
import limparElementosDom from "../../javascript/utils/limparElementosDom.js";


export default class HomeModel {

    async buscarNumeros() {
        return await pedirSequenciaDeNumerosAleatotios();
    }
 
    async _getMyName(){
        return await getMyName();
    }

    _slideHorizontalV(){
        return slideHorizontalV;
    }

    _toggleVisibilidade(){
        return toggleVisibilidade;
    }

    _manipulaFullscreen(){
        return manipulaFullscreen;
    }

    _limparDom(){
        return limparDOM;
    }

    _limparElementosDom(){
        return limparElementosDom;
    }
}