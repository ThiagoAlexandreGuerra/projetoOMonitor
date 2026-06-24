from datetime import datetime, UTC
from typing import TYPE_CHECKING, Any, Optional, cast

from sqlalchemy import UniqueConstraint
from sqlmodel import Field, Relationship, SQLModel

from .enums import NivelDificuldade

if TYPE_CHECKING:
    from .resposta_model import Resposta
    from .usuario_model import Administrador, Usuario


class Disciplina(SQLModel, table=True):
    __tablename__ = cast(Any, "disciplina")

    id: int | None = Field(default=None, primary_key=True)
    nome: str = Field(index=True, unique=True)

    questoes: list["Questao"] = Relationship(back_populates="disciplina")


class Questao(SQLModel, table=True):
    __tablename__ = cast(Any, "questao")

    id: int | None = Field(default=None, primary_key=True)
    enunciado: str
    assunto: str = Field(index=True)
    ano: int
    nivel: NivelDificuldade
    explicacao: str
    disciplina_id: int = Field(foreign_key="disciplina.id")
    administrador_id: int | None = Field(
        default=None,
        foreign_key="administrador.id",
    )

    disciplina: Disciplina = Relationship(back_populates="questoes")
    alternativas: list["Alternativa"] = Relationship(back_populates="questao")
    respostas: list["Resposta"] = Relationship(back_populates="questao")
    favoritos: list["Favorito"] = Relationship(back_populates="questao")
    administrador: Optional["Administrador"] = Relationship(
        back_populates="questoes_gerenciadas"
    )


class Alternativa(SQLModel, table=True):
    __tablename__ = cast(Any, "alternativa")

    id: int | None = Field(default=None, primary_key=True)
    texto: str
    correta: bool = False
    questao_id: int = Field(foreign_key="questao.id")

    questao: Questao = Relationship(back_populates="alternativas")
    respostas: list["Resposta"] = Relationship(back_populates="alternativa_selecionada")


class Favorito(SQLModel, table=True):
    __tablename__ = cast(Any, "favorito")
    __table_args__ = (
        UniqueConstraint(
            "usuario_id", "questao_id", name="uq_usuario_questao_favorito"
        ),
    )

    id: int | None = Field(default=None, primary_key=True)
    usuario_id: int = Field(foreign_key="usuario.id")
    questao_id: int = Field(foreign_key="questao.id")
    data_marcacao: datetime = Field(default_factory=lambda: datetime.now(UTC))

    usuario: "Usuario" = Relationship(back_populates="favoritos")
    questao: Questao = Relationship(back_populates="favoritos")
