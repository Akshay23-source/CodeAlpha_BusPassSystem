import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask
from config import Config
from utils.db import db
from flask_cors import CORS
from flask_jwt_extended import JWTManager

# ✅ IMPORT MODELS (VERY IMPORTANT 🔥)
from models.user_model import User

# ✅ Existing routes
from routes.auth_routes import auth
from routes.pass_routes import pass_bp

# ✅ Import modules
from routes import admin_routes
from routes import payment_routes
from routes import qr_routes

# ✅ Extract blueprints
admin = admin_routes.admin
payment = payment_routes.payment
qr = qr_routes.qr


app = Flask(__name__)
app.config.from_object(Config)

# ✅ Initialize extensions
db.init_app(app)
CORS(app)
JWTManager(app)

# ✅ Create tables automatically 🔥
with app.app_context():
    db.create_all()

# ✅ Home route
@app.route("/")
def home():
    return "Backend is running 🚀"

# ✅ Register routes
app.register_blueprint(auth, url_prefix="/api/auth")
app.register_blueprint(pass_bp, url_prefix="/api/pass")
app.register_blueprint(admin, url_prefix="/api/admin")
app.register_blueprint(payment, url_prefix="/api/payment")
app.register_blueprint(qr, url_prefix="/api/qr")


if __name__ == "__main__":
    app.run(debug=True)