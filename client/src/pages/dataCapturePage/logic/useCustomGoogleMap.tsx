import { useMutation } from '@tanstack/react-query';
import  { useState } from 'react'
import toast from 'react-hot-toast';
import { segmentationClient } from '../../../http-segmentation';


interface IRetrieveImageProps {
    fileName: string;
    requestUrl: string;
  }
  
interface IUseCustomGoogleMap {
    imageScale: string
    nameSuffix: string
}
function useCustomGoogleMap(props:IUseCustomGoogleMap ) {

    const API_KEY = 'AIzaSyCVUlqSh3Gnlol1R25eig6OCz0fKUDNMS8'

    const {imageScale, nameSuffix} = props
    const [mapref, setMapRef] = useState<any>()

    const handleOnLoad = (map: any) => {
      setMapRef(map);
    };

  const setZoom = () => {
    mapref.setZoom(Number(imageScale))
  };

  const downloadImageFromGoogleMap = async (requestUrl: string, fileName: string) => {
    const response = await segmentationClient.get(requestUrl,{responseType: 'blob'})
    if (response.status !== 200) {
      toast.success('Network response was not ok')
    }
    const imageBlob: Blob = await response.data;
    const element = document.createElement("a");
    element.href = URL.createObjectURL(imageBlob);
    element.download = nameSuffix + fileName;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    return imageBlob;
  }

  const saveMutation = useMutation({
    mutationFn: (mutationProps: IRetrieveImageProps )  => {
      const {fileName, requestUrl} = mutationProps;
      return downloadImageFromGoogleMap(requestUrl, fileName)
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
  
  if(saveMutation.isLoading){
    toast.loading("Working on download")
  }

  const storeImage = async () => {
    if (mapref) {
      const newLat = mapref.center.lat();
      const newLong = mapref.center.lng();
      const fileName = `img_${newLat}_${newLong}.png`
      const requestUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${newLat},${newLong}&zoom=${Number(imageScale)}&size=1280x1280&maptype=satellite&scale=2&key=${API_KEY}`
      saveMutation.mutate({requestUrl, fileName})
    }
  };
  
  return {handleOnLoad, storeImage, setZoom }
}

export default useCustomGoogleMap