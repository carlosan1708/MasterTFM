# Costa Rica Solar Panel Segmentation.

Contents:

- data_explorer.ipynb: Simple utility to verify images, mainly used to explore transformations.
- segmentation_inference.ipynb: Sample notebook to test inference of models.
- segmentation_model.ipynb: Main notebook for training of segmentation model.
- 


Installation
```
python -m venv .venv 
.venv\Scripts\activate  
pip install torch==1.9.0 torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu116!
pip install -r requirements.txt
```

https://medium.com/analytics-vidhya/deploying-pytorch-models-for-free-with-docker-aws-ecr-and-aws-lambda-b949646544c7