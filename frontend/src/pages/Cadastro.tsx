import { useState } from "react";
import type { SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { api } from "../api/api";
import Button from "../components/Button";

/** Render the user sign-up page. */
function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  /** Submit the registration form and redirect on success. */
  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setCarregando(true);
      setErro("");

      await api.post("/usuarios", {
        nome,
        email,
        senha,
      });

      void navigate("/login");
    } catch {
      setErro("Não foi possível cadastrar o usuário.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <img src="/logo-o-monitor-transparente.png" alt="Monitor" className="auth-logo" />

        <h1>Cadastrar</h1>
        <p>Crie sua conta para usar a plataforma.</p>

        {erro && <div className="error-message">{erro}</div>}

        <form onSubmit={(event) => void handleSubmit(event)} className="form">
          <label>
            Nome
            <input
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              required
            />
          </label>

          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              required
            />
          </label>

          <Button type="submit" disabled={carregando}>
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>

        <span className="auth-link">
          Já tem conta? <Link to="/login">Entrar</Link>
        </span>
      </section>
    </main>
  );
}

export default Cadastro;
