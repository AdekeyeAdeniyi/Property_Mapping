import React, { useState } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { Property } from './types/types';
import PropertyMarker from './components/PropertyMarker';

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
  const [markerLocation] = useState({
    lat: averageLat,
    lng: averageLng,
  });
  const [selectedZpid, setSelectedZpid] = useState<string | null>(null);

  return (
    <div className="w-full h-[100vh] max-w-[100%] border-[8px]">
      <APIProvider apiKey={API_KEY}>
        <Map
          mapId={MAP_ID}
          className="w-full h-full"
          defaultZoom={7}
          defaultCenter={markerLocation}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {properties.map(property => (
            <PropertyMarker
              key={property.zpid}
              property={property}
              selectedZpid={selectedZpid}
              setSelectedZpid={setSelectedZpid}
            />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
};

export default App;
