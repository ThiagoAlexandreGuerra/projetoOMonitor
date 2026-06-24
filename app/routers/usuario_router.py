from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from app.database import get_session
from app.schemas.usuario_schemas import (
    UsuarioCreate,
    UsuarioLogin,
    UsuarioRead,
    UsuarioUpdate,
)
from app.services.usuario_service import UsuarioService


router = APIRouter(
    prefix="/usuarios",
    tags=["Usuários"],
)


@router.post(
    "",
    response_model=UsuarioRead,
    status_code=status.HTTP_201_CREATED,
)
def cadastrar_usuario(
    data: UsuarioCreate,
    session: Session = Depends(get_session),
):
    """Create a new user account.

    Args:
        data: Payload with account fields.
        session: Active database session.

    Returns:
        UsuarioRead: The created user.

    Raises:
        HTTPException: If the email is already in use.
    """
    try:
        return UsuarioService.cadastrar(
            session=session,
            nome=data.nome,
            email=data.email,
            senha=data.senha,
        )
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )


@router.post("/login", response_model=UsuarioRead)
def login(
    data: UsuarioLogin,
    session: Session = Depends(get_session),
):
    """Authenticate a user by email and password.

    Args:
        data: Login credentials.
        session: Active database session.

    Returns:
        UsuarioRead: The authenticated user.

    Raises:
        HTTPException: If the credentials are invalid.
    """
    try:
        return UsuarioService.login(
            session=session,
            email=data.email,
            senha=data.senha,
        )
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(error),
        )


@router.get("/{usuario_id}", response_model=UsuarioRead)
def buscar_usuario(
    usuario_id: int,
    session: Session = Depends(get_session),
):
    """Fetch a user by identifier.

    Args:
        usuario_id: User identifier.
        session: Active database session.

    Returns:
        UsuarioRead: The requested user.

    Raises:
        HTTPException: If the user does not exist.
    """
    try:
        return UsuarioService.buscar_por_id(session, usuario_id)
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )


@router.patch("/{usuario_id}", response_model=UsuarioRead)
def editar_usuario(
    usuario_id: int,
    data: UsuarioUpdate,
    session: Session = Depends(get_session),
):
    """Update editable fields for a user profile.

    Args:
        usuario_id: User identifier.
        data: Partial profile payload.
        session: Active database session.

    Returns:
        UsuarioRead: The updated user.

    Raises:
        HTTPException: If the update is invalid.
    """
    try:
        return UsuarioService.editar_perfil(
            session=session,
            usuario_id=usuario_id,
            nome=data.nome,
            email=data.email,
        )
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )


@router.delete("/{usuario_id}", response_model=UsuarioRead)
def desativar_usuario(
    usuario_id: int,
    session: Session = Depends(get_session),
):
    """Deactivate a user account.

    Args:
        usuario_id: User identifier.
        session: Active database session.

    Returns:
        UsuarioRead: The deactivated user.

    Raises:
        HTTPException: If the user does not exist.
    """
    try:
        return UsuarioService.desativar_usuario(session, usuario_id)
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )
