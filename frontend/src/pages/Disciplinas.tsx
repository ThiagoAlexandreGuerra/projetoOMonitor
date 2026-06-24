import { useEffect, useState } from "react";

import { api } from "../api/api";
import Card from "../components/Card";
import type { Disciplina } from "../types";

/** Render the discipline management page. */
function Disciplinas() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

  useEffect(() => {
    let active = true;

    void (async () => {
      const response = await api.get<Disciplina[]>("/disciplinas");

      if (active) {
        setDisciplinas(response.data);
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
          <h1>Disciplinas</h1>
          <p>Consulte as áreas de estudo disponíveis.</p>
        </div>
      </div>

      <div className="list">
        {disciplinas.map((disciplina) => (
          <Card key={disciplina.id}>
            <h3>{disciplina.nome}</h3>
            <span className="muted">ID: {disciplina.id}</span>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Disciplinas;
