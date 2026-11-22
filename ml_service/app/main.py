
from contextlib import asynccontextmanager

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response
from pydantic import BaseModel, Field

from app.model_loader import load_models
from app.predictor import predict_image
from app.tts import generate_speech


MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

ALLOWED_CONTENT_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
}

SUPPORTED_TTS_LANGUAGES = {"te", "ta"}

models_store = {}


# -----------------------------
# TTS Request Model
# -----------------------------

class TTSRequest(BaseModel):
    text: str = Field(min_length=1, max_length=3000)
    language: str


# -----------------------------
# Load CNN Models
# -----------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):

    # Load models once when the API starts.
    stage1_model, stage2_model, labels = load_models()

    models_store["stage1"] = stage1_model
    models_store["stage2"] = stage2_model
    models_store["labels"] = labels

    print("Tomato disease models loaded successfully!")

    yield

    models_store.clear()


# -----------------------------
# FastAPI Application
# -----------------------------

app = FastAPI(
    title="Tomato Leaf Disease Detection API",
    description="Two-stage CNN-based tomato leaf classification service with multilingual TTS.",
    version="1.1.0",
    lifespan=lifespan,
)


# -----------------------------
# CORS Configuration
# -----------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# -----------------------------
# Home Endpoint
# -----------------------------

@app.get("/")
def home():
    return {
        "message": "Tomato Leaf Disease Detection API is running",
        "docs": "/docs",
    }


# -----------------------------
# Health Check
# -----------------------------

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "models_loaded": all(
            key in models_store
            for key in ("stage1", "stage2", "labels")
        ),
    }


# -----------------------------
# Tomato Leaf Prediction
# -----------------------------

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=415,
            detail="Unsupported file type. Upload a JPEG, PNG, or WebP image.",
        )

    # Read at most 10 MB plus one byte.
    image_bytes = await file.read(MAX_FILE_SIZE + 1)

    if not image_bytes:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty.",
        )

    if len(image_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="Image exceeds the 10 MB size limit.",
        )

    if not models_store:
        raise HTTPException(
            status_code=503,
            detail="Models are not ready. Please try again shortly.",
        )

    result = predict_image(
        image_bytes=image_bytes,
        stage1_model=models_store["stage1"],
        stage2_model=models_store["stage2"],
        labels=models_store["labels"],
    )

    if result["status"] == "error":
        raise HTTPException(
            status_code=400,
            detail=result["message"],
        )

    return JSONResponse(content=result)


# -----------------------------
# Telugu and Tamil Text-to-Speech
# -----------------------------

@app.post("/tts")
async def text_to_speech(request: TTSRequest):

    language = request.language.strip().lower()

    if language not in SUPPORTED_TTS_LANGUAGES:
        raise HTTPException(
            status_code=400,
            detail="Only Telugu and Tamil are supported by this endpoint.",
        )

    try:
        audio_data = await generate_speech(
            text=request.text,
            language=language,
        )

        return Response(
            content=audio_data,
            media_type="audio/mpeg",
            headers={
                "Content-Disposition": "inline; filename=speech.mp3"
            },
        )

    except Exception as e:
        print(f"TTS generation error: {e}")

        raise HTTPException(
            status_code=502,
            detail="Speech generation failed. Please try again.",
        )
