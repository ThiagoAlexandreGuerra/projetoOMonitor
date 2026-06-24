from datetime import datetime, UTC

from sqlmodel import Session, select

from app.core.security import gerar_hash_senha, verificar_senha
from app.models import Administrador, Historico, Usuario


class UsuarioService:
    @staticmethod
    def cadastrar(
        session: Session,
        nome: str,
        email: str,
        senha: str,
    ) -> Usuario:
        """Create a new user and initialize the related history.

        Args:
            session: Active database session.
            nome: User name.
            email: Unique email address.
            senha: Raw password string.

        Returns:
            Usuario: The created user.

        Raises:
            ValueError: If the email is already registered.
        """
        usuario_existente = session.exec(
            select(Usuario).where(Usuario.email == email)
        ).first()

        if usuario_existente:
            raise ValueError("Já existe um usuário cadastrado com este e-mail.")

        primeiro_usuario = session.exec(select(Usuario.id)).first() is None

        usuario_model = Usuario(
            nome=nome,
            email=email,
            senha_hash=gerar_hash_senha(senha),
            ativo=True,
            data_cadastro=datetime.now(UTC),
        )

        session.add(usuario_model)
        session.commit()
        session.refresh(usuario_model)

        assert usuario_model.id is not None
        historico = Historico(usuario_id=usuario_model.id)
        session.add(historico)

        if primeiro_usuario:
            session.add(Administrador(usuario_id=usuario_model.id, nivel_acesso=10))

        session.commit()

        return usuario_model


    @staticmethod
    def login(
        session: Session,
        email: str,
        senha: str,
    ) -> Usuario:
        """Authenticate an active user by credentials.

        Args:
            session: Active database session.
            email: User email address.
            senha: Raw password string.

        Returns:
            Usuario: The authenticated user.

        Raises:
            ValueError: If the credentials are invalid.
        """
        usuario_model = session.exec(
            select(Usuario).where(
                Usuario.email == email,
            )
        ).first()

        if not usuario_model:
            raise ValueError("E-mail ou senha inválidos.")

        if not usuario_model.ativo:
            raise ValueError("Usuário inativo.")

        senha_valida = verificar_senha(senha, usuario_model.senha_hash)

        if not senha_valida:
            raise ValueError("E-mail ou senha inválidos.")

        return usuario_model


    @staticmethod
    def buscar_por_id(session: Session, usuario_id: int) -> Usuario:
        """Fetch a user by identifier.

        Args:
            session: Active database session.
            usuario_id: User identifier.

        Returns:
            Usuario: The matching user.

        Raises:
            ValueError: If the user does not exist.
        """
        usuario_model = session.get(Usuario, usuario_id)

        if not usuario_model:
            raise ValueError("Usuário não encontrado.")

        return usuario_model


    @staticmethod
    def editar_perfil(
        session: Session,
        usuario_id: int,
        nome: str | None = None,
        email: str | None = None,
    ) -> Usuario:
        """Update mutable profile fields for a user.

        Args:
            session: Active database session.
            usuario_id: User identifier.
            nome: Optional replacement name.
            email: Optional replacement email.

        Returns:
            Usuario: The updated user.

        Raises:
            ValueError: If the user does not exist or the email is already in use.
        """
        usuario_model = UsuarioService.buscar_por_id(session, usuario_id)

        if email and email != usuario_model.email:
            email_em_uso = session.exec(
                select(Usuario).where(Usuario.email == email)
            ).first()

            if email_em_uso:
                raise ValueError("Este e-mail já está em uso.")

            usuario_model.email = email

        if nome:
            usuario_model.nome = nome

        session.add(usuario_model)
        session.commit()
        session.refresh(usuario_model)

        return usuario_model


    @staticmethod
    def desativar_usuario(session: Session, usuario_id: int) -> Usuario:
        """Deactivate a user account.

        Args:
            session: Active database session.
            usuario_id: User identifier.

        Returns:
            Usuario: The deactivated user.

        Raises:
            ValueError: If the user does not exist.
        """
        usuario_model = UsuarioService.buscar_por_id(session, usuario_id)
        usuario_model.ativo = False

        session.add(usuario_model)
        session.commit()
        session.refresh(usuario_model)

        return usuario_model
