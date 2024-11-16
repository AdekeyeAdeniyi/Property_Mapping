import React, { useCallback } from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  MapEvent,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { PropertyData } from '../types/types';
import {
  convertTimestampToDate,
  convertToDollar,
  getStyleByPrice,
} from '../utils/utils';

interface PropertyMarkerProps {
  property: PropertyData;
  selectedZpid: string | null;
  setSelectedZpid: (zpid: string | null) => void;
  map: MapEvent | null;
}

const PropertyMarker: React.FC<PropertyMarkerProps> = ({
  property,
  selectedZpid,
  setSelectedZpid,
  map,
}) => {
  const isSelected = selectedZpid === property.address;
  const [markerRef, marker] = useAdvancedMarkerRef();

  const handleMarkerClick = useCallback(() => {
    if (property.hdpData) {
      setSelectedZpid(isSelected ? null : property.address);
    }
    handleDoubleClick();
  }, [isSelected, property.address, setSelectedZpid]);

  const handleClose = useCallback(
    () => setSelectedZpid(null),
    [setSelectedZpid]
  );

  const handleDoubleClick = useCallback(() => {
    if (map) {
      map.map.panTo({
        lat: property.latLong.latitude,
        lng: property.latLong.longitude,
      });
      map.map.setZoom(15);
    }
  }, [map, property.latLong.latitude, property.latLong.longitude]);

  return (
    <AdvancedMarker
      ref={markerRef}
      position={{
        lat: property.latLong.latitude,
        lng: property.latLong.longitude,
      }}
      onClick={handleMarkerClick}
    >
      <Pin {...getStyleByPrice(property?.hdpData?.homeInfo?.price || 0)} />

      {isSelected && property.hdpData && (
        <InfoWindow anchor={marker} onClose={handleClose}>
          <article className="max-w-[300px] w-full mt-2">
            <div className="w-full h-[100px]">
              <img
                src={property.imgSrc}
                alt={property.address}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="mt-4 text-sm font-bold">
              <p>Address: {property.address}</p>
              <p>
                Sold Date:
                {convertTimestampToDate(property.hdpData.homeInfo.dateSold)}
              </p>
              <p>
                Sold Price: {convertToDollar(property.hdpData.homeInfo.price)}
              </p>
            </div>
          </article>
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
};

export default PropertyMarker;
