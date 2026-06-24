from collections.abc import Generator

import pytest
from sqlalchemy.pool import StaticPool
from sqlmodel import SQLModel, Session, create_engine, select

from app.models import Administrador, Alternativa, NivelDificuldade
from app.services.administrador_service import AdministradorService
from app.services.disciplina_service import DisciplinaService
from app.services.usuario_service import UsuarioService


@pytest.fixture()
def session() -> Generator[Session, None, None]:
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    SQLModel.metadata.create_all(engine)

    with Session(engine) as test_session:
        yield test_session

    SQLModel.metadata.drop_all(engine)


def create_user(
    session: Session,
    *,
    nome: str = "Ada Lovelace",
    email: str = "ada@example.com",
    senha: str = "senha-segura",
):
    return UsuarioService.cadastrar(
        session=session,
        nome=nome,
        email=email,
        senha=senha,
    )


def create_admin(session: Session):
    usuario = create_user(
        session,
        nome="Admin",
        email="admin@example.com",
        senha="senha-admin",
    )
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


def create_disciplina(session: Session, nome: str = "Matemática"):
    return DisciplinaService.cadastrar(session=session, nome=nome)


def create_question(session: Session):
    administrador = create_admin(session)
    disciplina = create_disciplina(session)
    assert administrador.id is not None
    assert disciplina.id is not None

    questao = AdministradorService.cadastrar_questao(
        session=session,
        administrador_id=administrador.id,
        enunciado="Quanto é 2 + 2?",
        assunto="Aritmética",
        ano=2026,
        nivel=NivelDificuldade.FACIL,
        explicacao="Somar duas unidades com outras duas resulta em quatro.",
        disciplina_id=disciplina.id,
        alternativas=[
            {"texto": "3", "correta": False},
            {"texto": "4", "correta": True},
            {"texto": "5", "correta": False},
        ],
    )

    assert questao.id is not None
    alternativas = list(
        session.exec(
            select(Alternativa).where(Alternativa.questao_id == questao.id)
        ).all()
    )
    correta = next(alternativa for alternativa in alternativas if alternativa.correta)
    incorreta = next(alternativa for alternativa in alternativas if not alternativa.correta)

    return questao, correta, incorreta
