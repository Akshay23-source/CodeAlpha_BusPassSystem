from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user_model import User

payment = Blueprint("payment", __name__)


@payment.route("/create-order", methods=["POST"])
@jwt_required()
def create_order():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({
        "orderId": "demo-order-001",
        "amount": 4500,
        "currency": "INR",
        "status": "created",
        "message": "Razorpay integration is ready for production wiring",
    })


@payment.route("/history", methods=["GET"])
@jwt_required()
def payment_history():
    return jsonify([{
        "id": "txn-001",
        "amount": 4500,
        "status": "paid",
        "route": "Central - Airport",
    }])