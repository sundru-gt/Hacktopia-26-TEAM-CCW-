from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from bson import ObjectId
from database import recruiters_collection

router = APIRouter(prefix="/recruiter", tags=["Recruiter"])


class Recruiter(BaseModel):
    company_name: str
    role: str
    hr_email: Optional[str] = ""
    ctc: Optional[str] = "Not Disclosed"
    eligibility_branch: Optional[List[str]] = []
    min_cgpa: Optional[float] = None
    last_date: Optional[str] = ""          # 🔥 NEW
    description: Optional[str] = ""


@router.post("/add")
def add_recruiter(data: Recruiter):
    recruiter = data.dict()

    result = recruiters_collection.insert_one(recruiter)

    return {
        "message": "Recruiter added successfully",
        "id": str(result.inserted_id)
    }


@router.get("/list")
def get_recruiters():
    recruiters = []
    for r in recruiters_collection.find():
        r["_id"] = str(r["_id"])
        recruiters.append(r)
    return recruiters


@router.get("/recommended/{predicted_role}")
def get_recommended_recruiters(predicted_role: str):
    """
    Match recruiters with student's predicted role
    Example:
    predicted_role = "Frontend Developer"
    matches: frontend, react, ui roles
    """

    recruiters = []

    query = {
        "role": {
            "$regex": predicted_role,
            "$options": "i"
        }
    }

    for r in recruiters_collection.find(query):
        r["_id"] = str(r["_id"])
        recruiters.append(r)

    return recruiters
