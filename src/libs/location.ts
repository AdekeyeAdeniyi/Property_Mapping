import { DEFAULT_COORDINATES } from '../constants';
import { LocationCoordinates } from '../types/types';

export const defaultLocation = {
  latitude: DEFAULT_COORDINATES.latitude,
  longitude: DEFAULT_COORDINATES.longitude,
};

const requestLocation = async (): Promise<LocationCoordinates> => {
  console.log(navigator.geolocation);
  if (!navigator.geolocation) {
    console.warn('Geolocation is not supported by this browser.');
    return defaultLocation;
  }

  try {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );

    const { latitude, longitude } = position.coords;
    return { latitude, longitude };
  } catch {
    console.error('Unable to retrieve location. Using default location.');
    return defaultLocation;
  }
};

export default requestLocation;
