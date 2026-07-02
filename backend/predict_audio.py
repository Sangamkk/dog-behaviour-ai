import json
import librosa
import numpy as np

import torch
import torch.nn as nn

from PIL import Image
from torchvision import transforms, models

# --------------------------------
# Configuration
# --------------------------------

MODEL_PATH = "models/dog_audio_model.pth"
CLASS_PATH = "models/audio_classes.json"

IMAGE_SIZE = 224

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# --------------------------------
# Load Classes
# --------------------------------

with open(CLASS_PATH, "r") as f:
    classes = json.load(f)

# --------------------------------
# Image Transform
# --------------------------------

transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# --------------------------------
# Load Model
# --------------------------------

model = models.efficientnet_b0(weights=None)

features = model.classifier[1].in_features

model.classifier[1] = nn.Linear(
    features,
    len(classes)
)

model.load_state_dict(
    torch.load(
        MODEL_PATH,
        map_location=DEVICE
    )
)

model = model.to(DEVICE)

model.eval()

# --------------------------------
# Prediction Function
# --------------------------------

def predict_audio(audio_path):

    audio, sr = librosa.load(
        audio_path,
        sr=16000
    )

    mel = librosa.feature.melspectrogram(
        y=audio,
        sr=sr,
        n_mels=128
    )

    mel = librosa.power_to_db(mel)

    mel -= mel.min()

    mel /= mel.max() + 1e-6

    mel = (mel * 255).astype(np.uint8)

    image = Image.fromarray(mel).convert("RGB")

    image = transform(image)

    image = image.unsqueeze(0)

    image = image.to(DEVICE)

    with torch.no_grad():

        output = model(image)

        probabilities = torch.softmax(output, dim=1)

        confidence, predicted = torch.max(
            probabilities,
            1
        )

    return {
        "behaviour": classes[predicted.item()],
        "confidence": round(
            confidence.item() * 100,
            2
        )
    }

# --------------------------------
# Test
# --------------------------------

if __name__ == "__main__":

    sample = "sample.wav"

    print(
        predict_audio(sample)
    )