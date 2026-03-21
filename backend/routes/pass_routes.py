from flask import Blueprint, request, jsonify
from models.pass_model import Pass
from utils.db import db
from flask_jwt_extended import jwt_required, get_jwt_identity

pass_bp = Blueprint("pass", __name__)

@pass_bp.route("/apply", methods=["POST"])
@jwt_required()
def apply_pass():
    user = get_jwt_identity()
    data = request.json

    new_pass = Pass(user_id=1, route=data["route"])

    db.session.add(new_pass)
    db.session.commit()

    return jsonify({"msg": "Pass Applied"})