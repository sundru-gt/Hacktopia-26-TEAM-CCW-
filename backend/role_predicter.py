import pdfplumber
import re
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC

# ================= TRAIN MODEL ONCE =================
data = {
    "resume": [
        "python sql excel tableau data visualization statistics",
        "react javascript html css frontend development",
        "node mongodb sql backend apis server",
        "python machine learning pandas numpy deep learning",
        "react node mongodb sql full stack web development"
    ],
    "role": [
        "Data Analyst",
        "Frontend Developer",
        "Backend Developer",
        "ML Engineer",
        "Full Stack Developer"
    ]
}

df = pd.DataFrame(data)
VECTORIZER = TfidfVectorizer()
X = VECTORIZER.fit_transform(df["resume"])
MODEL = LinearSVC()
MODEL.fit(X, df["role"])


# ================= HELPERS =================
def extract_text_from_resume(file_path: str) -> str:
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            t = page.extract_text()
            if t:
                text += t + "\n"

    # 🔥 CLEAN PDF NOISE
    text = re.sub(r"\s+", " ", text)
    text = text.lower()
    return text


def extract_skills(text: str) -> str:
    skill_patterns = {
        "python": r"python",
        "sql": r"sql|mysql|postgres",
        "react": r"react|reactjs",
        "node": r"node|nodejs",
        "mongodb": r"mongo|mongodb",
        "javascript": r"javascript|java script|js",
        "html": r"html",
        "css": r"css",
        "machine learning": r"machine\s*learning|ml",
        "java": r"\bjava\b",
        "c++": r"c\+\+|cpp"
    }

    found = []

    for skill, pattern in skill_patterns.items():
        if re.search(pattern, text):
            found.append(skill)

    return " ".join(found)


# ================= MAIN =================
def predict_best_role_from_resume(file_path: str) -> str:
    text = extract_text_from_resume(file_path)
    skills_text = extract_skills(text)

    print("🧠 EXTRACTED SKILLS:", skills_text)  # DEBUG

    # 🔥 FAILSAFE
    if not skills_text:
        return "General Software Role"

    vec = VECTORIZER.transform([skills_text])
    role = MODEL.predict(vec)[0]
    return role
