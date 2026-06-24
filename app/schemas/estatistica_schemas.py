from pydantic import BaseModel


class EstatisticaRead(BaseModel, frozen=True):
    usuario_id: int
    percentual_acerto: float
    quantidade_acertos: int
    quantidade_erros: int
    quantidade_respondidas: int
