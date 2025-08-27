from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.schema.user import UserProfileCreate, UserProfileRead
from app.services.auth_service import get_current_user
from app.services.profile_service import create_or_update_profile, get_profile
from app.config.db import get_session
from app.models.user import User

router = APIRouter(prefix="/profile", tags=["Profile"])

@router.post("/", response_model=UserProfileRead)
def create_update(profile_data: UserProfileCreate,
                  current_user: User = Depends(get_current_user),
                  session: Session = Depends(get_session)):
    return create_or_update_profile(session, current_user.id, profile_data)

@router.get("/", response_model=UserProfileRead)
def read_profile(current_user: User = Depends(get_current_user),
                 session: Session = Depends(get_session)):
    return get_profile(session, current_user.id)
