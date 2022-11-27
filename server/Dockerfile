FROM python:3.9

COPY app.py requirements.txt ./app/
COPY scripts/data_loader.py scripts/segmentation_dataset.py scripts/segmentation_net.py ./app/scripts/
COPY model/Unet_150_0.7_efficientnet-b5_960_960_0.7_0.0003_1.pt app/model/

WORKDIR /app

RUN apt-get update && apt-get install -y python3-opencv
RUN python3.9 -m pip install --default-timeout=9000 -r requirements.txt -t .
RUN pip install opencv-python
RUN pip install matplotlib

ENTRYPOINT [ "python" ]
CMD ["app.py" ]
# RUN pip install --default-timeout=9000 torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu116!
