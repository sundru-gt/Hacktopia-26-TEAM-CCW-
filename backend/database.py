from pymongo import MongoClient
import certifi

MONGO_URL = "mongodb+srv://tanish230101144_db_user:NyVQYv3GTYo4UFS1@hacktopia.44snhpq.mongodb.net/campushire?retryWrites=true&w=majority"

client = MongoClient(
    MONGO_URL,
    tls=True,
    tlsCAFile=certifi.where(),
    serverSelectionTimeoutMS=30000
)

db = client["campushire"]

students_collection = db["students"]
recruiters_collection = db["recruiters"]
tnp_collection = db["tnp"]

try:
    client.admin.command("ping")
    print("✅ MongoDB connected successfully")
except Exception as e:
    print("❌ MongoDB connection failed:", e)
