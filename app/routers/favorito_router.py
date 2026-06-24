from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import Session

from app.database import get_session
from app.dependencies.auth import get_current_user
from app.models import Usuario
from app.schemas.favorito_schemas import (
    FavoritoCreate,
    FavoritoRead,
    FavoritoReadWithQuestao,
)
from app.services.favorito_service import FavoritoService


router = APIRouter(
    prefix="/favoritos",
    tags=["Favoritos"],
)


@router.post(
    "",
    response_model=FavoritoRead,
    status_code=status.HTTP_201_CREATED,
)
def adicionar_favorito(
    data: FavoritoCreate,
    session: Session = Depends(get_session),
    usuario: Usuario = Depends(get_current_user),
):
    """Add a question to a user's favorites.

    Args:
        data: Payload with user and question identifiers.
        session: Active database session.

    Returns:
        FavoritoRead: The created favorite entry.

    Raises:
        HTTPException: If the favorite already exists or data is invalid.
    """
    assert usuario.id is not None

    try:
        return FavoritoService.adicionar(
            session=session,
            usuario_id=usuario.id,
            questao_id=data.questao_id,
        )
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )


@router.get("/usuario/{usuario_id}", response_model=list[FavoritoRead])
def buscar_favoritos_usuario(
    usuario_id: int,
    session: Session = Depends(get_session),
):
    """List favorites for a given user.

    Args:
        usuario_id: User identifier.
        session: Active database session.

    Returns:
        list[FavoritoRead]: Favorite entries owned by the user.
    """
    return FavoritoService.buscar_por_usuario(session, usuario_id)


@router.get("/me", response_model=list[FavoritoReadWithQuestao])
def meus_favoritos(
    session: Session = Depends(get_session),
    usuario: Usuario = Depends(get_current_user),
):
    """List favorites for the authenticated user."""
    assert usuario.id is not None

    return FavoritoService.buscar_por_usuario(session, usuario.id)


@router.get("/existe", response_model=bool)
def favorito_existe(
    questao_id: int = Query(...),
    session: Session = Depends(get_session),
    usuario: Usuario = Depends(get_current_user),
):
    """Check whether a favorite relationship already exists.

    Args:
        usuario_id: User identifier.
        questao_id: Question identifier.
        session: Active database session.

    Returns:
        bool: True when the favorite exists.
    """
    assert usuario.id is not None

    return FavoritoService.existe(
        session=session,
        usuario_id=usuario.id,
        questao_id=questao_id,
    )


@router.delete("", status_code=status.HTTP_204_NO_CONTENT)
def remover_favorito(
    questao_id: int = Query(...),
    session: Session = Depends(get_session),
    usuario: Usuario = Depends(get_current_user),
):
    """Remove a question from a user's favorites.

    Args:
        usuario_id: User identifier.
        questao_id: Question identifier.
        session: Active database session.

    Raises:
        HTTPException: If the favorite does not exist.
    """
    assert usuario.id is not None

    try:
        FavoritoService.remover(
            session=session,
            usuario_id=usuario.id,
            questao_id=questao_id,
        )
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )
