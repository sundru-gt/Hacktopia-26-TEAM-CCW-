from fastapi import APIRouter
import requests

router = APIRouter(
    prefix="/api/jobs",
    tags=["Jobs"]
)

ARBEITNOW_API = "https://arbeitnow.com/api/jobs"


@router.get("/")
def get_all_jobs():
    try:
        response = requests.get(ARBEITNOW_API, timeout=10)
        response.raise_for_status()
        data = response.json()
        return data["data"]   # sirf jobs array
    except Exception:
        return {"error": "Failed to fetch job opportunities"}


@router.get("/tech")
def get_tech_jobs():
    try:
        response = requests.get(ARBEITNOW_API, timeout=10)
        jobs = response.json()["data"]

        tech_jobs = [
            job for job in jobs
            if "developer" in job["title"].lower()
            or "engineer" in job["title"].lower()
            or "software" in job["title"].lower()
        ]

        return tech_jobs
    except Exception:
        return {"error": "Failed to fetch tech jobs"}
