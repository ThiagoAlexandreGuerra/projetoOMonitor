from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from app.database import get_session
from app.dependencies.auth import get_current_user
from app.models import Usuario
from app.schemas.resposta_schemas import (
    RespostaCreate,
    RespostaRead,
    RespostaResponder,
)
from app.services.resposta_service import RespostaService


router = APIRouter(
    prefix="/respostas",
    tags=["Respostas"],
)


@router.post(
    "",
    response_model=RespostaRead,
    status_code=status.HTTP_201_CREATED,
)
def iniciar_resolucao(
    data: RespostaCreate,
    session: Session = Depends(get_session),
    usuario: Usuario = Depends(get_current_user),
):
    """Create a response attempt for a user and question.

    Args:
        data: Payload with user and question identifiers.
        session: Active database session.

    Returns:
        RespostaRead: The created response attempt.

    Raises:
        HTTPException: If the referenced entities are invalid.
    """
    assert usuario.id is not None

    try:
        return RespostaService.iniciar_resolucao(
            session=session,
            usuario_id=usuario.id,
            questao_id=data.questao_id,
        )
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )


@router.post("/{resposta_id}/responder", response_model=RespostaRead)
def responder(
    resposta_id: int,
    data: RespostaResponder,
    session: Session = Depends(get_session),
):
    """Submit the selected alternative for a response.

    Args:
        resposta_id: Response identifier.
        data: Payload with the selected alternative.
        session: Active database session.

    Returns:
        RespostaRead: The corrected response.

    Raises:
        HTTPException: If the response or alternative is invalid.
    """
    try:
        return RespostaService.responder(
            session=session,
            resposta_id=resposta_id,
            alternativa_id=data.alternativa_id,
        )
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )


@router.patch("/{resposta_id}/marcar-revisao", response_model=RespostaRead)
def marcar_para_revisao(
    resposta_id: int,
    session: Session = Depends(get_session),
):
    """Flag a response for later review.

    Args:
        resposta_id: Response identifier.
        session: Active database session.

    Returns:
        RespostaRead: The updated response.

    Raises:
        HTTPException: If the response does not exist.
    """
    try:
        return RespostaService.marcar_para_revisao(session, resposta_id)
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )


@router.patch("/{resposta_id}/refazer", response_model=RespostaRead)
def refazer_resposta(
    resposta_id: int,
    session: Session = Depends(get_session),
):
    """Reset a response so it can be answered again.

    Args:
        resposta_id: Response identifier.
        session: Active database session.

    Returns:
        RespostaRead: The reset response.

    Raises:
        HTTPException: If the response does not exist.
    """
    try:
        return RespostaService.refazer(session, resposta_id)
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )
