import pytest
from sqlmodel import select

from app.core.security import verificar_senha
from app.models import Administrador, Historico
from app.services.disciplina_service import DisciplinaService
from app.services.usuario_service import UsuarioService

from .conftest import create_user


def test_cadastrar_usuario_hashes_password_and_creates_history(session):
    usuario = create_user(session)

    historico = session.exec(
        select(Historico).where(Historico.usuario_id == usuario.id)
    ).one()
    administrador = session.exec(
        select(Administrador).where(Administrador.usuario_id == usuario.id)
    ).one()

    assert usuario.id is not None
    assert usuario.ativo is True
    assert administrador.nivel_acesso == 10
    assert usuario.senha_hash != "senha-segura"
    assert verificar_senha("senha-segura", usuario.senha_hash)
    assert historico.total_respondidas == 0
    assert historico.total_acertos == 0
    assert historico.total_erros == 0


def test_cadastrar_usuario_rejects_duplicate_email(session):
    create_user(session)

    with pytest.raises(ValueError, match="Já existe"):
        create_user(session, nome="Outra", email="ada@example.com")


def test_login_rejects_invalid_password_and_inactive_user(session):
    usuario = create_user(session)

    with pytest.raises(ValueError, match="inválidos"):
        UsuarioService.login(session, "ada@example.com", "senha-errada")

    assert usuario.id is not None
    UsuarioService.desativar_usuario(session, usuario.id)

    with pytest.raises(ValueError, match="inativo"):
        UsuarioService.login(session, "ada@example.com", "senha-segura")


def test_editar_perfil_updates_fields_and_rejects_email_in_use(session):
    usuario = create_user(session)
    create_user(
        session,
        nome="Grace Hopper",
        email="grace@example.com",
        senha="outra-senha",
    )

    assert usuario.id is not None
    atualizado = UsuarioService.editar_perfil(
        session,
        usuario.id,
        nome="Ada Byron",
        email="ada.byron@example.com",
    )

    assert atualizado.nome == "Ada Byron"
    assert atualizado.email == "ada.byron@example.com"

    with pytest.raises(ValueError, match="em uso"):
        UsuarioService.editar_perfil(session, usuario.id, email="grace@example.com")


def test_disciplina_crud_and_duplicate_guard(session):
    disciplina = DisciplinaService.cadastrar(session, "Direito Constitucional")
    assert disciplina.id is not None

    assert DisciplinaService.buscar_por_id(session, disciplina.id).nome == (
        "Direito Constitucional"
    )
    assert DisciplinaService.listar_todas(session) == [disciplina]

    with pytest.raises(ValueError, match="já cadastrada"):
        DisciplinaService.cadastrar(session, "Direito Constitucional")

    with pytest.raises(ValueError, match="não encontrada"):
        DisciplinaService.buscar_por_id(session, 999)
