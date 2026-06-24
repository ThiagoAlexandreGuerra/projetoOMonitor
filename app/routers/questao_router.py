from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import Session

from app.database import get_session
from app.dependencies.admin import get_current_admin
from app.models import Administrador
from app.schemas.questao_schemas import (
    QuestaoCreate,
    QuestaoRead,
    QuestaoReadWithAlternativas,
)
from app.services.administrador_service import AdministradorService
from app.services.questao_service import QuestaoService


router = APIRouter(
    prefix="/questoes",
    tags=["Questões"],
)


@router.post(
    "",
    response_model=QuestaoRead,
    status_code=status.HTTP_201_CREATED,
)
def cadastrar_questao(
    data: QuestaoCreate,
    session: Session = Depends(get_session),
    administrador: Administrador = Depends(get_current_admin),
):
    """Create a question and its answer alternatives.

    Args:
        data: Payload with the question definition.
        session: Active database session.

    Returns:
        QuestaoRead: The created question.

    Raises:
        HTTPException: If the payload is invalid.
    """
    assert administrador.id is not None

    try:
        return AdministradorService.cadastrar_questao(
            session=session,
            administrador_id=administrador.id,
            enunciado=data.enunciado,
            assunto=data.assunto,
            ano=data.ano,
            nivel=data.nivel,
            explicacao=data.explicacao,
            disciplina_id=data.disciplina_id,
            alternativas=[a.model_dump() for a in data.alternativas],
        )
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )


@router.get("", response_model=list[QuestaoRead])
def listar_questoes(
    disciplina_id: int | None = Query(default=None),
    session: Session = Depends(get_session),
):
    """List questions, optionally filtered by discipline.

    Args:
        disciplina_id: Optional discipline identifier filter.
        session: Active database session.

    Returns:
        list[QuestaoRead]: Matching questions.
    """
    if disciplina_id is not None:
        return QuestaoService.buscar_por_disciplina(session, disciplina_id)

    return QuestaoService.listar_todas(session)


@router.get("/{questao_id}", response_model=QuestaoReadWithAlternativas)
def buscar_questao(
    questao_id: int,
    session: Session = Depends(get_session),
):
    """Fetch a question with its alternatives.

    Args:
        questao_id: Question identifier.
        session: Active database session.

    Returns:
        QuestaoReadWithAlternativas: The requested question.

    Raises:
        HTTPException: If the question does not exist.
    """
    try:
        return QuestaoService.buscar_por_id(session, questao_id)
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )


@router.delete("/{questao_id}", status_code=status.HTTP_204_NO_CONTENT)
def remover_questao(
    questao_id: int,
    session: Session = Depends(get_session),
    administrador: Administrador = Depends(get_current_admin),
):
    """Delete a question managed by an administrator.

    Args:
        questao_id: Question identifier.
        administrador_id: Administrator identifier.
        session: Active database session.

    Raises:
        HTTPException: If the administrator or question does not exist.
    """
    assert administrador.id is not None

    try:
        AdministradorService.remover_questao(
            session=session,
            administrador_id=administrador.id,
            questao_id=questao_id,
        )
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )
