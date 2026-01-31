from fastapi import APIRouter
from pydantic import BaseModel
from database import recruiters_collection

router = APIRouter(prefix="/recruiter", tags=["Recruiter"])

class Recruiter(BaseModel):
    company_name: str
    role: str
    hr_email: str
    ctc: str | None = None
    eligibility_branch: list[str] = []
    min_cgpa: float | None = None
    description: str | None = None


@router.get("/list")
def get_recruiters():
    recruiters = []
    for r in recruiters_collection.find():
        r["_id"] = str(r["_id"])
        recruiters.append(r)
    return recruiters

@router.post("/add")
def add_recruiter(data: Recruiter):
    recruiter = data.dict()

    print("📥 RECEIVED RECRUITER:", recruiter)   # 🔥 MUST PRINT

    result = recruiters_collection.insert_one(recruiter)

    print("🧾 INSERTED ID:", result.inserted_id) # 🔥 MUST PRINT

    return {
        "message": "Recruiter added successfully",
        "id": str(result.inserted_id)
    }
