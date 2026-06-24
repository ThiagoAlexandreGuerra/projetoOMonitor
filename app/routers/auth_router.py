# app/routers/auth_router.py

from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session

from app.database import get_session
from app.core.security import criar_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from app.dependencies.auth import get_current_user
from app.models import Usuario
from app.schemas.auth_schemas import Token
from app.schemas.usuario_schemas import UsuarioRead
from app.services.usuario_service import UsuarioService


router = APIRouter(
    prefix="/auth",
    tags=["Autenticação"],
)


@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session),
):
    try:
        usuario = UsuarioService.login(
            session=session,
            email=form_data.username,
            senha=form_data.password,
        )
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(error),
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = criar_access_token(
        subject=str(usuario.id),
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )

    return Token(
        access_token=access_token,
        token_type="bearer",
    )


@router.get("/me", response_model=UsuarioRead)
def me(
    usuario: Usuario = Depends(get_current_user),
):
    return usuario
