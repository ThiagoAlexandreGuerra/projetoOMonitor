import { useState } from "react";
import type { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../../api/api";
import Button from "../../components/Button";
import Card from "../../components/Card";

/** Render administrator registration and bootstrap page. */
function CadastrarAdministrador() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nivelAcesso, setNivelAcesso] = useState(1);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function cadastrar(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setMensagem("");

    try {
      await api.post("/administradores", {
        email,
        nivel_acesso: nivelAcesso,
      });

      setMensagem("Administrador cadastrado.");
      void navigate("/admin/disciplinas");
    } catch {
      setErro("Não foi possível cadastrar administrador. Informe o e-mail de um usuário existente.");
    }
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Cadastrar Administrador</h1>
          <p>
            O primeiro usuário cadastrado vira administrador automaticamente. Depois disso,
            administradores podem promover usuários existentes pelo e-mail.
          </p>
        </div>
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
    </section>
  );
}

export default CadastrarAdministrador;
