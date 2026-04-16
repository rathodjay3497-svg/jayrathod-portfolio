from datetime import datetime
from pydantic import BaseModel, EmailStr, field_validator


class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    message: str

    @field_validator("name")
    @classmethod
    def name_must_not_be_blank(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Name cannot be blank")
        if len(v) > 100:
            raise ValueError("Name too long (max 100 characters)")
        return v

    @field_validator("message")
    @classmethod
    def message_must_not_be_blank(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Message cannot be blank")
        if len(v) > 5000:
            raise ValueError("Message too long (max 5000 characters)")
        return v


class ContactMessageResponse(BaseModel):
    id: int
    name: str
    email: str
    message: str
    created_at: datetime

    model_config = {"from_attributes": True}
