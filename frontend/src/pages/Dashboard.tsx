import { useEffect, useState } from "react";
import { BookOpen, CheckCircle, Target, XCircle } from "lucide-react";

import { api } from "../api/api";
import Card from "../components/Card";
import type { Estatistica } from "../types";

/** Render the main dashboard with the user's performance summary. */
function Dashboard() {
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
          <p>Resumo do desempenho na plataforma.</p>
        </div>
      </div>

      <div className="stats-grid">
        <Card>
          <div className="stat-card">
            <BookOpen />
            <span>Respondidas</span>
            <strong>{estatistica?.quantidade_respondidas ?? 0}</strong>
          </div>
        </Card>

        <Card>
          <div className="stat-card">
            <CheckCircle />
            <span>Acertos</span>
            <strong>{estatistica?.quantidade_acertos ?? 0}</strong>
          </div>
        </Card>

        <Card>
          <div className="stat-card">
            <XCircle />
            <span>Erros</span>
            <strong>{estatistica?.quantidade_erros ?? 0}</strong>
          </div>
        </Card>

        <Card>
          <div className="stat-card">
            <Target />
            <span>Percentual</span>
            <strong>{estatistica?.percentual_acerto.toFixed(1) ?? "0.0"}%</strong>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default Dashboard;
