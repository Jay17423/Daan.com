from typing import Optional
from datetime import datetime, timezone
from sqlmodel import SQLModel, Field,Relationship

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True, index=True)
    username: str = Field(index=True, unique=True, nullable=False, max_length=50)
    email: str = Field(index=True, unique=True, nullable=False, max_length=100)
    full_name: Optional[str] = None   # 👈 add if needed
    hashed_password: str = Field(nullable=False)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    profile: Optional["UserProfile"] = Relationship(back_populates="user") 

class UserProfile(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", unique=True)  # one profile per user

    full_name: Optional[str] = None
    phone_number: str = Field(nullable=False, max_length=15)
    local_address: str = Field(nullable=False, max_length=255)
    city: str = Field(nullable=False, max_length=100, index=True)
    state: str = Field(nullable=False, max_length=100)
    country: str = Field(nullable=False, max_length=100)
    pincode: str = Field(nullable=False, max_length=20)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    user: User = Relationship(back_populates="profile")