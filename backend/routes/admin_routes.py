from flask import Blueprint, request, jsonify
from models.user_model import User
from utils.db import db

# Create Blueprint
admin = Blueprint("admin", __name__)

# ✅ Get all users
@admin.route("/users", methods=["GET"])
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
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"msg": "User deleted successfully"})


# ✅ Admin test route
@admin.route("/test", methods=["GET"])
def admin_test():
    return jsonify({"msg": "Admin route working"})