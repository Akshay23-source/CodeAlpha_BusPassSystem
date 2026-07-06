from flask import Blueprint, request, jsonify
from models.pass_model import Pass
from models.user_model import User
from utils.db import db
from flask_jwt_extended import jwt_required, get_jwt_identity

pass_bp = Blueprint("pass", __name__)


@pass_bp.route("/apply", methods=["POST"])
@jwt_required()
def apply_pass():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    data = request.get_json(silent=True) or {}
    route = (data.get("route") or "").strip()
    pass_type = (data.get("passType") or "monthly").strip()
    amount = data.get("amount", 45.0)

    if not route:
        return jsonify({"msg": "Route is required"}), 400

    new_pass = Pass(user_id=user.id, route=route, pass_type=pass_type, amount=float(amount), status="pending")
    db.session.add(new_pass)
    db.session.commit()

    return jsonify({"msg": "Pass applied successfully", "pass": new_pass.to_dict()})


@pass_bp.route("/my", methods=["GET"])
@jwt_required()
def get_my_passes():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    passes = Pass.query.filter_by(user_id=user.id).all()
    return jsonify([pass_item.to_dict() for pass_item in passes])


@pass_bp.route("/status", methods=["GET"])
@jwt_required()
def get_pass_status():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    latest_pass = Pass.query.filter_by(user_id=user.id).order_by(Pass.created_at.desc()).first()
    if not latest_pass:
        return jsonify({"status": "no-pass"})
    return jsonify({"status": latest_pass.status, "route": latest_pass.route})