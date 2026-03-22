import os

class Config:
    SECRET_KEY = "supersecretkey"
    
    # ✅ Use SQLite (no installation needed)
    SQLALCHEMY_DATABASE_URI = "sqlite:///database.db"
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False