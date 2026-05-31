import BarraLateral from "../../../../components/barraLateral/BarraLateral.js";
import Botao from "../../../../components/botoes/Botao.js";
import BotaoEventoClick from "../../../../components/botoes/BotaoEventoClick.js";
import BotaoLinkParaOutraPagina from "../../../../components/botoes/BotaoLink.js";
import CaixaPadrao from "../../../../components/caixas/CaixaPadrao.js";
import ServeCaminhosProjeto from "../../../../javascript/services/serveCaminhosProjeto.js";
import Titulo from "../../../../components/titulo/Titulo.js";
import Relogio from "../../../../components/relogio/Relogio.js";
import Formulario from "../../../../components/formulario/Formulario.js";
import Intro from "../../../../components/intro/intro.js";
import Favicon from "../../../../components/favicon/Favicon.js";
import CaixaBasica from "../../../../components/caixas/CaixaBasica.js";
import Texto from "../../../../components/texto/Texto.js";
import TextoParaShowRoom from "./TextoParaShowroom.js";
import EditorDeTexto from "../../../../javascript/services/EditorDeTexto.js";

export default function showroom(eventos, navegacao){

    const texto = new TextoParaShowRoom();
    const editorTexto = new EditorDeTexto();

    const contentPrincipal                      = new CaixaBasica();
    contentPrincipal.atribuirWidth              = "100%"
    contentPrincipal.atribuirHeight             = "100%"
    contentPrincipal.atribuirZIndex             = "9";
    contentPrincipal.atribuirBackgroundColor    = "black";
    contentPrincipal.atribuirClassList          = "showroom";
    contentPrincipal.atribuirPosition           = "relative";

    contentPrincipal._removerConfiguracaoPadraoScrollbar();

    const BotaoLimparShowRoomDom = new BotaoEventoClick(()=>{navegacao._chamarProximaClasseDoLayout("chamaBlocoMain");})
    
    BotaoLimparShowRoomDom.atribuirTextContent      = "GO";
    BotaoLimparShowRoomDom.atribuirColor            = "white";
    BotaoLimparShowRoomDom.atribuirAlignItems       = "center";
    BotaoLimparShowRoomDom.atribuirJustifyContent   = "center";
    BotaoLimparShowRoomDom.atribuirFontSize         = "30px";
    BotaoLimparShowRoomDom.atribuirHoverColor       = "#006079"  

    let mapComBotoesBarraLateraEsquerdaShowRoom = new Map;
    
    mapComBotoesBarraLateraEsquerdaShowRoom.set(1,BotaoLimparShowRoomDom);
    
    const BarraLateraEsquerdaShowRoom = new BarraLateral("left" , mapComBotoesBarraLateraEsquerdaShowRoom , false );
    
    BarraLateraEsquerdaShowRoom.atribuirZIndex      = "9";
    BarraLateraEsquerdaShowRoom.atribuirClassList   = contentPrincipal.getClassList;
    
    const textoParaMainShowRoom = new Texto(
        {
            titulo: "Lotus Framework",
            paragrafos: [
                texto.get_Paragrafo1_titulo_LotusFramework,
            ]
        },
        {
            titulo: "Filosofia do Projeto",
            paragrafos: [
                texto._paragrafo1_titulo_FilosofiaDoProjeto,
                editorTexto._estilizarCodigo(texto._trexoCodigo1_titulo_FilosofiaDoProjeto),
                texto._paragrafo2_titulo_FilosofiaDoProjeto,
                editorTexto._estilizarCodigo(texto._trexoCodigo2_titulo_FilosofiaDoProjeto),
                texto._paragrafo3_titulo_FilosofiaDoProjeto,
            ]
        },
        {
            titulo: "Os Pilares da Arquitetura",
            paragrafos: [
                texto._paragrafo1_titulo_OsPilaresDaArquitetura,
                editorTexto._estilizarCodigo(texto._trexoCodigo1_titulo_OsPilaresDaArquitetura),
                texto._paragrafo2_titulo_OsPilaresDaArquitetura,
                texto._paragrafo3_titulo_OsPilaresDaArquitetura,
                editorTexto._estilizarCodigo(texto._trexoCodigo2_titulo_OsPilaresDaArquitetura),
                texto._paragrafo4_titulo_OsPilaresDaArquitetura,
                editorTexto._estilizarCodigo(texto._trexoCodigo3_titulo_OsPilaresDaArquitetura),
                texto._paragrafo5_titulo_OsPilaresDaArquitetura,
                editorTexto._estilizarCodigo(texto._trexoCodigo4_titulo_OsPilaresDaArquitetura),
                texto._paragrafo6_titulo_OsPilaresDaArquitetura,
                editorTexto._estilizarCodigo(texto._trexoCodigo5_titulo_OsPilaresDaArquitetura),
                texto._paragrafo7_titulo_OsPilaresDaArquitetura,
                editorTexto._estilizarCodigo(texto._trexoCodigo6_titulo_OsPilaresDaArquitetura),
                texto._paragrafo8_titulo_OsPilaresDaArquitetura,
                editorTexto._estilizarCodigo(texto._trexoCodigo7_titulo_OsPilaresDaArquitetura),
                texto._paragrafo9_titulo_OsPilaresDaArquitetura,
                editorTexto._estilizarCodigo(texto._trexoCodigo8_titulo_OsPilaresDaArquitetura),
                texto._paragrafo10_titulo_OsPilaresDaArquitetura,
                editorTexto._estilizarCodigo(texto._trexoCodigo9_titulo_OsPilaresDaArquitetura),
                texto.__paragrafo11_titulo_OsPilaresDaArquitetura,
            ]
        }
        
    )

    textoParaMainShowRoom._removerConfiguracaoPadraoScrollbar();
    textoParaMainShowRoom.atribuirWidth="900px";
    textoParaMainShowRoom.atribuirTop="50px";
    textoParaMainShowRoom.atribuirMarginTop="30px"
    textoParaMainShowRoom.atribuirPosition="relative"
    textoParaMainShowRoom.atribuirBackgroundColor="000000";

    contentPrincipal._addChild(textoParaMainShowRoom.elemento);
    
}