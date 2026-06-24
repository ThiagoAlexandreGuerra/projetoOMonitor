from datetime import datetime

from pydantic import BaseModel

from app.schemas.questao_schemas import QuestaoRead


class FavoritoCreate(BaseModel, frozen=True):
    questao_id: int


class FavoritoRead(BaseModel, frozen=True):
    id: int
    usuario_id: int
    questao_id: int
    data_marcacao: datetime


class FavoritoReadWithQuestao(FavoritoRead, frozen=True):
    questao: QuestaoRead
