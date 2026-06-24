from pydantic import BaseModel

from app.models.questao_model import NivelDificuldade


class AlternativaCreate(BaseModel, frozen=True):
    texto: str
    correta: bool = False


class AlternativaRead(BaseModel, frozen=True):
    id: int
    texto: str
    correta: bool


class QuestaoCreate(BaseModel, frozen=True):
    enunciado: str
    assunto: str
    ano: int
    nivel: NivelDificuldade
    explicacao: str
    disciplina_id: int
    alternativas: list[AlternativaCreate]


class QuestaoUpdate(BaseModel, frozen=True):
    enunciado: str | None = None
    assunto: str | None = None
    ano: int | None = None
    nivel: NivelDificuldade | None = None
    explicacao: str | None = None
    disciplina_id: int | None = None


class QuestaoRead(BaseModel, frozen=True):
    id: int
    enunciado: str
    assunto: str
    ano: int
    nivel: NivelDificuldade
    explicacao: str
    disciplina_id: int


class QuestaoReadWithAlternativas(QuestaoRead, frozen=True):
    alternativas: list[AlternativaRead] = []
