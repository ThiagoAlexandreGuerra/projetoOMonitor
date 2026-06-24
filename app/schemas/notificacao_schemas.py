from datetime import datetime

from pydantic import BaseModel


from app.models.enums import TipoNotificacao


class NotificacaoCreate(BaseModel, frozen=True):
    usuario_id: int
    mensagem: str
    tipo: TipoNotificacao


class NotificacaoRead(BaseModel, frozen=True):
    id: int
    usuario_id: int
    mensagem: str
    tipo: TipoNotificacao
    data_envio: datetime
    lida: bool
