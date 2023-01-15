import { GoogleMap } from '@react-google-maps/api';
const defaultLocation = { lat: 10.0163467, lng: -84.1522746 };

interface IMapProps {
  clickAction?: any;
  handleOnLoad: any;
  rightClickAction: any
  allActions: boolean
  imageScale: string
}

const CustomGoogleMap = (props: IMapProps) => {
  const {handleOnLoad, clickAction, rightClickAction ,allActions ,imageScale } = props
  return (
    <>
    {allActions ? 
    <GoogleMap
      center={defaultLocation}
      zoom={Number(imageScale)}
      onLoad={handleOnLoad}
      onClick={clickAction}
      onRightClick={rightClickAction}
      mapContainerStyle={{ minWidth: '60vw', minHeight: '60vh', width: '100%', height: '80%' }}
      options={{ mapTypeId: 'satellite' }}
    />
    :
    <GoogleMap
      center={defaultLocation}
      zoom={Number(imageScale)}
      onLoad={handleOnLoad}
      onRightClick={rightClickAction}
      mapContainerStyle={{ minHeight: '40vh',width: '100%', height: '100%' }}
      options={{ mapTypeId: 'satellite' }}
    />
  }
    </>
  );
}

export default CustomGoogleMap;
