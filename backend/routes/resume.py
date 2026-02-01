from fastapi import APIRouter, UploadFile, File
from role_predicter import predict_best_role_from_resume
import pdfplumber
import re
import tempfile
import shutil
import os

router = APIRouter()

# ----------------------------
# Helpers
# ----------------------------
def clean_text(text: str) -> str:
    return re.sub(r'\(cid:\d+\)', '', text)


def extract_name(text: str) -> str:
    lines = text.split("\n")
    for line in lines[:6]:
        line = line.strip()
        if not line or "@" in line or any(c.isdigit() for c in line):
            continue
        words = line.split()
        if 2 <= len(words) <= 4 and all(w[0].isupper() for w in words):
            return line
    return ""


def extract_branch(text: str) -> str:
    branches = {
        "CSE": ["computer science", "computer science and engineering", "cse"],
        "IT": ["information technology", "it"],
        "ECE": ["electronics and communication", "ece"],
        "EEE": ["electrical", "eee"],
        "ME": ["mechanical", "me"],
        "CE": ["civil", "ce"],
    }
    text = text.lower()
    for short, keys in branches.items():
        for k in keys:
            if k in text:
                return short
    return ""


def extract_skills(text: str) -> list[str]:
    lines = text.split("\n")
    skills = []
    capture = False
    stop_headers = [
        "experience", "projects", "education",
        "certifications", "achievements", "internship"
    ]

    for line in lines:
        l = line.strip()
        l_low = l.lower()

        if "technical skills" in l_low:
            capture = True
            continue

        if capture:
            if not l:
                continue
            if any(h in l_low for h in stop_headers):
                break

            parts = re.split(r",|•|\-|\/|\|", l)
            for p in parts:
                p = p.strip()
                if p and len(p) <= 40:
                    skills.append(p)

    return list(dict.fromkeys(skills))


# ----------------------------
# API
# ----------------------------
@router.post("/parse-resume")
async def parse_resume_api(file: UploadFile = File(...)):
    """
    1. PDF text extract
    2. Name / Email / Branch / Skills
    3. ML-based Role Prediction
    """
    print("📄 File received:", file.filename)

    # ---- save file temporarily for ML model ----
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        shutil.copyfileobj(file.file, tmp)
        temp_path = tmp.name

    try:
        # ---------- TEXT EXTRACTION ----------
        with pdfplumber.open(temp_path) as pdf:
            text = ""
            for page in pdf.pages:
                t = page.extract_text()
                if t:
                    text += t + "\n"

        if not text.strip():
            return {"error": "No readable text found in PDF"}

        text = clean_text(text)

        # ---------- ML ROLE PREDICTION ----------
        predicted_role = predict_best_role_from_resume(temp_path)

        # ---------- RESPONSE ----------
        return {
            "name": extract_name(text),
            "email": (
                re.findall(r'[\w\.-]+@[\w\.-]+', text)[0]
                if re.findall(r'[\w\.-]+@[\w\.-]+', text)
                else ""
            ),
            "branch": extract_branch(text),
            "cgpa": (
                re.findall(r'CGPA[: ]+(\d\.\d)', text)[0]
                if re.findall(r'CGPA[: ]+(\d\.\d)', text)
                else ""
            ),
            "skills": extract_skills(text),
            "predicted_role": predicted_role,   # 🔥 IMPORTANT
        }

    except Exception as e:
        print("❌ Resume parsing error:", e)
        return {"error": "Resume parsing failed"}

    finally:
        # cleanup temp file
        if os.path.exists(temp_path):
            os.remove(temp_path)
