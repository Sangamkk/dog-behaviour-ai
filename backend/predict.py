import json
import torch
import torch.nn as nn

from PIL import Image
from torchvision import transforms, models

# -------------------------
# Configuration
# -------------------------

MODEL_PATH = "models/dog_expression_model.pth"
CLASS_PATH = "models/image_classes.json"

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# -------------------------
# Load Classes
# -------------------------

with open(CLASS_PATH, "r") as file:
    classes = json.load(file)

# -------------------------
# Load Model
# -------------------------

model = models.efficientnet_b0(weights=None)

num_features = model.classifier[1].in_features

model.classifier[1] = nn.Linear(
    num_features,
    len(classes)
)

model.load_state_dict(
    torch.load(MODEL_PATH, map_location=DEVICE)
)

model.to(DEVICE)

model.eval()

# -------------------------
# Image Transform
# -------------------------

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# -------------------------
# Prediction Function
# -------------------------

def predict_image(image_path):

    image = Image.open(image_path).convert("RGB")

    image = transform(image)

    image = image.unsqueeze(0)

    image = image.to(DEVICE)

    with torch.no_grad():

        output = model(image)

        probabilities = torch.softmax(output, dim=1)

        confidence, predicted = torch.max(probabilities, 1)

    return {
        "behaviour": classes[predicted.item()],
        "confidence": round(confidence.item() * 100, 2)
    }

# -------------------------
# Test
# -------------------------

if __name__ == "__main__":

    image_path = input("Enter image path: ")

    result = predict_image(image_path)

    print("\nPrediction")
    print(result)