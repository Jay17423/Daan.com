from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from enum import Enum
from fastapi import Form, File, UploadFile
from typing import Optional


class ItemType(str, Enum):
    CLOTHES = "clothes"
    FOOD = "food"
    ELECTRONICS = "electronics"
    OTHER = "other"

class PostCreateForm:
    def __init__(
        self,
        heading: str = Form(...),
        description: str = Form(...),
        item_type: ItemType = Form(...),
        file: Optional[UploadFile] = File(None)
    ):
        self.heading = heading
        self.description = description
        self.item_type = item_type
        self.file = file

class PostCreate(BaseModel):
    heading: str
    description: str
    image_url: str
    item_type: ItemType


class PostUpdate(BaseModel):  
    heading: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    item_type: Optional[ItemType] = None


class PostResponse(BaseModel):
    id: int
    heading: str
    description: str
    image_url: str
    item_type: ItemType
    is_active: bool
    created_at: datetime
    updated_at: datetime
    city: str  # from user profile

    class Config:
        from_attributes = True

class ClaimedPostInfo(BaseModel):
    post_id: int
    heading: str
    description: str
    claimed_user_id: int
    claimed_username: str
    claimed_email: str
    full_name: Optional[str] = None
    phone_number: Optional[str] = None
    local_address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    pincode: Optional[str] = None