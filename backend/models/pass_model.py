import uuid
from datetime import datetime
from utils.db import db


class Pass(db.Model):
    __tablename__ = "bus_passes"

    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(36), unique=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.Integer, nullable=False)
    route = db.Column(db.String(120), nullable=False)
    pass_type = db.Column(db.String(40), default="monthly")
    amount = db.Column(db.Float, default=45.0)
    status = db.Column(db.String(20), default="pending")
    start_date = db.Column(db.DateTime, default=datetime.utcnow)
    end_date = db.Column(db.DateTime, nullable=True)
    notes = db.Column(db.Text, default="")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            "id": self.public_id,
            "route": self.route,
            "passType": self.pass_type,
            "amount": self.amount,
            "status": self.status,
            "createdAt": self.created_at.isoformat() if self.created_at else None,
            "notes": self.notes,
        }