import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";

import { api } from "../../api/api";
import Button from "../../components/Button";
import Card from "../../components/Card";
import type { Disciplina } from "../../types";

/** Render administrator discipline management. */
function AdminDisciplinas() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function carregarDisciplinas() {
    const response = await api.get<Disciplina[]>("/disciplinas");
    setDisciplinas(response.data);
  }

  async function cadastrar(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setMensagem("");

    try {
      await api.post("/disciplinas", { nome });
      setNome("");
      setMensagem("Disciplina cadastrada.");
      await carregarDisciplinas();
    } catch {
      setErro("Não foi possível cadastrar a disciplina.");
    }
  }

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
          <h1>Administração de Disciplinas</h1>
          <p>Cadastre áreas de estudo para os usuários resolverem questões.</p>
        </div>
      </div>

      <Card>
        {erro && <div className="error-message">{erro}</div>}
        <form className="inline-form" onSubmit={(event) => void cadastrar(event)}>
          <input
            placeholder="Nome da disciplina"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
          <Button type="submit">Cadastrar</Button>
        </form>
        {mensagem && <div className="success-message">{mensagem}</div>}
      </Card>

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

export default AdminDisciplinas;
