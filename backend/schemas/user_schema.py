from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from fastapi import Form


class LoginSchema(BaseModel):
    email: EmailStr
    password: str

class RegisterSchema(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)

    @classmethod
    def as_form(
        cls,
        username: str = Form(...),
        email: EmailStr = Form(...),
        password: str = Form(...)
    ):
        return cls(
            username=username,
            email=email,
            password=password
        )
class UpdateUserSchema(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]