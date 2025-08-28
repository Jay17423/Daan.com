
from fastapi import APIRouter, Depends, HTTPException, Query,status
from sqlmodel import Session,select
from app.config.db import get_session
from app.services.auth_service import get_current_user
from app.services.post_service import (
    create_post,
    get_posts_in_city,
    claim_post,
    confirm_claim,
    delete_post,
)
from app.schema.post import PostCreate, PostResponse
from app.models.user import User, UserProfile

router = APIRouter(prefix="/posts", tags=["Posts"])


# Create new post
@router.post("/", response_model=PostResponse)
def add_post(
    post_data: PostCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    return create_post(session, current_user.id, post_data)


# Get posts by city
# Get posts in the current user's city
@router.get("/feed", response_model=list[PostResponse])
def list_posts_for_user(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    # Get user profile
    profile = session.exec(
        select(UserProfile).where(UserProfile.user_id == current_user.id)
    ).first()

    if not profile or not profile.city:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Complete your profile and set your city to view posts."
        )

    # Get posts in user's city, excluding their own
    posts = get_posts_in_city(session, profile.city, current_user.id)
    return posts



# Claim post
@router.post("/{post_id}/claim", response_model=PostResponse)
def claim_existing_post(
    post_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    return claim_post(session, post_id, current_user.id)


# Confirm claim
@router.post("/{post_id}/confirm")
def confirm_claim_post(
    post_id: int,
    confirm: bool = Query(...),
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    confirm_claim(session, post_id, current_user.id, confirm)
    return {"message": "Claim processed successfully"}



# Delete post
@router.delete("/{post_id}")
def remove_post(
    post_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    delete_post(session, post_id, current_user.id)
    return {"message": "Post deleted successfully"}
