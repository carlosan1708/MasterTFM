from train import SimpleModel, SimpleData
import torch
from sklearn.metrics import accuracy_score
import torchvision.transforms as transforms
from torch.autograd import Variable
data = SimpleData(
        root_dir='solar_panel',
        img_size=1280,
        batch_size=8,
        num_workers=16,
    )

model = SimpleModel(
        model_name='resnet18', pretrained=True, num_classes=2
    )

model.load_state_dict(torch.load('models/classification.pt'))

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


import io
from PIL import Image

model.eval()

def transform_image(image_bytes):
    my_transforms = transforms.Compose([ 
    transforms.Resize(1280),transforms.ToTensor()])
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    image_tensor = my_transforms(image).unsqueeze(0)
    return image_tensor


def get_prediction(image_bytes):
    tensor = transform_image(image_bytes=image_bytes)
    outputs = model.forward(tensor)
    _, y_hat = outputs.max(1)
    return y_hat

with open("./solar_panel/test/no_panel/img_9.863717617353693_-84.0662160684078.png", 'rb') as f:
    image_bytes = f.read()
    result = get_prediction(image_bytes=image_bytes)
    print(result)

with open("./solar_panel/test/panel/9.94572365023321,-84.17480666935484.png", 'rb') as f:
    image_bytes = f.read()
    result = get_prediction(image_bytes=image_bytes)
    print(result)

with open("./solar_panel/test/no_panel/img_9.868364518305727_-84.04025356859394.png", 'rb') as f:
    image_bytes = f.read()
    result = get_prediction(image_bytes=image_bytes)
    print(result)

with open("./solar_panel/test/panel/9.95727045052941,-84.11803941060914.png", 'rb') as f:
    image_bytes = f.read()
    result = get_prediction(image_bytes=image_bytes)
    print(result)

with open("./solar_panel/test/panel/9.99232906170785,-84.25629114294135.png", 'rb') as f:
    image_bytes = f.read()
    result = get_prediction(image_bytes=image_bytes)
    print(result)