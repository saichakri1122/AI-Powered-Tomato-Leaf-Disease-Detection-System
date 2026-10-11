
from pathlib import Path
import json
import torch
import torch.nn as nn
from torchvision import models

PROJECT_ROOT = Path(__file__).resolve().parents[2]
MODEL_DIR = PROJECT_ROOT / "Models" / "inference"

STAGE1_PATH = MODEL_DIR / "stage1_cnn_inference.pth"
STAGE2_PATH = MODEL_DIR / "stage2_efficientnet_b0_inference.pth"
LABELS_PATH = MODEL_DIR / "class_labels.json"

DEVICE = torch.device("cpu")


class Stage1CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1), nn.BatchNorm2d(32),
            nn.ReLU(), nn.MaxPool2d(2),
            nn.Conv2d(32, 64, 3, padding=1), nn.BatchNorm2d(64),
            nn.ReLU(), nn.MaxPool2d(2),
            nn.Conv2d(64, 128, 3, padding=1), nn.BatchNorm2d(128),
            nn.ReLU(), nn.MaxPool2d(2),
            nn.Conv2d(128, 256, 3, padding=1), nn.BatchNorm2d(256),
            nn.ReLU(), nn.MaxPool2d(2)
        )
        self.classifier = nn.Sequential(
            nn.AdaptiveAvgPool2d((1, 1)), nn.Flatten(),
            nn.Linear(256, 128), nn.ReLU(),
            nn.Dropout(0.4), nn.Linear(128, 2)
        )

    def forward(self, x):
        return self.classifier(self.features(x))


def load_models():
    for path in [STAGE1_PATH, STAGE2_PATH, LABELS_PATH]:
        if not path.is_file():
            raise FileNotFoundError(f"Required file missing: {path}")

    stage1_data = torch.load(
        STAGE1_PATH, map_location=DEVICE, weights_only=True
    )
    stage2_data = torch.load(
        STAGE2_PATH, map_location=DEVICE, weights_only=True
    )

    stage1 = Stage1CNN()
    stage1.load_state_dict(stage1_data["model_state_dict"])
    stage1.eval()

    stage2 = models.efficientnet_b0(weights=None)
    stage2.classifier[1] = nn.Linear(
        stage2.classifier[1].in_features,
        stage2_data["num_classes"]
    )
    stage2.load_state_dict(stage2_data["model_state_dict"])
    stage2.eval()

    with open(LABELS_PATH, "r", encoding="utf-8") as file:
        labels = json.load(file)

    return stage1, stage2, labels


if __name__ == "__main__":
    stage1, stage2, labels = load_models()
    print("Both models loaded successfully!")
    print("Stage 1 classes:", labels["stage1_class_names"])
    print("Stage 2 classes:", labels["stage2_class_names"])
