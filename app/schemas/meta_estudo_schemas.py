from datetime import datetime

from pydantic import BaseModel


class MetaEstudoCreate(BaseModel, frozen=True):
    quantidade_questoes: int
    tempo_diario: int


class MetaEstudoUpdate(BaseModel, frozen=True):
    quantidade_questoes: int | None = None
    tempo_diario: int | None = None
    ativa: bool | None = None


class MetaEstudoRead(BaseModel, frozen=True):
    id: int
    usuario_id: int
    quantidade_questoes: int
    tempo_diario: int
    data_criacao: datetime
    ativa: bool
