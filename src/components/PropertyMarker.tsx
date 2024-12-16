import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AdvancedMarker,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

import './PropertyMarker.css';

import { PropertyMarkerProps } from '../types/types';
import PropertyDetails from './PropertyDetails';

const PropertyMarker: React.FC<PropertyMarkerProps> = ({
  property,
  selectedZpid,
  setSelectedZpid,
}) => {
  const isSelected = selectedZpid === property._id;
  const [markerRef] = useAdvancedMarkerRef();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleMarkerClick = useCallback(() => {
    if (isSelected) {
      setSelectedZpid(null);
    } else {
      setSelectedZpid(property._id);
    }
  }, [isSelected, property, setSelectedZpid]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setSelectedZpid(null), 300);
  }, [setSelectedZpid]);

  useEffect(() => {
    if (isSelected) {
      setIsVisible(true);
    }
  }, [isSelected]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isSelected) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSelected, handleClose]);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{
          lat: property.address.latitude,
          lng: property.address.longitude,
        }}
        onClick={handleMarkerClick}
      >
        <Pin />
      </AdvancedMarker>

      {isSelected && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={overlayRef}
            className={`bg-white rounded-lg shadow-lg w-[90%] max-w-md md:max-w-2xl p-6 relative 
              ${isVisible ? 'animate-pop-in' : 'animate-pop-out'}`}
          >
            <PropertyDetails property={property} handleClose={handleClose} />
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyMarker;
