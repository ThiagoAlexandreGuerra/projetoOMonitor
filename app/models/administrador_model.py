from typing import TYPE_CHECKING, Any, cast

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from .questao_model import Questao
    from .usuario_model import Usuario


class Administrador(SQLModel, table=True):
    __tablename__ = cast(Any, "administrador")

    id: int | None = Field(default=None, primary_key=True)
    usuario_id: int = Field(foreign_key="usuario.id", unique=True)
    nivel_acesso: int

    usuario: "Usuario" = Relationship(back_populates="administrador")
    questoes_gerenciadas: list["Questao"] = Relationship(back_populates="administrador")
