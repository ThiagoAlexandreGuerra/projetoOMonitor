import { useEffect, useState } from "react";

import { api } from "../api/api";
import Card from "../components/Card";
import type { Estatistica } from "../types";

/** Render the dashboard with detailed statistics for the current user. */
function Estatisticas() {
  const [estatistica, setEstatistica] = useState<Estatistica | null>(null);

  useEffect(() => {
    let active = true;

    void (async () => {
      const response = await api.get<Estatistica>("/estatisticas/me");

      if (active) {
        setEstatistica(response.data);
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
          <h1>Dashboard</h1>
          <p>Acompanhe seu desempenho geral.</p>
        </div>
      </div>

      <Card>
        <div className="progress-wrapper">
          <div className="progress-header">
            <span>Percentual de acerto</span>
            <strong>{estatistica?.percentual_acerto.toFixed(1) ?? "0.0"}%</strong>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${estatistica?.percentual_acerto ?? 0}%`,
              }}
            />
          </div>
        </div>

        <div className="details-grid">
          <div>
            <span>Respondidas</span>
            <strong>{estatistica?.quantidade_respondidas ?? 0}</strong>
          </div>

          <div>
            <span>Acertos</span>
            <strong>{estatistica?.quantidade_acertos ?? 0}</strong>
          </div>

          <div>
            <span>Erros</span>
            <strong>{estatistica?.quantidade_erros ?? 0}</strong>
          </div>
        </div>
      </Card>
    </section>
  );
}

export default Estatisticas;
