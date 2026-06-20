import Titulo from "../../components/titulo/Titulo.js";
import Relogio from "../../components/relogio/Relogio.js";
import Intro from "../../components/intro/intro.js";
import Favicon from "../../components/favicon/Favicon.js";
import CoordenadorLayout from "../../javascript/utils/CoordenadorLayout.js";
import BlocoExecucao from "../../javascript/utils/BlocosExecucao.js";
import DivParaNavegacao from "../../javascript/utils/DivParaNavegacao.js";
import LandingPage from "./layouts/landingPage/landingPage.js";
import AreaUsuario from "./layouts/areaUsuario/areaUsuario.js";
import Cronograma from "./layouts/cronograma/cronograma.js";
import PaginaQuestoes from "./layouts/paginaQuestoes/paginaQuestoes.js";

export default class HomeView {
    constructor() {
        this._navegacao = new DivParaNavegacao();
    }

    criarLayout(eventos) {
        // ============================================================
        // COMPONENTES GLOBAIS
        // ============================================================
        const favicon = new Favicon("O Monitor");
        const intro = new Intro();
        const titulo = new Titulo("O Monitor - Pré Alpha");
        const relogio = new Relogio();

        // ============================================================
        // BLOCO 1: LANDING PAGE (Tela inicial)
        // ============================================================
        const blocoLandingPage = new BlocoExecucao({
            existe: ["landing-page"],
            onEnter: [
                () => {
                    console.log("🚀 Entrando na Landing Page");
                    new LandingPage(eventos, this._navegacao);
                }
            ],
            onExit: [
                () => {
                    console.log("🔚 Saindo da Landing Page");
                    eventos.onLimparElementosDom("landing-page");
                }
            ]
        });

        // ============================================================
        // BLOCO 2: ÁREA DO USUÁRIO
        // ============================================================
        const blocoAreaUsuario = new BlocoExecucao({
            existe: ["area-usuario"],
            onEnter: [
                () => {
                    console.log("👤 Entrando na Área do Usuário");
                    new AreaUsuario(eventos, this._navegacao);
                }
            ],
            onExit: [
                () => {
                    console.log("🔚 Saindo da Área do Usuário");
                    eventos.onLimparElementosDom("area-usuario");
                }
            ]
        });

        // ============================================================
        // BLOCO 3: CRONOGRAMA
        // ============================================================
        const blocoCronograma = new BlocoExecucao({
            existe: ["pagina-cronograma"],
            onEnter: [
                () => {
                    console.log("📅 Entrando no Cronograma");
                    new Cronograma(eventos, this._navegacao);
                }
            ],
            onExit: [
                () => {
                    console.log("🔚 Saindo do Cronograma");
                    eventos.onLimparElementosDom("pagina-cronograma");
                }
            ]
        });

        // ============================================================
        // BLOCO 4: PÁGINA DE QUESTÕES
        // ============================================================
        const blocoPaginaQuestoes = new BlocoExecucao({
            existe: ["pagina-questoes"],
            onEnter: [
                () => {
                    console.log("📝 Entrando na Página de Questões");
                    new PaginaQuestoes(eventos, this._navegacao);
                }
            ],
            onExit: [
                () => {
                    console.log("🔚 Saindo da Página de Questões");
                    eventos.onLimparElementosDom("pagina-questoes");
                }
            ]
        });

        // ============================================================
        // COORDENADOR DE LAYOUT - Gerencia a ordem e transição entre os blocos
        // ============================================================
        new CoordenadorLayout(
            blocoLandingPage,      // 1º: Landing Page (tela inicial)
            blocoAreaUsuario,      // 2º: Área do Usuário
            blocoCronograma,       // 3º: Cronograma
            blocoPaginaQuestoes    // 4º: Página de Questões
        );
    }
}