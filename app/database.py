from collections.abc import Generator

from sqlmodel import Session, create_engine


DATABASE_URL = "sqlite:///./database.sqlite"

connect_args = {"check_same_thread": False}

engine = create_engine(
    DATABASE_URL,
    echo=True,
    connect_args=connect_args,
)


def get_session() -> Generator[Session, None, None]:
    """Yield a database session for request-scoped usage.

    Yields:
        Session: An open SQLModel session bound to the shared engine.
    """
    with Session(engine) as session:
        yield session
