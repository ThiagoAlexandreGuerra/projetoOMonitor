from sqlmodel import Session, select

from app.models import Administrador, Alternativa, Disciplina, NivelDificuldade, Questao
from .usuario_service import UsuarioService


class AdministradorService:
    @staticmethod
    def criar_administrador(
        session: Session,
        usuario_id: int,
        nivel_acesso: int,
    ) -> Administrador:
        usuario_model = UsuarioService.buscar_por_id(session, usuario_id)

        admin_existente = session.exec(
            select(Administrador).where(Administrador.usuario_id == usuario_model.id)
        ).first()
        if admin_existente:
            raise ValueError("Este usuário já é administrador.")

        assert usuario_model.id is not None
        administrador = Administrador(
            usuario_id=usuario_model.id,
            nivel_acesso=nivel_acesso,
        )
        session.add(administrador)
        session.commit()
        session.refresh(administrador)
        return administrador

    @staticmethod
    def cadastrar_questao(
        session: Session,
        administrador_id: int,
        enunciado: str,
        assunto: str,
        ano: int,
        nivel: NivelDificuldade,
        explicacao: str,
        disciplina_id: int,
        alternativas: list[dict],
    ) -> Questao:
        administrador = session.get(Administrador, administrador_id)
        if not administrador:
            raise ValueError("Administrador não encontrado.")

        disciplina = session.get(Disciplina, disciplina_id)
        if not disciplina:
            raise ValueError("Disciplina não encontrada.")

        if len(alternativas) < 2:
            raise ValueError("Uma questão precisa ter pelo menos duas alternativas.")

        corretas = [
            alternativa for alternativa in alternativas if alternativa.get("correta") is True
        ]
        if len(corretas) != 1:
            raise ValueError("A questão deve ter exatamente uma alternativa correta.")

        questao = Questao(
            enunciado=enunciado,
            assunto=assunto,
            ano=ano,
            nivel=nivel,
            explicacao=explicacao,
            disciplina_id=disciplina_id,
            administrador_id=administrador_id,
        )
        session.add(questao)
        session.commit()
        session.refresh(questao)
        assert questao.id is not None

        for alternativa_data in alternativas:
            session.add(
                Alternativa(
                    texto=alternativa_data["texto"],
                    correta=alternativa_data["correta"],
                    questao_id=questao.id,
                )
            )

        session.commit()
        session.refresh(questao)
        return questao

    @staticmethod
    def remover_questao(
        session: Session,
        administrador_id: int,
        questao_id: int,
    ) -> None:
        administrador = session.get(Administrador, administrador_id)
        if not administrador:
            raise ValueError("Administrador não encontrado.")

        questao = session.get(Questao, questao_id)
        if not questao:
            raise ValueError("Questão não encontrada.")

        session.delete(questao)
        session.commit()
