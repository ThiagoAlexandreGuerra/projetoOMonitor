import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";
import { Link } from "react-router-dom";

import { api } from "../../api/api";
import Button from "../../components/Button";
import Card from "../../components/Card";
import type { Administrador } from "../../types";

/** Render administrator promotion tools. */
function AdminAdministradores() {
  const [administradores, setAdministradores] = useState<Administrador[]>([]);
  const [email, setEmail] = useState("");
  const [nivelAcesso, setNivelAcesso] = useState(1);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function carregarAdministradores() {
    const response = await api.get<Administrador[]>("/administradores");
    setAdministradores(response.data);
  }

  async function cadastrar(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setMensagem("");

    try {
      await api.post("/administradores", {
        email,
        nivel_acesso: nivelAcesso,
      });
      setEmail("");
      setNivelAcesso(1);
      setMensagem("Administrador cadastrado.");
      await carregarAdministradores();
    } catch {
      setErro("Não foi possível cadastrar o administrador.");
    }
  }

  useEffect(() => {
    let active = true;

    void (async () => {
      const response = await api.get<Administrador[]>("/administradores");

      if (active) {
        setAdministradores(response.data);
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
          <h1>Administradores</h1>
          <p>Promova usuários existentes para liberar funções administrativas.</p>
        </div>
        <Link className="btn btn-secondary" to="/admin/cadastro">
          Cadastrar administrador
        </Link>
      </div>

      <Card>
        {erro && <div className="error-message">{erro}</div>}
        <form className="form" onSubmit={(event) => void cadastrar(event)}>
          <label>
            E-mail do usuário
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Nível de acesso
            <input
              type="number"
              min="1"
              value={nivelAcesso}
              onChange={(event) => setNivelAcesso(Number(event.target.value))}
              required
            />
          </label>

          <Button type="submit">Cadastrar administrador</Button>
        </form>
        {mensagem && <div className="success-message">{mensagem}</div>}
      </Card>

      <div className="list">
        {administradores.map((administrador) => (
          <Card key={administrador.id}>
            <h3>{administrador.usuario?.nome ?? `Usuário #${administrador.usuario_id}`}</h3>
            <p className="muted">{administrador.usuario?.email}</p>
            <span className="muted">Nível: {administrador.nivel_acesso}</span>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default AdminAdministradores;
