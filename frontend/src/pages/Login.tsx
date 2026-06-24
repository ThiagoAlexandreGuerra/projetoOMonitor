import { useState } from "react";
import type { SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { api } from "../api/api";
import Button from "../components/Button";
import type { TokenResponse, Usuario } from "../types";

/** Render the login page. */
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  /** Submit credentials and persist the authenticated user. */
  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setCarregando(true);
      setErro("");

      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", senha);

      const tokenResponse = await api.post<TokenResponse>(
        "/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      localStorage.setItem("access_token", tokenResponse.data.access_token);

      const meResponse = await api.get<Usuario>("/auth/me");

      localStorage.setItem("usuario", JSON.stringify(meResponse.data));

      try {
        await api.get("/administradores/me");
        localStorage.setItem("is_admin", "true");
      } catch {
        localStorage.setItem("is_admin", "false");
      }

      void navigate("/estatisticas");
    } catch {
      setErro("E-mail ou senha inválidos.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <img src="/logo-o-monitor-transparente.png" alt="Monitor" className="auth-logo" />

        <h1>Entrar</h1>
        <p>Acesse sua conta para continuar seus estudos.</p>

        {erro && <div className="error-message">{erro}</div>}

        <form onSubmit={(event) => void handleSubmit(event)} className="form">
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
            {carregando ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <span className="auth-link">
          Ainda não tem conta? <Link to="/cadastro">Cadastrar</Link>
        </span>
      </section>
    </main>
  );
}

export default Login;
