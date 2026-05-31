import BotaoEventoClick from "../../../../components/botoes/BotaoEventoClick.js";
import BarraLateral from "../../../../components/barraLateral/BarraLateral.js";
import ServeCaminhosProjeto from "../../../../javascript/services/serveCaminhosProjeto.js";

export default function barraLateralEsquerda(eventos , navegacao){

            const caminhos        = new ServeCaminhosProjeto();
            const botaoHome       = new BotaoEventoClick( ()=>eventos.onSlide1(relogio.getElemento, "80px" , 7000));
            const botaoPerfil     = new BotaoEventoClick( eventos.onRandom);
            const botaoFullscreen = new BotaoEventoClick( eventos.onFullscreen);
    
    
            botaoHome.atribuirBackgroundImage       = caminhos._serveUrlImage(caminhos._homeIcon);
            botaoPerfil.atribuirBackgroundImage     = caminhos._serveUrlImage(caminhos.perfilIcon);
            botaoFullscreen.atribuirBackgroundImage = caminhos._serveUrlImage(caminhos.openFullscreenIcon);
           
            botaoFullscreen.atribuirTop = "350px";
            botaoFullscreen._adicionarResponsividade(false , true , false, false , 1 ,1.15 ,1,1);
            
    
            const botoesEsquerda = new Map([
                [1, botaoHome],
                [2, botaoPerfil],
                [3, botaoFullscreen]
            ]);
    
            new BarraLateral("left", botoesEsquerda);
    
}