from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.services.audio_model import predict_audio
import shutil
import os
from app.services.multimodal_model import multimodal_prediction

from predict import predict_image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                   "http://localhost:5174",
                   "http://127.0.0.1:5173",
                   "http://127.0.0.1:5174",
                   "https://precious-croissant-041b24.netlify.app",
                   ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.post("/predict/multimodal")
async def predict_multimodal(
    image: UploadFile = File(...),
    audio: UploadFile = File(...)
):

    image_path = os.path.join(
        UPLOAD_FOLDER,
        image.filename
    )

    audio_path = os.path.join(
        UPLOAD_FOLDER,
        audio.filename
    )

    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    with open(audio_path, "wb") as buffer:
        shutil.copyfileobj(audio.file, buffer)

    result = multimodal_prediction(
        image_path,
        audio_path
    )

    os.remove(image_path)
    os.remove(audio_path)

    return result


@app.post("/predict/audio")
async def predict_audio_api(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    result = predict_audio(file_path)

    os.remove(file_path)

    return result

@app.get("/")
def home():
    return {
        "message": "Dog Behaviour Analysis API Running"
    }


@app.post("/predict/image")
async def predict(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = predict_image(file_path)

    return result