from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from app.database import get_session
from app.dependencies.admin import get_current_admin
from app.models import Administrador
from app.schemas.disciplina_schemas import DisciplinaCreate, DisciplinaRead
from app.services.disciplina_service import DisciplinaService


router = APIRouter(
    prefix="/disciplinas",
    tags=["Disciplinas"],
)


@router.post(
    "",
    response_model=DisciplinaRead,
    status_code=status.HTTP_201_CREATED,
)
def cadastrar_disciplina(
    data: DisciplinaCreate,
    session: Session = Depends(get_session),
    administrador: Administrador = Depends(get_current_admin),
):
    """Create a new discipline record.

    Args:
        data: Payload with the discipline name.
        session: Active database session.

    Returns:
        DisciplinaRead: The created discipline.

    Raises:
        HTTPException: If the discipline already exists.
    """
    assert administrador.id is not None

    try:
        return DisciplinaService.cadastrar(session, data.nome)
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )


@router.get("", response_model=list[DisciplinaRead])
def listar_disciplinas(
    session: Session = Depends(get_session),
):
    """List all registered disciplines.

    Args:
        session: Active database session.

    Returns:
        list[DisciplinaRead]: All persisted disciplines.
    """
    return DisciplinaService.listar_todas(session)


@router.get("/{disciplina_id}", response_model=DisciplinaRead)
def buscar_disciplina(
    disciplina_id: int,
    session: Session = Depends(get_session),
):
    """Fetch a discipline by identifier.

    Args:
        disciplina_id: Discipline identifier.
        session: Active database session.

    Returns:
        DisciplinaRead: The matching discipline.

    Raises:
        HTTPException: If the discipline does not exist.
    """
    try:
        return DisciplinaService.buscar_por_id(session, disciplina_id)
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )
