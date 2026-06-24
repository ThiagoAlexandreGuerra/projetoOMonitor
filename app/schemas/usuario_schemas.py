from datetime import datetime

from pydantic import BaseModel


class UsuarioCreate(BaseModel, frozen=True):
    nome: str
    email: str
    senha: str


class UsuarioLogin(BaseModel, frozen=True):
    email: str
    senha: str


class UsuarioUpdate(BaseModel, frozen=True):
    nome: str | None = None
    email: str | None = None


class UsuarioRead(BaseModel, frozen=True):
    id: int
    nome: str
    email: str
    data_cadastro: datetime
    ativo: bool
