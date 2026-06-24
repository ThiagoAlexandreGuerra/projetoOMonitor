from sqlmodel import Session, select

from app.models import Disciplina


class DisciplinaService:
    @staticmethod
    def cadastrar(session: Session, nome: str) -> Disciplina:
        """Create a new discipline.

        Args:
            session: Active database session.
            nome: Unique discipline name.

        Returns:
            Disciplina: The created discipline.

        Raises:
            ValueError: If a discipline with the same name already exists.
        """
        existente = session.exec(
            select(Disciplina).where(Disciplina.nome == nome)
        ).first()

        if existente:
            raise ValueError("Disciplina já cadastrada.")

        disciplina = Disciplina(nome=nome)

        session.add(disciplina)
        session.commit()
        session.refresh(disciplina)

        return disciplina


    @staticmethod
    def buscar_por_id(session: Session, disciplina_id: int) -> Disciplina:
        """Fetch a discipline by identifier.

        Args:
            session: Active database session.
            disciplina_id: Discipline identifier.

        Returns:
            Disciplina: The matching discipline.

        Raises:
            ValueError: If the discipline does not exist.
        """
        disciplina_model = session.get(Disciplina, disciplina_id)

        if not disciplina_model:
            raise ValueError("Disciplina não encontrada.")

        return disciplina_model


    @staticmethod
    def listar_todas(session: Session) -> list[Disciplina]:
        """List all disciplines.

        Args:
            session: Active database session.

        Returns:
            list[Disciplina]: All disciplines in storage.
        """
        return list(session.exec(select(Disciplina)).all())
