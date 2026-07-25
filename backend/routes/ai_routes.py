from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.ai_service import AIService
from models.user_model import User
from utils.prompt_templates import TRAVEL_PROMPT, PAYMENT_PROMPT, SUPPORT_PROMPT, ADMIN_PROMPT

ai = Blueprint("ai", __name__)
ai_service = AIService()

@ai.route("/chat", methods=["POST"])
@jwt_required()
def chat_assistant():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "Unauthorized session"}), 401

    data = request.get_json() or {}
    message = data.get("message", "")
    page = data.get("page", "Dashboard")

    context = {
        "email": user.email,
        "role": user.role,
        "page": page
    }

    # Decide preset prompts templates based on keywords
    msg_lower = message.lower()
    system_prompt = TRAVEL_PROMPT
    if user.role in {'admin', 'super_admin'}:
        system_prompt = ADMIN_PROMPT
    elif 'pay' in msg_lower or 'invoice' in msg_lower or 'gst' in msg_lower or 'refund' in msg_lower:
        system_prompt = PAYMENT_PROMPT
    elif 'how' in msg_lower or 'help' in msg_lower or 'faq' in msg_lower or 'support' in msg_lower:
        system_prompt = SUPPORT_PROMPT

    full_prompt = f"{system_prompt}\nUser Query: {message}"
    reply = ai_service.query(full_prompt, context)

    return jsonify({"reply": reply})

@ai.route("/insights", methods=["GET"])
@jwt_required()
def dashboard_insights():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "Unauthorized session"}), 401

    # Returns AI mock recommendations summary parameters
    insights = [
        "You travelled 24 times this month.",
        "You saved ₹530.00 using transit passes.",
        "Your pass expires in 5 days.",
        "Your most active commute is Line 12 Express.",
    ]
    return jsonify({"insights": insights})
