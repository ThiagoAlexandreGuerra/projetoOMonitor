from pydantic import BaseModel


class DisciplinaCreate(BaseModel, frozen=True):
    nome: str


class DisciplinaRead(BaseModel, frozen=True):
    id: int
    nome: str
