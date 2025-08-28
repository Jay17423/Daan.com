from typing import TYPE_CHECKING, Optional
from datetime import datetime, timezone, timedelta
from enum import Enum
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from app.models.user import User


class ItemType(str, Enum):
    CLOTHES = "clothes"
    FOOD = "food"
    ELECTRONICS = "electronics"
    OTHER = "other"



class Post(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True, index=True)
    user_id: int = Field(foreign_key="user.id", nullable=False, index=True)

    heading: str = Field(nullable=False, max_length=100)
    description: str = Field(nullable=False, max_length=255)
    image_url: str = Field(nullable=False)  # Cloudinary URL
    item_type: ItemType = Field(nullable=False)
    city: str = Field(nullable=False, max_length=100, index=True)

    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_active: bool = Field(default=True, index=True)

    # Claim handling
    claimed_by: Optional[int] = Field(default=None, foreign_key="user.id")
    claimed_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None

    # Relationships
    user: "User" = Relationship(
        back_populates="posts",
        sa_relationship_kwargs={"foreign_keys": "[Post.user_id]"}
    )

    claimed_user: Optional["User"] = Relationship(
        back_populates="claimed_posts",
        sa_relationship_kwargs={"foreign_keys": "[Post.claimed_by]"}
    )
