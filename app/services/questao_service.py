from sqlmodel import Session, select

from app.models import Alternativa, Questao


class QuestaoService:
    @staticmethod
    def listar_todas(session: Session) -> list[Questao]:
        """List every question in storage.

        Args:
            session: Active database session.

        Returns:
            list[Questao]: All persisted questions.
        """
        return list(session.exec(select(Questao)).all())


    @staticmethod
    def buscar_por_id(session: Session, questao_id: int) -> Questao:
        """Fetch a question by identifier.

        Args:
            session: Active database session.
            questao_id: Question identifier.

        Returns:
            Questao: The matching question.

        Raises:
            ValueError: If the question does not exist.
        """
        questao_model = session.get(Questao, questao_id)

        if not questao_model:
            raise ValueError("Questão não encontrada.")

        return questao_model


    @staticmethod
    def buscar_por_disciplina(
        session: Session,
        disciplina_id: int,
    ) -> list[Questao]:
        """List questions associated with a discipline.

        Args:
            session: Active database session.
            disciplina_id: Discipline identifier.

        Returns:
            list[Questao]: Questions for the discipline.
        """
        return list(
            session.exec(
                select(Questao).where(Questao.disciplina_id == disciplina_id)
            ).all()
        )


    @staticmethod
    def validar_resposta(
        session: Session,
        questao_id: int,
        alternativa_id: int,
    ) -> bool:
        """Validate whether an alternative correctly answers a question.

        Args:
            session: Active database session.
            questao_id: Question identifier.
            alternativa_id: Alternative identifier.

        Returns:
            bool: True when the alternative is correct.

        Raises:
            ValueError: If the alternative is invalid for the question.
        """
        alternativa = session.get(Alternativa, alternativa_id)

        if not alternativa:
            raise ValueError("Alternativa não encontrada.")

        if alternativa.questao_id != questao_id:
            raise ValueError("A alternativa não pertence à questão informada.")

        return alternativa.correta
