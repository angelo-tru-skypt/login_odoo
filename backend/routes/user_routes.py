from fastapi import APIRouter, HTTPException
from services.odoo_service import OdooService
from schemas.user_schema import UpdateUserSchema
from config.settings import settings

router = APIRouter(prefix="/users", tags=["Users"])


def authenticate_admin():
    OdooService.authenticate(
        settings.ODOO_USERNAME,
        settings.ODOO_PASSWORD
    )


@router.get("/")
def list_users():
    try:
        authenticate_admin()

        return OdooService.call_model(
            "res.users",
            "search_read",
            [[]],
            {"fields": ["id", "name", "email", "login"]}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put("/{user_id}")
def update_user(user_id: int, data: UpdateUserSchema):
    try:
        authenticate_admin()

        OdooService.call_model(
            "res.users",
            "write",
            [[user_id], data.dict(exclude_none=True)]
        )

        return {"message": "Usuario actualizado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{user_id}")
def delete_user(user_id: int):
    try:
        authenticate_admin()

        OdooService.call_model(
            "res.users",
            "unlink",
            [[user_id]]
        )

        return {"message": "Usuario eliminado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/search/")
def search_user(name: str):
    try:
        authenticate_admin()

        return OdooService.call_model(
            "res.users",
            "search_read",
            [[["name", "ilike", name]]],
            {"fields": ["id", "name", "email"]}
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))