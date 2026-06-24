from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.database import get_session
from app.dependencies.auth import get_current_user
from app.models import Usuario
from app.schemas.estatistica_schemas import EstatisticaRead
from app.services.estatistica_service import EstatisticaService


router = APIRouter(
    prefix="/estatisticas",
    tags=["Estatísticas"],
)


@router.get("/usuario/{usuario_id}", response_model=EstatisticaRead)
def calcular_estatistica(
    usuario_id: int,
    session: Session = Depends(get_session),
):
    """Calculate the current statistics for a user.

    Args:
        usuario_id: User identifier.
        session: Active database session.

    Returns:
        EstatisticaRead: Aggregated statistics for the user.

    Raises:
        HTTPException: If the user cannot be resolved.
    """
    try:
        return EstatisticaService.calcular(session, usuario_id)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error))


@router.get("/me", response_model=EstatisticaRead)
def minhas_estatisticas(
    session: Session = Depends(get_session),
    usuario: Usuario = Depends(get_current_user),
):
    """Calculate statistics for the authenticated user."""
    assert usuario.id is not None

    try:
        return EstatisticaService.calcular(session, usuario.id)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error))


@router.get("/usuario/{usuario_id}/relatorio")
def gerar_relatorio(
    usuario_id: int,
    session: Session = Depends(get_session),
):
    """Generate a summary report for a user's performance.

    Args:
        usuario_id: User identifier.
        session: Active database session.

    Returns:
        dict: Report data derived from the user's statistics.

    Raises:
        HTTPException: If the user cannot be resolved.
    """
    try:
        return EstatisticaService.gerar_relatorio(session, usuario_id)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error))
