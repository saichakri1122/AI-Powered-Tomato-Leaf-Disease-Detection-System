
import torch
import torch.nn.functional as F
from torchvision import transforms
from PIL import Image, UnidentifiedImageError

from app.model_loader import DEVICE

IMAGE_SIZE = 224

# Match the normalization used during model training.
inference_transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# Initial threshold based on the previous internal-test analysis.
# This is a confidence-based rejection rule, not calibrated certainty.
CONFIDENCE_THRESHOLD = 0.90


def predict_image(image_bytes, stage1_model, stage2_model, labels):
    """Run Stage 1 tomato validation followed by Stage 2 classification."""

    try:
        import io

        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    except (UnidentifiedImageError, OSError, ValueError):
        return {
            "status": "error",
            "message": "Invalid image. Please upload a valid leaf photo."
        }

    tensor = inference_transform(image).unsqueeze(0).to(DEVICE)

    with torch.inference_mode():
        # Stage 1: Tomato vs non-tomato
        stage1_probs = F.softmax(stage1_model(tensor), dim=1)[0]
        stage1_idx = int(stage1_probs.argmax().item())
        stage1_label = labels["stage1_class_names"][stage1_idx]
        stage1_confidence = float(stage1_probs[stage1_idx].item())

        if stage1_label != "Tomato":
            return {
                "status": "rejected",
                "message": "This image was not identified as a tomato leaf.",
                "stage1_prediction": stage1_label,
                "stage1_confidence": round(stage1_confidence, 4)
            }

        # Stage 2: Identify the tomato disease
        stage2_probs = F.softmax(stage2_model(tensor), dim=1)[0]
        stage2_idx = int(stage2_probs.argmax().item())
        disease = labels["stage2_class_names"][stage2_idx]
        confidence = float(stage2_probs[stage2_idx].item())

        if confidence < CONFIDENCE_THRESHOLD:
            return {
                "status": "uncertain",
                "message": "The prediction is uncertain. Please try a clearer leaf photo.",
                "disease": disease,
                "confidence": round(confidence, 4),
                "threshold": CONFIDENCE_THRESHOLD
            }

        return {
            "status": "success",
            "disease": disease,
            "confidence": round(confidence, 4),
            "stage1_confidence": round(stage1_confidence, 4)
        }
