import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { api } from "../api/api";
import Button from "../components/Button";
import Card from "../components/Card";
import type { Questao } from "../types";

/** Render the question catalog available to the user. */
function Questoes() {
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  /** Add a question to the current user's favorites. */
  async function favoritar(questaoId: number) {
    setErro("");
    setMensagem("");

    try {
      await api.post("/favoritos", {
        questao_id: questaoId,
      });

      setMensagem("Questão favoritada com sucesso.");
    } catch {
      setErro("Não foi possível favoritar a questão.");
    }
  }

  useEffect(() => {
    let active = true;

    void (async () => {
      const response = await api.get<Questao[]>("/questoes");

      if (active) {
        setQuestoes(response.data);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Questões</h1>
          <p>Escolha uma questão para resolver.</p>
        </div>
      </div>

      {erro && <div className="error-message">{erro}</div>}
      {mensagem && <div className="success-message">{mensagem}</div>}

      <div className="list">
        {questoes.map((questao) => (
          <Card key={questao.id}>
            <div className="question-card">
              <div>
                <span className={`badge badge-${questao.nivel.toLowerCase()}`}>
                  {questao.nivel}
                </span>

                <h3>{questao.enunciado}</h3>

                <p>
                  {questao.assunto} • {questao.ano}
                </p>
              </div>

              <div className="actions">
                <Button variant="secondary" onClick={() => void favoritar(questao.id)}>
                  Favoritar
                </Button>

                <Link to={`/questoes/${questao.id}/responder`} className="btn btn-primary">
                  Responder
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Questoes;
