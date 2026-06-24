from sqlmodel import Session, select

from app.models import Estatistica
from .historico_service import HistoricoService


class EstatisticaService:
    @staticmethod
    def calcular(
        session: Session,
        usuario_id: int,
    ) -> Estatistica:
        """Calculate and persist aggregate statistics for a user.

        Args:
            session: Active database session.
            usuario_id: User identifier.

        Returns:
            Estatistica: The updated statistics record.
        """
        historico_model = HistoricoService.obter_por_usuario(session, usuario_id)

        total = historico_model.total_respondidas
        percentual = 0.0
        if total > 0:
            percentual = historico_model.total_acertos / total * 100

        estatistica_model = session.exec(
            select(Estatistica).where(Estatistica.usuario_id == usuario_id)
        ).first()

        if not estatistica_model:
            estatistica_model = Estatistica(usuario_id=usuario_id)

        estatistica_model.percentual_acerto = percentual
        estatistica_model.quantidade_acertos = historico_model.total_acertos
        estatistica_model.quantidade_erros = historico_model.total_erros
        estatistica_model.quantidade_respondidas = historico_model.total_respondidas

        session.add(estatistica_model)
        session.commit()
        session.refresh(estatistica_model)

        return estatistica_model


    @staticmethod
    def gerar_relatorio(
        session: Session,
        usuario_id: int,
    ) -> dict:
        """Build a serializable report for a user's statistics.

        Args:
            session: Active database session.
            usuario_id: User identifier.

        Returns:
            dict: A summary of performance metrics.
        """
        estatistica_model = EstatisticaService.calcular(session, usuario_id)

        return {
            "usuario_id": usuario_id,
            "percentual_acerto": estatistica_model.percentual_acerto,
            "quantidade_acertos": estatistica_model.quantidade_acertos,
            "quantidade_erros": estatistica_model.quantidade_erros,
            "quantidade_respondidas": estatistica_model.quantidade_respondidas,
        }
