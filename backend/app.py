import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, jsonify
from config import Config
from utils.db import db
from flask_cors import CORS
from flask_jwt_extended import JWTManager

# ✅ IMPORT MODELS (IMPORTANT)
from models.user_model import User
from models.pass_model import Pass   # 🔥 ADD THIS (important for DB)

# ✅ Existing routes
from routes.auth_routes import auth
from routes.pass_routes import pass_bp

# ✅ Import modules
from routes import admin_routes
from routes import payment_routes
from routes import qr_routes
from routes.ai_routes import ai

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

# ✅ Create tables automatically
with app.app_context():
    try:
        db.create_all()
    except Exception as e:
        print(f"⚠️ Database tables initialization note (often indicating execution by another worker): {e}")

# ✅ Home route (for testing)
@app.route("/")
def home():
    return "Backend is running 🚀"

# ✅ Healthcheck route
@app.route("/api/health")
def healthcheck():
    try:
        db.session.execute(db.text("SELECT 1"))
        return jsonify({"status": "healthy", "database": "connected"}), 200
    except Exception as e:
        return jsonify({"status": "unhealthy", "database": "disconnected", "error": str(e)}), 500


# ✅ Register routes
app.register_blueprint(auth, url_prefix="/api/auth")
app.register_blueprint(pass_bp, url_prefix="/api/pass")
app.register_blueprint(admin, url_prefix="/api/admin")
app.register_blueprint(payment, url_prefix="/api/payment")
app.register_blueprint(qr, url_prefix="/api/qr")
app.register_blueprint(ai, url_prefix="/api/ai")


# ✅ MAIN RUN (IMPORTANT FOR NETWORK)
if __name__ == "__main__":
    print("🔥 Server starting...")
    app.run(host="0.0.0.0", port=5000, debug=True)