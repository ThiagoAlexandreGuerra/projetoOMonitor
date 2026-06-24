from .administrador_router import router as administrador_router
from .disciplina_router import router as disciplina_router
from .estatistica_router import router as estatistica_router
from .favorito_router import router as favorito_router
from .meta_estudo_router import router as meta_estudo_router
from .notificacao_router import router as notificacao_router
from .questao_router import router as questao_router
from .resposta_router import router as resposta_router
from .usuario_router import router as usuario_router

__all__ = [
    "disciplina_router",
    "administrador_router",
    "estatistica_router",
    "favorito_router",
    "meta_estudo_router",
    "notificacao_router",
    "questao_router",
    "resposta_router",
    "usuario_router",
]
