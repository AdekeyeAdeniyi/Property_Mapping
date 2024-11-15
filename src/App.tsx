import React, { useState, useRef, useEffect } from 'react';
import { APIProvider, Map, MapEvent } from '@vis.gl/react-google-maps';

import { PropertyData } from './types/types';
import PropertyMarker from './components/PropertyMarker';
import {
  DEFAULT_COORDINATES,
  DEFAULT_ZOOM,
  MAP_ID,
  API_KEY,
} from './constants';
import fetchZillowData from './api/fetchData';
import PriceIndicator from './components/PriceIndicator';
import Preloader from './components/Preloader';
import FloridaCitiesDropdown from './components/FloridaCitiesDropdown';
import { City } from 'react-country-state-city/dist/esm/types';

const App: React.FC = () => {
  const [selectedZpid, setSelectedZpid] = useState<string | null>(null);

  const [zoomLevel, setZoomLevel] = useState(DEFAULT_ZOOM);
  const mapRef = useRef<MapEvent | null>(null);
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [preloader, setPreloader] = useState(true);
  const [coordinates, setCoordinates] = useState(DEFAULT_COORDINATES);

  const [selectedCity, setSelectedCity] = useState<City | null>(() => {
    const storedCity = localStorage.getItem('selectedCity');
    return storedCity ? JSON.parse(storedCity) : null;
  });

  const handleCitySelection = (city: City) => {
    setSelectedCity(city);
  };

  // Fetch data and update map on city change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchZillowData();

        if (data) {
          setProperties(data);
          setPreloader(false);
        } else {
          console.log('No record found');
        }
      } catch (error) {
        console.error('Error fetching Zillow data:', error);
        setPreloader(false); // Stop preloader even if there's an error
      }
    };

    fetchData();

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

    if (selectedCity) {
      setZoomLevel(10);
      setCoordinates({
        latitude: selectedCity.latitude
          ? parseFloat(selectedCity.latitude)
          : DEFAULT_COORDINATES.latitude,
        longitude: selectedCity.longitude
          ? parseFloat(selectedCity.longitude)
          : DEFAULT_COORDINATES.longitude,
      });
    }
  }, [selectedCity]);

  return (
    <>
      {preloader ? (
        <Preloader />
      ) : (
        <div className="relative w-full h-[100vh] max-w-[100%] border-[8px]">
          <APIProvider apiKey={API_KEY}>
            <Map
              mapId={MAP_ID}
              className="w-full h-full"
              defaultZoom={zoomLevel}
              defaultCenter={{
                lat: coordinates.latitude,
                lng: coordinates.longitude,
              }}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
              onTilesLoaded={map => {
                mapRef.current = map;
              }}
            >
              {properties.map(property => (
                <PropertyMarker
                  key={property.address}
                  property={property}
                  selectedZpid={selectedZpid}
                  setSelectedZpid={setSelectedZpid}
                  map={mapRef.current}
                />
              ))}
            </Map>
          </APIProvider>

          {properties.length <= 0 && (
            <h4 className="text-6xl absolute top-1/2 left-1/2 font-bold -translate-x-2/4 -translate-y-2/4 text-red-500">
              No Record Found
            </h4>
          )}

          <div className="inline-flex gap-5 flex-col p-4 absolute w-fit top-0 left-0 z-10">
            <FloridaCitiesDropdown onCitySelect={handleCitySelection} />
            <PriceIndicator />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
