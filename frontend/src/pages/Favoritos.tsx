import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { api } from "../api/api";
import Button from "../components/Button";
import Card from "../components/Card";
import type { Favorito } from "../types";

/** Render the current user's saved favorite questions. */
function Favoritos() {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  async function removerFavorito(questaoId: number) {
    setMensagem("");
    setErro("");

    try {
      await api.delete("/favoritos", {
        params: {
          questao_id: questaoId,
        },
      });

      setFavoritos((favoritosAtuais) =>
        favoritosAtuais.filter((favorito) => favorito.questao_id !== questaoId),
      );
      setMensagem("Questão removida dos favoritos.");
    } catch {
      setErro("Não foi possível remover a questão dos favoritos.");
    }
  }

  useEffect(() => {
    let active = true;

    void (async () => {
      const response = await api.get<Favorito[]>("/favoritos/me");

      if (active) {
        setFavoritos(response.data);
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
          <h1>Favoritos</h1>
          <p>Questões marcadas para consultar depois.</p>
        </div>
      </div>

      {erro && <div className="error-message">{erro}</div>}
      {mensagem && <div className="success-message">{mensagem}</div>}

      <div className="list">
        {favoritos.map((favorito) => (
          <Card key={favorito.id}>
            <div className="question-card">
              <div>
                <h3>{favorito.questao?.enunciado ?? `Questão #${favorito.questao_id}`}</h3>
                <span className="muted">
                  Marcada em {new Date(favorito.data_marcacao).toLocaleDateString()}
                </span>
              </div>

              <div className="actions">
                <Link
                  to={`/questoes/${favorito.questao_id}/responder`}
                  className="btn btn-secondary"
                >
                  Ver
                </Link>

                <Button
                  variant="danger"
                  onClick={() => void removerFavorito(favorito.questao_id)}
                >
                  Remover
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {favoritos.length === 0 && (
          <Card>
            <p className="muted">Nenhuma questão favoritada.</p>
          </Card>
        )}
      </div>
    </section>
  );
}

export default Favoritos;
