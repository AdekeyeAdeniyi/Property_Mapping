import { useState, useEffect } from 'react';
import { useGeolocated } from 'react-geolocated';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { PropertyData } from './types/types';
import PropertyMarker from './components/PropertyMarker';
import {
  DEFAULT_ZOOM,
  MAP_ID,
  API_KEY,
  DEFAULT_COORDINATES,
} from './constants';
import fetchZillowData from './api/fetchData';
import PriceIndicator from './components/PriceIndicator';
import Preloader from './components/Preloader';
import { isWithinUSABounds } from './utils/utils';

const App: React.FC = () => {
  const [selectedZpid, setSelectedZpid] = useState<string | null>(null);
  const [zoomLevel] = useState(DEFAULT_ZOOM);
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [preloader, setPreloader] = useState(true);
  const [coordinates, setCoordinates] = useState({
    latitude: DEFAULT_COORDINATES.latitude,
    longitude: DEFAULT_COORDINATES.longitude,
  });
  const [locationError, setLocationError] = useState<string | null>(null);

  const { coords, isGeolocationEnabled, isGeolocationAvailable } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  // Handle geolocation availability and permission status
  useEffect(() => {
    if (!isGeolocationAvailable) {
      setLocationError('Geolocation is not supported by your browser.');
    } else if (!isGeolocationEnabled) {
      setLocationError(
        'Please enable location access in your browser for a better, tailored experience.'
      );
    } else {
      setLocationError(null);
    }
  }, [isGeolocationAvailable, isGeolocationEnabled]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchZillowData(coordinates);
        if (data) {
          setProperties(data);
        } else {
          console.log('No record found');
        }
      } catch (error) {
        console.error('Error fetching Zillow data:', error);
      } finally {
        setPreloader(false);
      }
    };

    if (coords) {
      if (isWithinUSABounds(coords.latitude, coords.longitude)) {
        setCoordinates({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {preloader ? (
        <Preloader />
      ) : locationError ? (
        <div className="w-[80%] mx-auto font-semibold h-[100dvh] flex justify-center items-center flex-col text-lg">
          <p>{locationError}</p>
        </div>
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
              gestureHandling="greedy"
              disableDefaultUI={true}
            >
              {properties.map(property => (
                <PropertyMarker
                  key={property.address}
                  property={property}
                  selectedZpid={selectedZpid}
                  setSelectedZpid={setSelectedZpid}
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
            <PriceIndicator />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
