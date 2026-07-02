import os
import json
import copy
import librosa
import numpy as np
from tqdm import tqdm

import torch
import torch.nn as nn
import torch.optim as optim

from PIL import Image
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms, models

# --------------------------------
# Configuration
# --------------------------------

TRAIN_PATH = "dataset/DogAudio/train"
TEST_PATH = "dataset/DogAudio/test"

MODEL_PATH = "models/dog_audio_model.pth"
CLASS_PATH = "models/audio_classes.json"

IMAGE_SIZE = 224
BATCH_SIZE = 16
EPOCHS = 20
LEARNING_RATE = 0.001

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

print("Using Device:", DEVICE)

# --------------------------------
# Image Transform
# --------------------------------

transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485,0.456,0.406],
        std=[0.229,0.224,0.225]
    )
])

# --------------------------------
# Audio Dataset
# --------------------------------

class AudioDataset(Dataset):

    def __init__(self, root_dir, transform=None):

        self.transform = transform

        self.files = []

        self.classes = sorted(os.listdir(root_dir))

        self.class_to_idx = {
            cls:i for i,cls in enumerate(self.classes)
        }

        for cls in self.classes:

            folder = os.path.join(root_dir, cls)

            for file in os.listdir(folder):

                if file.endswith(".wav"):

                    self.files.append(
                        (
                            os.path.join(folder,file),
                            self.class_to_idx[cls]
                        )
                    )

    def __len__(self):

        return len(self.files)

    def __getitem__(self,index):

        path,label = self.files[index]

        audio,sr = librosa.load(
            path,
            sr=16000
        )

        mel = librosa.feature.melspectrogram(
            y=audio,
            sr=sr,
            n_mels=128
        )

        mel = librosa.power_to_db(mel)

        mel -= mel.min()

        mel /= mel.max()+1e-6

        mel = (mel*255).astype(np.uint8)

        image = Image.fromarray(mel).convert("RGB")

        if self.transform:

            image = self.transform(image)

        return image,label

# --------------------------------
# Dataset
# --------------------------------

train_dataset = AudioDataset(
    TRAIN_PATH,
    transform
)

test_dataset = AudioDataset(
    TEST_PATH,
    transform
)

train_loader = DataLoader(
    train_dataset,
    batch_size=BATCH_SIZE,
    shuffle=True
)

test_loader = DataLoader(
    test_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False
)

print("\nClasses:",train_dataset.classes)
print("Train:",len(train_dataset))
print("Test:",len(test_dataset))

# --------------------------------
# Save Classes
# --------------------------------

os.makedirs("models",exist_ok=True)

with open(CLASS_PATH,"w") as f:

    json.dump(train_dataset.classes,f)

# --------------------------------
# Model
# --------------------------------

model = models.efficientnet_b0(
    weights=models.EfficientNet_B0_Weights.DEFAULT
)

features = model.classifier[1].in_features

model.classifier[1] = nn.Linear(
    features,
    len(train_dataset.classes)
)

model = model.to(DEVICE)

criterion = nn.CrossEntropyLoss()

optimizer = optim.Adam(
    model.parameters(),
    lr=LEARNING_RATE
)

# --------------------------------
# Training
# --------------------------------

best_acc = 0

best_weights = copy.deepcopy(model.state_dict())

for epoch in range(EPOCHS):

    print(f"\nEpoch {epoch+1}/{EPOCHS}")

    model.train()

    correct = 0

    total = 0

    running_loss = 0

    for images,labels in tqdm(train_loader):

        images = images.to(DEVICE)

        labels = labels.to(DEVICE)

        optimizer.zero_grad()

        outputs = model(images)

        loss = criterion(outputs,labels)

        loss.backward()

        optimizer.step()

        running_loss += loss.item()

        _,pred = torch.max(outputs,1)

        correct += (pred==labels).sum().item()

        total += labels.size(0)

    train_acc = 100*correct/total

    # ------------------------
    # Validation
    # ------------------------

    model.eval()

    correct = 0

    total = 0

    with torch.no_grad():

        for images,labels in test_loader:

            images = images.to(DEVICE)

            labels = labels.to(DEVICE)

            outputs = model(images)

            _,pred = torch.max(outputs,1)

            correct += (pred==labels).sum().item()

            total += labels.size(0)

    test_acc = 100*correct/total

    print(
        f"Loss:{running_loss:.3f} | "
        f"Train:{train_acc:.2f}% | "
        f"Test:{test_acc:.2f}%"
    )

    if test_acc > best_acc:

        best_acc = test_acc

        best_weights = copy.deepcopy(model.state_dict())

# --------------------------------
# Save Model
# --------------------------------

model.load_state_dict(best_weights)

torch.save(
    model.state_dict(),
    MODEL_PATH
)

print("\nModel Saved Successfully")
print("Best Accuracy:",round(best_acc,2),"%")