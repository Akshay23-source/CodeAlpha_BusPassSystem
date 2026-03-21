from flask import Blueprint, jsonify

# Create Blueprint
qr = Blueprint("qr", __name__)

# Test route
@qr.route("/test", methods=["GET"])
def test_qr():
    return jsonify({"msg": "QR route working"})