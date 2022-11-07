import  { useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
const defaultLocation = { lat: 10.0163467, lng: -84.1522746 };

interface IMapProps {
  nameSuffix: string;
  imageScale: string;
  apiKey: string;
}

interface IRetrieveImageProps {
  fileName: string;
  requestUrl: string;
}

const CustomGoogleMap = (props: IMapProps) => {
  const { nameSuffix, imageScale, apiKey } = props
  const [mapref, setMapRef] = useState<any>()

  const handleOnLoad = (map: any) => {
    setMapRef(map);
  };

  const onClick = () => {
    mapref.setZoom(Number(imageScale))
  };

  const retrieveImageFromGoogle = async (requestUrl: string, fileName: string) => {
    const response = await fetch(requestUrl)
    if (!response.ok) {
      toast.success('Network response was not ok')
    }
    const imageBlob: Blob = await response.blob();
    const element = document.createElement("a");
    element.href = URL.createObjectURL(imageBlob);
    element.download = nameSuffix + fileName;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    return imageBlob;
  }

  const mutation = useMutation({
    mutationFn: (mutationProps: IRetrieveImageProps )  => {
      const {fileName, requestUrl} = mutationProps;
      return retrieveImageFromGoogle(requestUrl, fileName)
    },
    onSuccess: async () => {
      toast.dismiss();
      toast.success("Image downloaded")
    },
    onError: (error: any) => {
      toast.dismiss();
      // An error happened!
      toast.error(`Image failed when downloading, error: ${error}`)
    },
  })
  
  if(mutation.isLoading){
    toast.loading("Working on download")
  }

  const storeImage = async () => {
    if (apiKey === undefined || apiKey === '') {
      toast.error('API Key is missing.')
      return;
    }
    if (mapref) {
      const newLat = mapref.center.lat();
      const newLong = mapref.center.lng();
      const fileName = `img_${newLat}_${newLong}.png`
      const requestUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${newLat},${newLong}&zoom=${Number(imageScale)}&size=1280x1280&maptype=satellite&scale=2&key=${apiKey}`
      mutation.mutate({requestUrl, fileName})
    }
  };

  return (
    <>
    <GoogleMap
      center={defaultLocation}
      zoom={Number(imageScale)}
      onLoad={handleOnLoad}
      onClick={onClick}
      onRightClick={storeImage}
      mapContainerStyle={{ width: '100%', height: '88vh' }}
      options={{ mapTypeId: 'satellite' }}
    />
    </>
  );
}

export default CustomGoogleMap;
