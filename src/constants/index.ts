const DEFAULT_COORDINATES = { latitude: 30.267153, longitude: -97.743061 };
const DEFAULT_ZOOM = 12;

const API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
const MAP_ID = import.meta.env.VITE_APP_GOOGLE_MAPS_ID;

const ZILL_API_KEY = import.meta.env.VITE_APP_ZILL_API_KEY;

const PRICEINDICATOR = {
  low: 'red',
  medium: 'orange',
  high: 'green',
};

export {
  DEFAULT_COORDINATES,
  DEFAULT_ZOOM,
  API_KEY,
  MAP_ID,
  ZILL_API_KEY,
  PRICEINDICATOR,
};
