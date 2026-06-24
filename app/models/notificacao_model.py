from datetime import datetime, UTC
from typing import TYPE_CHECKING, Any, cast

from sqlmodel import Field, Relationship, SQLModel

from .enums import TipoNotificacao

if TYPE_CHECKING:
    from .usuario_model import Usuario


class Notificacao(SQLModel, table=True):
    __tablename__ = cast(Any, "notificacao")

    id: int | None = Field(default=None, primary_key=True)
    usuario_id: int = Field(foreign_key="usuario.id")
    mensagem: str
    tipo: TipoNotificacao
    data_envio: datetime = Field(default_factory=lambda: datetime.now(UTC))
    lida: bool = False

    usuario: "Usuario" = Relationship(back_populates="notificacoes")
