from datetime import datetime, UTC
from typing import TYPE_CHECKING, Any, cast

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from .usuario_model import Usuario


class MetaEstudo(SQLModel, table=True):
    __tablename__ = cast(Any, "meta_estudo")

    id: int | None = Field(default=None, primary_key=True)
    usuario_id: int = Field(foreign_key="usuario.id")
    quantidade_questoes: int
    tempo_diario: int
    data_criacao: datetime = Field(default_factory=lambda: datetime.now(UTC))
    ativa: bool = True

    usuario: "Usuario" = Relationship(back_populates="metas_estudo")
