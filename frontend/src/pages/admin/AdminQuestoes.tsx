import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";

import { api } from "../../api/api";
import Button from "../../components/Button";
import Card from "../../components/Card";
import type { AlternativaCreate, Disciplina, NivelDificuldade, Questao } from "../../types";

const alternativaInicial: AlternativaCreate[] = [
  { texto: "", correta: true },
  { texto: "", correta: false },
  { texto: "", correta: false },
  { texto: "", correta: false },
];

/** Render administrator question creation. */
function AdminQuestoes() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [enunciado, setEnunciado] = useState("");
  const [assunto, setAssunto] = useState("");
  const [ano, setAno] = useState(new Date().getFullYear());
  const [nivel, setNivel] = useState<NivelDificuldade>("FACIL");
  const [explicacao, setExplicacao] = useState("");
  const [disciplinaId, setDisciplinaId] = useState("");
  const [alternativas, setAlternativas] = useState<AlternativaCreate[]>(alternativaInicial);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function carregarDados() {
    const [disciplinasResponse, questoesResponse] = await Promise.all([
      api.get<Disciplina[]>("/disciplinas"),
      api.get<Questao[]>("/questoes"),
    ]);

    setDisciplinas(disciplinasResponse.data);
    setQuestoes(questoesResponse.data);
  }

  function atualizarAlternativa(index: number, texto: string) {
    setAlternativas((atuais) =>
      atuais.map((alternativa, currentIndex) =>
        currentIndex === index ? { ...alternativa, texto } : alternativa,
      ),
    );
  }

  function marcarCorreta(index: number) {
    setAlternativas((atuais) =>
      atuais.map((alternativa, currentIndex) => ({
        ...alternativa,
        correta: currentIndex === index,
      })),
    );
  }

  async function cadastrar(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setMensagem("");

    try {
      await api.post("/questoes", {
        enunciado,
        assunto,
        ano,
        nivel,
        explicacao,
        disciplina_id: Number(disciplinaId),
        alternativas,
      });

      setEnunciado("");
      setAssunto("");
      setAno(new Date().getFullYear());
      setNivel("FACIL");
      setExplicacao("");
      setDisciplinaId("");
      setAlternativas(alternativaInicial);
      setMensagem("Questão cadastrada.");
      await carregarDados();
    } catch {
      setErro("Não foi possível cadastrar a questão. Verifique os campos e a alternativa correta.");
    }
  }

  useEffect(() => {
    let active = true;

    void (async () => {
      const [disciplinasResponse, questoesResponse] = await Promise.all([
        api.get<Disciplina[]>("/disciplinas"),
        api.get<Questao[]>("/questoes"),
      ]);

      if (active) {
        setDisciplinas(disciplinasResponse.data);
        setQuestoes(questoesResponse.data);
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
          <h1>Administração de Questões</h1>
          <p>Cadastre questões que ficarão disponíveis para os usuários.</p>
        </div>
      </div>

      <Card>
        {erro && <div className="error-message">{erro}</div>}
        <form className="form" onSubmit={(event) => void cadastrar(event)}>
          <label>
            Enunciado
            <textarea
              value={enunciado}
              onChange={(event) => setEnunciado(event.target.value)}
              required
            />
          </label>

          <div className="form-grid">
            <label>
              Assunto
              <input value={assunto} onChange={(event) => setAssunto(event.target.value)} required />
            </label>

            <label>
              Ano
              <input
                type="number"
                value={ano}
                onChange={(event) => setAno(Number(event.target.value))}
                required
              />
            </label>
          </div>

          <div className="form-grid">
            <label>
              Nível
              <select value={nivel} onChange={(event) => setNivel(event.target.value as NivelDificuldade)}>
                <option value="FACIL">Fácil</option>
                <option value="MEDIO">Médio</option>
                <option value="DIFICIL">Difícil</option>
              </select>
            </label>

            <label>
              Disciplina
              <select
                value={disciplinaId}
                onChange={(event) => setDisciplinaId(event.target.value)}
                required
              >
                <option value="">Selecione</option>
                {disciplinas.map((disciplina) => (
                  <option key={disciplina.id} value={disciplina.id}>
                    {disciplina.nome}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label>
            Explicação
            <textarea
              value={explicacao}
              onChange={(event) => setExplicacao(event.target.value)}
              required
            />
          </label>

          <div className="alternatives-editor">
            <strong>Alternativas</strong>
            {alternativas.map((alternativa, index) => (
              <label key={index} className="alternative-editor">
                <input
                  type="radio"
                  name="correta"
                  checked={alternativa.correta}
                  onChange={() => marcarCorreta(index)}
                />
                <input
                  placeholder={`Alternativa ${index + 1}`}
                  value={alternativa.texto}
                  onChange={(event) => atualizarAlternativa(index, event.target.value)}
                  required
                />
              </label>
            ))}
          </div>

          <Button type="submit">Cadastrar questão</Button>
        </form>
        {mensagem && <div className="success-message">{mensagem}</div>}
      </Card>

      <div className="list">
        {questoes.map((questao) => (
          <Card key={questao.id}>
            <span className={`badge badge-${questao.nivel.toLowerCase()}`}>{questao.nivel}</span>
            <h3>{questao.enunciado}</h3>
            <p className="muted">
              {questao.assunto} • {questao.ano}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default AdminQuestoes;
