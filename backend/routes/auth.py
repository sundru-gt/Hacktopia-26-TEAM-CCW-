from fastapi import APIRouter
from creek.backend.db.database import students_collection
from models.student import create_student

router = APIRouter()

@router.post("/signup/student")
def student_signup(data: dict):
    student = create_student(data)
    students_collection.insert_one(student)
    return {"message": "Student registered"}

@router.post("/login")
def login(data: dict):
    user = students_collection.find_one({"email": data["email"]})
    if user:
        return {"role": "student", "id": str(user["_id"])}

    tnp = tnp_collection.find_one({"email": data["email"]})
    if tnp:
        return {"role": "tnp", "id": str(tnp["_id"])}

    return {"error": "User not found"}
