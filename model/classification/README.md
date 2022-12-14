# Costa Rica Solar Panel Classification.

Please notice this repo and code was taken from:
https://github.com/karasawatakumi/pytorch-image-classification

There has been modifications, but I have made the right acknowledgments in the documentation of the project. 

Structure of the classification follow 3 folders.
![Folder structure for Costa Rica Solar Panel](./structure_folder.png)



## Local run (Without Docker)
Note: Sometimes it's complicated to recognized GPU in windows , with docker is not. For the project docker run was used.


`python -m venv .venv`
`.venv\Scripts\activate`
`pip install -r docker/requirements.txt`

`python train.py -d ./dataset_classification --epochs=100 --batch-size=2 --model-name=efficientnet_b0`
`python predict.py`

bbcfad8a8aad2dcc383db09cec93effc082e2a8d

Below instructions are from the original repository for which this code is based of


## Docker Environment

```
docker-compose build
docker-compose run --rm dev
```

ref. https://docs.docker.com/compose/gpu-support/

Or install directly with pip:

(\**The libraries are installed directly into your environment.*)

```
pip install -r docker/requirements.txt
```

Please see [docker-compose.yaml](./docker-compose.yaml), [Dockerfile](./docker/Dockerfile), and [requirements.txt](./docker/requirements.txt).


## Data Preparation

### Custom Dataset

Dataset preparation is simple. Prepare directories with the name of the class to train then store corresponding images in their directories as follows. ([`ImageFolder`](https://pytorch.org/vision/main/generated/torchvision.datasets.ImageFolder.html) class is used inside the loader.)

```
{dataset name}/
├── train/
│   ├── {class1}/
│   ├── {class2}/
│   ├── ...
└── val/
    ├── {class1}/
    ├── {class2}/
    ├── ...
```

### Sample Dataset
For reference, I have prepared a script to download `torchvision` datasets. 

`torchvision` originally provides us with datasets as `Dataset` class, but since the purpose of this repository is to run training for our own dataset, I save them once as jpeg images for easier understanding.

```
python scripts/download_and_generate_jpeg_dataset.py -d cifar10
```

```
usage: download_and_generate_jpeg_dataset.py [-h] --dataset_name DATASET_NAME
                                             [--outdir OUTDIR]

Script for generating dataset.

optional arguments:
  -h, --help            show this help message and exit
  --dataset_name DATASET_NAME, -d DATASET_NAME
                        Dataset name to generate. (mnist or cifar10)
  --outdir OUTDIR, -o OUTDIR
                        Output directory. (default: dataset name)
```

The script produces the following directory structure (when `outdir` is not specified):

```
cifar10/
├── raw/
│   ├── cifar-10-batches-py
│   └── cifar-10-python.tar.gz
├── train/
│   ├── airplane/
│   ├── automobile/
│   ├── bird/
│   ├── cat/
│   ├── deer/
│   ├── dog/
│   ├── frog/
│   ├── horse/
│   ├── ship/
│   └── truck/
└── val/
    ├── airplane/
    ├── automobile/
    ├── bird/
    ├── cat/
    ├── deer/
    ├── dog/
    ├── frog/
    ├── horse/
    ├── ship/
    └── truck/
```

- `raw/`: raw files downloaded by torchvision (Its content depends on dataset)


## Run

### Training
Simple implementation with everything in a single file ([train.py](./train.py))

Specify the dataset root directory containing the `train` and `val` directories.

```
python train.py -d ./dataset_classification --epochs=20
```

#### Detailed settings by command line ([code link](https://github.com/karasawatakumi/pytorch-image-classification/blob/main/train.py#L32-L43)):

You can use most of the models in the [timm](https://github.com/rwightman/pytorch-image-models) by specifying `--model-name` directly.

```
usage: train.py [-h] --dataset DATASET [--outdir OUTDIR]
                [--model-name MODEL_NAME] [--img-size IMG_SIZE]
                [--epochs EPOCHS] [--save-interval SAVE_INTERVAL]
                [--batch-size BATCH_SIZE] [--num-workers NUM_WORKERS]
                [--gpu-ids GPU_IDS [GPU_IDS ...] | --n-gpu N_GPU]
                [--seed SEED]

Train classifier.

optional arguments:
  -h, --help            show this help message and exit
  --dataset DATASET, -d DATASET
                        Root directory of dataset
  --outdir OUTDIR, -o OUTDIR
                        Output directory
  --model-name MODEL_NAME, -m MODEL_NAME
                        Model name (timm)
  --img-size IMG_SIZE, -i IMG_SIZE
                        Input size of image
  --epochs EPOCHS, -e EPOCHS
                        Number of training epochs
  --save-interval SAVE_INTERVAL, -s SAVE_INTERVAL
                        Save interval (epoch)
  --batch-size BATCH_SIZE, -b BATCH_SIZE
                        Batch size
  --num-workers NUM_WORKERS, -w NUM_WORKERS
                        Number of workers
  --gpu-ids GPU_IDS [GPU_IDS ...]
                        GPU IDs to use
  --n-gpu N_GPU         Number of GPUs
  --seed SEED           Seed
```


#### solver settings ([code link](https://github.com/karasawatakumi/pytorch-image-classification/blob/main/train.py#L20-L27)):

```python
OPT = 'adam'  # adam, sgd
WEIGHT_DECAY = 0.0001
MOMENTUM = 0.9  # only when OPT is sgd
BASE_LR = 0.001
LR_SCHEDULER = 'step'  # step, multistep, reduce_on_plateau
LR_DECAY_RATE = 0.1
LR_STEP_SIZE = 5  # only when LR_SCHEDULER is step
LR_STEP_MILESTONES = [10, 15]  # only when LR_SCHEDULER is multistep
```

#### transforms settings ([code link](https://github.com/karasawatakumi/pytorch-image-classification/blob/main/train.py#L106-L120)):

We use the [torchvision transforms](https://pytorch.org/vision/stable/transforms.html) because it is easy to use with the `ImageFolder` dataset.

```python
        if is_train:
            self.transform = transforms.Compose([
                transforms.RandomHorizontalFlip(p=0.5),
                transforms.Resize(img_size),
                transforms.ToTensor(),
                transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                     std=[0.229, 0.224, 0.225])
            ])
        else:
            self.transform = transforms.Compose([
                transforms.Resize(img_size),
                transforms.ToTensor(),
                transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                     std=[0.229, 0.224, 0.225])
            ])
```

#### tensorboard logging

We logged training with [tensorboard](https://pytorch.org/docs/stable/tensorboard.html) by default.

```
tensorboard --logdir ./results
```

![image](https://user-images.githubusercontent.com/13147636/163080755-e97695c3-80ed-4242-91e9-fd6b14b921a6.png)
