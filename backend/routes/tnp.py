from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from database import students_collection, recruiters_collection

router = APIRouter(prefix="/tnp", tags=["TNP"])


# ===================== SCHEMAS =====================

class RecruiterCreate(BaseModel):
    company_name: str
    role: str
    ctc: Optional[str] = None
    hr_email: Optional[str] = None
    eligibility_branch: Optional[List[str]] = []
    min_cgpa: Optional[float] = None
    description: Optional[str] = None


# ===================== GET APIs =====================

@router.get("/stats")
def get_tnp_stats():
    total_students = students_collection.count_documents({})
    active_recruiters = recruiters_collection.count_documents({})

    # abhi dummy, baad me logic add karenge
    placement_ready = 0
    avg_mock_score = 0

    return {
        "total_students": total_students,
        "placement_ready": placement_ready,
        "avg_mock_score": avg_mock_score,
        "active_recruiters": active_recruiters,
    }


@router.get("/students")
def get_students():
    students = list(
        students_collection.find({}, {"password": 0})
    )

    for s in students:
        s["_id"] = str(s["_id"])

    return students


@router.get("/recruiters")
def get_recruiters():
    recruiters = list(recruiters_collection.find({}))

    for r in recruiters:
        r["_id"] = str(r["_id"])

    return recruiters


# ===================== POST APIs =====================

@router.post("/recruiter/add")
def add_recruiter(data: RecruiterCreate):
    recruiter = data.dict()

    recruiters_collection.insert_one(recruiter)

    return {
        "message": "Recruiter added successfully",
        "recruiter": recruiter
    }
