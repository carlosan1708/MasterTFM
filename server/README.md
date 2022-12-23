# Application 


Instructions for local execution: 

python -m venv .venv
.venv\Scripts\activate  
pip install -r requirements.txt
set FLASK_APP=segmentation
set FLASK_ENV=development
flask run


Instructions to deploy docker files to GCP (Made for Cloud Run)

Requisites:

Docker installation. 

Classification

docker build -f Dockerfile.classification -t gcr.io/costa-rica-solar/solar-function_classification .

docker push gcr.io/costa-rica-solar/solar-function_classification

Segmentation

docker build -f Dockerfile.segmentation -t gcr.io/costa-rica-solar/solar-function_segmentation .

docker push gcr.io/costa-rica-solar/solar-function_segmentation

References:

https://cloud.google.com/deep-learning-vm/docs/pytorch_start_instance
https://medium.datadriveninvestor.com/deploy-machine-learning-model-in-google-cloud-using-cloud-run-6ced8ba52aac