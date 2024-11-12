const DEFAULT_COORDINATES = { latitude: 27.994402, longitude: -81.760254 };
const DEFAULT_ZOOM = 7;

const API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
const MAP_ID = import.meta.env.VITE_APP_GOOGLE_MAPS_ID;

const ZILL_API_KEY = import.meta.env.VITE_APP_ZILL_API_KEY;
const ZILL_URL = import.meta.env.VITE_APP_ZILL_API_KEY;

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
  ZILL_URL,
  PRICEINDICATOR,
};
