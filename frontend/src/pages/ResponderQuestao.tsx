import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { api } from "../api/api";
import Button from "../components/Button";
import Card from "../components/Card";
import type { Alternativa, Questao, Resposta } from "../types";

/** Render the question answering flow for a single question. */
function ResponderQuestao() {
  const { id } = useParams();

  const [questao, setQuestao] = useState<Questao | null>(null);
  const [resposta, setResposta] = useState<Resposta | null>(null);
  const [alternativaSelecionada, setAlternativaSelecionada] = useState<number | null>(null);
  const [resultado, setResultado] = useState<{ texto: string; correta: boolean } | null>(null);

  useEffect(() => {
    let active = true;

    void (async () => {
      const questaoResponse = await api.get<Questao>(`/questoes/${id}`);

      const respostaResponse = await api.post<Resposta>("/respostas", {
        questao_id: Number(id),
      });

      if (active) {
        setQuestao(questaoResponse.data);
        setResposta(respostaResponse.data);
      }
    })();

    return () => {
      active = false;
    };
  }, [id]);

  /** Submit the selected alternative for correction. */
  async function responder() {
    if (!resposta || !alternativaSelecionada) return;

    const response = await api.post<Resposta>(
      `/respostas/${resposta.id}/responder`,
      {
        alternativa_id: alternativaSelecionada,
      }
    );

    setResultado({
      texto: response.data.correta ? "Resposta correta." : "Resposta incorreta.",
      correta: response.data.correta === true,
    });
  }

  if (!questao) {
    return <p>Carregando questão...</p>;
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Responder Questão</h1>
          <p>{questao.assunto}</p>
        </div>
      </div>

      <Card>
        <span className={`badge badge-${questao.nivel.toLowerCase()}`}>
          {questao.nivel}
        </span>

        <h2>{questao.enunciado}</h2>

        <div className="alternatives">
          {questao.alternativas?.map((alternativa: Alternativa) => (
            <label
              key={alternativa.id}
              className={
                alternativaSelecionada === alternativa.id
                  ? "alternative selected"
                  : "alternative"
              }
            >
              <input
                type="radio"
                name="alternativa"
                value={alternativa.id}
                onChange={() => setAlternativaSelecionada(alternativa.id)}
              />
              {alternativa.texto}
            </label>
          ))}
        </div>

        <Button onClick={() => void responder()}>Confirmar resposta</Button>

        {resultado && (
          <div className={`result-box ${resultado.correta ? "result-box-correct" : "result-box-incorrect"}`}>
            <strong>{resultado.texto}</strong>
            <p>{questao.explicacao}</p>
          </div>
        )}
      </Card>
    </section>
  );
}

export default ResponderQuestao;
