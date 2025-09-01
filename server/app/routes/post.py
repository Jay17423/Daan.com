
from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query,status
from sqlmodel import Session,select
from app.config.db import get_session
from app.models.post import Post
from app.services.auth_service import get_current_user
from app.services.post_service import (
    create_post,
    get_posts_in_city,
    claim_post,
    confirm_claim,
    delete_post,
)
from app.schema.post import  ClaimedPostInfo, PostCreate, PostCreateForm, PostResponse
from app.models.user import User, UserProfile

router = APIRouter(prefix="/posts", tags=["Posts"])


# Create new post
@router.post("/", response_model=PostResponse)
def add_post(
    post_form: PostCreateForm = Depends(),
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):

    post_data = PostCreate(
        heading=post_form.heading,
        description=post_form.description,
        item_type=post_form.item_type,
        image_url=""  # fill after upload
    )

    return create_post(session, current_user.id, post_data, post_form.file)



# Get posts by city
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

# Reject claim
@router.post("/{post_id}/reject")
def reject_claim_post(
    post_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    confirm_claim(session, post_id, current_user.id, confirm=False)
    return {"message": "Claim rejected successfully"}

# Delete post
@router.delete("/{post_id}")
def remove_post(
    post_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    delete_post(session, post_id, current_user.id)
    return {"message": "Post deleted successfully"}

# Get claim info

@router.get("/claimed-by-others", response_model=List[ClaimedPostInfo])
def get_my_claimed_posts(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    # get all posts by current user that have been claimed
    posts = session.exec(
        select(Post).where(Post.user_id == current_user.id, Post.claimed_by.is_not(None))
    ).all()

    if not posts:
        return []

    results = []
    for post in posts:
        claimant = session.get(User, post.claimed_by)
        if not claimant:
            continue

        # get claimant profile
        profile = session.exec(
            select(UserProfile).where(UserProfile.user_id == claimant.id)
        ).first()

        results.append(
            ClaimedPostInfo(
                post_id=post.id,
                heading=post.heading,
                description=post.description,
                claimed_user_id=claimant.id,
                claimed_username=claimant.username,
                claimed_email=claimant.email,
                full_name=profile.full_name if profile else None,
                phone_number=profile.phone_number if profile else None,
                local_address=profile.local_address if profile else None,
                city=profile.city if profile else None,
                state=profile.state if profile else None,
                country=profile.country if profile else None,
                pincode=profile.pincode if profile else None,
            )
        )

    return results
