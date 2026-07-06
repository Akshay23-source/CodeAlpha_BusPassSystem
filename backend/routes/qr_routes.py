import os
from flask import Blueprint, jsonify
import qrcode
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user_model import User
from models.pass_model import Pass

qr = Blueprint("qr", __name__)


@qr.route("/generate", methods=["GET"])
@jwt_required()
def generate_qr():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    user_pass = Pass.query.filter_by(user_id=user.id).order_by(Pass.created_at.desc()).first()
    if not user_pass:
        return jsonify({"msg": "No pass found"}), 404

    if user_pass.status != "approved":
        return jsonify({"msg": "Pass not approved yet"}), 403

    data = f"{user.public_id}|{user_pass.public_id}"
    img = qrcode.make(data)

    folder_path = os.path.join(os.getcwd(), "qrcodes")
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    file_path = os.path.join(folder_path, f"{user.id}.png")
    img.save(file_path)

    return jsonify({"msg": "QR generated successfully", "file": f"qrcodes/{user.id}.png", "qrData": data})


@qr.route("/verify/<string:data>", methods=["GET"])
def verify_qr(data):
    try:
        user_public_id, pass_public_id = data.split("|")
    except ValueError:
        return jsonify({"msg": "Invalid QR"}), 400

    user = User.query.filter_by(public_id=user_public_id).first()
    user_pass = Pass.query.filter_by(public_id=pass_public_id).first()

    if not user or not user_pass:
        return jsonify({"msg": "Invalid pass"}), 404

    if user_pass.status != "approved":
        return jsonify({"msg": "Pass not valid", "status": user_pass.status}), 403

    return jsonify({"msg": "Pass valid", "user": user.email, "route": user_pass.route, "status": user_pass.status})