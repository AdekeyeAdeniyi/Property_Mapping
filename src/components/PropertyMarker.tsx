import React, { useCallback } from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { Property } from '../types/types';

interface PropertyMarkerProps {
  property: Property;
  selectedZpid: string | null;
  setSelectedZpid: (zpid: string | null) => void;
}

const PropertyMarker: React.FC<PropertyMarkerProps> = ({
  property,
  selectedZpid,
  setSelectedZpid,
}) => {
  const isSelected = selectedZpid === property.zpid;
  const [markerRef, marker] = useAdvancedMarkerRef();

  const handleMarkerClick = useCallback(() => {
    setSelectedZpid(isSelected ? null : property.zpid);
  }, [isSelected, property.zpid, setSelectedZpid]);

  const handleClose = useCallback(
    () => setSelectedZpid(null),
    [setSelectedZpid]
  );

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
          <article className="max-w-[400px] w-full mt-2">
            <div>
              <img
                src={property.image}
                alt={property.zpid}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
            </div>
            <div className="mt-4 text-base md:text-lg font-medium">
              <h2>{property.address}</h2>
            </div>
          </article>
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
};

export default PropertyMarker;
