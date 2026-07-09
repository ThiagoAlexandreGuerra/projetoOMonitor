# O Monitor

> Plataforma completa para preparação em concursos bancários, desenvolvida com **Laravel** e **Lotus Framework**.

---

## Sobre o Projeto

**O Monitor** é uma plataforma moderna desenvolvida para oferecer uma experiência completa de estudo voltada para concursos da área bancária.

Mais do que um simples banco de questões, o projeto foi concebido para ser um ambiente completo de preparação, reunindo resolução de questões, anotações, comentários, revisões, estatísticas, perfil do usuário e diversas ferramentas que tornam o estudo mais produtivo.

O projeto é desenvolvido utilizando **Laravel** no backend e **Lotus Framework** no frontend.

O Monitor possui uma característica bastante particular: **ele foi o projeto responsável pelo nascimento do Lotus Framework**.

Durante o desenvolvimento surgiu a necessidade de uma tecnologia que oferecesse total controle sobre performance, arquitetura, renderização, componentes e funcionamento offline. Dessa necessidade nasceu o Lotus, um framework inteiramente desenvolvido para tornar possível a construção do Monitor.

Por isso, embora sejam projetos independentes, o desenvolvimento dos dois acontece praticamente em paralelo.

> O Monitor impulsiona a evolução do Lotus e o Lotus torna possível a existência do Monitor.

---

# Status do Projeto

🚧 **Em desenvolvimento**

Tanto o **Monitor** quanto o **Lotus Framework** encontram-se em desenvolvimento contínuo.

A complexidade dos dois projetos faz com que novas funcionalidades sejam constantemente adicionadas e refinadas.

O objetivo não é apenas construir uma plataforma de estudos, mas também desenvolver uma base tecnológica capaz de sustentar aplicações web extremamente sofisticadas sem depender de frameworks externos.

---

# Filosofia do Projeto

O Monitor foi criado seguindo alguns princípios fundamentais:

* experiência semelhante à de aplicações nativas;
* funcionamento multiplataforma;
* alta performance;
* arquitetura orientada a componentes;
* funcionamento offline;
* interface totalmente responsiva;
* independência de bibliotecas externas;
* controle completo sobre todo o código da aplicação.

---

# O Lotus Framework

O frontend do Monitor é construído utilizando o **Lotus Framework**, um framework JavaScript criado especificamente para este projeto.

Ao contrário da maioria dos frameworks modernos, o Lotus não utiliza bibliotecas de terceiros para sua estrutura principal.

Toda sua arquitetura foi desenvolvida do zero, incluindo suas próprias soluções para:

* sistema de componentes;
* Virtual DOM;
* renderização inteligente;
* sistema de navegação;
* gerenciamento de estados;
* sistema de layouts;
* componentes visuais;
* responsividade;
* sistema de eventos;
* gerenciamento de ciclo de vida;
* comunicação entre componentes;
* armazenamento local;
* funcionamento offline;
* Progressive Web App (PWA);
* cache inteligente;
* entre diversas outras funcionalidades.

Cada módulo foi escrito especificamente para atender às necessidades do Monitor.

O Lotus representa anos de pesquisa e desenvolvimento em arquitetura frontend e continua evoluindo juntamente com o projeto.

---

# Principais Recursos do Monitor

## Banco de Questões

O Monitor possui um banco de questões pensado para oferecer uma experiência próxima à resolução de provas reais.

Entre os recursos disponíveis estão:

* organização por concursos;
* organização por bancas;
* organização por disciplinas;
* organização por assuntos;
* filtros avançados;
* histórico de resolução;
* acompanhamento de desempenho;
* resolução rápida;
* comentários;
* anotações pessoais;
* estatísticas individuais.

---

## Console de Resolução

Uma das principais características do projeto é o **Console de Resolução**.

Ele oferece um ambiente focado exclusivamente na resolução das questões, reduzindo distrações e permitindo que o estudante mantenha o foco durante seus estudos.

O console foi projetado para oferecer uma experiência rápida, intuitiva e confortável mesmo durante longas sessões de estudo.

---

## Perfil do Usuário

Cada usuário possui seu próprio ambiente de estudo contendo informações como:

* desempenho;
* progresso;
* estatísticas;
* histórico de questões;
* revisões;
* preferências;
* evolução ao longo do tempo.

---

## Sistema de Revisões

O projeto contempla mecanismos voltados para revisão do conteúdo estudado.

A proposta é permitir que o estudante acompanhe seu aprendizado continuamente, revisitando questões importantes e consolidando o conhecimento adquirido.

---

## Anotações

Cada questão pode possuir anotações personalizadas.

Isso permite transformar o banco de questões em um verdadeiro material de estudo, concentrando teoria, observações e comentários em um único ambiente.

---

## Organização Inteligente

Todo o conteúdo é estruturado para facilitar a navegação.

As questões podem ser organizadas por diversos critérios, tornando simples localizar exatamente o conteúdo desejado.

---

# Funcionalidades Herdadas do Lotus

Por ser desenvolvido inteiramente sobre o Lotus Framework, o Monitor herda automaticamente todas as funcionalidades padrão do framework.

Entre elas:

### Interface Responsiva

Toda a aplicação adapta automaticamente seus componentes para diferentes resoluções e tamanhos de tela.

---

### Progressive Web App

O Monitor pode ser instalado como um aplicativo.

Isso permite que a aplicação funcione de forma semelhante a um software nativo.

---

### Multiplataforma

O mesmo código é capaz de executar em:

* Windows
* Linux
* macOS
* Android
* iOS
* Navegadores modernos

---

### Experiência de Aplicativo Nativo

Quando instalado, o Monitor oferece comportamento semelhante ao de aplicações nativas.

Entre os recursos disponíveis:

* inicialização própria;
* funcionamento em tela cheia;
* integração com o sistema operacional;
* cache local;
* execução offline (quando suportado);
* atualização inteligente.

---

### Arquitetura Orientada a Componentes

Toda a interface é construída através de componentes reutilizáveis desenvolvidos no Lotus.

Essa arquitetura facilita manutenção, expansão e reutilização de código.

---

### Virtual DOM Próprio

O Lotus implementa seu próprio Virtual DOM.

Isso permite otimizações específicas para a arquitetura do Monitor, oferecendo maior controle sobre o processo de renderização.

---

### Navegação SPA

O Monitor funciona como uma Single Page Application, proporcionando uma navegação rápida e fluida entre as telas.

---

### Performance

Grande parte da arquitetura foi construída pensando em minimizar processamento desnecessário, renderizações redundantes e consumo de memória.

---

# Tecnologias

## Backend

* Laravel
* PHP
* MySQL

## Frontend

* Lotus Framework
* JavaScript (ES Modules)
* HTML5
* CSS3

---

# Estrutura do Projeto

O projeto é dividido em duas grandes partes.

## Monitor

Responsável pelas funcionalidades da plataforma de estudos.

Inclui:

* banco de questões;
* autenticação;
* gerenciamento de usuários;
* console de resolução;
* perfil;
* estatísticas;
* revisões;
* anotações;
* conteúdo da plataforma.

## Lotus Framework

Responsável por toda a infraestrutura do frontend.

Inclui:

* renderização;
* componentes;
* Virtual DOM;
* layouts;
* navegação;
* gerenciamento de estados;
* sistema de eventos;
* armazenamento local;
* funcionamento offline;
* PWA;
* arquitetura geral da interface.

Embora sejam independentes, ambos evoluem simultaneamente.

---

# Objetivos

O Monitor busca oferecer uma plataforma que concentre tudo o que um estudante necessita para sua preparação.

O desenvolvimento está focado em criar uma experiência rápida, organizada, intuitiva e eficiente, eliminando a necessidade de utilizar múltiplas ferramentas durante os estudos.

Ao mesmo tempo, o Lotus Framework continua sendo desenvolvido para fornecer a infraestrutura necessária para aplicações web modernas, mantendo total independência tecnológica e controle sobre cada camada da arquitetura.

---

# Diferenciais

* Framework próprio desenvolvido especificamente para o projeto.
* Nenhuma dependência estrutural de frameworks frontend externos.
* Arquitetura completamente orientada a componentes.
* Virtual DOM próprio.
* Sistema de renderização próprio.
* Sistema de navegação próprio.
* Responsividade nativa.
* Suporte a instalação como aplicativo.
* Funcionamento multiplataforma.
* Preparado para execução offline.
* Alto nível de controle sobre toda a aplicação.

---

# Aviso

Este projeto encontra-se em desenvolvimento ativo.

Novas funcionalidades são adicionadas continuamente tanto ao **Monitor** quanto ao **Lotus Framework**, refletindo a evolução conjunta de uma plataforma de estudos e de sua própria tecnologia base.

O objetivo de longo prazo é construir um ecossistema completo que una uma experiência de estudos de alto nível a um framework JavaScript desenvolvido integralmente com soluções próprias.
