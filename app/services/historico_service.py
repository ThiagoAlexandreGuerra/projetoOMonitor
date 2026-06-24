from sqlmodel import Session, select

from app.models import Historico, Resposta


class HistoricoService:
    @staticmethod
    def obter_por_usuario(
        session: Session,
        usuario_id: int,
    ) -> Historico:
        """Fetch or create the answer history for a user.

        Args:
            session: Active database session.
            usuario_id: User identifier.

        Returns:
            Historico: The existing or newly created history record.
        """
        historico_model = session.exec(
            select(Historico).where(Historico.usuario_id == usuario_id)
        ).first()

        if not historico_model:
            historico_model = Historico(usuario_id=usuario_id)
            session.add(historico_model)
            session.commit()
            session.refresh(historico_model)

        return historico_model


    @staticmethod
    def registrar_resposta(
        session: Session,
        resposta_id: int,
    ) -> Historico:
        """Apply a response result to the user's history.

        Args:
            session: Active database session.
            resposta_id: Response identifier.

        Returns:
            Historico: The updated history record.

        Raises:
            ValueError: If the response does not exist.
        """
        resposta_model = session.get(Resposta, resposta_id)

        if not resposta_model:
            raise ValueError("Resposta não encontrada.")

        historico_model = HistoricoService.obter_por_usuario(
            session,
            resposta_model.usuario_id,
        )

        historico_model.total_respondidas += 1

        if resposta_model.correta is True:
            historico_model.total_acertos += 1
        else:
            historico_model.total_erros += 1

        assert historico_model.id is not None
        resposta_model.historico_id = historico_model.id

        session.add(historico_model)
        session.add(resposta_model)
        session.commit()
        session.refresh(historico_model)

        return historico_model


    @staticmethod
    def consultar_historico(
        session: Session,
        usuario_id: int,
    ) -> Historico:
        """Read a user's history, creating it when absent.

        Args:
            session: Active database session.
            usuario_id: User identifier.

        Returns:
            Historico: The user's history record.
        """
        return HistoricoService.obter_por_usuario(session, usuario_id)
