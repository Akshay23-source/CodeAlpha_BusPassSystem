from flask import Blueprint, jsonify
import qrcode
import os
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user_model import User
from models.pass_model import Pass

qr = Blueprint("qr", __name__)

# 🎫 GENERATE QR
@qr.route("/generate", methods=["GET"])
@jwt_required()
def generate_qr():
    # 🔐 Get logged-in user
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()

    if not user:
        return jsonify({"msg": "User not found"}), 404

    # 📦 Get user's pass
    user_pass = Pass.query.filter_by(user_id=user.id).first()

    if not user_pass:
        return jsonify({"msg": "No pass found"}), 404

    # ❗ Only approved passes get QR
    if user_pass.status != "approved":
        return jsonify({"msg": "Pass not approved yet"}), 403

    # 🔥 QR DATA (IMPORTANT)
    data = f"{user.id}|{user_pass.id}"

    # 🎫 Generate QR
    img = qrcode.make(data)

    # 📁 Save folder
    folder_path = os.path.join(os.getcwd(), "qrcodes")
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    file_path = os.path.join(folder_path, f"{user.id}.png")
    img.save(file_path)

    return jsonify({
        "msg": "QR generated successfully",
        "file": f"qrcodes/{user.id}.png",
        "qr_data": data
    })


# 🔍 VERIFY QR (NEW 🔥)
@qr.route("/verify/<string:data>", methods=["GET"])
def verify_qr(data):
    try:
        user_id, pass_id = data.split("|")
    except:
        return jsonify({"msg": "Invalid QR"}), 400

    user = User.query.get(user_id)
    user_pass = Pass.query.get(pass_id)

    if not user or not user_pass:
        return jsonify({"msg": "Invalid pass"}), 404

    if user_pass.status != "approved":
        return jsonify({
            "msg": "Pass not valid",
            "status": user_pass.status
        }), 403

    return jsonify({
        "msg": "Pass valid ✅",
        "user": user.email,
        "route": user_pass.route,
        "status": user_pass.status
    })