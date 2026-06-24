from datetime import datetime
from typing import TYPE_CHECKING, Any, Optional, cast

from sqlmodel import Field, Relationship, SQLModel

from .enums import StatusResposta

if TYPE_CHECKING:
    from .historico_model import Historico
    from .questao_model import Alternativa, Questao
    from .usuario_model import Usuario


class Resposta(SQLModel, table=True):
    __tablename__ = cast(Any, "resposta")

    id: int | None = Field(default=None, primary_key=True)
    usuario_id: int = Field(foreign_key="usuario.id")
    questao_id: int = Field(foreign_key="questao.id")
    alternativa_selecionada_id: int | None = Field(
        default=None,
        foreign_key="alternativa.id",
    )
    data_resposta: datetime | None = None
    status: StatusResposta = StatusResposta.NAO_RESPONDIDA
    correta: bool | None = None
    historico_id: int | None = Field(default=None, foreign_key="historico.id")

    usuario: "Usuario" = Relationship(back_populates="respostas")
    questao: "Questao" = Relationship(back_populates="respostas")
    alternativa_selecionada: Optional["Alternativa"] = Relationship(
        back_populates="respostas"
    )
    historico: Optional["Historico"] = Relationship(back_populates="respostas")
