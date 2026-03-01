from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    ODOO_URL = os.getenv("ODOO_URL")
    ODOO_DB = os.getenv("ODOO_DB")
    ODOO_USERNAME = os.getenv("ODOO_USERNAME")
    ODOO_PASSWORD = os.getenv("ODOO_PASSWORD")

settings = Settings()