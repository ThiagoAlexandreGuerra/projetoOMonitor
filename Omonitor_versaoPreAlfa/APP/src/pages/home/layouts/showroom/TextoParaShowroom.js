export default class TextoParaShowRoom{

    constructor(){

        this._Paragrafo1_titulo_LotusFramework = `
            O Lotus é um framework front-end orientado a objetos, desenvolvido
            para criação rápida de interfaces web modernas, dinâmicas e altamente
            personalizáveis.

            A proposta central do Lotus é simples: transformar a construção
            de interfaces em algo modular, elegante e intuitivo, sem a necessidade
            de manipular manualmente grandes blocos de HTML e CSS.

            Em vez de pensar em elementos soltos na página, o Lotus trabalha
            com componentes inteligentes, que encapsulam comportamento,
            aparência e responsividade dentro de classes reutilizáveis.`;
        
        this._paragrafo1_titulo_FilosofiaDoProjeto = ` 
            O framework foi construído sobre três pilares:

            1. Simplicidade Estrutural

            Cada elemento visual é tratado como um objeto.

            Isso significa que criar uma interface deixa de ser algo como:`
        this._trexoCodigo1_titulo_FilosofiaDoProjeto=`
        
document.createElement(...)
style...
appendChild(...)
addEventListener(...)
        
        `
        this._paragrafo2_titulo_FilosofiaDoProjeto=`
            e passa a ser:`
        this._trexoCodigo2_titulo_FilosofiaDoProjeto=`const botao = new Botao();`
        
        this._paragrafo3_titulo_FilosofiaDoProjeto=`O componente já nasce funcional, estilizado e pronto para uso.`    
        

        this._paragrafo1_titulo_OsPilaresDaArquitetura = `
            <strong>1. Abstração Estrutural</strong>
            
            Cada elemento visual é tratado como uma entidade independente.
            
            Isso significa que um botão não é apenas uma <div> estilizada.
            Ele é um objeto que conhece:
            
            sua aparência
            seu comportamento
            sua responsividade
            sua interação com o layout
            seu ciclo de vida
            
        Exemplo:
        `
        
        this._trexoCodigo1_titulo_OsPilaresDaArquitetura=`const botao = new BotaoEventoClick(() => login());`
        
        this._paragrafo2_titulo_OsPilaresDaArquitetura=`
            O elemento já nasce:

            renderizado
            estilizado
            preparado para eventos
            integrado à arquitetura
        `

        this._paragrafo3_titulo_OsPilaresDaArquitetura=`
            <strong>2. Configuração Centralizada</strong>

            A classe ConfiguracaoPadrao atua como núcleo visual.

            Ela fornece:

            getters e setters reativos
            atualização automática no DOM
            gerenciamento de posicionamento
            manipulação dinâmica de estilo
            abstração declarativa de CSS

            Exemplo:`

        this._trexoCodigo2_titulo_OsPilaresDaArquitetura = `
            botao.atribuirWidth = "120px";
            botao.atribuirBackgroundColor = "#242424";
            botao.atribuirBottom = "10px";
        `
        this._paragrafo4_titulo_OsPilaresDaArquitetura = `
            Ao alterar uma propriedade, a interface responde imediatamente.

            Sem necessidade de:
        `
        this._trexoCodigo3_titulo_OsPilaresDaArquitetura=`element.style.width = ...`

        this._paragrafo5_titulo_OsPilaresDaArquitetura =` 
            <strong>3. Composição Declarativa</strong>

            Interfaces complexas são construídas pela composição de objetos.

            Exemplo:`
        this._trexoCodigo4_titulo_OsPilaresDaArquitetura=`const formulario = new Formulario("Autenticação","email", "password" );`
        this._paragrafo6_titulo_OsPilaresDaArquitetura=`
            Internamente, o componente organiza:

            estrutura
            inputs
            hierarquia visual
            comportamento responsivo

            A intenção é permitir que a construção da interface se aproxime da descrição lógica dela.

            Você descreve o que deseja, não como montar manualmente.
        

            
            <strong>4. Layout Coordenado</strong>

            Com CoordenadorLayout e BlocoExecucao, o fluxo visual passa a responder ao estado da aplicação.

            Isso permite:

            renderização condicional
            troca automática de views
            execução contextual de blocos
            navegação declarativa

            Exemplo:
        `
        this._trexoCodigo5_titulo_OsPilaresDaArquitetura = `
new CoordenadorLayout(
    blocoShowroom,
    blocoMainView
);` 
        this._paragrafo7_titulo_OsPilaresDaArquitetura =`
            A interface passa a reagir ao ambiente.

            5. Responsividade Programática

            Ao invés de depender exclusivamente de media queries, os elementos podem recalcular posição e dimensão dinamicamente.

            Exemplo:
        `
        this._trexoCodigo6_titulo_OsPilaresDaArquitetura=`botao._adicionarResponsividade();`

        this._paragrafo8_titulo_OsPilaresDaArquitetura=`
            Isso torna a responsividade parte da lógica do componente.

            6. Inputs Inteligentes

            Os inputs carregam semântica própria.

            Ao criar:
        `
        this._trexoCodigo7_titulo_OsPilaresDaArquitetura=`new Input("email")`

        this._paragrafo9_titulo_OsPilaresDaArquitetura = `
            o componente automaticamente entende:

            tipo
            placeholder
            label
            estilo apropriado
            coleta de dados

            E pode ser consultado diretamente:
        `
        this._trexoCodigo8_titulo_OsPilaresDaArquitetura=`input.getData`

        this._paragrafo10_titulo_OsPilaresDaArquitetura = `
            Ou agregado em formulários:
        `
        this._trexoCodigo9_titulo_OsPilaresDaArquitetura=`formulario.getData`

        this.__paragrafo11_titulo_OsPilaresDaArquitetura=`
            <strong>Visão</strong>

            A ideia central é:

            Construir interfaces deve se parecer mais com modelagem de sistemas do que com manipulação manual de elementos.

            Cada componente deve existir como uma unidade lógica completa.

            Não apenas um elemento no DOM.
        `
            
    }

    get get_Paragrafo1_titulo_LotusFramework(){
        return this._Paragrafo1_titulo_LotusFramework;
    }

    get get_paragrafo1_titulo_FilosofiaDoProjeto(){
        return this._paragrafo1_titulo_FilosofiaDoProjeto;
    }
}