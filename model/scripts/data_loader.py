
import albumentations as A  
from albumentations.pytorch import ToTensorV2
from scripts.segmentation_dataset import SegmentationDataset
from torch.utils.data import DataLoader
import cv2

IMAGE_HEIGHT  = 640
IMAGE_WIDTH   = 640
BATCH_SIZE    = 1

def get_loaders(inp_dir, mask_dir,batch_size, train_transform, val_tranform ):
        train_ds = SegmentationDataset( input_dir=inp_dir, output_dir=mask_dir,
                                is_train=True, is_test=False, transform=train_transform)
        train_loader = DataLoader( train_ds, batch_size=batch_size, shuffle=False )
        train_val_ds = SegmentationDataset( input_dir=inp_dir, output_dir=mask_dir,
                                is_train=False, is_test=False, transform=val_tranform)
        val_loader = DataLoader( train_val_ds, batch_size=batch_size, shuffle=False  )
        return train_loader, val_loader, train_ds, train_val_ds

def get_loaders_test(inp_dir, mask_dir,batch_size,val_tranform):
        ds = SegmentationDataset( input_dir=inp_dir, output_dir=mask_dir,
                                is_train=False, is_test=True, transform=val_tranform)
        test_loader = DataLoader( ds, batch_size=batch_size, shuffle=False )
        return test_loader

def load_and_transform(TRAIN_IMAGE_DIR, TRAIN_MASK_DIR,TEST_IMAGE_DIR, TEST_MASK_DIR):
    train_transform = A.Compose(
        [
            # A.CenterCrop(width=IMAGE_WIDTH, height=IMAGE_HEIGHT),
            A.Resize(width=IMAGE_WIDTH, height=IMAGE_HEIGHT, interpolation =cv2.INTER_NEAREST),
            A.HorizontalFlip(p=0.5),
            A.VerticalFlip(p=0.5),
            A.RandomRotate90(p=0.5),
            A.Transpose(p=0.5),
            A.ShiftScaleRotate(shift_limit=0.01, scale_limit=0.04, rotate_limit=0, p=0.25),
            A.RandomBrightnessContrast(p=0.5),
            A.RandomGamma(p=0.25),
            A.Blur(p=0.01, blur_limit = 2),
            ToTensorV2(),
        ],
    )

    val_transform = A.Compose(
        [A.Resize(width=IMAGE_WIDTH, height=IMAGE_HEIGHT, interpolation =cv2.INTER_NEAREST),ToTensorV2()]
        # [ToTensorV2()]
    )

    train_loader, val_loader, train_ds, train_val_ds = get_loaders(TRAIN_IMAGE_DIR, TRAIN_MASK_DIR,
                                BATCH_SIZE,  train_transform, val_transform)

    test_loader = get_loaders_test( TEST_IMAGE_DIR, TEST_MASK_DIR,
                                BATCH_SIZE, val_transform)

    return train_loader, val_loader, train_ds, train_val_ds, test_loader
