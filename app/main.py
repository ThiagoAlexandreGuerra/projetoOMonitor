from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from app.routers.usuario_router import router as usuario
from app.routers.disciplina_router import router as disciplina
from app.routers.questao_router import router as questao
from app.routers.resposta_router import router as resposta
from app.routers.meta_estudo_router import router as meta_estudo
from app.routers.favorito_router import router as favorito
from app.routers.estatistica_router import router as estatistica
from app.routers.notificacao_router import router as notificacao
from app.routers.auth_router import router as auth
from app.routers.administrador_router import router as administrador


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize application resources during startup.

    Args:
        app: The FastAPI application instance.

    Yields:
        None: Control back to FastAPI once startup work completes.
    """
    yield


app = FastAPI(
    title="API O Monitor",
    version="1.0.0",
    description="API para gerenciamento de usuários, questões, respostas, metas, favoritos e estatísticas.",
    lifespan=lifespan,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(usuario)
app.include_router(disciplina)
app.include_router(questao)
app.include_router(resposta)
app.include_router(meta_estudo)
app.include_router(favorito)
app.include_router(estatistica)
app.include_router(notificacao)
app.include_router(auth)
app.include_router(administrador)


@app.get("/")
def root():
    """Return a basic health response for the API root.

    Returns:
        dict[str, str]: A simple status payload with the docs location.
    """
    return {
        "message": "API de Estudos funcionando",
        "docs": "/docs",
    }
