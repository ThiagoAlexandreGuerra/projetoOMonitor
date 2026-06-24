from pydantic import BaseModel, Field

from app.schemas.usuario_schemas import UsuarioRead


class AdministradorCreate(BaseModel, frozen=True):
    email: str
    nivel_acesso: int = Field(default=1, ge=1)


class AdministradorRead(BaseModel, frozen=True):
    id: int
    usuario_id: int
    nivel_acesso: int


class AdministradorReadWithUsuario(AdministradorRead, frozen=True):
    usuario: UsuarioRead


class AdministradorCadastroDisponivel(BaseModel, frozen=True):
    disponivel: bool
