from flask import Blueprint, request, jsonify
from models.pass_model import Pass
from models.user_model import User
from utils.db import db
from flask_jwt_extended import jwt_required, get_jwt_identity

pass_bp = Blueprint("pass", __name__)

# ✅ Apply Pass
@pass_bp.route("/apply", methods=["POST"])
@jwt_required()
def apply_pass():
    user_email = get_jwt_identity()

    # 🔐 Get user
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    data = request.json

    # ⚠️ Validation (important)
    if not data or "route" not in data:
        return jsonify({"msg": "Route is required"}), 400

    # 📦 Create pass
    new_pass = Pass(
        user_id=user.id,
        route=data["route"]
    )

    db.session.add(new_pass)
    db.session.commit()

    return jsonify({"msg": "Pass Applied Successfully"})


# ✅ Get My Passes
@pass_bp.route("/my", methods=["GET"])
@jwt_required()
def get_my_passes():
    user_email = get_jwt_identity()

    # 🔐 Get user
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    # 📦 Fetch passes
    passes = Pass.query.filter_by(user_id=user.id).all()

    result = []
    for p in passes:
        result.append({
            "id": p.id,
            "route": p.route
        })

    return jsonify(result)