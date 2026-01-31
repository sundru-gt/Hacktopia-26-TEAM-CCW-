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

class StudentLogin(BaseModel):
    email: str
    password: str


def hash_password(p: str):
    return hashlib.sha256(p.encode()).hexdigest()


@router.post("/signup")
def signup(data: StudentSignup):
    if students_collection.find_one({"email": data.email}):
        return {"error": "Student already exists"}

    students_collection.insert_one({
        "name": data.name,
        "email": data.email,
        "branch": data.branch,
        "cgpa": data.cgpa,
        "skills": data.skills,
        "password": hash_password(data.password)
    })

    return {"message": "Account created"}


@router.post("/login")
def login(data: StudentLogin):
    student = students_collection.find_one({
        "email": data.email,
        "password": hash_password(data.password)
    })

    if not student:
        return {"error": "Student not found"}

    student["_id"] = str(student["_id"])
    del student["password"]

    return {"student": student}
