import React, { useCallback } from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  MapEvent,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { Property } from '../types/types';

interface PropertyMarkerProps {
  property: Property;
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
  const isSelected = selectedZpid === property.zpid;
  const [markerRef, marker] = useAdvancedMarkerRef();

  const handleMarkerClick = useCallback(() => {
    setSelectedZpid(isSelected ? null : property.zpid);
    handleDoubleClick();
  }, [isSelected, property.zpid, setSelectedZpid]);

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
      <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
      {isSelected && (
        <InfoWindow
          anchor={marker}
          onClose={handleClose}
          headerContent={
            <h3 className="text-lg font-medium">ID: {property.zpid}</h3>
          }
        >
          <article className="max-w-[200px] w-full mt-2">
            <div className="w-full h-[100px]">
              <img
                src={property.image}
                alt={property.zpid}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="mt-4 text-sm font-medium">
              <h2>{property.address}</h2>
            </div>
          </article>
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
};

export default PropertyMarker;
