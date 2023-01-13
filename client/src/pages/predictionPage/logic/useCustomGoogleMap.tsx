import { useMutation } from '@tanstack/react-query';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { segmentationClient } from '../../../http-segmentation';
import { classificationClient } from '../../../http-classification';

interface IRetrieveImageProps {
  coordinates: object
}

interface IUseCustomGoogleMap {
  imageScale: string
}
function useCustomGoogleMap(props: IUseCustomGoogleMap) {


  const { imageScale } = props
  const [mapref, setMapRef] = useState<any>()
  const [segmentationImage, setSegmentationImage] = useState<null | string>(null)
  const [classificationResult, setClassificationResult] = useState<null | string>(null)

  const handleOnLoad = (map: any) => {
    setMapRef(map);
  };

  const setZoom = () => {
    mapref.setZoom(Number(imageScale))
  };

  const callSegmentation = async (mutationProps: IRetrieveImageProps) => {
    let response = await segmentationClient.post('/', mutationProps)

    if (response.status !== 200) {
      toast.error('Network response was not ok')
    }
    response = response?.data?.image
    if (typeof response == 'string') {
      setSegmentationImage(response)
    }
  }

  const callClassification = async (mutationProps: IRetrieveImageProps) => {
    let response = await classificationClient.post('/', mutationProps)

    if (response.status !== 200) {
      toast.error('Network response was not ok')
    }
    const isPanel = response?.data?.isPanel
    if (typeof isPanel == 'string') {
      setClassificationResult(isPanel)
    }
    return response.data
  }

  const triggerSegmentation = useMutation({
    mutationFn: (mutationProps: IRetrieveImageProps) => {
      return callSegmentation(mutationProps)
    },
    onSuccess: async () => {
      toast.dismiss();
      toast.success("Prediction obtained")
    },
    onError: (error: any) => {
      toast.dismiss();
      // An error happened!
      toast.error(`Problem during prediction, error: ${error}`)
    },
  })

  const triggerClassification = useMutation({
    mutationFn: (mutationProps: IRetrieveImageProps) => {
      return callClassification(mutationProps)
    },
    onSuccess: async (data) => {
      toast.dismiss();
      if ('isPanel' in data && data.isPanel === 1) {
        const newLat = mapref.center.lat();
        const newLong = mapref.center.lng();
        const coordinates_string = `${newLat},${newLong}`
        triggerSegmentation.mutate({ coordinates: [coordinates_string] })
      } else {
        toast.error("Model couldn't detect a panel in the area")
      }
    },
    onError: (error: any) => {
      toast.dismiss();
      // An error happened!
      toast.error(`Image failed when downloading, error: ${error}`)
    },
  })

  if (triggerClassification.isLoading) {
    toast.loading("Working on prediction")
  }

  if (triggerSegmentation.isLoading) {
    toast.dismiss();
    toast.loading("Panel detected, working on mask")
  }

  const generatePrediction = async () => {
    setClassificationResult(null)
    setSegmentationImage(null)
    if (mapref) {
      const newLat = mapref.center.lat();
      const newLong = mapref.center.lng();
      const coordinates_string = `${newLat},${newLong}`
      triggerClassification.mutate({ coordinates: [coordinates_string] })
    }
  };

  return { handleOnLoad, generatePrediction, setZoom, segmentationImage, classificationResult }
}

export default useCustomGoogleMap

