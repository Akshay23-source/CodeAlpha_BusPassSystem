from utils.db import db

class Pass(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    route = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), default="pending")