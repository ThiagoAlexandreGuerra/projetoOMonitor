# Inicialização do Projeto

Este projeto utiliza o **Laravel** como servidor HTTP e backend, enquanto toda a interface da aplicação é desenvolvida utilizando o **Lotus**, um framework próprio escrito inteiramente em JavaScript puro (Vanilla JavaScript).

O Laravel é responsável pelo servidor, APIs e recursos do backend. O Lotus é responsável pela construção da interface, gerenciamento do Virtual DOM, componentes, navegação e lógica da aplicação no cliente.

---

# Pré-requisitos

Antes de iniciar o projeto, certifique-se de possuir instalado:

* PHP 8.2 ou superior
* Composer
* Node.js 20 ou superior
* NPM
* MySQL (ou outro banco compatível com o Laravel)

---

# Instalação

Clone o repositório:

```bash
git clone git@github.com:ThiagoAlexandreGuerra/projetoOMonitor.git
```

Entre na pasta do projeto:

```bash
cd <nome-do-projeto>/Omonitor_versao_PreAlfa/API
```

Instale as dependências do Laravel:

```bash
composer install
```

Instale as dependências JavaScript:

```bash
npm install
```

Copie o arquivo de configuração:

```bash
cp .env.example .env
```

No Windows:

```bash
copy .env.example .env
```

Gere a chave da aplicação:

```bash
php artisan key:generate
```

Configure as informações do banco de dados no arquivo `.env`.

Execute as migrations:

```bash
php artisan migrate
```

Caso existam seeders:

```bash
php artisan db:seed
```

---

# Iniciando o servidor

Inicie o servidor do Laravel:

```bash
php artisan serve
```

Por padrão, a aplicação ficará disponível em:

```
http://127.0.0.1:8000
```

---

# Estrutura do projeto

```
app/
bootstrap/
config/
database/
public/
│
├── APP/
│   ├── globalStyle/
│   ├── src/
│   │   ├── core/
│   │   ├── pages/
│   │   └── ...
│   │   
│   │  
│   │
│   └── manifest.webmanifest
│
resources/
routes/
storage/
```

---

# Como funciona

O navegador carrega diretamente o ponto de entrada do Lotus:

```html
<script type="module" src="./APP/src/core/main/main.js"></script>
```

A partir desse arquivo, todo o framework Lotus é inicializado e a aplicação passa a ser controlada pelo Virtual DOM e pelos componentes do próprio framework.

O Laravel atua apenas como servidor da aplicação e provedor das APIs.

---

# Desenvolvimento

Sempre que alterar arquivos JavaScript do Lotus, basta atualizar a página no navegador.

Como o framework utiliza módulos ES (`import` e `export`), não é necessário realizar etapas adicionais de compilação para o código do Lotus.

---

# Backend

As APIs devem ser criadas normalmente utilizando os recursos do Laravel.

Exemplo:

```
routes/api.php
```

Controllers:

```
app/Http/Controllers
```

Models:

```
app/Models
```

O Lotus pode consumir essas APIs utilizando `fetch()` ou qualquer camada de comunicação implementada no framework.

---

# Lotus Framework

O Lotus é um framework de interface desenvolvido em JavaScript vanilla, sem dependência de React, Vue ou Angular.

Entre suas principais características estão:

* Virtual DOM próprio;
* sistema de componentes;
* navegação entre layouts;
* gerenciamento de eventos;
* renderização dinâmica;
* arquitetura modular;
* suporte a PWA;
* integração com APIs Laravel.

---

# Observações

* O Lotus é carregado diretamente pelo navegador utilizando módulos ES.
* O Laravel é utilizado exclusivamente como backend e servidor da aplicação.
* Alterações no backend podem exigir reinicialização do servidor Laravel.
* Alterações no frontend normalmente requerem apenas atualizar a página no navegador.

---

# Executando o projeto

1. Inicie o banco de dados.
2. Execute o servidor Laravel:

```bash
php artisan serve
```

3. Abra o navegador em:

```
http://127.0.0.1:8000
```

A aplicação será carregada automaticamente, inicializando o Lotus e renderizando toda a interface da aplicação.
