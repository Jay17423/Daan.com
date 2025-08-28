from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from enum import Enum


class ItemType(str, Enum):
    CLOTHES = "clothes"
    FOOD = "food"
    ELECTRONICS = "electronics"
    OTHER = "other"


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
