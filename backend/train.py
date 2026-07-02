import os
import copy
from tqdm import tqdm
import json

import torch
import torch.nn as nn
import torch.optim as optim

from torchvision import datasets, transforms, models
from torch.utils.data import DataLoader, random_split

# ---------------------------------
# Configuration
# ---------------------------------

DATASET_PATH = "dataset/DogEmotions"
MODEL_SAVE_PATH = "models/dog_expression_model.pth"
CLASS_PATH = "models/image_classes.json"

IMAGE_SIZE = 224
BATCH_SIZE = 16
EPOCHS = 5
LEARNING_RATE = 0.001

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

torch.set_num_threads(os.cpu_count())

print("=" * 50)
print("Device :", DEVICE)
print("=" * 50)

# ---------------------------------
# Image Transformations
# ---------------------------------

transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# ---------------------------------
# Load Dataset
# ---------------------------------

dataset = datasets.ImageFolder(
    DATASET_PATH,
    transform=transform
)

print("\nClasses :", dataset.classes)
print("Total Images :", len(dataset))

# ---------------------------------
# Dataset Split
# ---------------------------------

train_size = int(0.8 * len(dataset))
val_size = int(0.1 * len(dataset))
test_size = len(dataset) - train_size - val_size

train_dataset, val_dataset, test_dataset = random_split(
    dataset,
    [train_size, val_size, test_size]
)

# ---------------------------------
# Data Loaders
# ---------------------------------

train_loader = DataLoader(
    train_dataset,
    batch_size=BATCH_SIZE,
    shuffle=True,
    num_workers=0
)

val_loader = DataLoader(
    val_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False,
    num_workers=0
)

test_loader = DataLoader(
    test_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False,
    num_workers=0
)

print("\nDataset Split")
print("---------------------------")
print("Train      :", len(train_dataset))
print("Validation :", len(val_dataset))
print("Test       :", len(test_dataset))

print("\nBatches")
print("---------------------------")
print("Train      :", len(train_loader))
print("Validation :", len(val_loader))
print("Test       :", len(test_loader))

# ---------------------------------
# Load EfficientNet-B0
# ---------------------------------

print("\nLoading EfficientNet-B0...\n")

model = models.efficientnet_b0(
    weights=models.EfficientNet_B0_Weights.DEFAULT
)

num_features = model.classifier[1].in_features

model.classifier[1] = nn.Linear(
    num_features,
    len(dataset.classes)
)

model = model.to(DEVICE)

# ---------------------------------
# Loss & Optimizer
# ---------------------------------

criterion = nn.CrossEntropyLoss()

optimizer = optim.Adam(
    model.parameters(),
    lr=LEARNING_RATE
)

# ---------------------------------
# Training
# ---------------------------------

best_accuracy = 0.0
best_weights = copy.deepcopy(model.state_dict())

print("\nStarting Training...\n")

for epoch in range(EPOCHS):

    print("=" * 60)
    print(f"Epoch {epoch+1}/{EPOCHS}")
    print("=" * 60)

    model.train()

    running_loss = 0.0
    correct = 0
    total = 0

    progress = tqdm(train_loader)

    for images, labels in progress:

        images = images.to(DEVICE)
        labels = labels.to(DEVICE)

        optimizer.zero_grad()

        outputs = model(images)

        loss = criterion(outputs, labels)

        loss.backward()

        optimizer.step()

        running_loss += loss.item()

        _, predicted = torch.max(outputs, 1)

        total += labels.size(0)
        correct += (predicted == labels).sum().item()

        progress.set_postfix(
            loss=f"{loss.item():.4f}"
        )

    train_accuracy = 100 * correct / total

    # ---------------- Validation ----------------

    model.eval()

    val_correct = 0
    val_total = 0

    with torch.no_grad():

        for images, labels in val_loader:

            images = images.to(DEVICE)
            labels = labels.to(DEVICE)

            outputs = model(images)

            _, predicted = torch.max(outputs, 1)

            val_total += labels.size(0)

            val_correct += (predicted == labels).sum().item()

    val_accuracy = 100 * val_correct / val_total

    avg_loss = running_loss / len(train_loader)

    print(f"\nAverage Loss       : {avg_loss:.4f}")
    print(f"Training Accuracy : {train_accuracy:.2f}%")
    print(f"Validation Accuracy : {val_accuracy:.2f}%")

    if val_accuracy > best_accuracy:

        best_accuracy = val_accuracy

        best_weights = copy.deepcopy(model.state_dict())

        print("\nBest Model Updated.")

# ---------------------------------
# Save Model
# ---------------------------------

os.makedirs("models", exist_ok=True)

with open(CLASS_PATH, "w") as file:
    json.dump(dataset.classes, file)

model.load_state_dict(best_weights)
torch.save(
    model.state_dict(),
    MODEL_SAVE_PATH
)

print("\n" + "=" * 60)
print("Training Completed Successfully!")
print(f"Best Validation Accuracy : {best_accuracy:.2f}%")
print(f"Model Saved At : {MODEL_SAVE_PATH}")
print(f"Classes Saved At : {CLASS_PATH}")
print("=" * 60)