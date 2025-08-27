from fastapi import APIRouter, Depends, Response
from sqlmodel import Session
from app.schema.user import UserCreate, UserRead, UserLogin
from app.config.db import get_session
from app.services.auth_service import signup_user, login_user, generate_access_token
from app.config.settings import settings

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/signup", response_model=UserRead)
def signup(user: UserCreate, session: Session = Depends(get_session)):
    db_user = signup_user(session, user.username, user.email, user.password)
    return db_user

@router.post("/login")
def login(user: UserLogin, response: Response, session: Session = Depends(get_session)):
    db_user = login_user(session, user.email, user.password)
    token = generate_access_token(db_user)

    response.set_cookie(
        key="access_token",
        value=f"Bearer {token}",
        httponly=True,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        secure=False,
        samesite="lax"
    )
    return {"access_token": token, "token_type": "bearer", "message": "Login successful", "user": UserRead.from_orm(db_user)}

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logout successful"}
