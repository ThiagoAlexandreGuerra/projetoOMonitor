import renderizarElementos from "../../../../javascript/utils/renderizarElementos.js";

export default class Cronograma {
    constructor(eventos, navegacao) {
        this.eventos = eventos;
        this.navegacao = navegacao;
        this.container = null;
        this.diasEstudo = new Set();
        this.metasPorDia = {};
        this.mesAtual = new Date().getMonth();
        this.anoAtual = new Date().getFullYear();
        this.diaSelecionado = null;
        this.calendarioContainer = null;
        this.listaMetasContainer = null;
        
        this.carregarDados();
        this.criarPaginaCronograma();
    }

    carregarDados() {
        try {
            const dados = JSON.parse(localStorage.getItem('calendarioEstudos') || '{}');
            this.diasEstudo = new Set(dados.diasEstudo || []);
            this.metasPorDia = dados.metasPorDia || {};
        } catch (e) {
            console.warn("Erro ao carregar dados:", e);
        }
    }

    salvarDados() {
        try {
            const dados = {
                diasEstudo: Array.from(this.diasEstudo),
                metasPorDia: this.metasPorDia
            };
            localStorage.setItem('calendarioEstudos', JSON.stringify(dados));
        } catch (e) {
            console.warn("Erro ao salvar dados:", e);
        }
    }

    criarPaginaCronograma() {
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
        this.container.className = "pagina-cronograma";

        this.criarHeader();
        this.criarConteudo();
        this.criarFooter();

        // Renderiza o calendário IMEDIATAMENTE
        this.renderizarCalendario();
        this.renderizarMetas();
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

        const navDiv = renderizarElementos("div", { display: "flex", gap: "16px" });

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
            document.body.className = "area-usuario";
            import("../areaUsuario/areaUsuario.js").then(module => {
                const AreaUsuario = module.default;
                new AreaUsuario(this.eventos, this.navegacao);
            }).catch(() => {
                window.location.reload();
            });
        };

        navDiv.appendChild(btnVoltar);
        header.appendChild(logo);
        header.appendChild(navDiv);
        this.container.appendChild(header);
    }

    criarConteudo() {
        const conteudo = renderizarElementos("div", {
            maxWidth: "900px",
            margin: "0 auto",
            padding: "100px 32px 40px"
        });

        const titulo = renderizarElementos("h1", {
            fontSize: "28px",
            fontWeight: "700",
            color: "#ffffff",
            marginBottom: "8px"
        }, { textContent: "📅 Meu Cronograma de Estudos" });

        const subtitulo = renderizarElementos("p", {
            fontSize: "16px",
            color: "#888888",
            marginBottom: "32px"
        }, { textContent: "Clique em um dia para adicionar metas e marcar seus dias de estudo." });

        conteudo.appendChild(titulo);
        conteudo.appendChild(subtitulo);

        // Card do Calendário - guarda referência
        const cardCalendario = renderizarElementos("div", {
            backgroundColor: "#111111",
            border: "1px solid #333333",
            borderRadius: "12px",
            padding: "32px",
            marginBottom: "32px"
        });

        // Cria o container do calendário e guarda a referência
        this.calendarioContainer = renderizarElementos("div", {});
        cardCalendario.appendChild(this.calendarioContainer);
        conteudo.appendChild(cardCalendario);

        // Card de Metas do Dia
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

        // Cria o container de metas e guarda a referência
        this.listaMetasContainer = renderizarElementos("div", {
            display: "flex",
            flexDirection: "column",
            gap: "12px"
        });

        cardMetas.appendChild(tituloMetas);
        cardMetas.appendChild(this.listaMetasContainer);
        conteudo.appendChild(cardMetas);

        this.container.appendChild(conteudo);
    }

    renderizarCalendario() {
        if (!this.calendarioContainer) {
            console.error("❌ Container do calendário não existe!");
            return;
        }

        const container = this.calendarioContainer;
        
        // Limpa o container
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        // ============================================================
        // HEADER - Navegação entre meses
        // ============================================================
        const header = renderizarElementos("div", {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px"
        });

        const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];

        const tituloMes = renderizarElementos("span", {
            fontSize: "18px",
            fontWeight: "600",
            color: "#ffffff"
        }, { textContent: `${meses[this.mesAtual]} ${this.anoAtual}` });

        const navBotoes = renderizarElementos("div", { display: "flex", gap: "12px" });

        const btnAnterior = renderizarElementos("button", {
            padding: "8px 16px",
            backgroundColor: "transparent",
            color: "#ffffff",
            border: "1px solid #333333",
            borderRadius: "6px",
            cursor: "pointer"
        }, { textContent: "← Mês anterior" });

        btnAnterior.onclick = () => {
            this.mesAtual--;
            if (this.mesAtual < 0) { this.mesAtual = 11;
                this.anoAtual--; }
            this.diaSelecionado = null;
            this.renderizarCalendario();
            this.renderizarMetas();
        };

        const btnProximo = renderizarElementos("button", {
            padding: "8px 16px",
            backgroundColor: "transparent",
            color: "#ffffff",
            border: "1px solid #333333",
            borderRadius: "6px",
            cursor: "pointer"
        }, { textContent: "Próximo mês →" });

        btnProximo.onclick = () => {
            this.mesAtual++;
            if (this.mesAtual > 11) { this.mesAtual = 0;
                this.anoAtual++; }
            this.diaSelecionado = null;
            this.renderizarCalendario();
            this.renderizarMetas();
        };

        navBotoes.appendChild(btnAnterior);
        navBotoes.appendChild(btnProximo);

        header.appendChild(tituloMes);
        header.appendChild(navBotoes);
        container.appendChild(header);

        // ============================================================
        // DIAS DA SEMANA
        // ============================================================
        const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
        const semanaHeader = renderizarElementos("div", {
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "4px",
            marginBottom: "12px"
        });

        diasSemana.forEach(dia => {
            semanaHeader.appendChild(renderizarElementos("div", {
                textAlign: "center",
                color: "#888888",
                fontSize: "13px",
                fontWeight: "600"
            }, { textContent: dia }));
        });

        container.appendChild(semanaHeader);

        // ============================================================
        // GRID DE DIAS
        // ============================================================
        const diasGrid = renderizarElementos("div", {
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "6px"
        });

        const primeiroDia = new Date(this.anoAtual, this.mesAtual, 1).getDay();
        const diasNoMes = new Date(this.anoAtual, this.mesAtual + 1, 0).getDate();
        const diasNoMesAnterior = new Date(this.anoAtual, this.mesAtual, 0).getDate();

        // Dias do mês anterior
        for (let i = primeiroDia - 1; i >= 0; i--) {
            const dia = diasNoMesAnterior - i;
            diasGrid.appendChild(renderizarElementos("div", {
                textAlign: "center",
                padding: "12px 4px",
                color: "#444444",
                fontSize: "14px",
                borderRadius: "6px",
                cursor: "default"
            }, { textContent: dia }));
        }

        // Dias do mês atual
        const hoje = new Date();
        const hojeStr = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;

        for (let i = 1; i <= diasNoMes; i++) {
            const diaStr = `${this.anoAtual}-${String(this.mesAtual + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const isHoje = diaStr === hojeStr;
            const temEstudo = this.diasEstudo.has(diaStr);
            const temMeta = this.metasPorDia[diaStr] && this.metasPorDia[diaStr].length > 0;

            const diaEl = renderizarElementos("div", {
                textAlign: "center",
                padding: "12px 4px",
                backgroundColor: temEstudo ? "#FFB800" : (isHoje ? "rgba(255,184,0,0.15)" : "transparent"),
                color: temEstudo ? "#000000" : (isHoje ? "#FFB800" : "#ffffff"),
                border: isHoje && !temEstudo ? "1px solid #FFB800" : "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: temEstudo ? "600" : "normal",
                cursor: "pointer",
                transition: "all 0.2s ease",
                position: "relative"
            }, { textContent: i });

            if (temMeta) {
                const dot = renderizarElementos("div", {
                    width: "5px",
                    height: "5px",
                    backgroundColor: temEstudo ? "#000000" : "#FFB800",
                    borderRadius: "50%",
                    position: "absolute",
                    bottom: "3px",
                    left: "50%",
                    transform: "translateX(-50%)"
                });
                diaEl.appendChild(dot);
            }

            diaEl.onmouseenter = () => {
                if (!temEstudo) {
                    diaEl.style.backgroundColor = "rgba(255, 184, 0, 0.2)";
                }
            };
            diaEl.onmouseleave = () => {
                if (!temEstudo) {
                    diaEl.style.backgroundColor = isHoje ? "rgba(255,184,0,0.15)" : "transparent";
                }
            };

            diaEl.onclick = () => {
                this.diaSelecionado = diaStr;
                this.renderizarCalendario();
                this.renderizarMetas();
                this.abrirModalMetas();
            };

            diasGrid.appendChild(diaEl);
        }

        // Dias do próximo mês
        const totalDias = primeiroDia + diasNoMes;
        const diasRestantes = (7 - (totalDias % 7)) % 7;
        for (let i = 1; i <= diasRestantes; i++) {
            diasGrid.appendChild(renderizarElementos("div", {
                textAlign: "center",
                padding: "12px 4px",
                color: "#444444",
                fontSize: "14px",
                borderRadius: "6px",
                cursor: "default"
            }, { textContent: i }));
        }

        container.appendChild(diasGrid);

        // ============================================================
        // LEGENDA
        // ============================================================
        const legenda = renderizarElementos("div", {
            display: "flex",
            gap: "24px",
            marginTop: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
            paddingTop: "16px",
            borderTop: "1px solid #333333"
        });

        const legendas = [
            { cor: "#FFB800", texto: "Dia de estudo" },
            { cor: "rgba(255,184,0,0.15)", border: "1px solid #FFB800", texto: "Hoje" },
            { cor: "transparent", texto: "Clique para adicionar meta" }
        ];

        legendas.forEach(item => {
            const div = renderizarElementos("div", { display: "flex", alignItems: "center", gap: "8px" });
            div.appendChild(renderizarElementos("div", {
                width: "16px",
                height: "16px",
                backgroundColor: item.cor || "transparent",
                border: item.border || "none",
                borderRadius: "4px"
            }));
            div.appendChild(renderizarElementos("span", { color: "#888888", fontSize: "13px" }, { textContent: item.texto }));
            legenda.appendChild(div);
        });

        container.appendChild(legenda);

        // ============================================================
        // ESTATÍSTICAS
        // ============================================================
        const mesStr = `${this.anoAtual}-${String(this.mesAtual + 1).padStart(2, '0')}`;
        const diasNoMesCount = Array.from(this.diasEstudo).filter(d => d.startsWith(mesStr)).length;
        const streak = this.calcularStreak();

        const statsDiv = renderizarElementos("div", {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
            marginTop: "16px",
            padding: "16px",
            backgroundColor: "#0a0a0a",
            borderRadius: "8px"
        });

        const stats = [
            { valor: diasNoMesCount, label: "📅 Dias estudados no mês" },
            { valor: streak, label: "🔥 Streak atual" },
            { valor: this.diasEstudo.size, label: "📊 Total de dias" }
        ];

        stats.forEach(stat => {
            const item = renderizarElementos("div", { textAlign: "center" });
            item.appendChild(renderizarElementos("div", { fontSize: "24px", fontWeight: "700", color: "#FFB800" }, { textContent: stat.valor }));
            item.appendChild(renderizarElementos("div", { fontSize: "12px", color: "#888888" }, { textContent: stat.label }));
            statsDiv.appendChild(item);
        });

        container.appendChild(statsDiv);
    }

    calcularStreak() {
        let streak = 0;
        const hoje = new Date();
        const data = new Date(hoje);
        while (true) {
            const diaStr = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
            if (this.diasEstudo.has(diaStr)) {
                streak++;
                data.setDate(data.getDate() - 1);
            } else {
                break;
            }
        }
        return streak;
    }

    renderizarMetas() {
        if (!this.listaMetasContainer) {
            console.error("❌ Container de metas não existe!");
            return;
        }

        const container = this.listaMetasContainer;
        
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        if (this.diaSelecionado) {
            const [ano, mes, dia] = this.diaSelecionado.split('-').map(Number);
            const dataFormatada = `${dia}/${mes}/${ano}`;
            const metas = this.metasPorDia[this.diaSelecionado] || [];

            const titulo = renderizarElementos("div", {
                color: "#FFB800",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "12px"
            }, { textContent: `📌 Metas para ${dataFormatada}` });

            container.appendChild(titulo);

            if (metas.length === 0) {
                container.appendChild(renderizarElementos("p", {
                    color: "#666666",
                    fontSize: "14px",
                    textAlign: "center",
                    padding: "16px 0"
                }, { textContent: "Nenhuma meta definida para este dia." }));
            } else {
                metas.forEach((meta, index) => {
                    const item = renderizarElementos("div", {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 12px",
                        backgroundColor: "#0a0a0a",
                        borderRadius: "6px",
                        marginBottom: "8px"
                    });
                    item.appendChild(renderizarElementos("span", {
                        color: "#ffffff",
                        fontSize: "14px",
                        flex: "1"
                    }, { textContent: meta }));
                    const btnRemover = renderizarElementos("button", {
                        padding: "2px 8px",
                        backgroundColor: "transparent",
                        color: "#ff4444",
                        border: "1px solid #ff4444",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px"
                    }, { textContent: "✕" });
                    btnRemover.onclick = () => {
                        this.metasPorDia[this.diaSelecionado].splice(index, 1);
                        if (this.metasPorDia[this.diaSelecionado].length === 0) {
                            delete this.metasPorDia[this.diaSelecionado];
                        }
                        this.salvarDados();
                        this.renderizarCalendario();
                        this.renderizarMetas();
                    };
                    item.appendChild(btnRemover);
                    container.appendChild(item);
                });
            }
        } else {
            container.appendChild(renderizarElementos("p", {
                color: "#666666",
                fontSize: "14px",
                textAlign: "center",
                padding: "16px 0"
            }, { textContent: "👆 Clique em um dia para ver ou adicionar metas." }));
        }
    }

    abrirModalMetas() {
        if (!this.diaSelecionado) return;

        const [ano, mes, dia] = this.diaSelecionado.split('-').map(Number);
        const dataFormatada = `${dia}/${mes}/${ano}`;
        const metas = this.metasPorDia[this.diaSelecionado] || [];

        const overlay = renderizarElementos("div", {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.85)",
            zIndex: "2000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        });

        const modal = renderizarElementos("div", {
            backgroundColor: "#1a1a1a",
            border: "1px solid #FFB800",
            borderRadius: "12px",
            padding: "32px",
            maxWidth: "420px",
            width: "90%",
            maxHeight: "80vh",
            overflowY: "auto"
        });

        modal.appendChild(renderizarElementos("h3", { fontSize: "20px", color: "#FFB800", marginBottom: "4px" }, { textContent: `📅 ${dataFormatada}` }));
        modal.appendChild(renderizarElementos("p", { fontSize: "14px", color: "#888888", marginBottom: "16px" }, { textContent: "Adicione suas metas para este dia" }));

        const lista = renderizarElementos("div", { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" });

        if (metas.length === 0) {
            lista.appendChild(renderizarElementos("p", { color: "#666666", fontSize: "14px", textAlign: "center" }, { textContent: "Nenhuma meta ainda" }));
        } else {
            metas.forEach((meta, idx) => {
                const item = renderizarElementos("div", {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px",
                    backgroundColor: "#0a0a0a",
                    borderRadius: "6px"
                });
                item.appendChild(renderizarElementos("span", { color: "#ffffff", fontSize: "14px", flex: "1" }, { textContent: meta }));
                const btnRemove = renderizarElementos("button", {
                    padding: "2px 8px",
                    backgroundColor: "transparent",
                    color: "#ff4444",
                    border: "1px solid #ff4444",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px"
                }, { textContent: "✕" });
                btnRemove.onclick = () => {
                    this.metasPorDia[this.diaSelecionado].splice(idx, 1);
                    if (this.metasPorDia[this.diaSelecionado].length === 0) {
                        delete this.metasPorDia[this.diaSelecionado];
                    }
                    this.salvarDados();
                    this.renderizarCalendario();
                    this.renderizarMetas();
                    overlay.remove();
                    this.abrirModalMetas();
                };
                item.appendChild(btnRemove);
                lista.appendChild(item);
            });
        }

        modal.appendChild(lista);

        const inputGroup = renderizarElementos("div", { display: "flex", gap: "8px", marginBottom: "16px" });
        const input = renderizarElementos("input", {
            flex: "1",
            padding: "10px 14px",
            backgroundColor: "#0a0a0a",
            border: "1px solid #333333",
            borderRadius: "6px",
            color: "#ffffff",
            fontSize: "14px"
        }, { placeholder: "Digite sua meta..." });
        const btnAdd = renderizarElementos("button", {
            padding: "10px 20px",
            backgroundColor: "#FFB800",
            color: "#000000",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600"
        }, { textContent: "Adicionar" });
        btnAdd.onclick = () => {
            const texto = input.value.trim();
            if (texto) {
                if (!this.metasPorDia[this.diaSelecionado]) {
                    this.metasPorDia[this.diaSelecionado] = [];
                }
                this.metasPorDia[this.diaSelecionado].push(texto);
                this.diasEstudo.add(this.diaSelecionado);
                this.salvarDados();
                this.renderizarCalendario();
                this.renderizarMetas();
                overlay.remove();
                this.abrirModalMetas();
            }
        };
        input.onkeypress = (e) => { if (e.key === "Enter") btnAdd.onclick(); };
        inputGroup.appendChild(input);
        inputGroup.appendChild(btnAdd);
        modal.appendChild(inputGroup);

        const btnEstudo = renderizarElementos("button", {
            padding: "10px 16px",
            backgroundColor: this.diasEstudo.has(this.diaSelecionado) ? "#ff4444" : "#FFB800",
            color: this.diasEstudo.has(this.diaSelecionado) ? "#ffffff" : "#000000",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            width: "100%",
            marginBottom: "12px"
        }, { textContent: this.diasEstudo.has(this.diaSelecionado) ? "❌ Remover dia de estudo" : "✅ Marcar como dia de estudo" });
        btnEstudo.onclick = () => {
            if (this.diasEstudo.has(this.diaSelecionado)) {
                this.diasEstudo.delete(this.diaSelecionado);
            } else {
                this.diasEstudo.add(this.diaSelecionado);
            }
            this.salvarDados();
            this.renderizarCalendario();
            this.renderizarMetas();
            overlay.remove();
            this.abrirModalMetas();
        };
        modal.appendChild(btnEstudo);

        const btnFechar = renderizarElementos("button", {
            padding: "10px 16px",
            backgroundColor: "transparent",
            color: "#ffffff",
            border: "1px solid #333333",
            borderRadius: "6px",
            cursor: "pointer",
            width: "100%"
        }, { textContent: "Fechar" });
        btnFechar.onclick = () => { overlay.remove(); this.diaSelecionado = null;
            this.renderizarMetas(); };

        modal.appendChild(btnFechar);
        overlay.appendChild(modal);
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                overlay.remove();
                this.diaSelecionado = null;
                this.renderizarMetas();
            }
        };
        this.container.appendChild(overlay);
    }

    criarFooter() {
        const footer = renderizarElementos("div", {
            backgroundColor: "#111111",
            borderTop: "1px solid #333333",
            padding: "16px 32px",
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