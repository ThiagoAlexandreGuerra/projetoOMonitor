from datetime import datetime, UTC

from sqlmodel import Session

from app.models import Alternativa, Resposta, StatusResposta
from .historico_service import HistoricoService
from .meta_estudo_service import MetaEstudoService
from .questao_service import QuestaoService
from .usuario_service import UsuarioService


class RespostaService:
    @staticmethod
    def iniciar_resolucao(
        session: Session,
        usuario_id: int,
        questao_id: int,
    ) -> Resposta:
        usuario_model = UsuarioService.buscar_por_id(session, usuario_id)
        questao_model = QuestaoService.buscar_por_id(session, questao_id)

        assert usuario_model.id is not None
        assert questao_model.id is not None
        resposta = Resposta(
            usuario_id=usuario_model.id,
            questao_id=questao_model.id,
            status=StatusResposta.EM_ANDAMENTO,
            correta=None,
            data_resposta=None,
        )
        session.add(resposta)
        session.commit()
        session.refresh(resposta)
        return resposta

    @staticmethod
    def responder(
        session: Session,
        resposta_id: int,
        alternativa_id: int,
    ) -> Resposta:
        resposta = session.get(Resposta, resposta_id)
        if not resposta:
            raise ValueError("Resposta não encontrada.")

        alternativa = session.get(Alternativa, alternativa_id)
        if not alternativa:
            raise ValueError("Alternativa não encontrada.")
        if alternativa.questao_id != resposta.questao_id:
            raise ValueError("A alternativa não pertence à questão desta resposta.")

        resposta.alternativa_selecionada_id = alternativa.id
        resposta.correta = alternativa.correta
        resposta.data_resposta = datetime.now(UTC)
        resposta.status = (
            StatusResposta.RESPONDIDA_CORRETA
            if alternativa.correta
            else StatusResposta.RESPONDIDA_INCORRETA
        )
        session.add(resposta)
        session.commit()
        session.refresh(resposta)

        assert resposta.id is not None
        HistoricoService.registrar_resposta(session, resposta.id)
        MetaEstudoService.verificar_metas_do_usuario(session, resposta.usuario_id)
        return resposta

    @staticmethod
    def marcar_para_revisao(
        session: Session,
        resposta_id: int,
    ) -> Resposta:
        resposta = session.get(Resposta, resposta_id)
        if not resposta:
            raise ValueError("Resposta não encontrada.")

        resposta.status = StatusResposta.MARCADA_REVISAO
        session.add(resposta)
        session.commit()
        session.refresh(resposta)
        return resposta

    @staticmethod
    def refazer(
        session: Session,
        resposta_id: int,
    ) -> Resposta:
        resposta = session.get(Resposta, resposta_id)
        if not resposta:
            raise ValueError("Resposta não encontrada.")

        resposta.alternativa_selecionada_id = None
        resposta.data_resposta = None
        resposta.status = StatusResposta.EM_ANDAMENTO
        resposta.correta = None
        session.add(resposta)
        session.commit()
        session.refresh(resposta)
        return resposta
