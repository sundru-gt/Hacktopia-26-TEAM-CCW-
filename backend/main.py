from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.resume import router as resume_router
from routes.student import router as student_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume_router)
app.include_router(student_router)

@app.get("/")
def root():
    return {"status": "Backend running"}
