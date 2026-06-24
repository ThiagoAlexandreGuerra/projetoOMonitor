from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from app.database import get_session
from app.dependencies.auth import get_current_user
from app.models import Administrador, Usuario
from app.schemas.administrador_schemas import (
    AdministradorCadastroDisponivel,
    AdministradorCreate,
    AdministradorRead,
    AdministradorReadWithUsuario,
)
from app.services.administrador_service import AdministradorService


router = APIRouter(
    prefix="/administradores",
    tags=["Administradores"],
)


def _usuario_e_administrador(session: Session, usuario_id: int) -> bool:
    return (
        session.exec(select(Administrador.id).where(Administrador.usuario_id == usuario_id)).first()
        is not None
    )


def _cadastro_administrador_disponivel(session: Session, usuario: Usuario) -> bool:
    assert usuario.id is not None
    return _usuario_e_administrador(session, usuario.id)


@router.get("/cadastro-disponivel", response_model=AdministradorCadastroDisponivel)
def cadastro_administrador_disponivel(
    session: Session = Depends(get_session),
    usuario: Usuario = Depends(get_current_user),
):
    """Return whether the authenticated user can see administrator registration."""
    return AdministradorCadastroDisponivel(
        disponivel=_cadastro_administrador_disponivel(session, usuario)
    )


@router.post(
    "",
    response_model=AdministradorRead,
    status_code=status.HTTP_201_CREATED,
)
def cadastrar_administrador(
    data: AdministradorCreate,
    session: Session = Depends(get_session),
    usuario: Usuario = Depends(get_current_user),
):
    """Create an administrator profile.

    The first registered user becomes an administrator automatically. After
    that, only an existing administrator can promote another existing user by
    email.
    """
    assert usuario.id is not None
    if not _usuario_e_administrador(session, usuario.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso permitido apenas para administradores.",
        )

    usuario_promovido = session.exec(
        select(Usuario).where(Usuario.email == data.email)
    ).first()
    if not usuario_promovido or usuario_promovido.id is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado.",
        )

    try:
        return AdministradorService.criar_administrador(
            session=session,
            usuario_id=usuario_promovido.id,
            nivel_acesso=data.nivel_acesso,
        )
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )


@router.get("/me", response_model=AdministradorRead)
def meu_administrador(
    session: Session = Depends(get_session),
    usuario: Usuario = Depends(get_current_user),
):
    """Return the administrator profile for the authenticated user."""
    administrador = session.exec(
        select(Administrador).where(Administrador.usuario_id == usuario.id)
    ).first()

    if not administrador:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso permitido apenas para administradores.",
        )

    return administrador


@router.get("", response_model=list[AdministradorReadWithUsuario])
def listar_administradores(
    session: Session = Depends(get_session),
    usuario: Usuario = Depends(get_current_user),
):
    """List all administrators. Restricted to administrators."""
    solicitante_admin = session.exec(
        select(Administrador).where(Administrador.usuario_id == usuario.id)
    ).first()

    if not solicitante_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso permitido apenas para administradores.",
        )

    return list(session.exec(select(Administrador)).all())
