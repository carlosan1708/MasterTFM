
from torch.utils.data import Dataset
import numpy as np
import os
from PIL import Image

class SegmentationDataset(Dataset):
    def __init__(self, input_dir, output_dir, is_train,is_test, transform=None):
        self.input_dir  = input_dir
        self.output_dir = output_dir
        self.transform  = transform
        if is_train == True:
            x = round(len(os.listdir(input_dir)) * .7)
            self.images = os.listdir(input_dir)[:x]
        elif is_test == True:
            x = round(len(os.listdir(input_dir)))
            self.images = os.listdir(input_dir)
        else:
            x = round(len(os.listdir(input_dir)) * .7)
            self.images = os.listdir(input_dir)[x:]

    def __len__(self):
        return len(self.images)

    def __getitem__(self, index):
        img_path    = os.path.join(self.input_dir, self.images[index])
        mask_path   = os.path.join(self.output_dir, self.images[index])
        image         = np.array(Image.open(img_path).convert("RGB"), dtype=np.float32) / 255
        mask        = np.array(Image.open(mask_path).convert("L"), dtype=np.float32)   / 255
        
        if self.transform is not None:
            augmentations = self.transform(image=image, mask=mask)
            image   = augmentations["image"]
            mask  = augmentations["mask"]
        mask = mask[None, :]
        
        return {
            'image': image,
            'mask': mask
        }
