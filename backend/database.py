from pymongo import MongoClient

MONGO_URL = "mongodb+srv://tanish230101144_db_user:NyVQYv3GTYo4UFS1@hacktopia.44snhpq.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(MONGO_URL)

db = client["campushire"]   # database name

students_collection = db["students"]
tnp_collection = db["tnp"]
recruiters_collection = db["recruiters"]
