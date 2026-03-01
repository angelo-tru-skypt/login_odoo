from pydantic import BaseModel, EmailStr, Field
from fastapi import Form


class RegisterSchema(BaseModel):
    username: str = Field(..., min_length=3)
    email: EmailStr
    password: str = Field(..., min_length=6)

    @classmethod
    def as_form(
        cls,
        username: str = Form(...),
        email: EmailStr = Form(...),
        password: str = Form(...)
    ):
        return cls(username=username, email=email, password=password)


class LoginSchema(BaseModel):
    email: EmailStr
    password: str