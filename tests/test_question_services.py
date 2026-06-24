import pytest
from sqlmodel import select

from app.models import Administrador, Alternativa, NivelDificuldade
from app.services.administrador_service import AdministradorService
from app.services.questao_service import QuestaoService

from .conftest import create_admin, create_disciplina, create_question, create_user


def test_criar_administrador_requires_existing_non_admin_user(session):
    create_user(session)
    usuario = create_user(
        session,
        nome="Grace Hopper",
        email="grace-admin-service@example.com",
        senha="senha-admin",
    )
    assert usuario.id is not None

    admin = AdministradorService.criar_administrador(session, usuario.id, 5)

    assert admin.usuario_id == usuario.id
    assert admin.nivel_acesso == 5

    with pytest.raises(ValueError, match="já é administrador"):
        AdministradorService.criar_administrador(session, usuario.id, 10)

    with pytest.raises(ValueError, match="Usuário não encontrado"):
        AdministradorService.criar_administrador(session, 999, 1)


def test_cadastrar_questao_persists_question_and_alternatives(session):
    questao, correta, incorreta = create_question(session)

    alternativas = session.exec(
        select(Alternativa).where(Alternativa.questao_id == questao.id)
    ).all()

    assert questao.enunciado == "Quanto é 2 + 2?"
    assert questao.nivel == NivelDificuldade.FACIL
    assert len(alternativas) == 3
    assert correta.texto == "4"
    assert incorreta.correta is False


def test_cadastrar_questao_validates_references_and_correct_alternative_count(session):
    admin = create_admin(session)
    disciplina = create_disciplina(session)
    assert admin.id is not None
    assert disciplina.id is not None

    base_payload = {
        "session": session,
        "administrador_id": admin.id,
        "enunciado": "Pergunta",
        "assunto": "Assunto",
        "ano": 2026,
        "nivel": NivelDificuldade.MEDIO,
        "explicacao": "Explicação",
        "disciplina_id": disciplina.id,
    }

    with pytest.raises(ValueError, match="pelo menos duas"):
        AdministradorService.cadastrar_questao(
            **base_payload,
            alternativas=[{"texto": "A", "correta": True}],
        )

    with pytest.raises(ValueError, match="exatamente uma"):
        AdministradorService.cadastrar_questao(
            **base_payload,
            alternativas=[
                {"texto": "A", "correta": True},
                {"texto": "B", "correta": True},
            ],
        )

    with pytest.raises(ValueError, match="Administrador não encontrado"):
        AdministradorService.cadastrar_questao(
            **{**base_payload, "administrador_id": 999},
            alternativas=[
                {"texto": "A", "correta": True},
                {"texto": "B", "correta": False},
            ],
        )

    with pytest.raises(ValueError, match="Disciplina não encontrada"):
        AdministradorService.cadastrar_questao(
            **{**base_payload, "disciplina_id": 999},
            alternativas=[
                {"texto": "A", "correta": True},
                {"texto": "B", "correta": False},
            ],
        )


def test_questao_service_lists_filters_and_validates_answers(session):
    primeira, correta, incorreta = create_question(session)
    outra_disciplina = create_disciplina(session, "Português")
    admin = create_admin_for_second_question(session)
    assert primeira.id is not None
    assert correta.id is not None
    assert incorreta.id is not None
    assert admin.id is not None
    assert outra_disciplina.id is not None

    segunda = AdministradorService.cadastrar_questao(
        session=session,
        administrador_id=admin.id,
        enunciado="Identifique o verbo.",
        assunto="Gramática",
        ano=2026,
        nivel=NivelDificuldade.FACIL,
        explicacao="Verbo expressa ação, estado ou fenômeno.",
        disciplina_id=outra_disciplina.id,
        alternativas=[
            {"texto": "Correr", "correta": True},
            {"texto": "Azul", "correta": False},
        ],
    )
    assert segunda.id is not None

    assert QuestaoService.buscar_por_id(session, primeira.id) == primeira
    assert {questao.id for questao in QuestaoService.listar_todas(session)} == {
        primeira.id,
        segunda.id,
    }
    assert QuestaoService.buscar_por_disciplina(session, primeira.disciplina_id) == [
        primeira
    ]
    assert QuestaoService.validar_resposta(session, primeira.id, correta.id) is True
    assert QuestaoService.validar_resposta(session, primeira.id, incorreta.id) is False

    segunda_alternativa = session.exec(
        select(Alternativa).where(Alternativa.questao_id == segunda.id)
    ).first()
    assert segunda_alternativa is not None
    assert segunda_alternativa.id is not None

    with pytest.raises(ValueError, match="não pertence"):
        QuestaoService.validar_resposta(session, primeira.id, segunda_alternativa.id)

    with pytest.raises(ValueError, match="Questão não encontrada"):
        QuestaoService.buscar_por_id(session, 999)

    with pytest.raises(ValueError, match="Alternativa não encontrada"):
        QuestaoService.validar_resposta(session, primeira.id, 999)


def create_admin_for_second_question(session):
    usuario = create_user(
        session,
        nome="Segundo Admin",
        email="admin-2@example.com",
        senha="senha-admin",
    )
    assert usuario.id is not None
    administrador = session.exec(
        select(Administrador).where(Administrador.usuario_id == usuario.id)
    ).first()

    if administrador:
        return administrador

    return AdministradorService.criar_administrador(session, usuario.id, 10)
