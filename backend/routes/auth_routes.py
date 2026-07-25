from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user_model import User
from utils.db import db
from utils.jwt_utils import generate_token, generate_refresh_token

auth = Blueprint("auth", __name__)


@auth.route("/register", methods=["POST"])
def register():
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not name or not email or not password:
        return jsonify({"msg": "Name, email, and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email already registered"}), 409

    user = User(name=name, email=email, role="user", is_active=True)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    token = generate_token(user.email, fresh=True)
    refresh_token = generate_refresh_token(user.email)
    return jsonify({"msg": "User created", "token": token, "refreshToken": refresh_token, "user": user.to_public_dict()})


@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"msg": "Invalid email or password"}), 401

    if not user.is_active:
        return jsonify({"msg": "Account is suspended"}), 403

    token = generate_token(user.email, fresh=True)
    refresh_token = generate_refresh_token(user.email)
    return jsonify({"token": token, "refreshToken": refresh_token, "user": user.to_public_dict()})


@auth.route("/me", methods=["GET"])
@jwt_required()
def me():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404
    return jsonify(user.to_public_dict())


@auth.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "If the account exists, a recovery email has been queued"})
    return jsonify({"msg": "If the account exists, a recovery email has been queued"})