from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import Session

from app.database import get_session
from app.dependencies.admin import get_current_admin
from app.models import Administrador
from app.schemas.notificacao_schemas import NotificacaoCreate, NotificacaoRead
from app.services.notificacao_service import NotificacaoService


router = APIRouter(
    prefix="/notificacoes",
    tags=["Notificações"],
)


@router.post(
    "",
    response_model=NotificacaoRead,
    status_code=status.HTTP_201_CREATED,
)
def enviar_notificacao(
    data: NotificacaoCreate,
    session: Session = Depends(get_session),
    administrador: Administrador = Depends(get_current_admin),
):
    """Create a notification for a user.

    Args:
        data: Payload with notification fields.
        session: Active database session.

    Returns:
        NotificacaoRead: The created notification.

    Raises:
        HTTPException: If the input is invalid.
    """
    assert administrador.id is not None

    try:
        return NotificacaoService.enviar(
            session=session,
            usuario_id=data.usuario_id,
            mensagem=data.mensagem,
            tipo=data.tipo,
        )
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )


@router.get("/usuario/{usuario_id}", response_model=list[NotificacaoRead])
def listar_notificacoes_usuario(
    usuario_id: int,
    apenas_nao_lidas: bool = Query(default=False),
    session: Session = Depends(get_session),
):
    """List notifications for a user.

    Args:
        usuario_id: User identifier.
        apenas_nao_lidas: Whether to restrict the result to unread items.
        session: Active database session.

    Returns:
        list[NotificacaoRead]: Notifications for the user.
    """
    return NotificacaoService.listar_por_usuario(
        session=session,
        usuario_id=usuario_id,
        apenas_nao_lidas=apenas_nao_lidas,
    )


@router.patch("/{notificacao_id}/lida", response_model=NotificacaoRead)
def marcar_como_lida(
    notificacao_id: int,
    session: Session = Depends(get_session),
):
    """Mark a notification as read.

    Args:
        notificacao_id: Notification identifier.
        session: Active database session.

    Returns:
        NotificacaoRead: The updated notification.

    Raises:
        HTTPException: If the notification does not exist.
    """
    try:
        return NotificacaoService.marcar_como_lida(
            session=session,
            notificacao_id=notificacao_id,
        )
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )
