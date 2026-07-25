import os

try:
    from pymongo import MongoClient
    MONGO_AVAILABLE = True
except ImportError:
    MONGO_AVAILABLE = False

class MongoDBService:
    def __init__(self):
        self.mongo_uri = os.environ.get("MONGO_URI")
        self.is_active = MONGO_AVAILABLE and bool(self.mongo_uri)
        self.db = None

        if self.is_active:
            try:
                self.client = MongoClient(self.mongo_uri, serverSelectionTimeoutMS=2000)
                # Select database
                self.db = self.client.get_database("smarttransit_analytics")
                # Trigger a quick ping
                self.client.server_info()
                print("✅ Successfully connected to MongoDB Atlas for Analytics sync.")
            except Exception as e:
                print(f"⚠️ MongoDB Atlas connection failed: {e}. Analytics logs will run offline.")
                self.is_active = False

    def log_transaction(self, email, amount, method, status, txn_id):
        payload = {
            "txn_id": txn_id,
            "email": email,
            "amount": amount,
            "method": method,
            "status": status,
            "timestamp": os.environ.get("CURRENT_TIME", "2026-07-10T15:05:00Z")
        }
        
        if self.is_active and self.db is not None:
            try:
                self.db.transactions.insert_one(payload)
                print(f"Logged transaction {txn_id} to MongoDB Atlas.")
            except Exception as e:
                print(f"Failed to write transaction to MongoDB Atlas: {e}")
        else:
            print(f"[OFFLINE MONGO] Logged txn: {payload}")

    def log_boarding(self, email, route, pass_type):
        payload = {
            "email": email,
            "route": route,
            "pass_type": pass_type,
            "timestamp": os.environ.get("CURRENT_TIME", "2026-07-10T15:05:00Z")
        }
        
        if self.is_active and self.db is not None:
            try:
                self.db.boardings.insert_one(payload)
                print(f"Logged boarding for {email} to MongoDB Atlas.")
            except Exception as e:
                print(f"Failed to write boarding to MongoDB Atlas: {e}")
        else:
            print(f"[OFFLINE MONGO] Logged boarding: {payload}")

    def log_system_metrics(self, cpu, memory, disk):
        payload = {
            "cpu_load": cpu,
            "memory_usage": memory,
            "disk_usage": disk,
            "timestamp": os.environ.get("CURRENT_TIME", "2026-07-10T15:05:00Z")
        }
        
        if self.is_active and self.db is not None:
            try:
                self.db.metrics.insert_one(payload)
            except Exception as e:
                print(f"Failed to write metrics to MongoDB Atlas: {e}")
        else:
            pass
