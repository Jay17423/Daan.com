from app.config.settings import settings


from sqlmodel import SQLModel,Field,create_engine, Session
from typing import Optional
from app.models.user import User
from app.models.user import UserProfile
from app.models.post import Post



engine = create_engine(settings.DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

