# app/services/profile_service.py
from sqlmodel import Session, select
from fastapi import HTTPException
from app.models.user import UserProfile
from app.schema.user import UserProfileCreate

def create_or_update_profile(session: Session, user_id: int, profile_data: UserProfileCreate) -> UserProfile:
    profile = session.exec(select(UserProfile).where(UserProfile.user_id == user_id)).first()

    if profile:
        for key, value in profile_data.dict().items():
            setattr(profile, key, value)
        session.add(profile)
    else:
        profile = UserProfile(user_id=user_id, **profile_data.dict())
        session.add(profile)

    session.commit()
    session.refresh(profile)
    return profile

def get_profile(session: Session, user_id: int) -> UserProfile:
    profile = session.exec(select(UserProfile).where(UserProfile.user_id == user_id)).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile
