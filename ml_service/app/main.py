
from contextlib import asynccontextmanager

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.responses import JSONResponse

from app.model_loader import load_models
from app.predictor import predict_image

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB
ALLOWED_CONTENT_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
}

models_store = {}


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


app = FastAPI(
    title="Tomato Leaf Disease Detection API",
    description="Two-stage CNN-based tomato leaf classification service.",
    version="1.0.0",
    lifespan=lifespan,
)


@app.get("/")
def home():
    return {
        "message": "Tomato Leaf Disease Detection API is running",
        "docs": "/docs",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "models_loaded": all(
            key in models_store
            for key in ("stage1", "stage2", "labels")
        ),
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=415,
            detail="Unsupported file type. Upload a JPEG, PNG, or WebP image.",
        )

    # Read at most 10 MB plus one byte to detect oversized uploads.
    image_bytes = await file.read(MAX_FILE_SIZE + 1)

    if not image_bytes:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

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
        raise HTTPException(status_code=400, detail=result["message"])

    return JSONResponse(content=result)
