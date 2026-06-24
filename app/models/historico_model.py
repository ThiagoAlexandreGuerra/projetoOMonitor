from typing import TYPE_CHECKING, Any, cast

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from .resposta_model import Resposta
    from .usuario_model import Usuario


class Historico(SQLModel, table=True):
    __tablename__ = cast(Any, "historico")

    id: int | None = Field(default=None, primary_key=True)
    usuario_id: int = Field(foreign_key="usuario.id", unique=True)
    total_respondidas: int = 0
    total_acertos: int = 0
    total_erros: int = 0

    usuario: "Usuario" = Relationship(back_populates="historico")
    respostas: list["Resposta"] = Relationship(back_populates="historico")
