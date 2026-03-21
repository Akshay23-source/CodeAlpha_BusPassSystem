from flask import Blueprint, request, jsonify

payment = Blueprint("payment", __name__)

@payment.route("/test", methods=["GET"])
def test_payment():
    return jsonify({"msg": "Payment route working"})