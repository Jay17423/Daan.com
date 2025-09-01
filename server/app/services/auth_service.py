# app/services/auth_service.py
from fastapi import HTTPException, status, Request, Depends
from sqlmodel import Session
from app.utils.security import hash_password, verify_password
from app.config.jwt import create_access_token, verify_access_token
from app.config.settings import settings
from datetime import timedelta
from app.models.user import User
from app.services.user_service import get_user_by_email, get_user_by_username
from app.config.db import get_session
from app.services.user_service import create_user

def signup_user(session: Session, username: str, email: str, password: str) -> User:
    if get_user_by_email(session, email):
        raise HTTPException(status_code=400, detail="Email already registered")

    if get_user_by_username(session, username):
        raise HTTPException(status_code=400, detail="Username already taken")

    user = User(username=username, email=email, hashed_password=hash_password(password))
    return create_user(session, user=user)


def login_user(session: Session, email: str, password: str) -> User:
    db_user = get_user_by_email(session, email)
    if not db_user or not verify_password(password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid email or password")
    return db_user


def generate_access_token(user: User) -> str:
    return create_access_token(
        data={"sub": user.email},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )


def get_current_user(
    request: Request,
    session: Session = Depends(get_session),
    token: str = None
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    print("#"*50)
    print(token)
    print("#"*50)

    payload = None 


    if token:
        payload = verify_access_token(token, credentials_exception)
    
  
    elif request.cookies.get("access_token"):
        cookie_token = request.cookies.get("access_token")
        if cookie_token.startswith("Bearer "):
            cookie_token = cookie_token.split(" ")[1]
            payload = verify_access_token(cookie_token, credentials_exception)

   
    if not payload:
        raise credentials_exception

    email = payload.get("sub")
    if not email:
        raise credentials_exception

    user = get_user_by_email(session, email)
    if not user:
        raise credentials_exception

    return user
