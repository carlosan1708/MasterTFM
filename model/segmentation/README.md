# Costa Rica Solar Panel Segmentation.

## Contents:

**Note: Each JupyterNotebook has instructions** 

- data_explorer.ipynb: Simple utility to verify images, mainly used to explore transformations.
- segmentation_inference.ipynb: Sample notebook to test inference of models.
- segmentation_model.ipynb: Main notebook for training of segmentation model.
- sagemaker_scripts:
  - download.ipynb: Simple command to move from S3 to Sagemaker notebook the images generated.
  - extract_parse_images: Notebook that was used to extract the mask from the uncommon folder structure that Sagemaker Ground Truth uses. 

## It's recommended for the neuronal network to use Colab. 

Resources:

https://drive.google.com/drive/folders/1UTl86NvB9JdLmMGx2depHa6bIl-EgJVj?usp=share_link

Open the folder

![Step1](documentation\Step1.png)

Upload the shared files the folder

![Step2](documentation\Step2.png)

After inflating the files, should look like this:

![Step3](documentation\Step3.png)

Continue execution of notebook, remember to restart the runtime. After installing the requirements

## Local Installation

```
python -m venv .venv 
.venv\Scripts\activate  
pip install torch==1.9.0 torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu116!
pip install -r requirements.txt
```

## Resources.

https://medium.com/analytics-vidhya/deploying-pytorch-models-for-free-with-docker-aws-ecr-and-aws-lambda-b949646544c7