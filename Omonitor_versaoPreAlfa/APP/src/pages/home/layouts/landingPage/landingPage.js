import renderizarElementos from "../../../../javascript/utils/renderizarElementos.js";

export default class LandingPage {
    constructor(eventos, navegacao) {
        this.eventos = eventos;
        this.navegacao = navegacao;
        this.container = null;
        this.criarLandingPage();
    }

    criarLandingPage() {
        this.container = renderizarElementos("div", {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "#000000",
            overflowY: "auto",
            zIndex: "1000"
        }, {}, true);

        this.container.className = "landing-page";
        this.criarHeader();
        this.criarHeroSection();
        this.criarSecaoMaterias();
        this.criarSobreNos();
        this.criarFooter();
    }

    criarHeader() {
        const header = renderizarElementos("div", {
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            backgroundColor: "#000000",
            borderBottom: "2px solid #FFB800",
            padding: "16px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: "1001"
        });

        const logo = renderizarElementos("h2", {
            fontSize: "20px",
            color: "#ffffff",
            margin: "0"
        }, { innerHTML: "<span style='border:1px solid #ffffff;padding:4px 8px;color:#ffffff;'>O</span> <span style='color:#ffffff;'>Monitor</span>" });

        const btnAreaUsuario = renderizarElementos("button", {
            padding: "10px 24px",
            backgroundColor: "transparent",
            color: "#ffffff",
            border: "1px solid #FFB800",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.3s ease"
        }, { innerHTML: '<i class="fas fa-user" style="margin-right: 8px;"></i> Área do Usuário' });

        btnAreaUsuario.onmouseenter = () => {
            btnAreaUsuario.style.backgroundColor = "#FFB800";
            btnAreaUsuario.style.color = "#000000";
        };

        btnAreaUsuario.onmouseleave = () => {
            btnAreaUsuario.style.backgroundColor = "transparent";
            btnAreaUsuario.style.color = "#ffffff";
        };

        // CORREÇÃO AQUI: agora navega para "area-usuario"
        btnAreaUsuario.onclick = () => {
        // Remove o container da Landing Page
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        // Navega para a Área do Usuário
        this.navegacao._chamarProximaClasseDoLayout("area-usuario");
    };
        header.appendChild(logo);
        header.appendChild(btnAreaUsuario);
        this.container.appendChild(header);
    }

    criarHeroSection() {
        const hero = renderizarElementos("div", {
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "120px 20px 80px",
            textAlign: "center"
        });

        const badge = renderizarElementos("div", {
            border: "2px solid #FFB800",
            padding: "8px 24px",
            marginBottom: "40px",
            fontSize: "14px",
            letterSpacing: "2px",
            color: "#FFB800",
            backgroundColor: "transparent"
        }, { textContent: "CONCURSO BB 2025" });

        const titulo = renderizarElementos("h1", {
            fontSize: "56px",
            fontWeight: "800",
            color: "#ffffff",
            marginBottom: "24px",
            lineHeight: "1.2"
        }, { innerHTML: '<span style="border:2px solid #ffffff;padding:4px 12px;display:inline-block;margin-bottom:20px;color:#ffffff;">O Monitor</span><br>Prepare-se para o<br><span style="border-bottom:2px solid #FFB800;">Banco do Brasil</span>' });

        const subtitulo = renderizarElementos("p", {
            fontSize: "18px",
            color: "#888888",
            marginBottom: "40px",
            maxWidth: "600px",
            lineHeight: "1.6"
        }, { textContent: "Mais de 1000 questões de provas anteriores, filtradas por disciplina, assunto e nível de dificuldade. Acompanhe seu desempenho e alcance sua aprovação." });

        hero.appendChild(badge);
        hero.appendChild(titulo);
        hero.appendChild(subtitulo);

        const botoesDiv = renderizarElementos("div", {
            display: "flex",
            gap: "16px",
            marginBottom: "60px",
            flexWrap: "wrap",
            justifyContent: "center"
        });

        const btnCadastrar = renderizarElementos("button", {
            padding: "14px 32px",
            backgroundColor: "#FFB800",
            color: "#000000",
            border: "none",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease"
        }, { innerHTML: 'Começar agora <i class="fas fa-arrow-right" style="margin-left: 8px;"></i>' });

        btnCadastrar.onmouseenter = () => btnCadastrar.style.backgroundColor = "#E5A600";
        btnCadastrar.onmouseleave = () => btnCadastrar.style.backgroundColor = "#FFB800";
        btnCadastrar.onclick = () => this.navegacao._chamarProximaClasseDoLayout("pagina-questoes");

        const btnDemo = renderizarElementos("button", {
            padding: "14px 32px",
            backgroundColor: "transparent",
            color: "#ffffff",
            border: "1px solid #FFB800",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease"
        }, { innerHTML: '<i class="fas fa-play" style="margin-right: 8px;"></i> Ver demonstração' });

        btnDemo.onmouseenter = () => {
            btnDemo.style.backgroundColor = "#FFB800";
            btnDemo.style.color = "#000000";
        };

        btnDemo.onmouseleave = () => {
            btnDemo.style.backgroundColor = "transparent";
            btnDemo.style.color = "#ffffff";
        };

        btnDemo.onclick = () => this.navegacao._chamarProximaClasseDoLayout("pagina-questoes");

        botoesDiv.appendChild(btnCadastrar);
        botoesDiv.appendChild(btnDemo);
        hero.appendChild(botoesDiv);

        const statsDiv = renderizarElementos("div", {
            display: "flex",
            gap: "60px",
            flexWrap: "wrap",
            justifyContent: "center"
        });

        const stats = [
            { num: "1000+", label: "Questões" },
            { num: "10+", label: "Disciplinas" },
            { num: "5000+", label: "Usuários" }
        ];

        stats.forEach(stat => {
            const statItem = renderizarElementos("div", { textAlign: "center" });
            const num = renderizarElementos("div", {
                fontSize: "36px",
                fontWeight: "700",
                color: "#ffffff"
            }, { textContent: stat.num });
            const label = renderizarElementos("div", {
                fontSize: "14px",
                color: "#888888"
            }, { textContent: stat.label });
            statItem.appendChild(num);
            statItem.appendChild(label);
            statsDiv.appendChild(statItem);
        });

        hero.appendChild(statsDiv);
        this.container.appendChild(hero);
    }

    criarSecaoMaterias() {
        const materiasSecao = renderizarElementos("div", {
            backgroundColor: "#0a0a0a",
            padding: "80px 20px",
            textAlign: "center"
        });

        const titulo = renderizarElementos("h2", {
            fontSize: "36px",
            fontWeight: "700",
            color: "#ffffff",
            marginBottom: "16px"
        }, { innerHTML: "Matérias <span style='border-bottom:2px solid #FFB800;'>Disponíveis</span>" });

        const subtitulo = renderizarElementos("p", {
            fontSize: "18px",
            color: "#888888",
            marginBottom: "60px"
        }, { textContent: "Conteúdo completo para sua preparação" });

        const grid = renderizarElementos("div", {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "24px",
            maxWidth: "1200px",
            margin: "0 auto"
        });

        const materias = [
            { icone: "fa-calculator", nome: "Matemática", questoes: "250+ questões" },
            { icone: "fa-chart-line", nome: "Estatística", questoes: "180+ questões" },
            { icone: "fa-gavel", nome: "Direito", questoes: "320+ questões" },
            { icone: "fa-language", nome: "Português", questoes: "200+ questões" },
            { icone: "fa-brain", nome: "Raciocínio Lógico", questoes: "150+ questões" },
            { icone: "fa-university", nome: "Conhecimentos Bancários", questoes: "300+ questões" },
            { icone: "fa-chart-pie", nome: "Economia", questoes: "120+ questões" },
            { icone: "fa-laptop-code", nome: "Informática", questoes: "180+ questões" }
        ];

        materias.forEach(m => {
            const card = renderizarElementos("div", {
                backgroundColor: "#000000",
                border: "1px solid #333333",
                padding: "32px 24px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.3s ease"
            });

            card.onmouseenter = () => {
                card.style.borderColor = "#FFB800";
                card.style.transform = "translateY(-5px)";
            };

            card.onmouseleave = () => {
                card.style.borderColor = "#333333";
                card.style.transform = "translateY(0)";
            };

            card.onclick = () => this.navegacao._chamarProximaClasseDoLayout("pagina-questoes");

            const icone = renderizarElementos("i", {
                fontSize: "48px",
                color: "#ffffff",
                marginBottom: "16px",
                display: "block"
            }, { className: `fas ${m.icone}` });

            const nome = renderizarElementos("h3", {
                fontSize: "18px",
                color: "#ffffff",
                marginBottom: "8px"
            }, { textContent: m.nome });

            const questoes = renderizarElementos("p", {
                fontSize: "14px",
                color: "#888888"
            }, { textContent: m.questoes });

            card.appendChild(icone);
            card.appendChild(nome);
            card.appendChild(questoes);
            grid.appendChild(card);
        });

        materiasSecao.appendChild(titulo);
        materiasSecao.appendChild(subtitulo);
        materiasSecao.appendChild(grid);
        this.container.appendChild(materiasSecao);
    }

    criarSobreNos() {
        const sobreSecao = renderizarElementos("div", {
            padding: "80px 20px",
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            gap: "60px",
            flexWrap: "wrap"
        });

        const textoCol = renderizarElementos("div", {
            flex: "1",
            minWidth: "280px"
        });

        const badge = renderizarElementos("span", {
            color: "#FFB800",
            fontSize: "14px",
            letterSpacing: "2px",
            display: "block",
            marginBottom: "16px"
        }, { textContent: "SOBRE NÓS" });

        const titulo = renderizarElementos("h2", {
            fontSize: "36px",
            fontWeight: "700",
            color: "#ffffff",
            marginBottom: "24px"
        }, { innerHTML: "Quem está por trás do <span style='border-bottom:2px solid #FFB800;'>O Monitor</span>?" });

        const desc = renderizarElementos("p", {
            fontSize: "16px",
            color: "#888888",
            lineHeight: "1.6",
            marginBottom: "32px"
        }, { textContent: "Somos uma equipe de estudantes de Ciência da Computação apaixonados por educação e tecnologia. O Monitor nasceu da necessidade de uma ferramenta gratuita e eficiente para ajudar concurseiros a se prepararem para o concurso do Banco do Brasil." });

        textoCol.appendChild(badge);
        textoCol.appendChild(titulo);
        textoCol.appendChild(desc);

        const features = [
            { icone: "fa-users", titulo: "Time Dedicado", desc: "Desenvolvedores focados em criar a melhor experiência" },
            { icone: "fa-chalkboard-user", titulo: "Foco no Estudante", desc: "Tudo pensado para otimizar seus estudos" },
            { icone: "fa-rocket", titulo: "Em Constante Evolução", desc: "Atualizações semanais com novas funcionalidades" }
        ];

        const featuresContainer = renderizarElementos("div", {
            display: "flex",
            flexDirection: "column",
            gap: "24px"
        });

        features.forEach(f => {
            const feature = renderizarElementos("div", {
                display: "flex",
                gap: "16px",
                alignItems: "flex-start"
            });

            const icone = renderizarElementos("i", {
                fontSize: "24px",
                color: "#FFB800"
            }, { className: `fas ${f.icone}` });

            const textDiv = renderizarElementos("div", {});

            const tituloFeat = renderizarElementos("h4", {
                fontSize: "18px",
                color: "#ffffff",
                marginBottom: "8px"
            }, { textContent: f.titulo });

            const descFeat = renderizarElementos("p", {
                fontSize: "14px",
                color: "#888888"
            }, { textContent: f.desc });

            textDiv.appendChild(tituloFeat);
            textDiv.appendChild(descFeat);
            feature.appendChild(icone);
            feature.appendChild(textDiv);
            featuresContainer.appendChild(feature);
        });

        textoCol.appendChild(featuresContainer);

        const imagemCol = renderizarElementos("div", {
            flex: "1",
            minWidth: "280px",
            backgroundColor: "#111111",
            border: "1px solid #FFB800",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px"
        });

        const placeholder = renderizarElementos("i", {
            fontSize: "100px",
            color: "#FFB800"
        }, { className: "fas fa-graduation-cap" });

        imagemCol.appendChild(placeholder);
        sobreSecao.appendChild(textoCol);
        sobreSecao.appendChild(imagemCol);
        this.container.appendChild(sobreSecao);
    }

    criarFooter() {
        const footer = renderizarElementos("div", {
            backgroundColor: "#111111",
            borderTop: "2px solid #FFB800",
            padding: "60px 20px 20px"
        });

        const content = renderizarElementos("div", {
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "40px",
            maxWidth: "1200px",
            margin: "0 auto",
            marginBottom: "40px"
        });

        const logoDiv = renderizarElementos("div", {});

        const logo = renderizarElementos("h3", {
            fontSize: "24px",
            color: "#ffffff",
            marginBottom: "16px",
            whiteSpace: "nowrap"
        }, { innerHTML: "<span style='border:1px solid #ffffff;padding:4px 8px;color:#ffffff;'>O</span> <span style='color:#ffffff;'>Monitor</span>" });

        const slogan = renderizarElementos("p", {
            color: "#888888",
            fontSize: "14px",
            maxWidth: "250px"
        }, { textContent: "Sua plataforma de estudos para o concurso do Banco do Brasil." });

        logoDiv.appendChild(logo);
        logoDiv.appendChild(slogan);

        const linksDiv = renderizarElementos("div", {});

        const linksTitulo = renderizarElementos("h4", {
            fontSize: "18px",
            color: "#ffffff",
            marginBottom: "20px"
        }, { textContent: "Links Rápidos" });

        const linksList = renderizarElementos("ul", {
            listStyle: "none",
            padding: "0",
            margin: "0"
        });

        const links = ["Início", "Matérias", "Sobre Nós", "Área do Usuário"];

    links.forEach(link => {
        const li = renderizarElementos("li", { marginBottom: "12px" });
        const a = renderizarElementos("a", {
        color: "#888888",
        textDecoration: "none",
        cursor: "pointer",
        transition: "color 0.3s ease"
    }, { textContent: link });

        a.onmouseenter = () => a.style.color = "#FFB800";
        a.onmouseleave = () => a.style.color = "#888888";

        a.onclick = () => {
         if (link === "Início") window.scrollTo({ top: 0, behavior: "smooth" });
         if (link === "Matérias") document.querySelector(".landing-page")?.scrollIntoView({ behavior: "smooth" });
         // CORREÇÃO AQUI: agora navega para "area-usuario"
         if (link === "Área do Usuário") this.navegacao._chamarProximaClasseDoLayout("area-usuario");
     };

     li.appendChild(a);
     linksList.appendChild(li);
        });

        linksDiv.appendChild(linksTitulo);
        linksDiv.appendChild(linksList);

        const contatoDiv = renderizarElementos("div", {});

        const contatoTitulo = renderizarElementos("h4", {
            fontSize: "18px",
            color: "#ffffff",
            marginBottom: "20px"
        }, { textContent: "Contato" });

        const email = renderizarElementos("p", {
            color: "#FFB800"
        }, { innerHTML: '<i class="fas fa-envelope" style="margin-right: 8px;"></i> contato@omonitor.com' });

        contatoDiv.appendChild(contatoTitulo);
        contatoDiv.appendChild(email);

        content.appendChild(logoDiv);
        content.appendChild(linksDiv);
        content.appendChild(contatoDiv);

        const copyright = renderizarElementos("div", {
            textAlign: "center",
            paddingTop: "20px",
            borderTop: "1px solid #333333",
            color: "#888888",
            fontSize: "14px"
        }, { textContent: "© 2025 O Monitor. Todos os direitos reservados." });

        footer.appendChild(content);
        footer.appendChild(copyright);
        this.container.appendChild(footer);
    }

    getElemento() {
        return this.container;
    }
}