from datetime import datetime, timedelta,timezone
from fastapi import APIRouter, Depends, HTTPException, Response
from app.services.user_service import create_user
from app.core.email import EmailService, get_email_service
from app.utils.otp import generate_otp
from sqlmodel import Session,select
from app.schema.user import ForgotPasswordRequest, ResetPasswordRequest, UpdatePasswordRequest, UserCreate, UserRead, UserLogin
from app.config.db import get_session
from app.services.auth_service import get_current_user, signup_user, login_user, generate_access_token
from app.config.settings import settings
from app.utils.security import hash_password, verify_password
from app.models.user import User

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
        samesite="none"  # will change to "lax" when deployment is fully migrated to HTTPS
    )
    return {"access_token": token, "token_type": "bearer", "message": "Login successful", "user": UserRead.from_orm(db_user)}

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logout successful"}

@router.post("/update-password")
def update_password(
    curr_data: UpdatePasswordRequest,
    current_user: User = Depends(get_current_user),  
    session: Session = Depends(get_session)
):
   
    if not verify_password(curr_data.curr_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    
    if curr_data.new_password == curr_data.curr_password:
        raise HTTPException(status_code=400, detail="New password and Current password cannot be the same")
    
    if curr_data.new_password!= curr_data.confirm_password:
        raise HTTPException(status_code=400, detail="New password and Confirm password do not match")

    hashed_password = hash_password(curr_data.new_password)
    current_user.hashed_password = hashed_password

    create_user(session, current_user)

    return {"message": "Password updated successfully"}


@router.post("/forgot-password")
async def forgot_password(
    request: ForgotPasswordRequest,  
    session: Session = Depends(get_session),
    email_service: EmailService = Depends(get_email_service)
):
    statement = select(User).where(User.email == request.email)
    user = session.exec(statement).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    otp = generate_otp()
    user.reset_otp = otp
    user.reset_otp_expiry = datetime.now(timezone.utc) + timedelta(minutes=5)
    session.add(user)
    session.commit()

    email_service.send_email(
        user.email,
        "Password Reset OTP",
        f"Your OTP is {otp}. It will expire in 5 minutes."
    )

    return {"msg": "OTP sent to your email"}


@router.post("/reset-password")
async def reset_password(
    request: ResetPasswordRequest,
    session: Session = Depends(get_session)
):
    email = request.email
    otp = request.otp
    new_password = request.new_password

    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not user.reset_otp or user.reset_otp != otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    if user.reset_otp_expiry and user.reset_otp_expiry < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="OTP expired")

    user.hashed_password = hash_password(new_password)
    user.reset_otp = None
    user.reset_otp_expiry = None
    user.updated_at = datetime.now(timezone.utc)

    create_user(session, user)

    return {"msg": "Password reset successful"}

    return {"msg": "Password reset successful"}

