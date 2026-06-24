from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from app.database import get_session
from app.dependencies.auth import get_current_user
from app.models import Usuario
from app.schemas.meta_estudo_schemas import (
    MetaEstudoCreate,
    MetaEstudoRead,
    MetaEstudoUpdate,
)
from app.services.meta_estudo_service import MetaEstudoService


router = APIRouter(
    prefix="/metas-estudo",
    tags=["Metas de Estudo"],
)


@router.post(
    "",
    response_model=MetaEstudoRead,
    status_code=status.HTTP_201_CREATED,
)
def definir_meta(
    data: MetaEstudoCreate,
    session: Session = Depends(get_session),
    usuario: Usuario = Depends(get_current_user),
):
    """Create a study goal for a user.

    Args:
        data: Payload with the goal configuration.
        session: Active database session.

    Returns:
        MetaEstudoRead: The created study goal.

    Raises:
        HTTPException: If the input data is invalid.
    """
    assert usuario.id is not None

    try:
        return MetaEstudoService.definir_meta(
            session=session,
            usuario_id=usuario.id,
            quantidade_questoes=data.quantidade_questoes,
            tempo_diario=data.tempo_diario,
        )
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )


@router.patch("/{meta_id}", response_model=MetaEstudoRead)
def editar_meta(
    meta_id: int,
    data: MetaEstudoUpdate,
    session: Session = Depends(get_session),
):
    """Update fields of an existing study goal.

    Args:
        meta_id: Study goal identifier.
        data: Partial goal payload.
        session: Active database session.

    Returns:
        MetaEstudoRead: The updated study goal.

    Raises:
        HTTPException: If the goal does not exist.
    """
    try:
        return MetaEstudoService.editar_meta(
            session=session,
            meta_id=meta_id,
            quantidade_questoes=data.quantidade_questoes,
            tempo_diario=data.tempo_diario,
            ativa=data.ativa,
        )
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )


@router.get("/me", response_model=list[MetaEstudoRead])
def listar_minhas_metas(
    session: Session = Depends(get_session),
    usuario: Usuario = Depends(get_current_user),
):
    """List study goals for the authenticated user."""
    assert usuario.id is not None

    return MetaEstudoService.listar_por_usuario(session, usuario.id)


@router.delete("/{meta_id}", status_code=status.HTTP_204_NO_CONTENT)
def remover_meta(
    meta_id: int,
    session: Session = Depends(get_session),
    usuario: Usuario = Depends(get_current_user),
):
    """Delete a study goal.

    Args:
        meta_id: Study goal identifier.
        session: Active database session.

    Raises:
        HTTPException: If the goal does not exist.
    """
    assert usuario.id is not None

    try:
        meta = MetaEstudoService.buscar_por_id(session, meta_id)
        if meta.usuario_id != usuario.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Acesso permitido apenas para o dono da meta.",
            )

        MetaEstudoService.remover_meta(session, meta_id)
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )


@router.get("/{meta_id}/conclusao", response_model=bool)
def verificar_conclusao(
    meta_id: int,
    session: Session = Depends(get_session),
):
    """Check whether a study goal has been completed today.

    Args:
        meta_id: Study goal identifier.
        session: Active database session.

    Returns:
        bool: True when the goal has been achieved for the day.

    Raises:
        HTTPException: If the goal does not exist.
    """
    try:
        return MetaEstudoService.verificar_conclusao(session, meta_id)
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )
