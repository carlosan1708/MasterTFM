
import albumentations as A  
from albumentations.pytorch import ToTensorV2
from scripts.segmentation_dataset import SegmentationDataset
from torch.utils.data import DataLoader
import cv2

IMAGE_HEIGHT_ORIGINAL  = 1280
IMAGE_WIDTH_ORIGINAL   = 1280
IMAGE_HEIGHT_CUT_LOGO  = 1200

def get_loaders(inp_dir, mask_dir,batch_size, train_transform, val_tranform, train_percentage ):
        train_ds = SegmentationDataset( input_dir=inp_dir, output_dir=mask_dir,
                                is_train=True, is_test=False, transform=train_transform, train_percentage=train_percentage)
        train_loader = DataLoader( train_ds, batch_size=batch_size, shuffle=True )
        train_val_ds = SegmentationDataset( input_dir=inp_dir, output_dir=mask_dir,
                                is_train=False, is_test=False, transform=val_tranform, train_percentage=train_percentage)
        val_loader = DataLoader( train_val_ds, batch_size=batch_size, shuffle=False  )
        return train_loader, val_loader, train_ds, train_val_ds

def get_loaders_test(inp_dir, mask_dir,batch_size,val_transform):
        ds = SegmentationDataset( input_dir=inp_dir, output_dir=mask_dir,
                                is_train=False, is_test=True, transform=val_transform)
        test_loader = DataLoader( ds, batch_size=batch_size, shuffle=True )
        return test_loader

def load_and_transform(TRAIN_IMAGE_DIR, TRAIN_MASK_DIR,TEST_IMAGE_DIR, TEST_MASK_DIR, TRAIN_PERCENTAGE, BATCH_SIZE, IMAGE_HEIGHT ,IMAGE_WIDTH ):
    # Reference: https://github.com/fvergaracontesse/hyperion_solar_net
    train_transform = A.Compose(
        [
            # A.CenterCrop(width=IMAGE_WIDTH, height=IMAGE_HEIGHT),
            A.Crop(x_min=0, y_min=0,x_max=IMAGE_HEIGHT_ORIGINAL, y_max=IMAGE_HEIGHT_CUT_LOGO),
            A.Resize(width=IMAGE_WIDTH, height=IMAGE_HEIGHT, interpolation =cv2.INTER_NEAREST),
            A.HorizontalFlip(p=0.5),
            A.VerticalFlip(p=0.5),
            A.RandomRotate90(p=0.5),
            A.Transpose(p=0.5),
            # A.ShiftScaleRotate(shift_limit=0.01, scale_limit=0.04, rotate_limit=0, p=0.25),
            # A.RandomBrightnessContrast(p=0.5),
            # A.RandomGamma(p=0.25),
            # A.Blur(p=0.01, blur_limit = 2),
            # A.OneOf([
            #     A.ElasticTransform(p=0.5, alpha=120, sigma=120 * 0.05, alpha_affine=120 * 0.03),
            #     A.GridDistortion(p=0.5),
            #     A.OpticalDistortion(p=0.5, distort_limit=2, shift_limit=0.5)                  
            # ],p=0.8),
            ToTensorV2(),
        ],
    )

    val_transform = A.Compose(
        [ A.Crop(x_min=0, y_min=0,x_max=IMAGE_HEIGHT_ORIGINAL, y_max=IMAGE_HEIGHT_CUT_LOGO), A.Resize(width=IMAGE_WIDTH, height=IMAGE_HEIGHT, interpolation =cv2.INTER_NEAREST),ToTensorV2()]
        # [ToTensorV2()]
    )

    train_loader, val_loader, train_ds, train_val_ds = get_loaders(TRAIN_IMAGE_DIR, TRAIN_MASK_DIR,
                                BATCH_SIZE,  train_transform, val_transform, train_percentage=TRAIN_PERCENTAGE)

    test_loader = get_loaders_test( TEST_IMAGE_DIR, TEST_MASK_DIR,
                                BATCH_SIZE, val_transform)

    return train_loader, val_loader, train_ds, train_val_ds, test_loader
