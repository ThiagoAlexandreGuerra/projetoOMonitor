import ContentAll           from "../../../core/systemComponents/components/boxes/ContentAll.js";
import SideBar              from "../../../core/systemComponents/components/sideBar/SideBar.js";
import BoxWithCilldBoxes    from "../../../core/systemComponents/components/boxes/BoxWithChildBoxes.js";
import StandartBox          from "../../../core/systemComponents/components/boxes/StandardBox.js";
import ClickEventButton     from "../../../core/systemComponents/components/buttons/clickEventButton.js";
import Title                from "../../../core/systemComponents/components/title/Title.js";
import LayoutCoordenator    from "../../../core/layoutHandler/LayoutCoordinator/LayoutCoordinator.js";
import ExecutionBlock       from "../../../core/layoutHandler/ExecutionBlock/ExecutionBlock.js";
import StandartCircle       from "../../../core/systemComponents/components/circles/StandardCircle.js";
import GridLayout           from "../../../core/systemComponents/components/grid/GridLayout.js";
import Animations           from "../../devTools/animations/Animations.js";
import getDOMElement        from "../../../core/systemComponents/utils/getters/getDOMElement.js";
import { virtualDom }       from "../../../core/virtualDOM/main/virtualDom.js";
import Paragraph            from "../../../core/systemComponents/components/paragraph/Paragraph.js";
import Text                 from "../../../core/systemComponents/components/text/Text.js";
import GetPath              from "../../devTools/services/GetPath.js";

export default function showroom(navigation){

    let contentMain = new ContentAll();
    contentMain._addLayoutName("lshowroom");

    let animation  = new Animations();
    let sideBar     = new SideBar();
    
    let past        = new ClickEventButton(()=>{navigation._setNextLayoutClass("lab")})
            .setBackgroundImage(new GetPath().getchevronBackwar_24dp_b700ff());
                
        
    let labTitle    = new Title("Showroom");
    
    labTitle.setLeft("120px");

    sideBar
        ._addChild(past);

    let boxWithChildBoxHorizontal   = new BoxWithCilldBoxes(3, "horizontal");
    let boxWithChildBoxCascade      = new BoxWithCilldBoxes(3, "cascade");
    let boxWithChildBoxVertical     = new BoxWithCilldBoxes(3);
    
    boxWithChildBoxHorizontal
        .setHeight("500px")
        .setWidth("400px")
        .setBackgroundColor("black");
    
    
    boxWithChildBoxHorizontal.getSon().setBackgroundColor("#ffae00");
    boxWithChildBoxHorizontal.getGrandson().setBackgroundColor("#0011ff");
    boxWithChildBoxHorizontal.getGreatGrandson().setBackgroundColor("#0e5200");
    
    boxWithChildBoxCascade.getSon()
        .setBackgroundColor("#ff7300")

    let standartBox = new StandartBox();

    let standartCircle = new StandartCircle();

    let cardGrid = new GridLayout(20,4);

    cardGrid
        .setWidth("900px")

    for(let i =0 ; i < cardGrid.getCardLength() ; i++ ){
        
        cardGrid.getCard(i).setBackgroundColor(i%2 == 0?"blue":"yellow");
        cardGrid.getCard(i)._addBehaviorFunction(animation.hoverAnimation());
        cardGrid.getCard(i)._addEventListener("click" , cardGrid.getCard(1).setBackgroundColor_PF("red"));
    }
    
    
    let standartBoxAnimationDepthEffectAnimation   = new StandartBox();

    standartBoxAnimationDepthEffectAnimation.setTextContent("standartBoxAnimationDepthEffectAnimation");
    
    let bottonForstandartBoxAnimationDepthEffectAnimation = new ClickEventButton(animation.depthEffectAnimation(standartBoxAnimationDepthEffectAnimation,20000));
    bottonForstandartBoxAnimationDepthEffectAnimation.setBackgroundColor("orange");
    sideBar._addChild(bottonForstandartBoxAnimationDepthEffectAnimation);

    let standartBoxTestHover = new StandartBox();
    standartBoxTestHover._addBehaviorFunction(animation.hoverAnimation());

    let showroomText = new Text(
new Paragraph({

title:
`O Melhor Amigo do Desenvolvedor`,
text:`Como a fidelidade canina inspira a arquitetura de sistemas e a rotina dos profissionais de tecnologia
    A relação entre seres humanos e cachorros remonta a milhares de anos, fundamentada no companheirismo, 
    na proteção mútua e na empatia. Com o advento da era digital, essa conexão não se extinguiu; pelo con-
    trário, ela encontrou novas formas de se manifestar. No ecossistema tecnológico atual, cães deixaram de
    ser apenas animais de estimação para se tornarem verdadeiros pilares de suporte emocional para progra-
    madores, engenheiros de software e cientistas de dados que enfrentam rotinas exaustivas de trabalho 
    intelectual.
  `  
})
.font_courierNew(),
new Paragraph({
title:
`Sincronia Biológica no Mundo Digital`,
text:`A presença de um cão em um ambiente de desenvolvimento atua como um regulador natural de estresse. Lon-
    gas jornadas de depuração de código e reuniões de alinhamento técnico tendem a isolar o profissional em 
    um plano puramente abstrato. O cachorro, com suas necessidades físicas e afeto incondicional, força in-
    terrupções benéficas — as famosas pausas ativas —, essenciais para prevenir a estafa mental e estimular
    lampejos de criatividade na resolução de problemas complexos.
    
    Além do impacto no bem-estar, a própria lógica do comportamento canino e de sua interação com os tutores 
    pode ser metaforicamente traduzida para o desenvolvimento de software. A lealdade de um cão e sua prontidão 
    para responder a estímulos específicos assemelham-se ao conceito de sistemas orientados a eventos, onde um 
    observador atencioso aguarda um gatilho para executar sua função com máxima precisão.
  `  
}),

new Paragraph({
title:`Modelando a Lealdade em Código`,

text:`Para ilustrar essa sinergia entre a natureza canina e a engenharia de software, podemos idealizar um modelo
    conceitual em C++. O trecho abaixo demonstra como estruturaríamos uma classe que representa o comportamento
    vigilante e fiel de um cachorro, reagindo a eventos externos através de referências modernas da linguagem:
    
    C++
    #include <iostream>
    #include <string>
    #include <memory>
    
    class Cachorro {
        private:
        std::string nome;
        int nivelAlegria;
        
        public:
        Cachorro(const std::string& _nome) : nome(_nome), nivelAlegria(100) {}
        
        void reagirAoDono(const std::string& evento) {
            if (evento == "Chegou em casa") {
                nivelAlegria += 50;
                std::cout << nome << " abanou o rabo vigorosamente! Nível de alegria: " << nivelAlegria << std::endl;
            } else if (evento == "Digitando codigo") {
                std::cout << nome << " deitou calmamente ao lado da cadeira de trabalho." << std::endl;
            }
        }
    };
    
    int main() {
        // Criando o melhor amigo utilizando ponteiros inteligentes (smart pointers)
        auto meuPet = std::make_unique<Cachorro>("Linux");
        
        meuPet->reagirAoDono("Chegou em casa");
        meuPet->reagirAoDono("Digitando codigo");
        return 0;
    }
    
    
    
    A arquitetura limpa do código reflete a clareza da relação: para cada ação do tutor, há uma resposta comportamental programada pela evolução biológica. Enquanto a tecnologia avança rumo a inteligências artificiais complexas e automações profundas, o suporte mais confiável do desenvolvedor continua sendo puramente orgânico, caloroso e analógico.
    
    ¹ Nota de rodapé: O termo "ocitocina digital" tem sido utilizado de forma anedótica por profissionais de TI para descrever o alívio imediato do estresse ao interagir com animais domésticos durante janelas de compilação ou falhas críticas de infraestrutura de servidores.
    `
}),

)
    .setTop("200px")
    

    
    contentMain
        ._addChild(labTitle)
        ._addChild(sideBar)
        ._addChild(boxWithChildBoxHorizontal)
        ._addChild(boxWithChildBoxCascade)
        ._addChild(boxWithChildBoxVertical)
        ._addChild(standartBox)
        ._addChild(cardGrid)
        ._addChild(standartCircle)
        ._addChild(standartBoxAnimationDepthEffectAnimation)
        ._addChild(standartBoxTestHover)
        ._addChild(showroomText);

    virtualDom(contentMain.release());
}

