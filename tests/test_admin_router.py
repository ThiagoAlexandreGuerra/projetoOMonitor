import pytest
from fastapi import HTTPException

from app.dependencies.admin import get_current_admin
from app.routers.administrador_router import (
    cadastrar_administrador,
    cadastro_administrador_disponivel,
)
from app.routers.disciplina_router import cadastrar_disciplina
from app.schemas.administrador_schemas import AdministradorCreate
from app.schemas.disciplina_schemas import DisciplinaCreate
from app.services.usuario_service import UsuarioService


def test_first_registered_user_is_admin_by_default(session):
    usuario = UsuarioService.cadastrar(
        session=session,
        nome="Ada",
        email="ada-admin@example.com",
        senha="senha",
    )

    administrador = get_current_admin(usuario=usuario, session=session)

    assert administrador.usuario_id == usuario.id
    assert administrador.nivel_acesso == 10


def test_admin_can_promote_existing_user_by_email(session):
    admin_user = UsuarioService.cadastrar(
        session=session,
        nome="Admin",
        email="admin-route@example.com",
        senha="senha",
    )
    normal_user = UsuarioService.cadastrar(
        session=session,
        nome="Normal",
        email="normal-route@example.com",
        senha="senha",
    )

    administrador = cadastrar_administrador(
        data=AdministradorCreate(email=normal_user.email, nivel_acesso=5),
        session=session,
        usuario=admin_user,
    )

    assert administrador.usuario_id == normal_user.id
    assert administrador.nivel_acesso == 5


def test_non_admin_cannot_promote_existing_user(session):
    admin_user = UsuarioService.cadastrar(
        session=session,
        nome="Admin",
        email="admin-forbidden@example.com",
        senha="senha",
    )
    normal_user = UsuarioService.cadastrar(
        session=session,
        nome="Normal",
        email="normal-forbidden@example.com",
        senha="senha",
    )
    target_user = UsuarioService.cadastrar(
        session=session,
        nome="Target",
        email="target-forbidden@example.com",
        senha="senha",
    )
    assert admin_user.id is not None

    with pytest.raises(HTTPException) as forbidden:
        cadastrar_administrador(
            data=AdministradorCreate(email=target_user.email, nivel_acesso=1),
            session=session,
            usuario=normal_user,
        )

    assert forbidden.value.status_code == 403


def test_admin_cannot_promote_unknown_email(session):
    admin_user = UsuarioService.cadastrar(
        session=session,
        nome="Admin",
        email="admin-unknown@example.com",
        senha="senha",
    )

    with pytest.raises(HTTPException) as not_found:
        cadastrar_administrador(
            data=AdministradorCreate(email="nao-existe@example.com", nivel_acesso=1),
            session=session,
            usuario=admin_user,
        )

    assert not_found.value.status_code == 404


def test_admin_registration_availability_matches_admin_profile(session):
    admin_user = UsuarioService.cadastrar(
        session=session,
        nome="Admin",
        email="admin-availability@example.com",
        senha="senha",
    )
    normal_user = UsuarioService.cadastrar(
        session=session,
        nome="Normal",
        email="normal-availability@example.com",
        senha="senha",
    )

    assert cadastro_administrador_disponivel(
        session=session,
        usuario=admin_user,
    ).disponivel is True
    assert cadastro_administrador_disponivel(
        session=session,
        usuario=normal_user,
    ).disponivel is False


def test_only_admin_can_create_discipline_after_bootstrap(session):
    admin_user = UsuarioService.cadastrar(
        session=session,
        nome="Admin",
        email="admin-route@example.com",
        senha="senha",
    )
    normal_user = UsuarioService.cadastrar(
        session=session,
        nome="Normal",
        email="normal-route@example.com",
        senha="senha",
    )
    assert normal_user.id is not None

    with pytest.raises(HTTPException) as forbidden:
        get_current_admin(usuario=normal_user, session=session)

    assert forbidden.value.status_code == 403

    administrador = get_current_admin(usuario=admin_user, session=session)
    disciplina = cadastrar_disciplina(
        data=DisciplinaCreate(nome="Matemática"),
        session=session,
        administrador=administrador,
    )

    assert disciplina.nome == "Matemática"
