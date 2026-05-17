import CaixaBasica from "../../../../components/caixas/CaixaBasica.js";
import Botao from "../../../../components/botoes/Botao.js";

export default function exemploCaixaBasica(eventos){

        const caixaBasica  = new CaixaBasica(false);
        const caixa1       = new CaixaBasica(true);
        const botaoTeste   = new Botao();

        caixaBasica.atribuirPosition    = "relative"
        caixaBasica.atribuirLeft        = "450px";
        caixaBasica.atribuirTop         = "350px";

        caixa1.atribuirBackgroundColor  = "green";
        caixa1.atribuirWidth            = "100px";               
        
        caixa1._addChild(botaoTeste.getElemento);
        caixaBasica._addChild(caixa1.getElemento);

        //caixaBasica._desaparecer();
}