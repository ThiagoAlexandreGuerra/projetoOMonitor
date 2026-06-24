from datetime import datetime

from pydantic import BaseModel


from app.models.resposta_model import StatusResposta


class RespostaCreate(BaseModel, frozen=True):
    questao_id: int


class RespostaResponder(BaseModel, frozen=True):
    alternativa_id: int


class RespostaRead(BaseModel, frozen=True):
    id: int
    usuario_id: int
    questao_id: int
    alternativa_selecionada_id: int | None
    data_resposta: datetime | None
    status: StatusResposta
    correta: bool | None
