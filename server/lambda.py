import torchvision.transforms as transforms
from PIL import Image
import io
import cv2
from scripts.segmentation_net import SolarPanelModel
import torch
import base64
from PIL import Image 
import matplotlib.pyplot as plt
import json
import requests

def get_image_from_google(coordinates, zoom_level = 19):
    print(coordinates)
    API_KEY = "AIzaSyBXEewBZh9887mCPr2B2nUbC4x4eHuLP20"
    URL = 'https://maps.googleapis.com/maps/api/staticmap?center={}&zoom={}&size=1280x1280&maptype=satellite&scale=2'.format(coordinates,zoom_level)
    URL_WITH_KEY = URL + '&key=' + API_KEY
    # HTTP request
    response = requests.get(URL_WITH_KEY)
    with open("google.png", 'wb') as file:
        # writing data into the file
        file.write(response.content)

    return response.content

def transform_image(image_bytes):
    IMAGE_HEIGHT_ORIGINAL=1280
    IMAGE_HEIGHT_CUT_LOGO=1200
    IMAGE_RESIZE=960

    my_transforms = transforms.Compose([ 
    transforms.Resize(IMAGE_RESIZE, interpolation =cv2.INTER_NEAREST),transforms.ToTensor()])

    image = Image.open(io.BytesIO(image_bytes))
    im1 = image.crop((0, 0, IMAGE_HEIGHT_ORIGINAL, IMAGE_HEIGHT_CUT_LOGO))
    return my_transforms(im1).unsqueeze(0)

def lambda_handler(event, context):
    body = json.loads(event['body'])
    print(body)
    response = get_image_from_google(body["coordinates"][0])

    tensor = transform_image(image_bytes=response)
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
    pr_masks = logits.sigmoid()
    image_mask = pr_masks.numpy().squeeze()
    fig, ax = plt.subplots()
    image_numpy = tensor.numpy().squeeze()
    ax.imshow(image_numpy, cmap='gray')

    # matplotlib.image.imsave('name.png', image_mask)
    
    ax.imshow(image_mask, cmap='jet', alpha=0.5)

    pic_IObytes = io.BytesIO()
    fig.savefig(pic_IObytes, format='png')
    img_str = base64.b64encode(pic_IObytes.getvalue()).decode("utf-8")

    # fig.savefig("result.png", format='png')  
    return {'statusCode': 200, 'body': img_str}
        


