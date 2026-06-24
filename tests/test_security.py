from datetime import timedelta

import pytest
from jose import ExpiredSignatureError

from app.core.security import (
    criar_access_token,
    decodificar_token,
    gerar_hash_senha,
    verificar_senha,
)


def test_password_hash_verification_accepts_only_original_password():
    senha_hash = gerar_hash_senha("senha-correta")

    assert senha_hash != "senha-correta"
    assert verificar_senha("senha-correta", senha_hash) is True
    assert verificar_senha("senha-errada", senha_hash) is False


def test_access_token_round_trip_preserves_subject():
    token = criar_access_token("123")

    payload = decodificar_token(token)

    assert payload["sub"] == "123"


def test_expired_access_token_is_rejected():
    token = criar_access_token("123", expires_delta=timedelta(seconds=-1))

    with pytest.raises(ExpiredSignatureError):
        decodificar_token(token)
