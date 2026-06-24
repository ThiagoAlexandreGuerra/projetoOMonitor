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
    from app.models import Alternativa, Favorito, MetaEstudo, Questao, Usuario
    from app.services.favorito_service import FavoritoService
    from app.services.meta_estudo_service import MetaEstudoService
    from app.services.resposta_service import RespostaService
    from app.services.usuario_service import UsuarioService

    return (
        Alternativa,
        FavoritoService,
        MetaEstudo,
        MetaEstudoService,
        Questao,
        RespostaService,
        Usuario,
        UsuarioService,
        engine,
        gerar_hash_senha,
    )


@app.cell
def _(mo):
    mo.md("""
    # Fluxo do usuário

    Este notebook garante o login do usuário `user2@exemplo.com` com senha
    `1234`, cadastra metas, responde algumas questões existentes e favorita
    questões de exemplo.

    Para ter questões disponíveis, execute antes o notebook
    `notebooks/admin_seed_questions.py`.
    """)
    return


@app.cell
def _():
    USER_EMAIL = "user2@exemplo.com"
    USER_PASSWORD = "1234"
    USER_NAME = "Usuário Exemplo"

    SAMPLE_GOALS = [
        {"quantidade_questoes": 3, "tempo_diario": 20},
        {"quantidade_questoes": 5, "tempo_diario": 30},
    ]

    QUESTIONS_TO_ANSWER = 4
    QUESTIONS_TO_FAVORITE = 5
    return (
        QUESTIONS_TO_ANSWER,
        QUESTIONS_TO_FAVORITE,
        SAMPLE_GOALS,
        USER_EMAIL,
        USER_NAME,
        USER_PASSWORD,
    )


@app.cell
def _(
    Alternativa,
    FavoritoService,
    MetaEstudo,
    MetaEstudoService,
    Questao,
    RespostaService,
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

    def ensure_goal(session, usuario_id, quantidade_questoes, tempo_diario):
        meta = session.exec(
            select(MetaEstudo).where(
                MetaEstudo.usuario_id == usuario_id,
                MetaEstudo.quantidade_questoes == quantidade_questoes,
                MetaEstudo.tempo_diario == tempo_diario,
                MetaEstudo.ativa,
            )
        ).first()

        if meta:
            return meta, "existente"

        meta = MetaEstudoService.definir_meta(
            session=session,
            usuario_id=usuario_id,
            quantidade_questoes=quantidade_questoes,
            tempo_diario=tempo_diario,
        )
        return meta, "criada"

    def answer_question(session, usuario_id, questao, prefer_correct):
        alternativas = list(
            session.exec(
                select(Alternativa).where(Alternativa.questao_id == questao.id)
            ).all()
        )
        if not alternativas:
            return None

        alternativa = next(
            (item for item in alternativas if item.correta is prefer_correct),
            alternativas[0],
        )

        resposta = RespostaService.iniciar_resolucao(
            session=session,
            usuario_id=usuario_id,
            questao_id=questao.id,
        )
        assert resposta.id is not None
        assert alternativa.id is not None

        resposta_corrigida = RespostaService.responder(
            session=session,
            resposta_id=resposta.id,
            alternativa_id=alternativa.id,
        )
        return {
            "questao_id": questao.id,
            "enunciado": questao.enunciado,
            "alternativa": alternativa.texto,
            "correta": resposta_corrigida.correta,
        }

    def favorite_question(session, usuario_id, questao):
        try:
            favorito = FavoritoService.adicionar(
                session=session,
                usuario_id=usuario_id,
                questao_id=questao.id,
            )
            return {
                "status": "criado",
                "favorito_id": favorito.id,
                "questao_id": questao.id,
                "enunciado": questao.enunciado,
            }
        except ValueError as error:
            if "já está nos favoritos" not in str(error):
                raise

            return {
                "status": "existente",
                "favorito_id": None,
                "questao_id": questao.id,
                "enunciado": questao.enunciado,
            }

    def run_user_flow(
        user_email,
        user_password,
        user_name,
        sample_goals,
        questions_to_answer,
        questions_to_favorite,
    ):
        SQLModel.metadata.create_all(engine)

        with Session(engine) as session:
            ensure_user(session, user_name, user_email, user_password)
            usuario = UsuarioService.login(session, user_email, user_password)
            assert usuario.id is not None

            metas = []
            for goal in sample_goals:
                meta, status = ensure_goal(
                    session=session,
                    usuario_id=usuario.id,
                    quantidade_questoes=goal["quantidade_questoes"],
                    tempo_diario=goal["tempo_diario"],
                )
                metas.append(
                    {
                        "status": status,
                        "id": meta.id,
                        "quantidade_questoes": meta.quantidade_questoes,
                        "tempo_diario": meta.tempo_diario,
                    }
                )

            questoes = list(session.exec(select(Questao).order_by(Questao.id)).all())

            respostas = []
            for index, questao in enumerate(questoes[:questions_to_answer]):
                resposta = answer_question(
                    session=session,
                    usuario_id=usuario.id,
                    questao=questao,
                    prefer_correct=index % 2 == 0,
                )
                if resposta:
                    respostas.append(resposta)

            favoritos = [
                favorite_question(session, usuario.id, questao)
                for questao in questoes[:questions_to_favorite]
            ]

            return {
                "usuario": usuario.email,
                "metas": metas,
                "respostas": respostas,
                "favoritos": favoritos,
                "questoes_disponiveis": len(questoes),
            }

    return (run_user_flow,)


@app.cell
def _(
    QUESTIONS_TO_ANSWER,
    QUESTIONS_TO_FAVORITE,
    SAMPLE_GOALS,
    USER_EMAIL,
    USER_NAME,
    USER_PASSWORD,
    run_user_flow,
):
    resultado_usuario = run_user_flow(
        USER_EMAIL,
        USER_PASSWORD,
        USER_NAME,
        SAMPLE_GOALS,
        QUESTIONS_TO_ANSWER,
        QUESTIONS_TO_FAVORITE,
    )
    return (resultado_usuario,)


@app.cell
def _(mo, resultado_usuario):
    mo.md(
        f"""
        ## Resultado

        Usuário autenticado: `{resultado_usuario["usuario"]}`

        Questões disponíveis no banco: **{resultado_usuario["questoes_disponiveis"]}**

        Metas processadas: **{len(resultado_usuario["metas"])}**

        Respostas registradas: **{len(resultado_usuario["respostas"])}**

        Favoritos processados: **{len(resultado_usuario["favoritos"])}**
        """
    )
    return


@app.cell
def _(mo, resultado_usuario):
    mo.md("### Metas")
    mo.ui.table(resultado_usuario["metas"])
    return


@app.cell
def _(mo, resultado_usuario):
    mo.md("### Respostas")
    mo.ui.table(resultado_usuario["respostas"])
    return


@app.cell
def _(mo, resultado_usuario):
    mo.md("### Favoritos")
    mo.ui.table(resultado_usuario["favoritos"])
    return


if __name__ == "__main__":
    app.run()
