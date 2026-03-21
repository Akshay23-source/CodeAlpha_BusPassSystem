from utils.db import db

class Pass(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    route = db.Column(db.String(100))
    status = db.Column(db.String(50), default="pending")