import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";

import { api } from "../api/api";
import Button from "../components/Button";
import Card from "../components/Card";
import type { MetaEstudo } from "../types";

/** Render the daily study goal configuration page. */
function Metas() {
  const [quantidadeQuestoes, setQuantidadeQuestoes] = useState(10);
  const [tempoDiario, setTempoDiario] = useState(30);
  const [metas, setMetas] = useState<MetaEstudo[]>([]);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  async function carregarMetas() {
    const response = await api.get<MetaEstudo[]>("/metas-estudo/me");
    setMetas(response.data);
  }

  useEffect(() => {
    let active = true;

    void (async () => {
      try {
        const response = await api.get<MetaEstudo[]>("/metas-estudo/me");

        if (active) {
          setMetas(response.data);
        }
      } catch {
        if (active) {
          setErro("Não foi possível carregar suas metas.");
        }
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  /** Submit a new study goal for the current user. */
  async function cadastrarMeta(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setMensagem("");

    try {
      await api.post("/metas-estudo", {
        quantidade_questoes: quantidadeQuestoes,
        tempo_diario: tempoDiario,
      });

      await carregarMetas();
      setMensagem("Meta cadastrada com sucesso.");
    } catch {
      setErro("Não foi possível salvar a meta.");
    }
  }

  async function removerMeta(metaId: number) {
    setErro("");
    setMensagem("");

    try {
      await api.delete(`/metas-estudo/${metaId}`);
      setMetas((metasAtuais) => metasAtuais.filter((meta) => meta.id !== metaId));
      setMensagem("Meta removida com sucesso.");
    } catch {
      setErro("Não foi possível remover a meta.");
    }
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Metas</h1>
          <p>Defina sua rotina diária de estudos.</p>
        </div>
      </div>

      <Card>
        {erro && <div className="error-message">{erro}</div>}
        <form className="form" onSubmit={(event) => void cadastrarMeta(event)}>
          <label>
            Quantidade de questões por dia
            <input
              type="number"
              value={quantidadeQuestoes}
              onChange={(event) => setQuantidadeQuestoes(Number(event.target.value))}
              min={1}
            />
          </label>

          <label>
            Tempo diário em minutos
            <input
              type="number"
              value={tempoDiario}
              onChange={(event) => setTempoDiario(Number(event.target.value))}
              min={1}
            />
          </label>

          <Button type="submit">Salvar meta</Button>
        </form>

        {mensagem && <div className="success-message">{mensagem}</div>}
      </Card>

      <div className="list">
        {metas.map((meta) => (
          <Card key={meta.id}>
            <div className="question-card">
              <div>
                <h3>{meta.quantidade_questoes} questões por dia</h3>
                <p className="muted">
                  {meta.tempo_diario} minutos diários • {meta.ativa ? "Ativa" : "Inativa"}
                </p>
              </div>

              <div className="actions">
                <Button variant="danger" onClick={() => void removerMeta(meta.id)}>
                  Remover
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {metas.length === 0 && (
          <Card>
            <p className="muted">Nenhuma meta cadastrada.</p>
          </Card>
        )}
      </div>
    </section>
  );
}

export default Metas;
