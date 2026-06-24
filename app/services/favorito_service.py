from datetime import datetime, timezone

from sqlmodel import Session, select

from app.models import Favorito
from .questao_service import QuestaoService
from .usuario_service import UsuarioService


class FavoritoService:
    @staticmethod
    def adicionar(
        session: Session,
        usuario_id: int,
        questao_id: int,
    ) -> Favorito:
        """Create a favorite relationship between a user and question.

        Args:
            session: Active database session.
            usuario_id: User identifier.
            questao_id: Question identifier.

        Returns:
            Favorito: The created favorite entry.

        Raises:
            ValueError: If the favorite already exists.
        """
        usuario_model = UsuarioService.buscar_por_id(session, usuario_id)
        questao_model = QuestaoService.buscar_por_id(session, questao_id)

        existente = session.exec(
            select(Favorito).where(
                Favorito.usuario_id == usuario_model.id,
                Favorito.questao_id == questao_model.id,
            )
        ).first()

        if existente:
            raise ValueError("Questão já está nos favoritos.")

        assert usuario_model.id is not None
        assert questao_model.id is not None
        favorito_model = Favorito(
            usuario_id=usuario_model.id,
            questao_id=questao_model.id,
            data_marcacao=datetime.now(timezone.utc),
        )

        session.add(favorito_model)
        session.commit()
        session.refresh(favorito_model)

        return favorito_model


    @staticmethod
    def remover(
        session: Session,
        usuario_id: int,
        questao_id: int,
    ) -> None:
        """Remove a favorite relationship.

        Args:
            session: Active database session.
            usuario_id: User identifier.
            questao_id: Question identifier.

        Raises:
            ValueError: If the favorite does not exist.
        """
        favorito_model = session.exec(
            select(Favorito).where(
                Favorito.usuario_id == usuario_id,
                Favorito.questao_id == questao_id,
            )
        ).first()

        if not favorito_model:
            raise ValueError("Favorito não encontrado.")

        session.delete(favorito_model)
        session.commit()


    @staticmethod
    def buscar_por_usuario(
        session: Session,
        usuario_id: int,
    ) -> list[Favorito]:
        """List favorites for a user.

        Args:
            session: Active database session.
            usuario_id: User identifier.

        Returns:
            list[Favorito]: Favorite entries for the user.
        """
        return list(
            session.exec(select(Favorito).where(Favorito.usuario_id == usuario_id)).all()
        )


    @staticmethod
    def existe(
        session: Session,
        usuario_id: int,
        questao_id: int,
    ) -> bool:
        """Check whether a favorite relationship exists.

        Args:
            session: Active database session.
            usuario_id: User identifier.
            questao_id: Question identifier.

        Returns:
            bool: True when the favorite exists.
        """
        favorito_model = session.exec(
            select(Favorito).where(
                Favorito.usuario_id == usuario_id,
                Favorito.questao_id == questao_id,
            )
        ).first()

        return favorito_model is not None
