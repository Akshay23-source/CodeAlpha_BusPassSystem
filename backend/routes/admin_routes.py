from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.pass_model import Pass
from models.user_model import User
from utils.db import db

admin = Blueprint("admin", __name__)


def ensure_admin():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if not user or user.role not in {"admin", "super_admin"}:
        return None
    return user


@admin.route("/users", methods=["GET"])
@jwt_required()
def get_users():
    admin_user = ensure_admin()
    if not admin_user:
        return jsonify({"msg": "Admin access required"}), 403

    users = User.query.filter(User.deleted_at.is_(None)).all()
    return jsonify([user.to_public_dict() for user in users])


@admin.route("/delete_user/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    admin_user = ensure_admin()
    if not admin_user:
        return jsonify({"msg": "Admin access required"}), 403
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404
    user.deleted_at = db.func.now() if hasattr(db, "func") else None
    db.session.commit()
    return jsonify({"msg": "User archived"})


@admin.route("/all_passes", methods=["GET"])
@jwt_required()
def all_passes():
    admin_user = ensure_admin()
    if not admin_user:
        return jsonify({"msg": "Admin access required"}), 403
    passes = Pass.query.all()
    return jsonify([pass_item.to_dict() for pass_item in passes])


@admin.route("/approve/<int:pass_id>", methods=["PUT"])
@jwt_required()
def approve_pass(pass_id):
    admin_user = ensure_admin()
    if not admin_user:
        return jsonify({"msg": "Admin access required"}), 403
    p = Pass.query.get(pass_id)
    if not p:
        return jsonify({"msg": "Pass not found"}), 404
    p.status = "approved"
    db.session.commit()
    return jsonify({"msg": "Pass approved"})


@admin.route("/reject/<int:pass_id>", methods=["PUT"])
@jwt_required()
def reject_pass(pass_id):
    admin_user = ensure_admin()
    if not admin_user:
        return jsonify({"msg": "Admin access required"}), 403
    p = Pass.query.get(pass_id)
    if not p:
        return jsonify({"msg": "Pass not found"}), 404
    p.status = "rejected"
    db.session.commit()
    return jsonify({"msg": "Pass rejected"})


@admin.route("/dashboard", methods=["GET"])
@jwt_required()
def dashboard():
    admin_user = ensure_admin()
    if not admin_user:
        return jsonify({"msg": "Admin access required"}), 403
    users_count = User.query.filter(User.deleted_at.is_(None)).count()
    approved_passes = Pass.query.filter_by(status="approved").count()
    pending_passes = Pass.query.filter_by(status="pending").count()
    return jsonify({"users": users_count, "approvedPasses": approved_passes, "pendingPasses": pending_passes})