import React, { useState, useRef, useEffect } from 'react';
import { APIProvider, Map, MapEvent } from '@vis.gl/react-google-maps';

import { Property } from './types/types';
import PropertyMarker from './components/PropertyMarker';
import FloridaCitiesDropdown from './components/FloridaCitiesDropdown';
import { ICity } from 'country-state-city';

const properties: Property[] = [
  {
    zpid: '43356574',
    latLong: { latitude: 25.98535, longitude: -80.12088 },
    address: '1817 S Ocean Dr APT 621, Hallandale, FL 33009',
    image:
      'https://photos.zillowstatic.com/fp/3224bcb4920238eb0c4211b09d032097-uncropped_scaled_within_1536_1152.webp',
    price: '$340,000',
  },
  {
    zpid: '43370124',
    latLong: { latitude: 28.645243, longitude: -80.86781 },
    address: '4382 Lantern Dr, Titusville, FL 32796',
    image:
      'https://photos.zillowstatic.com/fp/3224bcb4920238eb0c4211b09d032097-uncropped_scaled_within_1536_1152.webp',
    price: '$379,900',
  },
  {
    zpid: '43371022',
    latLong: { latitude: 28.675943, longitude: -80.851234 },
    address: '2828 Econ Ave, Mims, FL 32754',
    image:
      'https://photos.zillowstatic.com/fp/3224bcb4920238eb0c4211b09d032097-uncropped_scaled_within_1536_1152.webp',
    price: '$233,000',
  },
  {
    zpid: '43378048',
    latLong: { latitude: 28.589718, longitude: -80.84774 },
    address: '3390 Willis Dr, Titusville, FL 32796',
    image:
      'https://photos.zillowstatic.com/fp/3224bcb4920238eb0c4211b09d032097-uncropped_scaled_within_1536_1152.webp',
    price: '$297,000',
  },
  {
    zpid: '43383729',
    latLong: { latitude: 28.558578, longitude: -80.8147 },
    address: '4560 Apollo Rd, Titusville, FL 32780',
    image:
      'https://photos.zillowstatic.com/fp/3224bcb4920238eb0c4211b09d032097-uncropped_scaled_within_1536_1152.webp',
    price: '$200,000',
  },
];

const averageLat =
  properties.reduce((acc, property) => acc + property.latLong.latitude, 0) /
  properties.length;
const averageLng =
  properties.reduce((acc, property) => acc + property.latLong.longitude, 0) /
  properties.length;

const API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
const MAP_ID = import.meta.env.VITE_APP_GOOGLE_MAPS_ID;

const App: React.FC = () => {
  const [selectedZpid, setSelectedZpid] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<ICity | null>(null); // Track selected city
  const mapRef = useRef<MapEvent | null>(null); // Reference for the map instance

  // Handle city selection
  const handleCitySelect = (city: ICity) => {
    setSelectedCity(city); // Update selected city state
  };

  // Dynamically update zoom and center on city change
  useEffect(() => {
    if (selectedCity && mapRef.current) {
      const { latitude, longitude } = selectedCity;
      if (latitude && longitude) {
        mapRef.current.map.panTo({
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
        });
        mapRef.current.map.setZoom(10);
      }
    }
  }, [selectedCity]);

  return (
    <div className="relative w-full h-[100vh] max-w-[100%] border-[8px]">
      <APIProvider apiKey={API_KEY}>
        <Map
          mapId={MAP_ID}
          className="w-full h-full"
          defaultZoom={7}
          defaultCenter={{ lat: averageLat, lng: averageLng }}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          onTilesLoaded={map => {
            // Save the map instance in the ref
            mapRef.current = map;
          }}
        >
          {properties.map(property => (
            <PropertyMarker
              key={property.zpid}
              property={property}
              selectedZpid={selectedZpid}
              setSelectedZpid={setSelectedZpid}
              map={mapRef.current}
            />
          ))}
        </Map>
      </APIProvider>

      <div className="p-4 absolute w-full top-0 left-0 z-10">
        <FloridaCitiesDropdown onSelect={handleCitySelect} />
      </div>
    </div>
  );
};

export default App;
