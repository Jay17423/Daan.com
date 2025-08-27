from datetime import datetime
from sqlmodel import SQLModel
from typing import Optional


class UserCreate(SQLModel):
    username: str
    email: str
    password: str  
    full_name: Optional[str] = None
 


class UserRead(SQLModel):
    # id: int
    username: str
    email: str
    # created_at: datetime

class UserLogin(SQLModel):
    email: str
    password: str

class UserProfileCreate(SQLModel):
    full_name: Optional[str] = None
    phone_number: str
    local_address: str
    city: str
    state: str
    country: str
    pincode: str

class UserProfileRead(UserProfileCreate):
    id: int
    user_id: int

class UpdatePasswordRequest(SQLModel):
    curr_password: str
    new_password: str
    confirm_password: str
