from datetime import datetime, UTC
from typing import TYPE_CHECKING, Any, Optional, cast

from sqlmodel import Field, Relationship, SQLModel


if TYPE_CHECKING:
    from .administrador_model import Administrador
    from .historico_model import Historico
    from .meta_estudo_model import MetaEstudo
    from .notificacao_model import Notificacao
    from .questao_model import Favorito
    from .resposta_model import Resposta


class Usuario(SQLModel, table=True):
    __tablename__ = cast(Any, "usuario")

    id: int | None = Field(default=None, primary_key=True)
    nome: str
    email: str = Field(index=True, unique=True)
    senha_hash: str
    data_cadastro: datetime = Field(default_factory=lambda: datetime.now(UTC))
    ativo: bool = True

    metas_estudo: list["MetaEstudo"] = Relationship(back_populates="usuario")
    historico: Optional["Historico"] = Relationship(back_populates="usuario")
    respostas: list["Resposta"] = Relationship(back_populates="usuario")
    favoritos: list["Favorito"] = Relationship(back_populates="usuario")
    notificacoes: list["Notificacao"] = Relationship(back_populates="usuario")
    administrador: Optional["Administrador"] = Relationship(back_populates="usuario")
