from datetime import datetime, UTC

from sqlmodel import Session, col, select

from app.models import Notificacao, TipoNotificacao
from .usuario_service import UsuarioService


class NotificacaoService:
    @staticmethod
    def enviar(
        session: Session,
        usuario_id: int,
        mensagem: str,
        tipo: TipoNotificacao,
    ) -> Notificacao:
        """Create a notification for a user.

        Args:
            session: Active database session.
            usuario_id: User identifier.
            mensagem: Notification body text.
            tipo: Notification category.

        Returns:
            Notificacao: The created notification.
        """
        usuario_model = UsuarioService.buscar_por_id(session, usuario_id)

        assert usuario_model.id is not None
        notificacao_model = Notificacao(
            usuario_id=usuario_model.id,
            mensagem=mensagem,
            tipo=tipo,
            data_envio=datetime.now(UTC),
            lida=False,
        )

        session.add(notificacao_model)
        session.commit()
        session.refresh(notificacao_model)

        return notificacao_model


    @staticmethod
    def marcar_como_lida(
        session: Session,
        notificacao_id: int,
    ) -> Notificacao:
        """Mark a notification as read.

        Args:
            session: Active database session.
            notificacao_id: Notification identifier.

        Returns:
            Notificacao: The updated notification.

        Raises:
            ValueError: If the notification does not exist.
        """
        notificacao_model = session.get(Notificacao, notificacao_id)

        if not notificacao_model:
            raise ValueError("Notificação não encontrada.")

        notificacao_model.lida = True

        session.add(notificacao_model)
        session.commit()
        session.refresh(notificacao_model)

        return notificacao_model


    @staticmethod
    def listar_por_usuario(
        session: Session,
        usuario_id: int,
        apenas_nao_lidas: bool = False,
    ) -> list[Notificacao]:
        """List notifications for a user.

        Args:
            session: Active database session.
            usuario_id: User identifier.
            apenas_nao_lidas: Whether to filter to unread notifications.

        Returns:
            list[Notificacao]: Matching notifications.
        """
        query = select(Notificacao).where(Notificacao.usuario_id == usuario_id)

        if apenas_nao_lidas:
            query = query.where(col(Notificacao.lida).is_(False))

        return list(session.exec(query).all())
