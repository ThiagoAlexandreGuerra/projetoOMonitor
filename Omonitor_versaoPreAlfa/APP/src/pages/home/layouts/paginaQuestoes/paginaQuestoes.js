import renderizarElementos from "../../../../javascript/utils/renderizarElementos.js";

export default class PaginaQuestoes {
    constructor(eventos, navegacao) {
        this.eventos = eventos;
        this.navegacao = navegacao;
        
        this.criarPaginaQuestoes();
    }

    criarPaginaQuestoes() {
        // Container principal
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
        
        this.container.className = "pagina-questoes";

        // Header
        this.criarHeader();
        
        // Hero da página
        this.criarHero();
        
        // Filtros
        this.criarFiltros();
        
        // Lista de Questões
        this.criarListaQuestoes();
        
        // Footer
        this.criarFooter();
    }

    criarHeader() {
        const header = renderizarElementos("div", {
            backgroundColor: "#111111",
            borderBottom: "2px solid #FFB800",
            padding: "16px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            position: "sticky",
            top: "0",
            zIndex: "100"
        });

        const logo = renderizarElementos("h2", {
            fontSize: "20px",
            color: "#ffffff",
            margin: "0",
            whiteSpace: "nowrap"
        }, { innerHTML: "<span style='border:1px solid #ffffff;padding:4px 8px;color:#ffffff;'>O</span> <span style='color:#ffffff;'>Monitor</span>" });

        const btnVoltar = renderizarElementos("button", {
            padding: "8px 20px",
            backgroundColor: "transparent",
            color: "#ffffff",
            border: "1px solid #FFB800",
            cursor: "pointer",
            borderRadius: "4px",
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

        // CORREÇÃO: Remove o container corretamente
        btnVoltar.onclick = () => {
            if (this.container && this.container.parentNode) {
                this.container.parentNode.removeChild(this.container);
            }
            this.navegacao._chamarProximaClasseDoLayout("landing-page");
        };

        const rightDiv = renderizarElementos("div", {
            display: "flex",
            gap: "16px"
        });

        const btnPerfil = renderizarElementos("button", {
            padding: "8px 20px",
            backgroundColor: "transparent",
            color: "#ffffff",
            border: "1px solid #333333",
            cursor: "pointer",
            borderRadius: "4px",
            fontSize: "14px"
        }, { innerHTML: '<i class="fas fa-user-circle" style="margin-right: 8px;"></i> Meu Perfil' });

        rightDiv.appendChild(btnPerfil);
        rightDiv.appendChild(btnVoltar);
        header.appendChild(logo);
        header.appendChild(rightDiv);
        this.container.appendChild(header);
    }

    criarHero() {
        const hero = renderizarElementos("div", {
            backgroundColor: "#0a0a0a",
            padding: "60px 32px",
            textAlign: "center",
            borderBottom: "1px solid #333333"
        });

        const titulo = renderizarElementos("h1", {
            fontSize: "42px",
            fontWeight: "700",
            color: "#ffffff",
            marginBottom: "16px"
        }, { innerHTML: "Banco de <span style='border-bottom:2px solid white;'>Questões</span>" });

        const subtitulo = renderizarElementos("p", {
            fontSize: "18px",
            color: "#888888",
            maxWidth: "600px",
            margin: "0 auto"
        }, { textContent: "Resolva questões de provas anteriores do concurso do Banco do Brasil e acompanhe seu desempenho." });

        hero.appendChild(titulo);
        hero.appendChild(subtitulo);
        this.container.appendChild(hero);
    }

    criarFiltros() {
        const filtrosSection = renderizarElementos("div", {
            padding: "32px",
            borderBottom: "1px solid #333333",
            backgroundColor: "#000000"
        });

        const titulo = renderizarElementos("h3", {
            fontSize: "18px",
            color: "#ffffff",
            marginBottom: "20px"
        }, { textContent: "📌 Filtros" });

        const filtrosGrid = renderizarElementos("div", {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px"
        });

        // Disciplina
        const disciplinaGroup = renderizarElementos("div", {});
        const disciplinaLabel = renderizarElementos("label", {
            display: "block",
            color: "#888888",
            fontSize: "12px",
            marginBottom: "8px"
        }, { textContent: "DISCIPLINA" });
        
        const disciplinaSelect = renderizarElementos("select", {
            width: "100%",
            padding: "10px 12px",
            backgroundColor: "#111111",
            border: "1px solid #333333",
            color: "#ffffff",
            borderRadius: "6px",
            cursor: "pointer"
        });
        
        const opcoesDisciplina = ["Todas", "Matemática", "Português", "Direito", "Informática"];
        opcoesDisciplina.forEach(op => {
            const option = renderizarElementos("option", {}, { textContent: op, value: op });
            disciplinaSelect.appendChild(option);
        });
        
        disciplinaGroup.appendChild(disciplinaLabel);
        disciplinaGroup.appendChild(disciplinaSelect);

        // Dificuldade
        const dificuldadeGroup = renderizarElementos("div", {});
        const dificuldadeLabel = renderizarElementos("label", {
            display: "block",
            color: "#888888",
            fontSize: "12px",
            marginBottom: "8px"
        }, { textContent: "NÍVEL DE DIFICULDADE" });
        
        const dificuldadeSelect = renderizarElementos("select", {
            width: "100%",
            padding: "10px 12px",
            backgroundColor: "#111111",
            border: "1px solid #333333",
            color: "#ffffff",
            borderRadius: "6px",
            cursor: "pointer"
        });
        
        const opcoesDificuldade = ["Todos", "Fácil", "Médio", "Difícil"];
        opcoesDificuldade.forEach(op => {
            const option = renderizarElementos("option", {}, { textContent: op, value: op });
            dificuldadeSelect.appendChild(option);
        });
        
        dificuldadeGroup.appendChild(dificuldadeLabel);
        dificuldadeGroup.appendChild(dificuldadeSelect);

        // Ano
        const anoGroup = renderizarElementos("div", {});
        const anoLabel = renderizarElementos("label", {
            display: "block",
            color: "#888888",
            fontSize: "12px",
            marginBottom: "8px"
        }, { textContent: "ANO DA PROVA" });
        
        const anoSelect = renderizarElementos("select", {
            width: "100%",
            padding: "10px 12px",
            backgroundColor: "#111111",
            border: "1px solid #333333",
            color: "#ffffff",
            borderRadius: "6px",
            cursor: "pointer"
        });
        
        const opcoesAno = ["Todos", "2024", "2023", "2022", "2021"];
        opcoesAno.forEach(op => {
            const option = renderizarElementos("option", {}, { textContent: op, value: op });
            anoSelect.appendChild(option);
        });
        
        anoGroup.appendChild(anoLabel);
        anoGroup.appendChild(anoSelect);

        // Botão de busca
        const btnGroup = renderizarElementos("div", {
            display: "flex",
            alignItems: "flex-end"
        });
        
        const btnBuscar = renderizarElementos("button", {
            width: "100%",
            padding: "10px 12px",
            backgroundColor: "#ffffff",
            color: "#000000",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600"
        }, { textContent: "🔍︎" });

        btnGroup.appendChild(btnBuscar);

        filtrosGrid.appendChild(disciplinaGroup);
        filtrosGrid.appendChild(dificuldadeGroup);
        filtrosGrid.appendChild(anoGroup);
        filtrosGrid.appendChild(btnGroup);

        filtrosSection.appendChild(titulo);
        filtrosSection.appendChild(filtrosGrid);
        this.container.appendChild(filtrosSection);
    }

    criarListaQuestoes() {
        const listaSection = renderizarElementos("div", {
            padding: "32px",
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
            boxSizing: "border-box"
        });

        const headerLista = renderizarElementos("div", {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            flexWrap: "wrap",
            gap: "16px"
        });

        const total = renderizarElementos("span", {
            color: "#888888",
            fontSize: "14px"
        }, { textContent: "Mostrando 6 questões" });

        const ordenar = renderizarElementos("select", {
            padding: "8px 12px",
            backgroundColor: "#111111",
            border: "1px solid #333333",
            color: "#ffffff",
            borderRadius: "4px",
            cursor: "pointer"
        });
        
        const opcoesOrdenar = ["Mais recentes", "Mais antigas", "Mais fáceis", "Mais difíceis"];
        opcoesOrdenar.forEach(op => {
            const option = renderizarElementos("option", {}, { textContent: op, value: op });
            ordenar.appendChild(option);
        });

        headerLista.appendChild(total);
        headerLista.appendChild(ordenar);

        // Grid de questões
        const questoesGrid = renderizarElementos("div", {
            display: "flex",
            flexDirection: "column",
            gap: "20px"
        });

        // Dados mockados das questões (apenas para visualização)
        const questoesMock = [
            { id: "001", disciplina: "Matemática", dificuldade: "Médio", ano: "2023", titulo: "Juros Compostos", enunciado: "Um capital de R$ 1.000,00 foi aplicado a uma taxa de juros compostos de 10% ao ano. Qual será o montante após 3 anos?" },
            { id: "002", disciplina: "Português", dificuldade: "Fácil", ano: "2023", titulo: "Interpretação de Texto", enunciado: "Leia o texto a seguir e assinale a alternativa correta sobre a ideia principal do autor." },
            { id: "003", disciplina: "Direito", dificuldade: "Difícil", ano: "2022", titulo: "Direito Constitucional", enunciado: "Com base na Constituição Federal, assinale a alternativa correta sobre os direitos fundamentais." },
            { id: "004", disciplina: "Informática", dificuldade: "Médio", ano: "2024", titulo: "Segurança da Informação", enunciado: "O que é um ataque de phishing e como se proteger?" },
            { id: "005", disciplina: "Matemática", dificuldade: "Fácil", ano: "2024", titulo: "Regra de Três", enunciado: "Se 5 operários fazem uma obra em 12 dias, quantos dias 10 operários levarão para fazer a mesma obra?" },
            { id: "006", disciplina: "Português", dificuldade: "Médio", ano: "2022", titulo: "Redação Oficial", enunciado: "Assinale a alternativa que apresenta um exemplo de linguagem adequada à redação oficial." }
        ];

        questoesMock.forEach(q => {
            const card = renderizarElementos("div", {
                backgroundColor: "#111111",
                border: "1px solid #333333",
                borderRadius: "12px",
                overflow: "hidden",
                transition: "all 0.3s ease"
            });

            card.onmouseenter = () => {
                card.style.borderColor = "#555555";
            };
            card.onmouseleave = () => {
                card.style.borderColor = "#333333";
            };

            // Header do card
            const cardHeader = renderizarElementos("div", {
                padding: "16px 20px",
                backgroundColor: "#0a0a0a",
                borderBottom: "1px solid #333333",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px"
            });

            const idBadge = renderizarElementos("span", {
                color: "#888888",
                fontSize: "12px"
            }, { textContent: `Q${q.id}` });

            const tags = renderizarElementos("div", {
                display: "flex",
                gap: "8px"
            });

            const disciplinaTag = renderizarElementos("span", {
                backgroundColor: "#1a1a1a",
                padding: "4px 10px",
                borderRadius: "4px",
                fontSize: "11px",
                color: "#ffffff"
            }, { textContent: q.disciplina });

            const dificuldadeTag = renderizarElementos("span", {
                backgroundColor: q.dificuldade === "Fácil" ? "#1a3a1a" : (q.dificuldade === "Difícil" ? "#3a1a1a" : "#1a1a3a"),
                padding: "4px 10px",
                borderRadius: "4px",
                fontSize: "11px",
                color: "#ffffff"
            }, { textContent: q.dificuldade });

            const anoTag = renderizarElementos("span", {
                backgroundColor: "#1a1a1a",
                padding: "4px 10px",
                borderRadius: "4px",
                fontSize: "11px",
                color: "#888888"
            }, { textContent: q.ano });

            tags.appendChild(disciplinaTag);
            tags.appendChild(dificuldadeTag);
            tags.appendChild(anoTag);

            cardHeader.appendChild(idBadge);
            cardHeader.appendChild(tags);

            // Body do card
            const cardBody = renderizarElementos("div", {
                padding: "20px"
            });

            const tituloQuestao = renderizarElementos("h3", {
                fontSize: "18px",
                color: "#ffffff",
                marginBottom: "12px"
            }, { textContent: q.titulo });

            const enunciado = renderizarElementos("p", {
                fontSize: "14px",
                color: "#888888",
                lineHeight: "1.5",
                marginBottom: "16px"
            }, { textContent: q.enunciado });

            const btnResolver = renderizarElementos("button", {
                padding: "8px 16px",
                backgroundColor: "transparent",
                color: "#ffffff",
                border: "1px solid #ffffff",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "13px",
                transition: "all 0.3s ease"
            }, { textContent: "Resolver Questão →" });

            btnResolver.onmouseenter = () => {
                btnResolver.style.backgroundColor = "#ffffff";
                btnResolver.style.color = "#000000";
            };
            btnResolver.onmouseleave = () => {
                btnResolver.style.backgroundColor = "transparent";
                btnResolver.style.color = "#ffffff";
            };

            cardBody.appendChild(tituloQuestao);
            cardBody.appendChild(enunciado);
            cardBody.appendChild(btnResolver);

            card.appendChild(cardHeader);
            card.appendChild(cardBody);
            questoesGrid.appendChild(card);
        });

        listaSection.appendChild(headerLista);
        listaSection.appendChild(questoesGrid);
        this.container.appendChild(listaSection);
    }

    criarFooter() {
        const footer = renderizarElementos("div", {
            backgroundColor: "#111111",
            borderTop: "1px solid #333333",
            padding: "40px 32px 20px",
            marginTop: "40px"
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
            fontSize: "20px",
            color: "#ffffff",
            marginBottom: "16px",
            whiteSpace: "nowrap"
        }, { innerHTML: "<span style='border:1px solid white;padding:4px 8px;'>O</span> Monitor" });
        const slogan = renderizarElementos("p", { color: "#888888", fontSize: "13px", maxWidth: "250px" }, { textContent: "Sua plataforma de estudos para o concurso do Banco do Brasil." });
        logoDiv.appendChild(logo);
        logoDiv.appendChild(slogan);

        const paginacao = renderizarElementos("div", {
            display: "flex",
            gap: "8px",
            alignItems: "center"
        });

        const pagButtons = ["1", "2", "3", "→"];
        pagButtons.forEach(btn => {
            const pageBtn = renderizarElementos("button", {
                padding: "8px 14px",
                backgroundColor: btn === "1" ? "#ffffff" : "transparent",
                color: btn === "1" ? "#000000" : "#888888",
                border: "1px solid #333333",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "all 0.3s ease"
            }, { textContent: btn });
            
            if (btn !== "1") {
                pageBtn.onmouseenter = () => {
                    pageBtn.style.borderColor = "#ffffff";
                    pageBtn.style.color = "#ffffff";
                };
                pageBtn.onmouseleave = () => {
                    pageBtn.style.borderColor = "#333333";
                    pageBtn.style.color = "#888888";
                };
            }
            
            paginacao.appendChild(pageBtn);
        });

        const copyright = renderizarElementos("div", {
            textAlign: "center",
            paddingTop: "20px",
            borderTop: "1px solid #333333",
            color: "#888888",
            fontSize: "12px"
        }, { textContent: "© 2025 O Monitor. Todos os direitos reservados." });

        content.appendChild(logoDiv);
        content.appendChild(paginacao);
        footer.appendChild(content);
        footer.appendChild(copyright);
        this.container.appendChild(footer);
    }

    getElemento() {
        return this.container;
    }
}