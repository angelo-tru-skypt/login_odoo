from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from schemas.auth_schema import RegisterSchema, LoginSchema
from services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register")
async def register(
    data: RegisterSchema = Depends(RegisterSchema.as_form),
    photo: UploadFile = File(...)
):
    try:
        photo_bytes = await photo.read()

        user_id = AuthService.register(
            username=data.username,
            email=data.email,
            password=data.password,
            photo_bytes=photo_bytes
        )

        return {
            "message": "Usuario creado correctamente",
            "user_id": user_id
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login")
def login(data: LoginSchema):
    try:
        result = AuthService.login(
            email=data.email,
            password=data.password
        )

        return {
            "message": "Login exitoso",
            "user": result
        }

    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))