import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AdvancedMarker,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

import './PropertyMarker.css';

import { PropertyMarkerProps } from '../types/types';
import {
  convertTimestampToDate,
  convertToDollar,
  getStyleByPrice,
} from '../utils/utils';

const PropertyMarker: React.FC<PropertyMarkerProps> = ({
  property,
  selectedZpid,
  setSelectedZpid,
}) => {
  const isSelected = selectedZpid === property.address;
  const [markerRef] = useAdvancedMarkerRef();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleMarkerClick = useCallback(() => {
    if (isSelected) {
      setSelectedZpid(null);
    } else {
      setSelectedZpid(property.address);
    }
  }, [isSelected, property.address, setSelectedZpid]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setSelectedZpid(null), 300); // Wait for animation to complete
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
          lat: property.latLong.latitude,
          lng: property.latLong.longitude,
        }}
        onClick={handleMarkerClick}
      >
        <Pin {...getStyleByPrice(property?.hdpData?.homeInfo?.price || 0)} />
      </AdvancedMarker>

      {isSelected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={overlayRef}
            className={`bg-white rounded-lg shadow-lg w-[90%] max-w-md md:max-w-2xl p-6 relative 
              ${isVisible ? 'animate-pop-in' : 'animate-pop-out'}`}
          >
            {property.hdpData ? (
              <div className="flex flex-col md:flex-row gap-4">
                {/* Image */}
                <div className="flex-shrink-0 w-full md:w-1/2 h-56 md:h-auto">
                  <img
                    src={property.imgSrc}
                    alt={property.address}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col gap-2 text-md font-semibold w-full md:w-1/2">
                  <h2 className="text-lg font-bold text-gray-800">
                    {property.address}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Sold Date:{' '}
                    <span className="font-medium text-gray-800">
                      {convertTimestampToDate(
                        property.hdpData.homeInfo.dateSold
                      )}
                    </span>
                  </p>
                  <p className="text-gray-600 mt-2">
                    Sold Price:{' '}
                    <span className="font-medium text-green-600">
                      {convertToDollar(property.hdpData.homeInfo.price)}
                    </span>
                  </p>
                  <div className="flex items-center gap-2 mt-4 md:mt-auto">
                    <button
                      onClick={handleClose}
                      className="inline-flex justify-center items-center px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center flex-col gap-5">
                <p className="text-center text-2xl font-bold text-red-600">
                  No Record Found
                </p>
                <button
                  onClick={handleClose}
                  className="inline-flex justify-center items-center px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyMarker;
