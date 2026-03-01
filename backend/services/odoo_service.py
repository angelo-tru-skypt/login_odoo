from config.settings import settings
from utils.jsonrpc_client import jsonrpc_call


class OdooService:

    @staticmethod
    def authenticate(login: str, password: str):
        return jsonrpc_call(
            f"{settings.ODOO_URL}/web/session/authenticate",
            {
                "db": settings.ODOO_DB,
                "login": login,
                "password": password
            }
        )

    @staticmethod
    def call_model(model: str, method: str, args=None, kwargs=None):
        return jsonrpc_call(
            f"{settings.ODOO_URL}/web/dataset/call_kw",
            {
                "model": model,
                "method": method,
                "args": args or [],
                "kwargs": kwargs or {}
            }
        )