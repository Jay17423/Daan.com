from typing import Optional
from datetime import datetime, timezone
from sqlmodel import SQLModel, Field,Relationship
from sqlalchemy import Column, DateTime

class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True, index=True)
    username: str = Field(index=True, unique=True, nullable=False, max_length=50)
    email: str = Field(index=True, unique=True, nullable=False, max_length=100)
    full_name: Optional[str] = None
    hashed_password: str = Field(nullable=False)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    profile: Optional["UserProfile"] = Relationship(back_populates="user") 

    reset_otp: Optional[str] = Field(default=None)
    reset_otp_expiry: Optional[datetime] = Field(
        sa_column=Column(DateTime(timezone=True), nullable=True),
        default=None
    )

class UserProfile(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
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