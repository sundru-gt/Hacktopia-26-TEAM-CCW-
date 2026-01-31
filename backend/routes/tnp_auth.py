from fastapi import APIRouter
from pydantic import BaseModel
from database import tnp_collection
import hashlib

router = APIRouter(prefix="/tnp", tags=["TNP Auth"])

# ---------------- MODELS ----------------
class TnpSignup(BaseModel):
    name: str
    email: str
    institute: str
    institute_code: str
    password: str


class TnpLogin(BaseModel):
    email: str
    password: str


def hash_password(pwd: str):
    return hashlib.sha256(pwd.encode()).hexdigest()


# ---------------- SIGNUP ----------------
@router.post("/signup")
def tnp_signup(data: TnpSignup):
    if tnp_collection.find_one({"email": data.email}):
        return {"error": "TNP already exists"}

    tnp = {
        "name": data.name,
        "email": data.email,
        "institute": data.institute,
        "institute_code": data.institute_code,
        "password": hash_password(data.password),
        "role": "tnp",
    }

    tnp_collection.insert_one(tnp)

    return {"message": "TNP account created successfully"}


# ---------------- LOGIN ----------------
@router.post("/login")
def tnp_login(data: TnpLogin):
    tnp = tnp_collection.find_one({"email": data.email})

    if not tnp:
        return {"error": "TNP not found"}

    if tnp["password"] != hash_password(data.password):
        return {"error": "Invalid password"}

    tnp["_id"] = str(tnp["_id"])
    del tnp["password"]

    return {
        "message": "Login successful",
        "tnp": tnp
    }
