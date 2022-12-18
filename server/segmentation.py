from flask import Flask, jsonify, request
import torchvision.transforms as transforms
from PIL import Image
import io
import cv2
from scripts.segmentation_net import SolarPanelModel
import torch
import base64
from PIL import Image 
import matplotlib.pyplot as plt
import matplotlib.image
import os
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)
matplotlib.use('agg')

def transform_image(image_bytes, shouldResize):
    IMAGE_HEIGHT_ORIGINAL=1280
    IMAGE_HEIGHT_CUT_LOGO=1216
    IMAGE_RESIZE=960

    if shouldResize:
        my_transforms = transforms.Compose([ 
        transforms.Resize(IMAGE_RESIZE, interpolation =cv2.INTER_NEAREST),transforms.ToTensor()])
    else:
          my_transforms = transforms.Compose([transforms.ToTensor()]) 

    image = Image.open(io.BytesIO(image_bytes))
    im1 = image.crop((0, 0, IMAGE_HEIGHT_ORIGINAL, IMAGE_HEIGHT_CUT_LOGO))
    return my_transforms(im1).unsqueeze(0)

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
    return response.content
  
    
@app.route('/', methods=['POST'])
def predict_segmentation():
    data = request.json
    app.logger.info(data)
    response = get_image_from_google(data["coordinates"][0])

    tensor = transform_image(image_bytes=response, shouldResize=False)
    LEARNING_RATE = 3e-4
    THRESHOLD = 0.7
    ARCH = "Unet"
    ENCODER_NAME="efficientnet-b5"
    ENCODER_WEIGHTS="imagenet"
    experiment=None
    display_name='Unet_150_0.7_efficientnet-b5_960_960_0.7_0.0003_1'
    model = SolarPanelModel(ARCH,ENCODER_NAME,ENCODER_WEIGHTS, in_channels=3, out_classes=1, learning_rate=LEARNING_RATE,
    threshold=THRESHOLD, experiment=experiment )

    model.load_state_dict(torch.load('model/'+display_name+'.pt'))
    with torch.no_grad():
        model.eval()
        logits = model(tensor)
        print('eval completed')
    pr_masks = logits.sigmoid()
    image_mask = pr_masks.numpy().squeeze()
    # Create a binary mask indicating which values in the prediction are greater than 1
    mask_total = torch.lt(pr_masks, 0.9)

    # Calculate the percentage of mask values that are greater than 1
    percentage = mask_total.sum().item() / mask_total.numel()

    image_numpy = tensor.numpy().squeeze()

    fig, ax = plt.subplots()
    ax.imshow(image_numpy, cmap='gray')

    ax.imshow(image_mask, cmap='jet', alpha=0.5)

    pic_IObytes = io.BytesIO()
    fig.savefig(pic_IObytes, format='png')
    img_str = base64.b64encode(pic_IObytes.getvalue()).decode("utf-8")

    return jsonify({'status': True, 'image': img_str, 'percentage': round(percentage, 3)})


if __name__=="__main__":
    app.run('0.0.0.0', os.environ.get('PORT', 8080))