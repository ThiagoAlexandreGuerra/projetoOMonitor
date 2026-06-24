from typing import TYPE_CHECKING, Any, cast

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from .usuario_model import Usuario


class Estatistica(SQLModel, table=True):
    __tablename__ = cast(Any, "estatistica")

    id: int | None = Field(default=None, primary_key=True)
    usuario_id: int = Field(foreign_key="usuario.id", unique=True)
    percentual_acerto: float = 0.0
    quantidade_acertos: int = 0
    quantidade_erros: int = 0
    quantidade_respondidas: int = 0

    usuario: "Usuario" = Relationship()
