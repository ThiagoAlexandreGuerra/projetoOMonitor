from datetime import datetime, timezone

from sqlmodel import Session, select

from app.models import MetaEstudo, Resposta, TipoNotificacao
from .notificacao_service import NotificacaoService
from .usuario_service import UsuarioService


class MetaEstudoService:
    @staticmethod
    def buscar_por_id(
        session: Session,
        meta_id: int,
    ) -> MetaEstudo:
        meta = session.get(MetaEstudo, meta_id)
        if not meta:
            raise ValueError("Meta não encontrada.")

        return meta

    @staticmethod
    def definir_meta(
        session: Session,
        usuario_id: int,
        quantidade_questoes: int,
        tempo_diario: int,
    ) -> MetaEstudo:
        usuario_model = UsuarioService.buscar_por_id(session, usuario_id)

        assert usuario_model.id is not None
        meta = MetaEstudo(
            usuario_id=usuario_model.id,
            quantidade_questoes=quantidade_questoes,
            tempo_diario=tempo_diario,
            data_criacao=datetime.now(timezone.utc),
            ativa=True,
        )
        session.add(meta)
        session.commit()
        session.refresh(meta)
        return meta

    @staticmethod
    def editar_meta(
        session: Session,
        meta_id: int,
        quantidade_questoes: int | None = None,
        tempo_diario: int | None = None,
        ativa: bool | None = None,
    ) -> MetaEstudo:
        meta = MetaEstudoService.buscar_por_id(session, meta_id)

        if quantidade_questoes is not None:
            meta.quantidade_questoes = quantidade_questoes
        if tempo_diario is not None:
            meta.tempo_diario = tempo_diario
        if ativa is not None:
            meta.ativa = ativa

        session.add(meta)
        session.commit()
        session.refresh(meta)
        return meta

    @staticmethod
    def remover_meta(
        session: Session,
        meta_id: int,
    ) -> None:
        meta = MetaEstudoService.buscar_por_id(session, meta_id)

        session.delete(meta)
        session.commit()

    @staticmethod
    def listar_por_usuario(
        session: Session,
        usuario_id: int,
    ) -> list[MetaEstudo]:
        UsuarioService.buscar_por_id(session, usuario_id)

        return list(
            session.exec(
                select(MetaEstudo).where(MetaEstudo.usuario_id == usuario_id)
            ).all()
        )

    @staticmethod
    def verificar_conclusao(
        session: Session,
        meta_id: int,
    ) -> bool:
        meta = MetaEstudoService.buscar_por_id(session, meta_id)
        if not meta.ativa:
            return False

        hoje = datetime.now(timezone.utc).date()
        respostas_hoje = session.exec(
            select(Resposta).where(Resposta.usuario_id == meta.usuario_id)
        ).all()
        quantidade_hoje = sum(
            1
            for resposta in respostas_hoje
            if resposta.data_resposta is not None and resposta.data_resposta.date() == hoje
        )
        return quantidade_hoje >= meta.quantidade_questoes

    @staticmethod
    def verificar_metas_do_usuario(
        session: Session,
        usuario_id: int,
    ) -> None:
        metas = session.exec(
            select(MetaEstudo).where(
                MetaEstudo.usuario_id == usuario_id,
                MetaEstudo.ativa,
            )
        ).all()

        for meta in metas:
            assert meta.id is not None
            if MetaEstudoService.verificar_conclusao(session, meta.id):
                NotificacaoService.enviar(
                    session=session,
                    usuario_id=usuario_id,
                    mensagem="Meta de estudo concluída.",
                    tipo=TipoNotificacao.META_CONCLUIDA,
                )
