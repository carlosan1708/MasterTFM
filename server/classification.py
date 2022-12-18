from flask import Flask, jsonify, request
import torchvision.transforms as transforms
from PIL import Image
import io
from scripts.classification_model import SimpleModel
import torch
from PIL import Image 
from flask import send_file
import sys
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def transform_image(image_bytes):
    my_transforms = transforms.Compose([ 
    transforms.Resize(1280),transforms.ToTensor()])
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    image_tensor = my_transforms(image).unsqueeze(0)
    return image_tensor

# Import orginal img

import requests
def get_image_from_google(coordinates, zoom_level = 19):
    print(coordinates)
    API_KEY = "AIzaSyCVUlqSh3Gnlol1R25eig6OCz0fKUDNMS8"
    URL = 'https://maps.googleapis.com/maps/api/staticmap?center={}&zoom={}&size=1280x1280&maptype=satellite&scale=2'.format(coordinates,zoom_level)
    URL_WITH_KEY = URL + '&key=' + API_KEY
    # HTTP request
    response = requests.get(URL_WITH_KEY)
    print(response)
    app.logger.info(response)
    with open("google.png", 'wb') as file:
        # writing data into the file
        file.write(response.content)
    sys.stdout.flush()
    return response.content
  

def get_prediction(model, image_bytes):
    tensor = transform_image(image_bytes=image_bytes)
    outputs = model.forward(tensor)
    _, y_hat = outputs.max(1)
    return y_hat.item()

@app.route('/', methods=['POST'])
def predict_classification():
    data = request.json
    app.logger.info(data)
    response = get_image_from_google(data["coordinates"][0])

    ENCODER_NAME="resnet50"
    display_name='classification12802resnet50'
    model = SimpleModel(
        model_name=ENCODER_NAME,pretrained=True, num_classes=2
    )
    model.load_state_dict(torch.load('model/'+display_name+'.pt'))
    model.eval()
    result = get_prediction(model,response )

    print(result)

    return jsonify({'status': True, 'isPanel': result})


if __name__=="__main__":
    app.run('0.0.0.0', os.environ.get('PORT', 8080))