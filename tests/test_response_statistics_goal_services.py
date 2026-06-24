from datetime import datetime, timedelta, UTC

import pytest

from sqlmodel import col, select

from app.models import (
    Administrador,
    Alternativa,
    NivelDificuldade,
    Resposta,
    StatusResposta,
    TipoNotificacao,
)
from app.services.administrador_service import AdministradorService
from app.services.disciplina_service import DisciplinaService
from app.services.estatistica_service import EstatisticaService
from app.services.historico_service import HistoricoService
from app.services.meta_estudo_service import MetaEstudoService
from app.services.notificacao_service import NotificacaoService
from app.services.resposta_service import RespostaService
from app.services.usuario_service import UsuarioService

from .conftest import create_question, create_user


def test_responder_correct_answer_updates_response_history_stats_and_goal(session):
    usuario = create_user(session)
    questao, correta, _ = create_question(session)
    assert usuario.id is not None
    assert questao.id is not None
    assert correta.id is not None
    meta = MetaEstudoService.definir_meta(session, usuario.id, 1, 30)
    assert meta.id is not None

    resposta = RespostaService.iniciar_resolucao(session, usuario.id, questao.id)
    assert resposta.id is not None
    assert resposta.status == StatusResposta.EM_ANDAMENTO
    assert resposta.correta is None

    respondida = RespostaService.responder(session, resposta.id, correta.id)
    historico = HistoricoService.consultar_historico(session, usuario.id)
    relatorio = EstatisticaService.gerar_relatorio(session, usuario.id)
    notificacoes = NotificacaoService.listar_por_usuario(
        session,
        usuario.id,
        apenas_nao_lidas=True,
    )

    assert respondida.status == StatusResposta.RESPONDIDA_CORRETA
    assert respondida.correta is True
    assert respondida.alternativa_selecionada_id == correta.id
    assert respondida.historico_id == historico.id
    assert historico.total_respondidas == 1
    assert historico.total_acertos == 1
    assert historico.total_erros == 0
    assert relatorio == {
        "usuario_id": usuario.id,
        "percentual_acerto": 100.0,
        "quantidade_acertos": 1,
        "quantidade_erros": 0,
        "quantidade_respondidas": 1,
    }
    assert MetaEstudoService.verificar_conclusao(session, meta.id) is True
    assert len(notificacoes) == 1
    assert notificacoes[0].tipo == TipoNotificacao.META_CONCLUIDA


def test_responder_wrong_answer_updates_history_and_can_be_reset(session):
    usuario = create_user(session)
    questao, _, incorreta = create_question(session)
    assert usuario.id is not None
    assert questao.id is not None
    assert incorreta.id is not None

    resposta = RespostaService.iniciar_resolucao(session, usuario.id, questao.id)
    assert resposta.id is not None
    respondida = RespostaService.responder(session, resposta.id, incorreta.id)

    assert respondida.status == StatusResposta.RESPONDIDA_INCORRETA
    assert respondida.correta is False

    marcada = RespostaService.marcar_para_revisao(session, resposta.id)
    assert marcada.status == StatusResposta.MARCADA_REVISAO

    refeita = RespostaService.refazer(session, resposta.id)
    historico = HistoricoService.consultar_historico(session, usuario.id)

    assert refeita.status == StatusResposta.EM_ANDAMENTO
    assert refeita.alternativa_selecionada_id is None
    assert refeita.data_resposta is None
    assert refeita.correta is None
    assert historico.total_respondidas == 1
    assert historico.total_acertos == 0
    assert historico.total_erros == 1


def test_responder_rejects_missing_or_mismatched_entities(session):
    usuario = create_user(session)
    questao, _, _ = create_question(session)
    outra_questao, outra_correta, _ = create_question_with_distinct_admin(session)
    assert usuario.id is not None
    assert questao.id is not None
    assert outra_questao.id is not None
    assert outra_correta.id is not None

    resposta = RespostaService.iniciar_resolucao(session, usuario.id, questao.id)
    assert resposta.id is not None

    with pytest.raises(ValueError, match="Resposta não encontrada"):
        RespostaService.responder(session, 999, outra_correta.id)

    with pytest.raises(ValueError, match="Alternativa não encontrada"):
        RespostaService.responder(session, resposta.id, 999)

    with pytest.raises(ValueError, match="não pertence"):
        RespostaService.responder(session, resposta.id, outra_correta.id)

    with pytest.raises(ValueError, match="Resposta não encontrada"):
        RespostaService.marcar_para_revisao(session, 999)

    with pytest.raises(ValueError, match="Resposta não encontrada"):
        RespostaService.refazer(session, 999)


def test_meta_conclusion_ignores_inactive_goals_and_previous_days(session):
    usuario = create_user(session)
    assert usuario.id is not None
    meta = MetaEstudoService.definir_meta(session, usuario.id, 1, 30)
    assert meta.id is not None

    session.add(
        Resposta(
            usuario_id=usuario.id,
            questao_id=1,
            data_resposta=datetime.now(UTC) - timedelta(days=1),
            status=StatusResposta.RESPONDIDA_CORRETA,
            correta=True,
        )
    )
    session.commit()

    assert MetaEstudoService.verificar_conclusao(session, meta.id) is False

    editada = MetaEstudoService.editar_meta(session, meta.id, ativa=False)
    assert editada.ativa is False
    assert MetaEstudoService.verificar_conclusao(session, meta.id) is False

    with pytest.raises(ValueError, match="Meta não encontrada"):
        MetaEstudoService.verificar_conclusao(session, 999)


def test_notificacao_lifecycle_filters_unread_and_handles_missing(session):
    usuario = create_user(session)
    assert usuario.id is not None
    primeira = NotificacaoService.enviar(
        session,
        usuario.id,
        "Estude hoje.",
        TipoNotificacao.LEMBRETE_ESTUDO,
    )
    segunda = NotificacaoService.enviar(
        session,
        usuario.id,
        "Meta concluída.",
        TipoNotificacao.META_CONCLUIDA,
    )
    assert primeira.id is not None
    assert segunda.id is not None

    lida = NotificacaoService.marcar_como_lida(session, primeira.id)
    todas = NotificacaoService.listar_por_usuario(session, usuario.id)
    nao_lidas = NotificacaoService.listar_por_usuario(
        session,
        usuario.id,
        apenas_nao_lidas=True,
    )

    assert lida.lida is True
    assert {notificacao.id for notificacao in todas} == {primeira.id, segunda.id}
    assert [notificacao.id for notificacao in nao_lidas] == [segunda.id]

    with pytest.raises(ValueError, match="Notificação não encontrada"):
        NotificacaoService.marcar_como_lida(session, 999)


def create_question_with_distinct_admin(session):
    usuario = UsuarioService.cadastrar(
        session,
        nome="Admin Distinto",
        email="admin-distinto@example.com",
        senha="senha-admin",
    )
    assert usuario.id is not None
    admin = session.exec(
        select(Administrador).where(Administrador.usuario_id == usuario.id)
    ).first()
    if not admin:
        admin = AdministradorService.criar_administrador(session, usuario.id, 10)
    disciplina = DisciplinaService.cadastrar(session, "História")
    assert admin.id is not None
    assert disciplina.id is not None

    questao = AdministradorService.cadastrar_questao(
        session=session,
        administrador_id=admin.id,
        enunciado="Quando ocorreu a independência do Brasil?",
        assunto="Brasil Império",
        ano=2026,
        nivel=NivelDificuldade.FACIL,
        explicacao="A independência foi proclamada em 1822.",
        disciplina_id=disciplina.id,
        alternativas=[
            {"texto": "1822", "correta": True},
            {"texto": "1889", "correta": False},
        ],
    )
    assert questao.id is not None
    correta = session.exec(
        select(Alternativa).where(
            Alternativa.questao_id == questao.id,
            col(Alternativa.correta).is_(True),
        )
    ).one()
    return questao, correta, None
