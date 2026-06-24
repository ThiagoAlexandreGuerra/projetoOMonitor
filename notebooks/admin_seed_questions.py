import marimo

__generated_with = "0.23.9"
app = marimo.App()


@app.cell
def _():
    import os
    import sys
    from pathlib import Path

    import marimo as mo
    from sqlmodel import Session, SQLModel, select

    PROJECT_ROOT = Path(__file__).resolve().parents[1]
    if str(PROJECT_ROOT) not in sys.path:
        sys.path.insert(0, str(PROJECT_ROOT))
    os.chdir(PROJECT_ROOT)
    return SQLModel, Session, mo, select


@app.cell
def _():
    from app.core.security import gerar_hash_senha
    from app.database import engine
    from app.models import Administrador, Disciplina, NivelDificuldade, Questao, Usuario
    from app.services.administrador_service import AdministradorService
    from app.services.disciplina_service import DisciplinaService
    from app.services.usuario_service import UsuarioService

    return (
        Administrador,
        AdministradorService,
        Disciplina,
        DisciplinaService,
        NivelDificuldade,
        Questao,
        Usuario,
        UsuarioService,
        engine,
        gerar_hash_senha,
    )


@app.cell
def _(mo):
    mo.md("""
    # Seed administrativo

    Este notebook garante o login do administrador `user1@exemplo.com`
    com senha `1234` e cadastra questões genéricas de exemplo no banco
    `database.sqlite`.
    """)
    return


@app.cell
def _():
    ADMIN_EMAIL = "user1@exemplo.com"
    ADMIN_PASSWORD = "1234"
    ADMIN_NAME = "Administrador Exemplo"

    SAMPLE_QUESTIONS = [
        {
            "disciplina": "Conhecimentos Gerais",
            "enunciado": "Qual é uma boa prática para organizar uma rotina de estudos?",
            "assunto": "Organização",
            "ano": 2026,
            "nivel": "FACIL",
            "explicacao": "Planejar horários, revisar conteúdos e acompanhar metas ajuda a manter consistência.",
            "alternativas": [
                {"texto": "Estudar apenas quando sobrar tempo.", "correta": False},
                {"texto": "Definir metas e revisar com frequência.", "correta": True},
                {"texto": "Evitar registrar o progresso.", "correta": False},
                {"texto": "Trocar de assunto a cada minuto.", "correta": False},
            ],
        },
        {
            "disciplina": "Matemática Básica",
            "enunciado": "Quanto é 12 dividido por 3?",
            "assunto": "Divisão",
            "ano": 2026,
            "nivel": "FACIL",
            "explicacao": "Dividir 12 em 3 partes iguais resulta em 4.",
            "alternativas": [
                {"texto": "3", "correta": False},
                {"texto": "4", "correta": True},
                {"texto": "6", "correta": False},
                {"texto": "9", "correta": False},
            ],
        },
        {
            "disciplina": "Português",
            "enunciado": "Qual prática melhora a compreensão de um texto?",
            "assunto": "Leitura",
            "ano": 2026,
            "nivel": "FACIL",
            "explicacao": "Identificar ideias principais e reler trechos importantes melhora a compreensão.",
            "alternativas": [
                {"texto": "Ignorar o título.", "correta": False},
                {"texto": "Ler sem atenção.", "correta": False},
                {"texto": "Identificar ideias principais.", "correta": True},
                {"texto": "Não observar o contexto.", "correta": False},
            ],
        },
        {
            "disciplina": "Tecnologia",
            "enunciado": "O que é uma variável em programação?",
            "assunto": "Programação",
            "ano": 2026,
            "nivel": "MEDIO",
            "explicacao": "Uma variável é um nome associado a um valor que pode ser usado pelo programa.",
            "alternativas": [
                {"texto": "Um erro obrigatório do sistema.", "correta": False},
                {"texto": "Um nome usado para armazenar um valor.", "correta": True},
                {"texto": "Um tipo de monitor.", "correta": False},
                {"texto": "Uma senha fixa do usuário.", "correta": False},
            ],
        },
        {
            "disciplina": "Lógica",
            "enunciado": "Se uma afirmação é verdadeira, sua negação é o quê?",
            "assunto": "Negação",
            "ano": 2026,
            "nivel": "MEDIO",
            "explicacao": "A negação inverte o valor lógico da afirmação original.",
            "alternativas": [
                {"texto": "Também verdadeira.", "correta": False},
                {"texto": "Sempre desconhecida.", "correta": False},
                {"texto": "Falsa.", "correta": True},
                {"texto": "Igual à afirmação original.", "correta": False},
            ],
        },
        {
            "disciplina": "Direito",
            "enunciado": "Qual é uma função geral de uma constituição?",
            "assunto": "Constituição",
            "ano": 2026,
            "nivel": "MEDIO",
            "explicacao": "A constituição organiza o Estado e estabelece direitos e deveres fundamentais.",
            "alternativas": [
                {"texto": "Organizar o Estado e proteger direitos.", "correta": True},
                {"texto": "Substituir todos os livros didáticos.", "correta": False},
                {"texto": "Eliminar a necessidade de leis.", "correta": False},
                {"texto": "Definir apenas calendários escolares.", "correta": False},
            ],
        },
        {
            "disciplina": "Ciências",
            "enunciado": "Qual é o papel da hipótese em uma investigação científica?",
            "assunto": "Método científico",
            "ano": 2026,
            "nivel": "MEDIO",
            "explicacao": "A hipótese é uma explicação provisória que pode ser testada por observação ou experimento.",
            "alternativas": [
                {
                    "texto": "Uma resposta que nunca precisa ser testada.",
                    "correta": False,
                },
                {"texto": "Uma explicação provisória testável.", "correta": True},
                {"texto": "Um resultado sempre definitivo.", "correta": False},
                {"texto": "Uma opinião sem relação com evidências.", "correta": False},
            ],
        },
        {
            "disciplina": "História",
            "enunciado": "Por que fontes históricas são importantes?",
            "assunto": "Fontes históricas",
            "ano": 2026,
            "nivel": "FACIL",
            "explicacao": "Fontes históricas ajudam a investigar e interpretar acontecimentos do passado.",
            "alternativas": [
                {
                    "texto": "Porque substituem qualquer interpretação.",
                    "correta": False,
                },
                {
                    "texto": "Porque ajudam a estudar acontecimentos do passado.",
                    "correta": True,
                },
                {"texto": "Porque impedem novas pesquisas.", "correta": False},
                {"texto": "Porque são sempre idênticas entre si.", "correta": False},
            ],
        },
    ]
    return ADMIN_EMAIL, ADMIN_NAME, ADMIN_PASSWORD, SAMPLE_QUESTIONS


@app.cell
def _(
    Administrador,
    AdministradorService,
    Disciplina,
    DisciplinaService,
    NivelDificuldade,
    Questao,
    SQLModel,
    Session,
    Usuario,
    UsuarioService,
    engine,
    gerar_hash_senha,
    select,
):
    def ensure_user(session, nome, email, senha):
        usuario = session.exec(select(Usuario).where(Usuario.email == email)).first()

        if usuario is None:
            return UsuarioService.cadastrar(
                session=session,
                nome=nome,
                email=email,
                senha=senha,
            )

        usuario.nome = nome
        usuario.senha_hash = gerar_hash_senha(senha)
        usuario.ativo = True
        session.add(usuario)
        session.commit()
        session.refresh(usuario)
        return usuario

    def ensure_admin(session, usuario):
        assert usuario.id is not None
        administrador = session.exec(
            select(Administrador).where(Administrador.usuario_id == usuario.id)
        ).first()

        if administrador:
            return administrador

        return AdministradorService.criar_administrador(
            session=session,
            usuario_id=usuario.id,
            nivel_acesso=10,
        )

    def get_or_create_disciplina(session, nome):
        disciplina = session.exec(
            select(Disciplina).where(Disciplina.nome == nome)
        ).first()

        if disciplina:
            return disciplina

        return DisciplinaService.cadastrar(session, nome)

    def seed_question(session, administrador, payload):
        existente = session.exec(
            select(Questao).where(Questao.enunciado == payload["enunciado"])
        ).first()

        if existente:
            return existente, "existente"

        disciplina = get_or_create_disciplina(session, payload["disciplina"])
        assert administrador.id is not None
        assert disciplina.id is not None

        questao = AdministradorService.cadastrar_questao(
            session=session,
            administrador_id=administrador.id,
            enunciado=payload["enunciado"],
            assunto=payload["assunto"],
            ano=payload["ano"],
            nivel=NivelDificuldade(payload["nivel"]),
            explicacao=payload["explicacao"],
            disciplina_id=disciplina.id,
            alternativas=payload["alternativas"],
        )
        return questao, "criada"

    def run_seed(admin_email, admin_password, admin_name, sample_questions):
        SQLModel.metadata.create_all(engine)

        with Session(engine) as session:
            ensure_user(session, admin_name, admin_email, admin_password)
            usuario_logado = UsuarioService.login(session, admin_email, admin_password)
            administrador = ensure_admin(session, usuario_logado)

            registros = []
            for payload in sample_questions:
                questao, status = seed_question(session, administrador, payload)
                registros.append(
                    {
                        "status": status,
                        "id": questao.id,
                        "disciplina": payload["disciplina"],
                        "enunciado": questao.enunciado,
                    }
                )

            return {
                "admin": usuario_logado.email,
                "administrador_id": administrador.id,
                "questoes": registros,
            }

    return (run_seed,)


@app.cell
def _(ADMIN_EMAIL, ADMIN_NAME, ADMIN_PASSWORD, SAMPLE_QUESTIONS, run_seed):
    resultado_seed = run_seed(
        ADMIN_EMAIL,
        ADMIN_PASSWORD,
        ADMIN_NAME,
        SAMPLE_QUESTIONS,
    )
    return (resultado_seed,)


@app.cell
def _(mo, resultado_seed):
    criadas = sum(
        1 for item in resultado_seed["questoes"] if item["status"] == "criada"
    )
    existentes = sum(
        1 for item in resultado_seed["questoes"] if item["status"] == "existente"
    )
    mo.md(
        f"""
        ## Resultado

        Administrador autenticado: `{resultado_seed["admin"]}`

        Perfil administrador ID: `{resultado_seed["administrador_id"]}`

        Questões criadas: **{criadas}**

        Questões já existentes: **{existentes}**
        """
    )
    return


@app.cell
def _(mo, resultado_seed):
    mo.ui.table(resultado_seed["questoes"])
    return


if __name__ == "__main__":
    app.run()
