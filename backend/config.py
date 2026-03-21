import os

class Config:
    SECRET_KEY = "supersecretkey"
    SQLALCHEMY_DATABASE_URI = "postgresql://user:password@localhost/buspass"
    SQLALCHEMY_TRACK_MODIFICATIONS = False