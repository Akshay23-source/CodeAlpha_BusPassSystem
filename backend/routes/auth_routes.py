from flask import Blueprint, request, jsonify
from models.user_model import User
from utils.db import db
from utils.jwt_utils import generate_token

auth = Blueprint("auth", __name__)

@auth.route("/register", methods=["POST"])
def register():
    data = request.json

    user = User(
        name=data["name"],
        email=data["email"],
        password=data["password"]
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "User created"})


@auth.route("/login", methods=["POST"])
def login():
    data = request.json

    user = User.query.filter_by(
        email=data["email"],
        password=data["password"]
    ).first()

    if not user:
        return jsonify({"msg": "Invalid"}), 401

    token = generate_token(user.email)
    return jsonify({"token": token})