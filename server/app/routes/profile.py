from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlmodel import Session, select
from app.config.db import get_session, engine
from app.models.user import User, UserProfile
from app.schema.user import UserProfileCreate, UserProfileRead
from fastapi.security import OAuth2PasswordBearer
from app.config.jwt import verify_access_token


router = APIRouter(prefix="/profile", tags=["Profile"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(request: Request, token: str = Depends(oauth2_scheme)) -> User:
    
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    payload = None
    if token:
        payload = verify_access_token(token, credentials_exception)
    else:
       
        cookie_token = request.cookies.get("access_token")
        if cookie_token and cookie_token.startswith("Bearer "):
            cookie_token = cookie_token.split(" ")[1]
            payload = verify_access_token(cookie_token, credentials_exception)

    if not payload:
        raise credentials_exception

    email = payload.get("sub")
    if not email:
        raise credentials_exception

    with Session(engine) as session:
        user = session.exec(select(User).where(User.email == email)).first()
        if not user:
            raise credentials_exception
        return user


@router.post("/", response_model=UserProfileRead)
def create_or_update_profile(
    profile_data: UserProfileCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    profile = session.exec(
        select(UserProfile).where(UserProfile.user_id == current_user.id)
    ).first()

    if profile:
        
        for key, value in profile_data.dict().items():
            setattr(profile, key, value)
        session.add(profile)
    else:
       
        profile = UserProfile(user_id=current_user.id, **profile_data.dict())
        session.add(profile)

    session.commit()
    session.refresh(profile)
    return profile


@router.get("/", response_model=UserProfileRead)
def get_profile(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    profile = session.exec(
        select(UserProfile).where(UserProfile.user_id == current_user.id)
    ).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile
