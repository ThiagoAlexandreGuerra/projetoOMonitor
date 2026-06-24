from fastapi import Depends, HTTPException, status
from sqlmodel import Session, select

from app.database import get_session
from app.dependencies.auth import get_current_user
from app.models import Administrador, Usuario


def get_current_admin(
    usuario: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session),
) -> Administrador:
    administrador = session.exec(
        select(Administrador).where(Administrador.usuario_id == usuario.id)
    ).first()

    if not administrador:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso permitido apenas para administradores.",
        )

    return administrador
