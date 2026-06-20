import renderizarElementos from "../../../../javascript/utils/renderizarElementos.js";

export default class AreaUsuario {
    constructor(eventos, navegacao) {
        this.eventos = eventos;
        this.navegacao = navegacao;
        this.container = null;
        this.criarAreaUsuario();
    }

    criarAreaUsuario() {
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

        this.container.className = "area-usuario";

        this.criarHeader();
        this.criarHero();
        this.criarConteudo();
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

        const navDiv = renderizarElementos("div", {
            display: "flex",
            gap: "16px"
        });

        const btnVoltar = renderizarElementos("button", {
            padding: "8px 20px",
            backgroundColor: "transparent",
            color: "#ffffff",
            border: "1px solid #FFB800",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            transition: "all 0.3s ease"
        }, { innerHTML: '<i class="fas fa-arrow-left" style="margin-right: 8px;"></i> Voltar' });

        btnVoltar.onmouseenter = () => {
            btnVoltar.style.backgroundColor = "#FFB800";
            btnVoltar.style.color = "#000000";
        };
        btnVoltar.onmouseleave = () => {
            btnVoltar.style.backgroundColor = "transparent";
            btnVoltar.style.color = "#ffffff";
        };

        btnVoltar.onclick = () => {
            if (this.container && this.container.parentNode) {
                this.container.parentNode.removeChild(this.container);
            }
            document.querySelectorAll(".showroom, .intro, .caixaBasica, .barraLateral, .displayQuestoes, .formulario, .exemploCaixaBasica, .chamaBlocoMain, .iniciar")
                .forEach(el => el.remove());
            document.body.className = "landing-page";
            import("./landingPage.js").then(module => {
                const LandingPage = module.default;
                new LandingPage(this.eventos, this.navegacao);
            }).catch(() => {
                window.location.reload();
            });
        };

        navDiv.appendChild(btnVoltar);
        header.appendChild(logo);
        header.appendChild(navDiv);
        this.container.appendChild(header);
    }

    criarHero() {
        const hero = renderizarElementos("div", {
            backgroundColor: "#0a0a0a",
            padding: "100px 32px 40px",
            textAlign: "center",
            borderBottom: "1px solid #333333"
        });

        const avatar = renderizarElementos("div", {
            width: "80px",
            height: "80px",
            backgroundColor: "#FFB800",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: "36px",
            color: "#000000"
        }, { textContent: "👤" });

        const nome = renderizarElementos("h1", {
            fontSize: "32px",
            fontWeight: "700",
            color: "#ffffff",
            marginBottom: "8px"
        }, { textContent: "Bem-vindo(a), Usuário!" });

        const email = renderizarElementos("p", {
            fontSize: "16px",
            color: "#888888"
        }, { textContent: "usuario@email.com" });

        hero.appendChild(avatar);
        hero.appendChild(nome);
        hero.appendChild(email);
        this.container.appendChild(hero);
    }

    criarConteudo() {
        const conteudo = renderizarElementos("div", {
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "40px 32px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "32px"
        });

        // Coluna Esquerda
        const colEsquerda = renderizarElementos("div", {
            display: "flex",
            flexDirection: "column",
            gap: "24px"
        });

        // Card Informações
        const cardInfo = renderizarElementos("div", {
            backgroundColor: "#111111",
            border: "1px solid #333333",
            borderRadius: "12px",
            padding: "24px"
        });

        const tituloInfo = renderizarElementos("h3", {
            fontSize: "18px",
            color: "#FFB800",
            marginBottom: "20px"
        }, { textContent: "📋 Minhas Informações" });

        const infoItems = [
            { label: "Nome completo", valor: "Usuário Exemplo" },
            { label: "E-mail", valor: "usuario@email.com" },
            { label: "Plano", valor: "Free" },
            { label: "Membro desde", valor: "Junho 2025" }
        ];

        infoItems.forEach(item => {
            const row = renderizarElementos("div", {
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #222222"
            });
            row.appendChild(renderizarElementos("span", { color: "#888888", fontSize: "14px" }, { textContent: item.label }));
            row.appendChild(renderizarElementos("span", { color: "#ffffff", fontSize: "14px" }, { textContent: item.valor }));
            cardInfo.appendChild(row);
        });

        const btnEditar = renderizarElementos("button", {
            padding: "10px 24px",
            backgroundColor: "transparent",
            color: "#ffffff",
            border: "1px solid #FFB800",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.3s ease",
            width: "100%",
            marginTop: "16px"
        }, { innerHTML: '<i class="fas fa-edit" style="margin-right: 8px;"></i> Editar Perfil' });

        btnEditar.onmouseenter = () => {
            btnEditar.style.backgroundColor = "#FFB800";
            btnEditar.style.color = "#000000";
        };
        btnEditar.onmouseleave = () => {
            btnEditar.style.backgroundColor = "transparent";
            btnEditar.style.color = "#ffffff";
        };
        btnEditar.onclick = () => alert("Editar perfil em breve!");

        cardInfo.appendChild(btnEditar);

        // BOTÃO PARA CRONOGRAMA
        const btnCronograma = renderizarElementos("button", {
            padding: "10px 24px",
            backgroundColor: "#FFB800",
            color: "#000000",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.3s ease",
            width: "100%",
            marginTop: "8px"
        }, { innerHTML: '<i class="fas fa-calendar-alt" style="margin-right: 8px;"></i> Meu Cronograma' });

        btnCronograma.onmouseenter = () => {
            btnCronograma.style.backgroundColor = "#E5A600";
        };
        btnCronograma.onmouseleave = () => {
            btnCronograma.style.backgroundColor = "#FFB800";
        };
        btnCronograma.onclick = () => {
            if (this.container && this.container.parentNode) {
                this.container.parentNode.removeChild(this.container);
            }
            this.navegacao._chamarProximaClasseDoLayout("pagina-cronograma");
        };

        cardInfo.appendChild(btnCronograma);

        // Card Estatísticas
        const cardStats = renderizarElementos("div", {
            backgroundColor: "#111111",
            border: "1px solid #333333",
            borderRadius: "12px",
            padding: "24px"
        });

        const tituloStats = renderizarElementos("h3", {
            fontSize: "18px",
            color: "#FFB800",
            marginBottom: "20px"
        }, { textContent: "📊 Estatísticas de Estudo" });

        const statsGrid = renderizarElementos("div", {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px"
        });

        const stats = [
            { value: "42", label: "Questões resolvidas", icone: "fa-check-circle" },
            { value: "78%", label: "Taxa de acerto", icone: "fa-percent" },
            { value: "12", label: "Dias de streak", icone: "fa-fire" },
            { value: "3h42m", label: "Tempo de estudo", icone: "fa-clock" }
        ];

        stats.forEach(s => {
            const statItem = renderizarElementos("div", {
                backgroundColor: "#0a0a0a",
                borderRadius: "8px",
                padding: "16px",
                textAlign: "center"
            });
            statItem.appendChild(renderizarElementos("i", { fontSize: "20px", color: "#FFB800", marginBottom: "8px", display: "block" }, { className: `fas ${s.icone}` }));
            statItem.appendChild(renderizarElementos("div", { fontSize: "24px", fontWeight: "700", color: "#ffffff" }, { textContent: s.value }));
            statItem.appendChild(renderizarElementos("div", { fontSize: "12px", color: "#888888" }, { textContent: s.label }));
            statsGrid.appendChild(statItem);
        });

        cardStats.appendChild(tituloStats);
        cardStats.appendChild(statsGrid);

        colEsquerda.appendChild(cardInfo);
        colEsquerda.appendChild(cardStats);

        // Coluna Direita - Metas do Dia (agora sem calendário)
        const colDireita = renderizarElementos("div", {
            display: "flex",
            flexDirection: "column",
            gap: "24px"
        });

        // Card Metas do Dia
        const cardMetas = renderizarElementos("div", {
            backgroundColor: "#111111",
            border: "1px solid #333333",
            borderRadius: "12px",
            padding: "24px"
        });

        const tituloMetas = renderizarElementos("h3", {
            fontSize: "18px",
            color: "#FFB800",
            marginBottom: "16px"
        }, { innerHTML: '<i class="fas fa-tasks" style="margin-right: 8px;"></i> Metas do Dia' });

        const listaMetas = renderizarElementos("div", {
            display: "flex",
            flexDirection: "column",
            gap: "12px"
        });

        const metas = [
            { texto: "Resolver 10 questões de Matemática", feita: false },
            { texto: "Revisar Direito Constitucional", feita: false },
            { texto: "Fazer simulado de Português", feita: true }
        ];

        metas.forEach(meta => {
            const item = renderizarElementos("div", {
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "8px 0",
                borderBottom: "1px solid #222222"
            });
            const checkbox = renderizarElementos("input", { width: "18px", height: "18px", accentColor: "#FFB800" }, { type: "checkbox", checked: meta.feita });
            const texto = renderizarElementos("span", {
                color: meta.feita ? "#888888" : "#ffffff",
                textDecoration: meta.feita ? "line-through" : "none",
                fontSize: "14px",
                flex: "1"
            }, { textContent: meta.texto });
            checkbox.onchange = () => {
                if (checkbox.checked) {
                    texto.style.color = "#888888";
                    texto.style.textDecoration = "line-through";
                } else {
                    texto.style.color = "#ffffff";
                    texto.style.textDecoration = "none";
                }
            };
            item.appendChild(checkbox);
            item.appendChild(texto);
            listaMetas.appendChild(item);
        });

        cardMetas.appendChild(tituloMetas);
        cardMetas.appendChild(listaMetas);

        colDireita.appendChild(cardMetas);

        conteudo.appendChild(colEsquerda);
        conteudo.appendChild(colDireita);
        this.container.appendChild(conteudo);
    }

    criarFooter() {
        const footer = renderizarElementos("div", {
            backgroundColor: "#111111",
            borderTop: "1px solid #333333",
            padding: "20px 32px",
            textAlign: "center",
            color: "#888888",
            fontSize: "12px"
        }, { textContent: "© 2025 O Monitor. Todos os direitos reservados." });

        this.container.appendChild(footer);
    }

    getElemento() {
        return this.container;
    }
}