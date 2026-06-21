import ContentAll from "../../../core/systemComponents/components/boxes/ContentAll.js";
import Title from "../../../core/systemComponents/components/title/Title.js";
import { virtualDom } from "../../../core/virtualDOM/main/virtualDom.js";
import SideBar from "../../../core/systemComponents/components/sideBar/SideBar.js";
import ClickEventButton from "../../../core/systemComponents/components/buttons/clickEventButton.js";
import AppInstallButton from "../../../core/PWA/src/installRoutine/AppInstallButton.js";
import Text from "../../../core/systemComponents/components/text/Text.js";
import Paragraph from "../../../core/systemComponents/components/paragraph/Paragraph.js";
import AnchorButton from "../../../core/systemComponents/components/buttons/AnchorButton.js";
import TextWithAnchors from "../../../core/systemComponents/components/text/TextWithAnchors.js";
import GetPath from "../../devTools/services/GetPath.js";


export default function explanations(navigation){

    const contentMain = new ContentAll();
    const installButton = new AppInstallButton();
    
        contentMain._addLayoutName("lexplanations");

        const navigationSideBar = new SideBar();
        const buttonGo = new ClickEventButton(()=>{navigation._setNextLayoutClass("lab")})
        const pageTitle = new Title("Lotus Framework")

        const explanationsText = new TextWithAnchors( "AnchorLinkHorizontal" ,
new Paragraph({
title:  `# Lotus`,

text:`
        Lotus é uma plataforma web experimental desenvolvida com foco em modularidade, extensibilidade e controle sobre a interface. O projeto nasceu da ideia de construir um ecossistema próprio de componentes e ferramentas, inspirado em conceitos presentes em frameworks modernos, mas mantendo uma arquitetura personalizada e totalmente desenvolvida do zero.
Atualmente, o projeto encontra-se em sua fase **Alpha**, representando uma etapa inicial de desenvolvimento. Embora diversas funcionalidades fundamentais já estejam presentes, a arquitetura continua em evolução e inúmeras melhorias, refatorações e novos recursos estão previstos para versões futuras.
`}),
new Paragraph({

title:   ` ## Filosofia do Projeto`,
    
text:   `
     O Lotus foi concebido com aspirações profissionais e tem como objetivo oferecer uma base sólida para a construção de aplicações web ricas, altamente configuráveis e independentes. Seu desenvolvimento é guiado por princípios como:
    
        * Arquitetura modular;
        * Reutilização de componentes;
        * Separação clara entre interface, renderização e comportamento;
        * Controle explícito do ciclo de vida dos elementos;
        * Extensibilidade para futuras funcionalidades;
        * Evolução contínua baseada em experimentação e refinamento.`
    
}),

new Paragraph({

title:  `## Estrutura Atual`,
subtitle:  `A plataforma possui diversos subsistemas próprios, incluindo:`,
text:    
    `
    * Sistema de componentes reutilizáveis;
    * Virtual DOM desenvolvido internamente;
    * Mecanismo de renderização e atualização diferencial;
    * Gerenciamento de layouts e coordenação entre elementos;
    * Sistema de estilos e controle visual;
    * Biblioteca de comportamentos e animações;
    * Ferramentas para navegação e manipulação do DOM;
    * Suporte a Progressive Web Apps (PWA);
    * Ambiente experimental para testes e desenvolvimento de recursos;
    * APIs e serviços auxiliares;
    * Área destinada à criação de componentes, funções e utilidades personalizadas.`
    
}),

new Paragraph({

title: `## Estado do Projeto`,
    
subtitle: `Esta versão deve ser considerada uma Alpha, o que significa que:`,
    
text:   ` 
    * Funcionalidades podem sofrer alterações significativas;
    * A estrutura interna continua passando por refatorações;
    * Novos módulos serão adicionados ao longo do desenvolvimento;
    * APIs ainda não são consideradas estáveis;
    * O desempenho e a experiência do usuário continuarão sendo aprimorados.
    `
}),

new Paragraph({
    
title: `## Visão de Longo Prazo`,
    
text:  `  O objetivo do Lotus é evoluir gradualmente para uma plataforma madura, capaz de fornecer uma experiência de desenvolvimento consistente e servir como base para aplicações mais complexas. O projeto é encarado como uma construção de longo prazo, onde cada nova versão representa um passo em direção a uma arquitetura mais robusta, flexível e profissional.
    
    Mais do que um conjunto de arquivos, o Lotus é uma iniciativa voltada ao estudo, experimentação e desenvolvimento de soluções próprias, com a intenção de transformar ideias em uma infraestrutura capaz de crescer continuamente ao longo do tempo.
    `
})
            
)
        explanationsText
            .setTop("200px")
    
        pageTitle.setLeft("120px")

        buttonGo
            .setTextContent("GO")
            .setColor("white")
            .setTextAlignmentCenterCenter();

        navigationSideBar
            ._addChild(buttonGo)
            ._addChild(installButton)
            

        contentMain
            ._addChild(pageTitle)
            ._addChild(explanationsText)
            ._addChild(navigationSideBar)
        

        virtualDom(contentMain.release());
}