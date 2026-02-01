from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from bson import ObjectId
import hashlib

from database import students_collection, recruiters_collection
from routes.resume import router as resume_router

router = APIRouter(prefix="/student", tags=["Student"])


# ================= MODELS =================
class StudentSignup(BaseModel):
    name: Optional[str] = "NA"
    email: Optional[str] = "NA"
    branch: Optional[str] = "NA"
    cgpa: Optional[str] = "0.0"
    skills: Optional[List[str]] = []
    predicted_role: Optional[str] = "General Software Role"
    password: Optional[str] = "password"


class StudentLogin(BaseModel):
    email: str
    password: str


# ================= UTILS =================
def hash_password(p: str):
    return hashlib.sha256(p.encode()).hexdigest()


# ================= SIGNUP =================
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
        "predicted_role": data.predicted_role,
        "password": hash_password(data.password),
    })

    return {"message": "Account created"}


# ================= LOGIN =================
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


# ================= RESUME ROUTES =================
router.include_router(resume_router)


# ================= RECOMMENDED JOBS =================
@router.get("/recommended-jobs/{student_id}")
def recommended_jobs(student_id: str):
    try:
        # 🔍 Fetch student
        student = students_collection.find_one(
            {"_id": ObjectId(student_id)}
        )

        if not student:
            return []

        student_role = student.get("predicted_role", "")
        student_branch = student.get("branch", "")
        student_cgpa = float(student.get("cgpa", 0))

        # 🔥 ROLE MATCH USING REGEX
        recruiters_cursor = recruiters_collection.find({
            "role": {
                "$regex": student_role,
                "$options": "i"
            }
        })

        result = []

        for job in recruiters_cursor:
            # 🔍 BRANCH ELIGIBILITY
            eligible_branches = job.get("eligibility_branch", [])
            if eligible_branches and student_branch not in eligible_branches:
                continue

            # 🔍 CGPA ELIGIBILITY
            min_cgpa = job.get("min_cgpa")
            if min_cgpa is not None and student_cgpa < min_cgpa:
                continue

            job["_id"] = str(job["_id"])
            result.append(job)

        return result

    except Exception as e:
        print("❌ ERROR in recommended-jobs:", e)
        return []
