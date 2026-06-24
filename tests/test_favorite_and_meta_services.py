import pytest

from app.services.favorito_service import FavoritoService
from app.services.meta_estudo_service import MetaEstudoService

from .conftest import create_question, create_user


def test_favorito_lifecycle_adds_lists_checks_and_removes(session):
    usuario = create_user(session)
    questao, _, _ = create_question(session)
    assert usuario.id is not None
    assert questao.id is not None

    favorito = FavoritoService.adicionar(session, usuario.id, questao.id)

    assert favorito.usuario_id == usuario.id
    assert favorito.questao_id == questao.id
    assert FavoritoService.existe(session, usuario.id, questao.id) is True
    assert FavoritoService.buscar_por_usuario(session, usuario.id) == [favorito]

    with pytest.raises(ValueError, match="já está nos favoritos"):
        FavoritoService.adicionar(session, usuario.id, questao.id)

    FavoritoService.remover(session, usuario.id, questao.id)

    assert FavoritoService.existe(session, usuario.id, questao.id) is False
    assert FavoritoService.buscar_por_usuario(session, usuario.id) == []

    with pytest.raises(ValueError, match="Favorito não encontrado"):
        FavoritoService.remover(session, usuario.id, questao.id)


def test_favorito_requires_existing_user_and_question(session):
    usuario = create_user(session)
    questao, _, _ = create_question(session)
    assert usuario.id is not None
    assert questao.id is not None

    with pytest.raises(ValueError, match="Usuário não encontrado"):
        FavoritoService.adicionar(session, 999, questao.id)

    with pytest.raises(ValueError, match="Questão não encontrada"):
        FavoritoService.adicionar(session, usuario.id, 999)


def test_meta_lifecycle_edits_and_removes_goal(session):
    usuario = create_user(session)
    assert usuario.id is not None

    meta = MetaEstudoService.definir_meta(session, usuario.id, 5, 45)
    assert meta.id is not None
    editada = MetaEstudoService.editar_meta(
        session,
        meta.id,
        quantidade_questoes=10,
        tempo_diario=60,
        ativa=False,
    )

    assert editada.quantidade_questoes == 10
    assert editada.tempo_diario == 60
    assert editada.ativa is False

    MetaEstudoService.remover_meta(session, meta.id)

    with pytest.raises(ValueError, match="Meta não encontrada"):
        MetaEstudoService.editar_meta(session, meta.id, ativa=True)

    with pytest.raises(ValueError, match="Meta não encontrada"):
        MetaEstudoService.remover_meta(session, meta.id)

    with pytest.raises(ValueError, match="Usuário não encontrado"):
        MetaEstudoService.definir_meta(session, 999, 1, 10)
