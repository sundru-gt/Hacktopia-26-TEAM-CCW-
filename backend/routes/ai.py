
from fastapi import APIRouter, UploadFile, File
import shutil
from ai.role_predictor import predict_best_role_from_resume

router = APIRouter(prefix="/ai", tags=["AI"])

@router.post("/predict-role")
async def predict_role(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    role = predict_best_role_from_resume(temp_path)

    return {
        "predicted_role": role
    }
