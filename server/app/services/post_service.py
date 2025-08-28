from datetime import datetime, timedelta, timezone
from fastapi import HTTPException, status
from sqlmodel import Session, select
from app.models.post import Post
from app.models.user import UserProfile
from app.schema.post import PostCreate


# Create Post
def create_post(session: Session, user_id: int, post_data: PostCreate) -> dict:
    profile = session.exec(
        select(UserProfile).where(UserProfile.user_id == user_id)
    ).first()

    if not profile:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Complete your profile before posting"
        )

    post = Post(
        user_id=user_id,
        heading=post_data.heading,
        description=post_data.description,
        image_url=post_data.image_url,
        item_type=post_data.item_type,
        city=profile.city
    )

    session.add(post)
    session.commit()
    session.refresh(post)

    return {
        **post.model_dump(),  
        "city": profile.city
    }



def get_posts_in_city(session: Session, city: str, current_user_id: int) -> list[Post]:
    posts = session.exec(
        select(Post)
        .join(UserProfile, UserProfile.user_id == Post.user_id)
        .where(
            UserProfile.city == city,
            Post.is_active.is_(True),
            Post.user_id != current_user_id  # exclude current user's posts
        )
        .order_by(Post.created_at.desc())  # optional: newest posts first
    ).all()
    return posts





# Claim a post
def claim_post(session: Session, post_id: int, claimer_id: int) -> Post:
    post = session.exec(
        select(Post).where(Post.id == post_id, Post.is_active == True)
    ).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not available")

    if post.user_id == claimer_id:
        raise HTTPException(status_code=400, detail="You cannot claim your own post")

    post.claimed_by = claimer_id
    post.claimed_at = datetime.now(timezone.utc)
    post.expires_at = post.claimed_at + timedelta(hours=1)
    post.is_active = False

    session.add(post)
    session.commit()
    session.refresh(post)
    return post


# Confirm claim by owner
def confirm_claim(session: Session, post_id: int, owner_id: int, confirm: bool) -> None:
    post = session.exec(select(Post).where(Post.id == post_id)).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    if post.user_id != owner_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    if confirm:
        session.delete(post)  # permanently remove
    else:
        post.is_active = True
        post.claimed_by = None
        post.claimed_at = None
        post.expires_at = None
        session.add(post)

    session.commit()


# Delete post by owner
def delete_post(session: Session, post_id: int, owner_id: int) -> None:
    post = session.exec(select(Post).where(Post.id == post_id)).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    if post.user_id != owner_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this post")

    session.delete(post)
    session.commit()


# Auto-reactivate expired posts
def auto_reactivate_expired_posts(session: Session) -> None:
    now = datetime.now(timezone.utc)
    posts = session.exec(
        select(Post).where(Post.expires_at < now, Post.is_active == False)
    ).all()

    for post in posts:
        post.is_active = True
        post.claimed_by = None
        post.claimed_at = None
        post.expires_at = None
        session.add(post)

    session.commit()

