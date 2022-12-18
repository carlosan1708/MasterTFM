class StanfordCarsDataModule(pl.LightningDataModule):
    def __init__(self, batch_size, data_dir: str = './'):
        super().__init__()
        self.data_dir = data_dir
        self.batch_size = batch_size


        # Augmentation policy for training set
        self.augmentation = transforms.Compose([
              transforms.RandomResizedCrop(size=256, scale=(0.8, 1.0)),
              transforms.RandomRotation(degrees=15),
              transforms.RandomHorizontalFlip(),
              transforms.CenterCrop(size=224),
              transforms.ToTensor(),
              transforms.Normalize([0.485, 0.456, 0.406],[0.229, 0.224, 0.225])
        ])
        # Preprocessing steps applied to validation and test set.
        self.transform = transforms.Compose([
              transforms.Resize(size=256),
              transforms.CenterCrop(size=224),
              transforms.ToTensor(),
              transforms.Normalize([0.485, 0.456, 0.406],[0.229, 0.224, 0.225])
        ])
        
        self.num_classes = 196


    def prepare_data(self):
        pass


    def setup(self, stage=None):
        # build dataset
        dataset = StanfordCars(root=self.data_dir, download=True, split="train")
        # split dataset
        self.train, self.val = random_split(dataset, [6500, 1644])


        self.test = StanfordCars(root=self.data_dir, download=True, split="test")
        
        self.test = random_split(self.test, [len(self.test)])[0]


        self.train.dataset.transform = self.augmentation
        self.val.dataset.transform = self.transform
        self.test.dataset.transform = self.transform
        
    def train_dataloader(self):
        return DataLoader(self.train, batch_size=self.batch_size, shuffle=True, num_workers=8)


    def val_dataloader(self):
        return DataLoader(self.val, batch_size=self.batch_size, num_workers=8)


    def test_dataloader(self):
        return DataLoader(self.test, batch_size=self.batch_size, num_workers=8)
