import { useEffect, useState } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { LatLng, PropertyData } from './types/types';
import PropertyMarker from './components/PropertyMarker';
import {
  DEFAULT_ZOOM,
  MAP_ID,
  API_KEY,
  DEFAULT_COORDINATES,
} from './constants';
import fetchPropertyData from './api/fetchData';
import PriceIndicator from './components/PriceIndicator';
import Preloader from './components/Preloader';
import ExportData from './components/ExportData';
import StateCityList from './components/CountryFilter';
import { getFromDB } from './database/IndexedDB';
import StateCitySelector from './components/CountryFilter';

const App: React.FC = () => {
  const coordinates = DEFAULT_COORDINATES;
  const [selectedZpid, setSelectedZpid] = useState<string | null>(null);
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [newCoordinates, setNewCoordinate] = useState<LatLng>(coordinates);
  const [preloader, setPreloader] = useState(false);

  const setCoordinates = () => {
    const latlng = localStorage.getItem('latlng');

    if (latlng) {
      const coordinates: LatLng = JSON.parse(latlng);
      setNewCoordinate(coordinates);
    }
  };

  const fetchData = async (stateCode: string | null, cities: string[]) => {
    if (stateCode && cities.length > 0) {
      setCoordinates();
      setPreloader(true);
      try {
        const data: PropertyData[] = await fetchPropertyData(stateCode, cities);
        if (data) {
          setProperties(data);
        } else {
          console.log('No record found');
        }
      } catch (error) {
        console.error('Error fetching properties data:', error);
      } finally {
        setPreloader(false);
      }
    }
  };

  useEffect(() => {
    const stateCode = localStorage.getItem('statecode');

    if (stateCode) {
      const cachedProperties = async () => {
        const res = await getFromDB(stateCode);
        if (res) {
          setProperties(res.value);
        }
      };

      cachedProperties();
    }

    setCoordinates();
  }, []);

  return (
    <div>
      {preloader ? (
        <Preloader />
      ) : (
        <div className="flex flex-col h-screen">
          <div className="absolute left-4 z-20 top-4">
            <StateCityList
              countryCode={233}
              setNewCoordinate={setNewCoordinate}
              handleFetchProperties={fetchData}
            />
          </div>

          <div className="relative w-full h-full max-w-full border-8">
            <APIProvider apiKey={API_KEY}>
              <Map
                mapId={MAP_ID}
                className="w-full h-full"
                defaultZoom={DEFAULT_ZOOM}
                defaultCenter={{
                  lat: newCoordinates.lat || coordinates.lat,
                  lng: newCoordinates.lng || coordinates.lng,
                }}
                gestureHandling="greedy"
                disableDefaultUI
              >
                {properties.map(property => (
                  <PropertyMarker
                    key={property._id}
                    property={property}
                    selectedZpid={selectedZpid}
                    setSelectedZpid={setSelectedZpid}
                  />
                ))}
              </Map>
            </APIProvider>

            <div className="inline-flex gap-5 flex-col p-4 absolute top-0 right-0 z-10">
              <PriceIndicator />
            </div>
            {properties.length > 0 && (
              <div className="pt-2 text-right absolute bottom-6 right-4">
                <ExportData properties={properties} />
              </div>
            )}

            {properties.length <= 0 && (
              <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-red-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                No Record Found
              </h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
