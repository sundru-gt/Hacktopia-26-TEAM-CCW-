from fastapi import APIRouter
from pydantic import BaseModel
from database import students_collection
import hashlib

router = APIRouter(prefix="/student", tags=["Student"])

class StudentSignup(BaseModel):
    name: str
    email: str
    branch: str
    cgpa: str
    skills: list[str]
    password: str


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


@router.post("/signup")
def student_signup(data: StudentSignup):

    # 🔹 duplicate check
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
