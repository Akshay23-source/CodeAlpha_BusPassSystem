from flask import Blueprint, jsonify
from models.user_model import User
from models.pass_model import Pass
from utils.db import db
from flask_jwt_extended import jwt_required

# Create Blueprint
admin = Blueprint("admin", __name__)

# ✅ Get all users
@admin.route("/users", methods=["GET"])
@jwt_required()
def get_users():
    users = User.query.all()

    result = []
    for user in users:
        result.append({
            "id": user.id,
            "name": user.name,
            "email": user.email
        })

    return jsonify(result)


# ✅ Delete user
@admin.route("/delete_user/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"msg": "User deleted successfully"})


# ✅ Get all passes
@admin.route("/all_passes", methods=["GET"])
@jwt_required()
def all_passes():
    passes = Pass.query.all()

    result = []
    for p in passes:
        result.append({
            "id": p.id,
            "user_id": p.user_id,
            "route": p.route,
            "status": p.status
        })

    return jsonify(result)


# ✅ Approve pass
@admin.route("/approve/<int:pass_id>", methods=["PUT"])
@jwt_required()
def approve_pass(pass_id):
    p = Pass.query.get(pass_id)

    if not p:
        return jsonify({"msg": "Pass not found"}), 404

    p.status = "approved"
    db.session.commit()

    return jsonify({"msg": "Pass approved"})


# ✅ Reject pass (NEW 🔥)
@admin.route("/reject/<int:pass_id>", methods=["PUT"])
@jwt_required()
def reject_pass(pass_id):
    p = Pass.query.get(pass_id)

    if not p:
        return jsonify({"msg": "Pass not found"}), 404

    p.status = "rejected"
    db.session.commit()

    return jsonify({"msg": "Pass rejected"})


# ✅ Admin test route
@admin.route("/test", methods=["GET"])
def admin_test():
    return jsonify({"msg": "Admin route working"})