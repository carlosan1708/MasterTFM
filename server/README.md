


Instructions: 

Run App:
python -m venv .venv
.venv\Scripts\activate  
pip install -r requirements.txt
set FLASK_APP=costa_rica_solar_panel
set FLASK_ENV=development
flask run

https://medium.com/analytics-vidhya/deploying-pytorch-models-for-free-with-docker-aws-ecr-and-aws-lambda-b949646544c7

https://medium.com/analytics-vidhya/deploying-pytorch-models-for-free-with-docker-aws-ecr-and-aws-lambda-b949646544c7


aws ecr create-repository --repository-name costa_rica_solar --image-scanning-configuration scanOnPush=true --region us-east-1


docker build -t gcr.io/costa-rica-solar/solar-function .

docker push gcr.io/costa-rica-solar/solar-function

https://cloud.google.com/deep-learning-vm/docs/pytorch_start_instance

https://medium.datadriveninvestor.com/deploy-machine-learning-model-in-google-cloud-using-cloud-run-6ced8ba52aac