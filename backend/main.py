from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import student, tnp
from routes.recruiter import router as recruiter_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recruiter_router)
app.include_router(student.router)
app.include_router(tnp.router)

@app.get("/")
def root():
    return {"status": "CampusHire backend running"}
