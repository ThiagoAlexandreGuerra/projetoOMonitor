import BotaoEventoClick from "../../../../components/botoes/BotaoEventoClick.js";
import BarraLateral from "../../../../components/barraLateral/BarraLateral.js";
import ServeCaminhosProjeto from "../../../../javascript/services/serveCaminhosProjeto.js";

export default function barraLateralDireita(eventos , navegacao ){

    let botaoDireita= new BotaoEventoClick(eventos.onGetName);
    const botaoTesteMultiFunctions = new BotaoEventoClick  ( 
                                            () => console.log("função 1"),
                                            () => console.log("função 2"),
                                            () => console.log("função 3")
                                        );
    let botaoApareceDesapareceRelojo= new BotaoEventoClick(()=>eventos.onToggleVisibilidade(relogio.elemento) )
    botaoApareceDesapareceRelojo.atribuirMarginTop="150%";
    
    let meuBotaoBarraLateralDireita = new Map;
    meuBotaoBarraLateralDireita.set(1, botaoDireita);
    meuBotaoBarraLateralDireita.set(2, botaoApareceDesapareceRelojo);
    meuBotaoBarraLateralDireita.set(3, botaoTesteMultiFunctions);
    

    let barraLateralDireita = new BarraLateral("right" , meuBotaoBarraLateralDireita);
}