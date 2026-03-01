import base64
from services.odoo_service import OdooService
from config.settings import settings


class AuthService:

    @staticmethod
    def register(username: str, email: str, password: str, photo_bytes: bytes):

        OdooService.authenticate(
            settings.ODOO_USERNAME,
            settings.ODOO_PASSWORD
        )

        photo_base64 = base64.b64encode(photo_bytes).decode("utf-8")

        user_id = OdooService.call_model(
            "res.users",
            "create",
            args=[{
                "name": username,
                "login": email,
                "email": email,
                "password": password,
                "image_1920": photo_base64
            }]
        )

        return user_id

    @staticmethod
    def login(email: str, password: str):

        # 🔐 Autenticación directa contra Odoo
        result = OdooService.authenticate(email, password)

        if not result or not result.get("uid"):
            raise Exception("Credenciales inválidas")

        return {
            "uid": result["uid"],
            "name": result.get("name"),
            "username": result.get("username"),
            "session_id": result.get("session_id")
        }