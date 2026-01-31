from fastapi import APIRouter
from pydantic import BaseModel
from database import students_collection
import hashlib

router = APIRouter(prefix="/auth", tags=["Auth"])

class LoginRequest(BaseModel):
    email: str
    password: str


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


@router.post("/login")
def login(data: LoginRequest):

    student = students_collection.find_one({"email": data.email})

    if not student:
        return {"error": "User not found"}

    hashed = hash_password(data.password)

    if student["password"] != hashed:
        return {"error": "Invalid password"}

    # 🔥 LOGIN SUCCESS
    return {
        "role": "student",
        "student": {
            "id": str(student["_id"]),
            "name": student["name"],
            "email": student["email"],
            "branch": student["branch"],
            "cgpa": student["cgpa"],
            "skills": student["skills"],
        }
    }
