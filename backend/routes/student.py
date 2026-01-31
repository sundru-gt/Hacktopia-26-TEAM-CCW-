from fastapi import APIRouter
from pydantic import BaseModel
from database import students_collection
from bson import ObjectId
import hashlib

router = APIRouter(prefix="/student", tags=["Student"])


# =====================
# UTILS
# =====================
def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


# =====================
# SCHEMAS
# =====================
class StudentSignup(BaseModel):
    name: str
    email: str
    branch: str
    cgpa: str
    skills: list[str]
    password: str


class StudentLogin(BaseModel):
    email: str
    password: str


# =====================
# SIGNUP API
# =====================
@router.post("/signup")
def student_signup(data: StudentSignup):

    # 🔹 duplicate email check
    if students_collection.find_one({"email": data.email}):
        return {"error": "Student already exists"}

    student = {
        "name": data.name,
        "email": data.email,
        "branch": data.branch,
        "cgpa": data.cgpa,
        "skills": data.skills,
        "password": hash_password(data.password),
    }

    students_collection.insert_one(student)

    return {"message": "Student registered successfully"}


# =====================
# LOGIN API
# =====================
@router.post("/login")
def student_login(data: StudentLogin):

    student = students_collection.find_one({"email": data.email})

    if not student:
        return {"error": "Student not found"}

    if student["password"] != hash_password(data.password):
        return {"error": "Invalid password"}

    return {
        "message": "Login successful",
        "student": {
            "id": str(student["_id"]),
            "name": student["name"],
            "email": student["email"],
            "branch": student["branch"],
            "cgpa": student["cgpa"],
            "skills": student["skills"],
        }
    }


# =====================
# STUDENT DASHBOARD API
# =====================
@router.get("/{student_id}")
def get_student_dashboard(student_id: str):

    student = students_collection.find_one(
        {"_id": ObjectId(student_id)},
        {"password": 0}  # 🔒 hide password
    )

    if not student:
        return {"error": "Student not found"}

    student["_id"] = str(student["_id"])

    return student
